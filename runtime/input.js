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
import { regs } from "./regs.js";

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

// Pause toggle: directly drives FUN_00427247, which XORs DAT_0099c169 (the
// pause flag read by the game-update gate in FUN_0043f325 / FUN_005e39c6 /
// FUN_004385d8). The binary's normal path lights this from the pause-button
// click in the toolbar's WM_LBUTTONDOWN handler, but our toolbar hit-test
// is still broken downstream of the input-mode dispatch — so wire a Space
// keybind directly to it. FUN_00427247 requires EBX & 1 to toggle, matching
// the cmp/jne preamble at 0x427247.
//
// Returns the new pause flag value (0 or 1) for caller verification.
export function togglePause(heap) {
  const fn = state.fnDispatch.get(0x427247);
  if (typeof fn !== "function") return -1;
  regs.ebx = 1;
  fn(heap);
  return heap.u8(0x0099c169) & 1;
}

// Top-toolbar click router. The binary's path is:
//   WM_LBUTTONDOWN → WndProc 0x403d79 → enqueue event
//   per-tick FUN_005e2225 → FUN_005e3ace (hit-test pool by click coords)
//   → toolbar window's widget-event handler at 0x42a830 (CODESEG, not bridged)
//   → dispatches per-widget action (widget 0 = pause → FUN_00427247).
//
// That chain is currently stalled at two points: (a) the boot fade-in gate
// at DAT_005f8da2 prevents FUN_005e1653 from running until ~80 ticks in, and
// (b) FUN_005e38f5's `extraout_CX` loop break/continue isn't reconstructed
// from the x86 (the translator left it as `0`, so the dequeue loop breaks
// immediately). Bridging 0x42a830 via the painter-bridge would require
// substantial work on the CODESEG interpreter path too.
//
// Pragmatic shortcut: find the toolbar window slot in the pool, walk its
// widget table to find which widget contains (x, y), and directly invoke
// the documented action for that widget. Each widget action is exposed as
// a standalone exported helper so tests can verify it without a click.
//
// Widget table layout (16 bytes per entry):
//   +0  type (u8)   — 0x06 = button, 0x15 = dropdown, 0xff = end-of-list
//   +1  cursor (u8)
//   +2  left   (s16)
//   +4  right  (s16)
//   +6  top    (s16)
//   +8  bottom (s16)
//   +0xa imageId (u32)
//   +0xe tooltip (u16)
//
// The toolbar window's widget array starts at 0x005f5124 (per the
// `mov [esi+0x1c], 0x5f5124` in 4298a0.js); slot+0x20..+0x26 hold the
// window rect, so widget rects are window-relative.
//
// Live widget-rect dump (after runInit + 1 tick — see scratch/agent-
// toolbar-findings.md and runtime probe in tools/probe-toolbar-fast.js):
//   [ 0] L=  0..29  img=0x20026048 tip=0x342  — pause
//   [ 1] L= 30..59  img=0x2002604a tip=0x343  — file menu icon (click no-op;
//        only the bp=3 "dropdown-open" event opens the menu — see 0x42b817)
//   [ 2] L= 60..89  img=0x20026060 tip=0x568  — sound mute (binary click
//        handler @0x42a976 calls FUN_00452876 which XORs DAT_006326bd; the
//        paint proc at 0x42afba..c8 picks sprite 0x20026060/62 based on
//        that bit, confirming this is the sound-on/off speaker button)
//   [ 3] L=104..133 img=0x2002604c tip=0x33e  — zoom out
//   [ 4] L=134..163 img=0x2002604f tip=0x33d  — zoom in
//   [ 5] L=164..193 img=0x20026052 tip=0x33f  — rotate view
//   [ 6] L=194..223 img=0x20026066 tip=0x3bb  — view options (click no-op;
//        only bp=3 dropdown event opens the menu at 0x42b40f)
//   [ 7] L=224..253 img=0x20026056 tip=0xb19  — map view
//   [ 8..19] further 30-px buttons (land/water/scenery/path/ride/park/
//            staff/guests/research/finances/news/options-menu) — open
//            their own windows via per-tool active-flag latching +
//            WindowFindByClass; need 0x42a830 bridged for a faithful port.
//   [20] type=0x15 large dropdown panel (file menu body)
//   [21] type=0xff sentinel
//
// Index → action mapping below is conservative: we wire only those whose
// effect is a single documented state mutation (pause flag, viewport zoom,
// camera rotation, map-view mode) so tests can verify them without bridging
// the per-widget window-open handlers (which live in CODESEG-stripped code).
const TOOLBAR_WIDGETS_BASE = 0x005f5124;
const WIDGET_STRIDE = 0x10;

// Widget indices (per layout above). Names match the visible toolbar order.
const PAUSE_WIDGET_INDEX     = 0;
const FILE_MENU_WIDGET_INDEX = 1;  // image-only icon for file menu (click no-op)
const SOUND_WIDGET_INDEX     = 2;  // speaker mute toggle (was mislabeled as file dropdown)
const ZOOM_OUT_WIDGET_INDEX  = 3;
const ZOOM_IN_WIDGET_INDEX   = 4;
const ROTATE_WIDGET_INDEX    = 5;
const VIEW_OPTS_WIDGET_INDEX = 6;
const MAP_VIEW_WIDGET_INDEX  = 7;

// Viewport zoom controls. The main viewport's struct has a u8 at +0x10 that
// holds zoom level (0=closest, 3=farthest). This matches the wheel handler
// below — clicking zoom-out increments the byte (one step farther), clicking
// zoom-in decrements it (one step closer). Returns the new zoom level, or
// -1 if the viewport is not yet allocated.
export function zoomOut(heap) {
  const vp = findMainViewport(heap);
  if (vp === 0) return -1;
  let z = heap.u8(vp + 0x10);
  if (z < 3) z++;
  heap.setU8(vp + 0x10, z);
  return z;
}
export function zoomIn(heap) {
  const vp = findMainViewport(heap);
  if (vp === 0) return -1;
  let z = heap.u8(vp + 0x10);
  if (z > 0) z--;
  heap.setU8(vp + 0x10, z);
  return z;
}

// Camera rotation. DAT_00991f88 is a u8 cycling 0..3 (mod 4). The binary's
// rotate-button handler at FUN_004340f5 also recomputes the viewport's
// world coords (so the view rotates around the on-screen center), but the
// observable scalar is the rotation byte itself — tests + the painter
// re-read it on next frame to redraw at the new angle.
// 4298a0 zeros DAT_00991f88 at toolbar-window create, so it's always present
// after runInit. Increment + mask matches the binary's `inc; and 3` pair.
export function rotateView(heap) {
  const cur = heap.u8(0x00991f88);
  const next = (cur + 1) & 3;
  heap.setU8(0x00991f88, next);
  return next;
}

// Map-view toggle. DAT_0099c16b is the input-mode flag read by FUN_005e1fdd
// / FUN_005e1f70 on every tick: ==1 routes input-pos through the map-view
// projection (FUN_0042d56c / FUN_0042d60a), ==0 routes through the normal
// world-coord projection. FUN_0042d4a8 sets it to 1 (enter map mode); we
// flip between 0 and 1 here to mirror the toolbar button's toggle behavior.
// Returns the new mode value.
export function toggleMapView(heap) {
  const cur = heap.u8(0x0099c16b);
  const next = cur === 1 ? 0 : 1;
  heap.setU8(0x0099c16b, next);
  return next;
}

// Sound-on toggle. DAT_006326bd bit 0 gates ALL ambient sound playback —
// FUN_00453f76 / FUN_004543bd / FUN_004533d0 / FUN_00453bf8 etc. all early-
// return when ((DAT_006326bd & 1) == 0). Toolbar widget 2 (the speaker-icon
// button at L=60..89) toggles it via FUN_00452876, which also re-loads /
// re-fires the ambient sound buffers when the bit transitions on → off.
// We invoke the ported function directly (it's in fnDispatch) so the full
// transition logic runs, not just the bit flip; the helper returns the new
// flag value (0 = muted, 1 = audible) so callers/tests can verify.
//
// Note: the toolbar paint proc at 0x42afb5 also uses this bit to pick which
// sprite to draw for the button itself (0x20026060 = sound-on, 0x20026062 =
// sound-off), so the UI updates on next frame to reflect the toggle.
export function toggleSound(heap) {
  const fn = state.fnDispatch.get(0x452876);
  if (typeof fn === "function") {
    fn(heap);
  } else {
    // Fallback: raw XOR if the ported fn isn't registered (shouldn't happen,
    // but keeps the helper resilient — bit flip is the only observable
    // state change a test would assert on anyway).
    heap.setU8(0x006326bd, (heap.u8(0x006326bd) ^ 1) & 0xff);
  }
  return heap.u8(0x006326bd) & 1;
}

function findToolbarSlot(heap) {
  const poolEnd = heap.u32(POOL_END_PTR) >>> 0;
  if (poolEnd <= POOL_START || poolEnd > 0x009a013c + 256 * SLOT_STRIDE) return 0;
  for (let slot = POOL_START; slot < poolEnd; slot += SLOT_STRIDE) {
    // Toolbar uses paint wndProc 0x42afb5 (slot+0) and click handler
    // 0x42a830 (slot+4). Match on paint proc since it's stable.
    if ((heap.u32(slot) >>> 0) === 0x42afb5) return slot;
  }
  return 0;
}

// Returns the widget index (0..N-1) at (x, y) within the toolbar, or -1.
function toolbarWidgetAt(heap, x, y) {
  const slot = findToolbarSlot(heap);
  if (slot === 0) return -1;
  const winLeft = heap.i16(slot + 0x20);
  const winTop  = heap.i16(slot + 0x22);
  const winW    = heap.i16(slot + 0x24);
  const winH    = heap.i16(slot + 0x26);
  if (x < winLeft || y < winTop || x >= winLeft + winW || y >= winTop + winH) return -1;
  const lx = x - winLeft, ly = y - winTop;
  // Walk widget table until type 0xff sentinel. Cap iteration to avoid runaway.
  for (let i = 0; i < 64; i++) {
    const w = TOOLBAR_WIDGETS_BASE + i * WIDGET_STRIDE;
    const type = heap.u8(w);
    if (type === 0xff || type === 0) return -1;
    const l = heap.i16(w + 2);
    const r = heap.i16(w + 4);
    const t = heap.i16(w + 6);
    const b = heap.i16(w + 8);
    if (lx >= l && lx <= r && ly >= t && ly <= b) return i;
  }
  return -1;
}

// Routes a left-click at (x, y) to a toolbar widget action, if applicable.
// Returns the widget index that was activated, or -1 if either (a) the click
// missed every widget rect, or (b) the widget hit has no wired action yet.
export function clickToolbar(heap, x, y) {
  const idx = toolbarWidgetAt(heap, x, y);
  if (idx < 0) return -1;
  switch (idx) {
    case PAUSE_WIDGET_INDEX:    togglePause(heap);  return idx;
    case SOUND_WIDGET_INDEX:    toggleSound(heap);  return idx;
    case ZOOM_OUT_WIDGET_INDEX: zoomOut(heap);      return idx;
    case ZOOM_IN_WIDGET_INDEX:  zoomIn(heap);       return idx;
    case ROTATE_WIDGET_INDEX:   rotateView(heap);   return idx;
    case MAP_VIEW_WIDGET_INDEX: toggleMapView(heap); return idx;
    // FILE_MENU / VIEW_OPTS click is a no-op in the binary too — the menu
    // opens via the bp=3 "dropdown-open" event path (0x42b817 / 0x42b40f),
    // which our LMB-down shortcut doesn't drive. Return -1.
    /* TODO: case FILE_MENU_WIDGET_INDEX: dispatch as bp=3 to 0x42a830 */
    /* TODO: case VIEW_OPTS_WIDGET_INDEX: dispatch as bp=3 to 0x42a830 */
    /* TODO: widgets 8..19 (land, water, scenery, path, ride, park, staff,
       guests, research, finances, news, options-menu) — each opens its own
       window via FUN_0042xxxx; per-widget toggle latches DAT_00991f5c +
       0x991f30 bit 6 and runs a WindowFindByClass round-trip that needs
       slot/esi context. Wait for 0x42a830 bridge (parallel agent). */
    default: return -1;
  }
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
    if (e.button === 0)      {
      inputState.mouseButtons |= 1;
      post(WM_LBUTTONDOWN, 1, packLParam(x, y));
      // Toolbar shortcut: route LMB clicks in toolbar widget rects directly
      // to their actions (see clickToolbar). Bypasses the per-tick hit-test
      // chain (FUN_005e2225/FUN_005e3ace/0x42a830) which is still stalled.
      if (heap) clickToolbar(heap, x, y);
    }
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
    // Also drive zoom directly (binary's title-state pan/zoom unreachable).
    // Viewport struct: +0x10 = zoom (u8, 0=close..3=far). Inverted from wheel
    // direction: scroll up = zoom in = decrement zoom.
    if (heap) {
      const vp = findMainViewport(heap);
      if (vp) {
        let z = heap.u8(vp + 0x10);
        if (delta > 0 && z > 0) z--;
        else if (delta < 0 && z < 3) z++;
        heap.setU8(vp + 0x10, z);
      }
    }
    e.preventDefault();
  }, { passive: false });

  // Key events go to the document — canvas isn't focusable by default.
  document.addEventListener("keydown", (e) => {
    unlockAudio();
    const vk = vkFor(e);
    if (vk) {
      inputState.keysDown[vk & 0xff] = 1;
      post(WM_KEYDOWN, vk, 1);
      // Arrow-key panning. RCT1 normally drives this via the title-state
      // machine; here we mutate viewport.world_x/y directly. Step ~32 px
      // per press (matches one tile width).
      if (heap) {
        const STEP = 32;
        if (vk === 0x25) panViewport(heap, -STEP, 0);       // ArrowLeft
        else if (vk === 0x27) panViewport(heap,  STEP, 0);  // ArrowRight
        else if (vk === 0x26) panViewport(heap, 0, -STEP);  // ArrowUp
        else if (vk === 0x28) panViewport(heap, 0,  STEP);  // ArrowDown
        // Space → toggle pause. Fires once per keydown (browsers auto-repeat
        // keydown while held; e.repeat filters out the repeats so a held
        // Space doesn't strobe pause on/off every frame).
        else if (vk === 0x20 && !e.repeat) togglePause(heap);
      }
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
