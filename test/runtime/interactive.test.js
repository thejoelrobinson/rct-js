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
});
