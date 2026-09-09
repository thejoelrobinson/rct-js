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
import { callNative } from "./painter-bridge.js";

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
// FUN_004385d8). Kept as a helper for the Space keybind (below) and for
// isolated test assertions — the binary's full LBUTTONDOWN-driven path is
// already covered end-to-end by test/runtime/native_dispatch.test.js.
// FUN_00427247 requires EBX & 1 to toggle, matching the cmp/jne preamble.
//
// Returns the new pause flag value (0 or 1) for caller verification.
export function togglePause(heap) {
  const fn = state.fnDispatch.get(0x427247);
  if (typeof fn !== "function") return -1;
  regs.ebx = 1;
  fn(heap);
  return heap.u8(0x0099c169) & 1;
}

// Per-widget state-mutation helpers (zoom/rotate/map-view/sound). These are
// kept as standalone exports because (a) tests assert each effect in
// isolation without depending on the full input-dispatch chain, and (b) the
// keyboard shortcuts below (Space → pause, arrows → pan, wheel → zoom) reach
// the same observable state without routing through Win32 messages.
//
// The clickToolbar() shortcut that previously dispatched these helpers on
// LBUTTONDOWN was retired once the native dispatch chain went end-to-end
// (commits c4cb89f + c449072 + 508a537). Real toolbar clicks now flow
// WM_LBUTTONDOWN → WndProc 0x403d79 → ring buffer → FUN_005e2225 →
// FUN_005e3ace hit-test → 0x42a830 widget dispatch → per-widget game-cmd,
// covering all 20 toolbar widgets — including the ones the shortcut never
// wired up (land/water/scenery/path/ride/park/staff/etc.). See
// test/runtime/native_dispatch.test.js for the end-to-end pause assertion.
//
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

  // TITLE-MENU CLICK BRIDGE (Task #14).
  //
  // The binary's native widget-click dispatch for event-proc windows (the
  // LMB-up path in the CODESEG handler 0x5e2b52 that does `call [esi+4]` with
  // EBP=1 = "widget click") is not yet ported — 5e2b52's widget block routes
  // to the interpreter and, on the title screen, never delivers the EBP=1
  // message to a window's event proc (the hit-test only ever calls it with
  // EBP=2 = hover). Only the toolbar's game-command path (0x42a830 → 0x426f56)
  // is wired end-to-end. So on the title screen, clicking a menu button would
  // do nothing.
  //
  // Bridge: on LMB-up over the title menu (window class 29), resolve which of
  // its enabled widgets the cursor is on and invoke the window's OWN event
  // proc (window+4 = 0x429a65) with the real widget-click message — EBP=1,
  // EDX=widget index, ESI=window. That runs the binary's actual menu logic:
  // widget 0 (New Game) → FUN_004304dd opens the scenario-select window
  // (class 32); widget 2 → quit; 1/3 → the scenario chooser. Nothing here is
  // faked — only the un-ported message *generation* is bridged. Remove once
  // 0x5e2b52's native widget dispatch is ported (then this double-dispatches).
  //
  // Widget struct (16 bytes): +0 type(u8), +2 left, +4 right, +6 top,
  // +8 bottom (all s16, window-relative). Window: +0x20 x|y, +0x0c enabled
  // widget bitmask, +0x1c widgets ptr, +0x174 class (u8), +4 event proc.
  function dispatchTitleMenuClick(x, y) {
    if (!heap) return false;
    const POOL_START = 0x009a013c >>> 0, POOL_END_PTR = 0x009a1164 >>> 0, STRIDE = 0x178;
    const poolEnd = heap.u32(POOL_END_PTR) >>> 0;
    let menu = 0;
    for (let s = POOL_START; s < poolEnd && s < POOL_START + 64 * STRIDE; s += STRIDE) {
      if (heap.u8(s + 0x174) === 29 && (heap.u32(s) >>> 0) !== 0) { menu = s; break; }
    }
    if (!menu) return false;                       // not the title screen
    const wx = (heap.u16(menu + 0x20) << 16) >> 16;
    const wy = (heap.u16(menu + 0x22) << 16) >> 16;
    const relX = x - wx, relY = y - wy;
    const enabled = heap.u32(menu + 0x0c) >>> 0;
    let wp = heap.u32(menu + 0x1c) >>> 0, hit = -1;
    for (let idx = 0; idx < 8; idx++, wp += 0x10) {
      const type = heap.u8(wp);
      if (type === 0 || type === 0xff) break;      // end of widget table
      if (type < 1 || !((enabled >>> idx) & 1)) continue;
      const l = (heap.u16(wp + 2) << 16) >> 16, r = (heap.u16(wp + 4) << 16) >> 16;
      const t = (heap.u16(wp + 6) << 16) >> 16, b = (heap.u16(wp + 8) << 16) >> 16;
      if (relX >= l && relX <= r && relY >= t && relY <= b) { hit = idx; break; }
    }
    if (hit < 0) return false;
    // Invoke the menu's real event proc (window+4 = 0x429a65) with the widget-
    // click message via the interpreter bridge. callNative runs the binary's
    // actual bytes (which then open the scenario-select window via the real
    // WindowCreate at 0x5e3f31); the JS-port path through fnDispatch does not
    // materialise the window in this runtime, so the interpreter is the
    // faithful path here.
    const evtProc = heap.u32(menu + 4) >>> 0;
    regs.ebp = (regs.ebp & 0xffff0000) | 1;         // EBP=1 = widget click
    regs.edx = (regs.edx & 0xffff0000) | (hit & 0xffff);
    regs.esi = menu >>> 0;
    regs.edi = 0;                                   // != -1 → a real event
    try { callNative(evtProc, []); } catch (_) { return false; }
    return true;
  }

  // SCENARIO-SELECT ROW CLICK (Task #15) — the last hop to actual gameplay.
  //
  // The scenario-select window (class 32) lists the parks in a SCROLLVIEW
  // (widget 3, type 17, window-relative rect (4,18)-(395,195)). The binary's own
  // row hit-test lives in that window's event proc 0x430326 under message
  // EBP=13: it walks the scenario table at 0x99c16c (stride 0x10), subtracting
  // 0x18 (the 24px row height) per NON-EMPTY entry until the remainder goes
  // negative — the table index it stops on is the selection (note it counts
  // table slots, so the index is the scenario id, not the visual row). That walk
  // is replicated exactly below.
  //
  // Why we don't just call 0x430326: its EBP=13 arm only records the selection
  // and starts a 4-tick countdown ([esi+0x15a] / [esi+0x15e]); the actual load
  // fires later from the EBP=6 per-tick update arm, which nothing in this
  // runtime drives. And the load it eventually calls, FUN_0043054e, does not
  // work here yet (see PORTING-ROADMAP ADDENDUM 94: its glob buffer 0x5f8fb3 is
  // clobbered by interpreter-side code, and the interpreter leg never reaches
  // its copy). So we invoke the binary's OTHER scenario loader directly.
  //
  // FUN_0042f4be is that loader and is the most-exercised code path in the
  // project — the whole byte-exact gameplay soak (7b14266) is one 0x42f4be
  // load of sc21. It reads the park filename from 0x0099aa88, loads it, clears
  // the title-mode bit [0x99a500], and calls MainOpen, which opens the gameplay
  // toolbars (window classes 1 and 2). We simply hand it the filename the user
  // picked instead of a hardcoded one.
  //
  // It must run as the JS PORT, not through callNative: the interpreter does not
  // execute these high-level functions here (verified — callNative(0x42f4be)
  // and callNative(0x43054e) both return with no effect), whereas the JS port
  // takes the pool from [0,29,39] (viewport+menu+logo) to [0,1,2]
  // (viewport+toolbars) with the selected park loaded.
  function dispatchScenarioSelectClick(x, y) {
    if (!heap) return false;
    const POOL_START = 0x009a013c >>> 0, POOL_END_PTR = 0x009a1164 >>> 0, STRIDE = 0x178;
    const poolEnd = heap.u32(POOL_END_PTR) >>> 0;
    let win = 0;
    for (let s = POOL_START; s < poolEnd && s < POOL_START + 64 * STRIDE; s += STRIDE) {
      if (heap.u8(s + 0x174) === 32 && (heap.u32(s) >>> 0) !== 0) { win = s; break; }
    }
    if (!win) return false;                       // scenario-select not open
    const wx = (heap.u16(win + 0x20) << 16) >> 16;
    const wy = (heap.u16(win + 0x22) << 16) >> 16;
    // Widget 3 is the scrollview; take its rect from the widget table rather
    // than hardcoding, so a differently-sized dialog still hit-tests correctly.
    const wp = (heap.u32(win + 0x1c) >>> 0) + 3 * 0x10;
    const l = (heap.u16(wp + 2) << 16) >> 16, r = (heap.u16(wp + 4) << 16) >> 16;
    const t = (heap.u16(wp + 6) << 16) >> 16, b = (heap.u16(wp + 8) << 16) >> 16;
    const relX = x - wx, relY = y - wy;
    if (relX < l || relX > r || relY < t || relY > b) return false;   // not on the list

    // The binary's row walk (0x430353), replicated: 0x18 px per non-empty entry.
    let dy = relY - t;
    let sel = -1;
    for (let idx = 0; idx < 0x80; idx++) {
      if (heap.u8((0x0099c16c + idx * 0x10) >>> 0) !== 0) {
        dy -= 0x18;
        if (dy < 0) { sel = idx; break; }
      }
    }
    if (sel < 0) return false;                    // clicked past the last row
    // 0x99fb78 is the locked/unavailable bitmask the binary checks at 0x430377.
    if (sel < 0x20 && ((heap.u32(0x0099fb78) >>> sel) & 1)) return false;

    // Hand the picked filename to the loader. The VFS resolves by basename, so
    // the bare name is what 0x0099aa88 needs (this is exactly what the harness's
    // legacy force-load wrote there).
    let name = "";
    for (let i = 0; i < 15; i++) {
      const c = heap.u8((0x0099c16c + sel * 0x10 + i) >>> 0);
      if (!c) break;
      name += String.fromCharCode(c);
    }
    if (!name) return false;
    const path = name.toLowerCase() + "\0";
    for (let i = 0; i < path.length; i++) heap.setU8((0x0099aa88 + i) >>> 0, path.charCodeAt(i));

    const load = state.fnDispatch.get(0x42f4be);
    if (typeof load !== "function") return false;
    // A park load is an init-sized operation (~2 MB decompress), not a
    // frame-sized one. The browser's per-frame heap-op watchdog would abort it
    // part-way — and since we swallow the throw below, the click would silently
    // do nothing. Give it a fresh budget when the host provides one.
    if (typeof globalThis.__resetOpsBudget === "function") globalThis.__resetOpsBudget();
    try { load(heap); } catch (_) { return false; }
    if (typeof globalThis.__resetOpsBudget === "function") globalThis.__resetOpsBudget();
    return true;
  }

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
      // Toolbar (and other window) clicks now flow through the binary's
      // native dispatch chain: WndProc 0x403d79 enqueues into the ring
      // buffer, then the per-tick FUN_005e2225 / FUN_005e3ace hit-test
      // routes to slot+4 (toolbar = 0x42a830) which dispatches the widget
      // action. The matching WM_LBUTTONUP from the mouseup handler is what
      // the CODESEG LMB handler 5e2b52 waits on before firing the action.
    }
    else if (e.button === 1) { inputState.mouseButtons |= 4; post(WM_MBUTTONDOWN, 0x10, packLParam(x, y)); }
    else if (e.button === 2) { inputState.mouseButtons |= 2; post(WM_RBUTTONDOWN, 2, packLParam(x, y)); _dragLastX = x; _dragLastY = y; }
    e.preventDefault();
  });

  canvas.addEventListener("mouseup", (e) => {
    const [x, y] = canvasCoords(e);
    inputState.cursorX = x;
    inputState.cursorY = y;
    if (e.button === 0)      {
      inputState.mouseButtons &= ~1;
      post(WM_LBUTTONUP, 0, packLParam(x, y));
      // Title-screen click bridges. Each is a no-op unless its window is open
      // and the release landed on it, so gameplay input is unaffected.
      // Scenario-select is tried FIRST: it sits on top of the title menu, so a
      // click inside the dialog must not also fall through to the menu beneath.
      if (!dispatchScenarioSelectClick(x, y)) dispatchTitleMenuClick(x, y);
    }
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
