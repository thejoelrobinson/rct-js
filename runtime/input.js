// runtime/input.js — DOM events → Win32 message queue + polled state.
//
// Wires the canvas's mouse and keyboard events to postWindowMessage with
// the standard Win32 message codes so ported code (which is the binary's
// native message-loop) can consume them just like it would on Win32.
//
// ALSO maintains a polled cursor/key state that runtime/win32/user32.js's
// GetCursorPos / GetAsyncKeyState / GetKeyState read. RCT1's mouse handling
// goes through polling (GetCursorPos in FUN_004058f8) — the WndProc at
// 0x403d79 doesn't case on WM_MOUSEMOVE/WM_LBUTTONDOWN (only WM_USER + 1/4),
// so the message queue alone is insufficient for cursor interactivity.
//
// Coordinate space: canvas client coords (after CSS scaling) are mapped to
// canvas-pixel coords before being packed into lParam. The binary expects
// pixel coords matching the DIB/screen size.
//
// Usage:
//   import { attachInput } from "./runtime/input.js";
//   attachInput(canvas);

import { state } from "./win32/context.js";
import { postWindowMessage } from "./win32/user32.js";
import { resumeAudioContext } from "./win32/dsound.js";
import { retryPendingMusic } from "./win32/winmm.js";

// Polled state read by GetCursorPos / GetAsyncKeyState in user32.js.
// Mutated by DOM event handlers below.
export const inputState = {
  cursorX: 0,
  cursorY: 0,
  // Key state: map of VK code → 1 if down, 0 if up.
  keysDown: new Uint8Array(256),
  // Mouse buttons: bit 0 = left, bit 1 = right, bit 2 = middle.
  mouseButtons: 0,
};

// Mouse-drag camera pan: right-click + drag mutates the active viewport's
// world_x/world_y directly. RCT1's binary expects this via its title-state
// machine which is unreachable in our harness, so we do it client-side.
// Uses window-pool slot 0x9a013c (main viewport, wndProc=0x42b079).
const POOL_START   = 0x009a013c;
const POOL_END_PTR = 0x009a1164;
const SLOT_STRIDE  = 0x178;

function findMainViewport(heap) {
  const poolEnd = heap.u32(POOL_END_PTR) >>> 0;
  if (poolEnd <= POOL_START || poolEnd > 0x009a013c + 256 * SLOT_STRIDE) return 0;
  for (let slot = POOL_START; slot < poolEnd; slot += SLOT_STRIDE) {
    if ((heap.u32(slot) >>> 0) === 0x42b079) {
      return heap.u32(slot + 8) >>> 0;
    }
  }
  return 0;
}

function panViewport(heap, dx, dy) {
  const vp = findMainViewport(heap);
  if (vp === 0) return;
  // viewport.world_x at +8 (s16), world_y at +0xa (s16).
  const newX = (heap.i16(vp + 8) + dx) | 0;
  const newY = (heap.i16(vp + 0xa) + dy) | 0;
  heap.setI16(vp + 8, newX);
  heap.setI16(vp + 0xa, newY);
}

const WM_MOUSEMOVE   = 0x0200;
const WM_LBUTTONDOWN = 0x0201;
const WM_LBUTTONUP   = 0x0202;
const WM_RBUTTONDOWN = 0x0204;
const WM_RBUTTONUP   = 0x0205;
const WM_MBUTTONDOWN = 0x0207;
const WM_MBUTTONUP   = 0x0208;
const WM_MOUSEWHEEL  = 0x020A;
const WM_KEYDOWN     = 0x0100;
const WM_KEYUP       = 0x0101;
const WM_CHAR        = 0x0102;

// Subset of VK_ codes — extend as needed.
const VK = {
  Backspace: 0x08, Tab: 0x09, Enter: 0x0d, Escape: 0x1b, Space: 0x20,
  ArrowLeft: 0x25, ArrowUp: 0x26, ArrowRight: 0x27, ArrowDown: 0x28,
  Delete: 0x2e,
  PageUp: 0x21, PageDown: 0x22, End: 0x23, Home: 0x24,
  F1: 0x70, F2: 0x71, F3: 0x72, F4: 0x73, F5: 0x74, F6: 0x75,
  F7: 0x76, F8: 0x77, F9: 0x78, F10: 0x79, F11: 0x7a, F12: 0x7b,
};

function vkFor(e) {
  if (VK[e.key] !== undefined) return VK[e.key];
  if (e.key.length === 1) {
    const c = e.key.toUpperCase().charCodeAt(0);
    return c;  // letters/digits map directly to their ASCII codes for VK_
  }
  return 0;
}

function packLParam(x, y) {
  return ((y & 0xffff) << 16) | (x & 0xffff);
}

// Expose inputState so user32.js GetCursorPos / GetAsyncKeyState can read it.
// state.inputState is read in user32.js via the shared state module.
import { state as _stateForExport } from "./win32/context.js";
_stateForExport.inputState = inputState;

export function attachInput(canvas, opts = {}) {
  // Caller passes the runtime heap so drag-pan can mutate the viewport.
  const heap = opts.heap || null;
  let _dragLastX = -1, _dragLastY = -1;

  // Browser autoplay policy: AudioContext starts suspended until a user
  // gesture lands. Unblock on the first pointer/key event so any sound
  // queued during boot (UI clicks, music) becomes audible immediately.
  let _audioUnlocked = false;
  const unlockAudio = () => {
    if (_audioUnlocked) return;
    _audioUnlocked = true;
    try { resumeAudioContext(); } catch (_) {}
    // Retry any MIDI/MCI playback the browser blocked pre-gesture. winmm
    // parks the most-recent play request when HTMLAudioElement.play()
    // rejects; this kicks it off now that we have a gesture.
    try { retryPendingMusic(); } catch (_) {}
  };

  const post = (msg, wParam, lParam) => {
    const hwnd = state.firstHwnd || 0;
    if (!hwnd) return;
    postWindowMessage(hwnd, msg, wParam | 0, lParam | 0);
  };

  function canvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const x = Math.max(0, Math.min(canvas.width - 1, (e.clientX - rect.left) * sx)) | 0;
    const y = Math.max(0, Math.min(canvas.height - 1, (e.clientY - rect.top) * sy)) | 0;
    return [x, y];
  }

  canvas.addEventListener("mousemove", (e) => {
    const [x, y] = canvasCoords(e);
    inputState.cursorX = x;
    inputState.cursorY = y;
    // Right-button drag → pan camera. Standard RCT1 control.
    if (heap && (inputState.mouseButtons & 2) && _dragLastX >= 0) {
      const dx = _dragLastX - x;
      const dy = _dragLastY - y;
      if (dx !== 0 || dy !== 0) panViewport(heap, dx, dy);
      _dragLastX = x;
      _dragLastY = y;
    }
    post(WM_MOUSEMOVE, inputState.mouseButtons, packLParam(x, y));
  });

  canvas.addEventListener("mousedown", (e) => {
    unlockAudio();
    const [x, y] = canvasCoords(e);
    inputState.cursorX = x;
    inputState.cursorY = y;
    if (e.button === 0)      { inputState.mouseButtons |= 1; post(WM_LBUTTONDOWN, 1, packLParam(x, y)); }
    else if (e.button === 1) { inputState.mouseButtons |= 4; post(WM_MBUTTONDOWN, 0x10, packLParam(x, y)); }
    else if (e.button === 2) { inputState.mouseButtons |= 2; post(WM_RBUTTONDOWN, 2, packLParam(x, y)); _dragLastX = x; _dragLastY = y; }
    e.preventDefault();
  });

  canvas.addEventListener("mouseup", (e) => {
    const [x, y] = canvasCoords(e);
    inputState.cursorX = x;
    inputState.cursorY = y;
    if (e.button === 0)      { inputState.mouseButtons &= ~1; post(WM_LBUTTONUP, 0, packLParam(x, y)); }
    else if (e.button === 1) { inputState.mouseButtons &= ~4; post(WM_MBUTTONUP, 0, packLParam(x, y)); }
    else if (e.button === 2) { inputState.mouseButtons &= ~2; post(WM_RBUTTONUP, 0, packLParam(x, y)); _dragLastX = -1; }
    e.preventDefault();
  });

  // Suppress the right-click context menu so RBUTTON events can be used.
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  canvas.addEventListener("wheel", (e) => {
    const [x, y] = canvasCoords(e);
    // wParam high word = wheel delta (signed); low word = key flags.
    const delta = e.deltaY < 0 ? 120 : -120;
    post(WM_MOUSEWHEEL, (delta & 0xffff) << 16, packLParam(x, y));
    e.preventDefault();
  }, { passive: false });

  // Key events go to the document — canvas isn't focusable by default.
  document.addEventListener("keydown", (e) => {
    unlockAudio();
    const vk = vkFor(e);
    if (vk) {
      inputState.keysDown[vk & 0xff] = 1;
      post(WM_KEYDOWN, vk, 1);
    }
    if (e.key.length === 1) post(WM_CHAR, e.key.charCodeAt(0), 1);
  });
  document.addEventListener("keyup", (e) => {
    const vk = vkFor(e);
    if (vk) {
      inputState.keysDown[vk & 0xff] = 0;
      post(WM_KEYUP, vk, 1);
    }
  });
}
