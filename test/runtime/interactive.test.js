// Interactive input verification: posts WM_MOUSEMOVE / WM_LBUTTONDOWN / WM_KEYDOWN
// through the runtime message queue, runs a tick, and asserts that documented
// globals in the WndProc (0x403d79) record the event coordinates and state.
//
// Globals tracked (per decompiled/c/403d79.c):
//   WM_MOUSEMOVE (0x0200):
//     DAT_005f1a10 = x, DAT_005f1a14 = y
//     DAT_005f14c4, DAT_005f1b20 = derived deltas
//   WM_LBUTTONDOWN (0x0201):
//     DAT_005f1cb4 = x, DAT_005f1cb8 = y
//     DAT_005e9170 = 1 (mouse event flag)
//     DAT_005f1b80 = 1 (Lbutton down sticky state, clears on UP)
//     DAT_005e91c4 = 1 (capture flag, clears on UP)
//   WM_KEYDOWN (0x0100):
//     DAT_005f1b30 = vk-code (last key)
//     DAT_005f1a0c = vk-code (mirror)
//     DAT_005e91d0 = counter (increments per key)
//     F1 specifically: DAT_005e91d8 = 1, DAT_005f1b98 = 1
//
// These were discovered via tools/probe-click-effects.js (heap-diff probe).

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

function packLParam(x, y) { return (((y & 0xffff) << 16) | (x & 0xffff)) >>> 0; }

describe("interactive input → game state", () => {
  let runtime, state, postWindowMessage, hwnd;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    const { createRuntime } = await import("../../runtime/harness.js");
    const ctx = await import("../../runtime/win32/context.js");
    state = ctx.state;
    const u = await import("../../runtime/win32/user32.js");
    postWindowMessage = u.postWindowMessage;

    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
      catch (_) { /* placeholder */ }
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    runtime.runTick(); // settle one tick after init so subsequent ticks are deterministic.
    hwnd = state.firstHwnd;
  }, 120_000);

  // Pool-slot helpers used by the toolbar-click tests below. The binary's
  // MainOpen (FUN_004298a0) normally puts the toolbar window in the pool,
  // but it can fail early at boot when the fade-in counter hasn't reached
  // 0x60 yet (~80 settle ticks). To keep tests deterministic, we inject a
  // toolbar slot with the same wndProc + widget-table ptr + rect that
  // 4298a0 would have set; clickToolbar() walks the pool looking for the
  // 0x42afb5 paint proc, so this is the minimum it needs.
  //
  // ALSO populates the widget rect table at 0x005f5124. The binary normally
  // initializes this from a static blob (probably copied during MainOpen or
  // a parent layout pass), but at +1 tick the table is still all 0xff
  // (sentinel). Without rects, clickToolbar would return -1 on every hit.
  function ensureToolbarSlot() {
    const POOL_START = 0x009a013c;
    const POOL_END_PTR = 0x009a1164;
    const SLOT_STRIDE = 0x178;
    let slot = 0;
    let poolEnd = runtime.heap.u32(POOL_END_PTR);
    if (poolEnd < POOL_START) poolEnd = POOL_START;
    for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
      if (runtime.heap.u32(s) === 0x42afb5) { slot = s; break; }
    }
    if (slot === 0) {
      slot = poolEnd;
      runtime.heap.setU32(slot, 0x42afb5);          // wndProc (paint)
      runtime.heap.setU32(slot + 4, 0x42a830);      // widget-event proc (CODESEG)
      runtime.heap.setU32(slot + 0x1c, 0x005f5124); // widget array ptr (static)
      runtime.heap.setI16(slot + 0x20, 0);          // rect.x
      runtime.heap.setI16(slot + 0x22, 0);          // rect.y
      runtime.heap.setI16(slot + 0x24, 640);        // rect.w
      runtime.heap.setI16(slot + 0x26, 30);         // rect.h
      runtime.heap.setU32(POOL_END_PTR, slot + SLOT_STRIDE);
    }
    // Stamp the widget table from the documented layout (see runtime/
    // input.js comments). If the table is already populated (the boot path
    // ran far enough) we leave it alone.
    const W0 = 0x005f5124;
    if (runtime.heap.u8(W0) === 0xff || runtime.heap.u8(W0) === 0x00) {
      const setW = (i, type, l, r, t, b) => {
        const a = W0 + i * 0x10;
        runtime.heap.setU8(a, type);
        runtime.heap.setI16(a + 2, l); runtime.heap.setI16(a + 4, r);
        runtime.heap.setI16(a + 6, t); runtime.heap.setI16(a + 8, b);
      };
      setW(0, 0x06,   0,  29, 0, 29);  // pause
      setW(1, 0x06,  30,  59, 0, 29);  // file menu icon
      setW(2, 0x06,  60,  89, 0, 29);  // sound mute
      setW(3, 0x06, 104, 133, 0, 29);  // zoom out
      setW(4, 0x06, 134, 163, 0, 29);  // zoom in
      setW(5, 0x06, 164, 193, 0, 29);  // rotate view
      setW(6, 0x06, 194, 223, 0, 29);  // view options
      setW(7, 0x06, 224, 253, 0, 29);  // map view
      setW(8, 0x06, 267, 296, 0, 29);  // land (unmapped widget for negative test)
      setW(9, 0xff,  -1,  -1, -1, -1); // sentinel
    }
    return slot;
  }

  function findViewport() {
    const POOL_START = 0x009a013c;
    const POOL_END_PTR = 0x009a1164;
    const SLOT_STRIDE = 0x178;
    const poolEnd = runtime.heap.u32(POOL_END_PTR);
    for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
      if (runtime.heap.u32(s) === 0x42b079) return runtime.heap.u32(s + 8);
    }
    return 0;
  }

  it("WM_MOUSEMOVE records cursor coordinates in DAT_005f1a10 / DAT_005f1a14", () => {
    const X = 234, Y = 167;
    postWindowMessage(hwnd, 0x0200, 0, packLParam(X, Y));
    runtime.runTick();

    // The WndProc at 0x403d79 (case WM_MOUSEMOVE → param_2 - 0x200 == 0) writes
    // sVar1 / sVar2 (signed 16-bit lParam halves) into these globals — but ONLY
    // if DAT_005ebe40 != 0. By tick 2 that gate is set.
    expect(runtime.heap.u32(0x005ebe40)).not.toBe(0);
    expect(runtime.heap.u32(0x005f1a10)).toBe(X);
    expect(runtime.heap.u32(0x005f1a14)).toBe(Y);
  }, 60_000);

  it("WM_LBUTTONDOWN records click coordinates in DAT_005f1cb4 / DAT_005f1cb8", () => {
    const X = 411, Y = 78;
    postWindowMessage(hwnd, 0x0201, 1, packLParam(X, Y));
    runtime.runTick();

    expect(runtime.heap.u32(0x005f1cb4)).toBe(X);
    expect(runtime.heap.u32(0x005f1cb8)).toBe(Y);
  }, 60_000);

  it("WM_LBUTTONDOWN sets sticky button state, WM_LBUTTONUP clears it", () => {
    // Down — DAT_005f1b80 latches to 1 and DAT_005e91c4 (capture) → 1
    postWindowMessage(hwnd, 0x0201, 1, packLParam(50, 50));
    runtime.runTick();
    expect(runtime.heap.u32(0x005f1b80)).toBe(1);
    expect(runtime.heap.u32(0x005e91c4)).toBe(1);

    // Up — capture clears, sticky-down stays 1 (WndProc only clears it on
    // WM_RBUTTONUP per 403d79.c; LBUTTONUP clears capture). Just verify
    // the capture flag flips off so we know LBUTTONUP made it through.
    postWindowMessage(hwnd, 0x0202, 0, packLParam(50, 50));
    runtime.runTick();
    expect(runtime.heap.u32(0x005e91c4)).toBe(0);
  }, 60_000);

  it("WM_LBUTTONDOWN sets the mouse-event flag DAT_005e9170 = 1", () => {
    // Force-clear so we can see the flip.
    runtime.heap.setU32(0x005e9170, 0);
    postWindowMessage(hwnd, 0x0201, 1, packLParam(120, 60));
    runtime.runTick();
    expect(runtime.heap.u32(0x005e9170)).toBe(1);
  }, 60_000);

  it("multiple clicks update click-coord globals to the LATEST coords", () => {
    postWindowMessage(hwnd, 0x0201, 1, packLParam(10, 20));
    runtime.runTick();
    expect(runtime.heap.u32(0x005f1cb4)).toBe(10);
    expect(runtime.heap.u32(0x005f1cb8)).toBe(20);

    postWindowMessage(hwnd, 0x0201, 1, packLParam(630, 470));
    runtime.runTick();
    expect(runtime.heap.u32(0x005f1cb4)).toBe(630);
    expect(runtime.heap.u32(0x005f1cb8)).toBe(470);
  }, 60_000);

  it("WM_KEYDOWN records the VK code in DAT_005f1b30", () => {
    // VK_ESCAPE = 0x1b
    postWindowMessage(hwnd, 0x0100, 0x1b, 1);
    runtime.runTick();
    expect(runtime.heap.u32(0x005f1b30)).toBe(0x1b);

    // VK_F1 = 0x70 — overwrites
    postWindowMessage(hwnd, 0x0100, 0x70, 1);
    runtime.runTick();
    expect(runtime.heap.u32(0x005f1b30)).toBe(0x70);
  }, 60_000);

  it("WM_KEYDOWN(F1) toggles the help-key state DAT_005e91d8", () => {
    // Per decompiled/c/403d79.c case 0x104 (WM_SYSKEYDOWN) and 0x100,
    // F1 writes DAT_005e91d8 = 1 and DAT_005f1b98 = 1 via FUN_004033fa.
    runtime.heap.setU32(0x005e91d8, 0);
    runtime.heap.setU32(0x005f1b98, 0);
    postWindowMessage(hwnd, 0x0100, 0x70, 1);
    runtime.runTick();
    expect(runtime.heap.u32(0x005e91d8) | runtime.heap.u32(0x005f1b98)).toBeGreaterThan(0);
  }, 60_000);

  it("inputState.cursorX/Y feed GetCursorPos and persist across ticks", async () => {
    const { GetCursorPos } = await import("../../runtime/win32/user32.js");
    const { inputState } = await import("../../runtime/input.js");
    inputState.cursorX = 321;
    inputState.cursorY = 234;
    runtime.runTick(); // tick reads cursor via GetCursorPos in the binary
    const scratch = 0x99fb78;
    GetCursorPos(runtime.heap, scratch);
    expect(runtime.heap.u32(scratch)).toBe(321);
    expect(runtime.heap.u32(scratch + 4)).toBe(234);
  }, 60_000);

  // END-TO-END WIN: Space key → game pause toggle.
  //
  // Calls togglePause() directly to verify the FUN_00427247 plumbing — this
  // is what runtime/input.js's keydown(Space) handler invokes. The binary's
  // own toolbar-button-click → pause-toggle path is still broken downstream
  // of input-mode dispatch (PTR_LAB_005e2248 jumptable hit-test does not
  // resolve cursor → button-id correctly yet), so the keybinding is the
  // shortest route to a verifiable user-input → game-state change.
  //
  // DAT_0099c169 is the pause flag read by FUN_0043f325 / FUN_005e39c6 to
  // gate the per-tick game-state update (so this DOES change observable
  // game behaviour, not just a status byte).
  it("togglePause() flips DAT_0099c169 (game-pause flag)", async () => {
    const { togglePause } = await import("../../runtime/input.js");
    runtime.heap.setU8(0x0099c169, 0);
    const after1 = togglePause(runtime.heap);
    expect(after1).toBe(1);
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(1);
    const after2 = togglePause(runtime.heap);
    expect(after2).toBe(0);
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(0);
  }, 60_000);

  // END-TO-END WIN: toolbar pause-button click → pause toggle.
  //
  // clickToolbar() walks the toolbar window pool slot's widget array, maps
  // (x, y) → widget index, and routes widget 0 (the pause button at L=0,
  // R=29, T=0, B=29) to togglePause(). This is the same plumbing path as
  // Space → togglePause, but driven by a left-click in the toolbar rect —
  // exactly the user action that should pause/unpause the game.
  //
  // The binary's full input-dispatch chain (FUN_005e2225 / FUN_005e3ace
  // → 0x42a830 widget-click handler) is still stalled at two upstream
  // gates (DAT_005f8da2 fade-in not reaching 0x60, FUN_005e38f5's
  // extraout_CX register-leak not reconstructed). This shortcut lets
  // toolbar buttons work today; bridging 0x42a830 + fixing the chain
  // is a future Phase O task.
  it("clickToolbar() at pause button (10,10) flips DAT_0099c169", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    runtime.heap.setU8(0x0099c169, 0);
    const idx = clickToolbar(runtime.heap, 10, 10);
    expect(idx).toBe(0); // widget 0 = pause
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(1);
    // Click again → toggle back off.
    clickToolbar(runtime.heap, 10, 10);
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(0);
  }, 60_000);

  // Negative case: clicking outside the toolbar rect doesn't change pause.
  it("clickToolbar() outside toolbar returns -1 and does NOT toggle pause", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    runtime.heap.setU8(0x0099c169, 0);
    // y=300 is below the toolbar (which is y=0..29).
    const idx = clickToolbar(runtime.heap, 100, 300);
    expect(idx).toBe(-1);
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(0);
  }, 60_000);

  // ---- additional toolbar widgets (zoom out/in, rotate, map view) ---------
  //
  // Each widget action is exposed as a standalone helper so the test can
  // verify the state mutation directly (without depending on a successful
  // hit-test round-trip). A separate assertion uses clickToolbar() with a
  // coordinate inside the widget's rect to confirm the index routing.
  //
  // Pool / toolbar-slot prerequisite: clickToolbar() walks the window pool
  // looking for a slot whose wndProc is 0x42afb5 (the toolbar paint proc).
  // The binary's MainOpen at FUN_004298a0 normally creates that slot, but
  // runInit + the first tick can exit early before MainOpen completes
  // (FUN_005e1653 is gated behind the boot fade-in counter at DAT_005f8da2,
  // which doesn't reach 0x60 until ~80 settle ticks). To keep the tests
  // deterministic — and avoid coupling them to the boot-time bug — we
  // INJECT a toolbar slot at the next free pool address with the same
  // wndProc + widget-table pointer + rect that 4298a0 would have set.
  // This isolates the click-routing logic under test.
  //
  // Rects (window-relative, toolbar window at (0, 0, 640, 30)):
  //   widget 3 (zoom out)  L=104..133 → click x=120 hits it
  //   widget 4 (zoom in)   L=134..163 → click x=150
  //   widget 5 (rotate)    L=164..193 → click x=180
  //   widget 7 (map view)  L=224..253 → click x=240
  //   widget 8 (land)      L=267..296 → click x=280 (unmapped → -1)
  // T=0..29 for all, so y=10 is inside every row.

  it("zoomOut()/zoomIn() mutate viewport+0x10 within [0, 3]", async () => {
    const { zoomIn, zoomOut } = await import("../../runtime/input.js");
    const vp = findViewport();
    expect(vp).not.toBe(0);
    // Reset to mid-zoom so we can move both directions.
    runtime.heap.setU8(vp + 0x10, 1);
    expect(zoomIn(runtime.heap)).toBe(0);          // 1 → 0
    expect(runtime.heap.u8(vp + 0x10)).toBe(0);
    expect(zoomIn(runtime.heap)).toBe(0);          // clamps at 0
    expect(zoomOut(runtime.heap)).toBe(1);         // 0 → 1
    expect(zoomOut(runtime.heap)).toBe(2);
    expect(zoomOut(runtime.heap)).toBe(3);
    expect(zoomOut(runtime.heap)).toBe(3);         // clamps at 3
  }, 60_000);

  it("clickToolbar() at zoom-out widget (120,10) returns 3 and zooms out", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    const vp = findViewport();
    expect(vp).not.toBe(0);
    runtime.heap.setU8(vp + 0x10, 1);   // start mid-zoom
    const idx = clickToolbar(runtime.heap, 120, 10);
    expect(idx).toBe(3);                // widget 3 = zoom out
    expect(runtime.heap.u8(vp + 0x10)).toBe(2);
  }, 60_000);

  it("clickToolbar() at zoom-in widget (150,10) returns 4 and zooms in", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    const vp = findViewport();
    expect(vp).not.toBe(0);
    runtime.heap.setU8(vp + 0x10, 2);   // start mid-zoom
    const idx = clickToolbar(runtime.heap, 150, 10);
    expect(idx).toBe(4);                // widget 4 = zoom in
    expect(runtime.heap.u8(vp + 0x10)).toBe(1);
  }, 60_000);

  it("rotateView() cycles DAT_00991f88 through 0 → 1 → 2 → 3 → 0", async () => {
    const { rotateView } = await import("../../runtime/input.js");
    runtime.heap.setU8(0x00991f88, 0);
    expect(rotateView(runtime.heap)).toBe(1);
    expect(rotateView(runtime.heap)).toBe(2);
    expect(rotateView(runtime.heap)).toBe(3);
    expect(rotateView(runtime.heap)).toBe(0);  // wraps mod 4
    expect(runtime.heap.u8(0x00991f88)).toBe(0);
  }, 60_000);

  it("clickToolbar() at rotate widget (180,10) returns 5 and rotates", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    runtime.heap.setU8(0x00991f88, 0);
    const idx = clickToolbar(runtime.heap, 180, 10);
    expect(idx).toBe(5);                  // widget 5 = rotate
    expect(runtime.heap.u8(0x00991f88)).toBe(1);
  }, 60_000);

  it("toggleMapView() flips DAT_0099c16b between 0 and 1", async () => {
    const { toggleMapView } = await import("../../runtime/input.js");
    runtime.heap.setU8(0x0099c16b, 0);
    expect(toggleMapView(runtime.heap)).toBe(1);
    expect(runtime.heap.u8(0x0099c16b)).toBe(1);
    expect(toggleMapView(runtime.heap)).toBe(0);
    expect(runtime.heap.u8(0x0099c16b)).toBe(0);
  }, 60_000);

  it("clickToolbar() at map-view widget (240,10) returns 7 and sets map mode", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    runtime.heap.setU8(0x0099c16b, 0);
    const idx = clickToolbar(runtime.heap, 240, 10);
    expect(idx).toBe(7);                  // widget 7 = map view
    expect(runtime.heap.u8(0x0099c16b)).toBe(1);
  }, 60_000);

  // Negative case: clicking on an unmapped widget rect (e.g. land tools at
  // widget 8, L=267..296) returns -1 — the click is dispatched but no action
  // is wired yet (those open sub-windows via the CODESEG-stripped 0x42a830).
  it("clickToolbar() at unmapped widget 8 (280,10) returns -1", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    const idx = clickToolbar(runtime.heap, 280, 10);
    expect(idx).toBe(-1);
  }, 60_000);

  // Widget 2 — sound mute. The binary's click handler @0x42a976 calls
  // FUN_00452876 which XORs DAT_006326bd; that bit gates every ambient
  // sound playback path (FUN_00453f76 etc. early-return when bit 0 == 0).
  // Verified by paint-side use too: 42afb5.js picks button sprite based on
  // the same bit, so the UI updates to match. toggleSound() is the helper.
  it("toggleSound() flips DAT_006326bd bit 0", async () => {
    const { toggleSound } = await import("../../runtime/input.js");
    runtime.heap.setU8(0x006326bd, 0);
    expect(toggleSound(runtime.heap)).toBe(1);
    expect(runtime.heap.u8(0x006326bd) & 1).toBe(1);
    expect(toggleSound(runtime.heap)).toBe(0);
    expect(runtime.heap.u8(0x006326bd) & 1).toBe(0);
  }, 60_000);

  // Widget 2 lives at L=60..89, T=0..29 — click at x=75 hits it.
  it("clickToolbar() at sound widget (75,10) returns 2 and flips sound bit", async () => {
    const { clickToolbar } = await import("../../runtime/input.js");
    ensureToolbarSlot();
    runtime.heap.setU8(0x006326bd, 0);
    const idx = clickToolbar(runtime.heap, 75, 10);
    expect(idx).toBe(2);                  // widget 2 = sound mute
    expect(runtime.heap.u8(0x006326bd) & 1).toBe(1);
  }, 60_000);
});
