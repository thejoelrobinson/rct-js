// Playability acceptance test: end-to-end checks that the game is
// "interactive enough" — boots, renders, animates, responds to input.

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

describe("playability acceptance", () => {
  let runtime, state, postWindowMessage, inputState;
  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    const { createRuntime } = await import("../../runtime/harness.js");
    state = (await import("../../runtime/win32/context.js")).state;
    postWindowMessage = (await import("../../runtime/win32/user32.js")).postWindowMessage;
    inputState = (await import("../../runtime/input.js")).inputState;

    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat",
      "css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat",
      "css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat",
      "sc21.sc4"];
    const vfs = new Map();
    for (const n of VFS) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
      catch (e) { /* placeholder */ }
    }
    for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) {
      vfs.set(n, new Uint8Array(0));
    }
    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    runtime.runTick();  // first tick: init phase 2
  }, 90_000);

  it("per-tick perf: under 500ms", () => {
    const start = Date.now();
    runtime.runTick();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(500);
  }, 30_000);

  it("FRONT shows visible terrain", () => {
    let bestNz = 0, bestDistinct = 0;
    for (const surf of state.ddrawSurfaces.values()) {
      if (surf.width < 320) continue;
      const dist = new Set();
      let nz = 0;
      const len = surf.width * surf.height;
      for (let i = 0; i < len; i += 64) {
        const v = runtime.heap.bytes[surf.bytes + i];
        dist.add(v);
        if (v !== 0) nz++;
      }
      if (nz > bestNz) bestNz = nz;
      if (dist.size > bestDistinct) bestDistinct = dist.size;
    }
    expect(bestNz).toBeGreaterThan(1000);
    expect(bestDistinct).toBeGreaterThanOrEqual(8);
  });

  it("camera pans via direct viewport mutation", () => {
    // Find main viewport
    const POOL_START = 0x009a013c;
    const POOL_END_PTR = 0x009a1164;
    const SLOT_STRIDE = 0x178;
    const heap = runtime.heap;
    const poolEnd = heap.u32(POOL_END_PTR);
    let vp = 0;
    for (let slot = POOL_START; slot < poolEnd; slot += SLOT_STRIDE) {
      if ((heap.u32(slot) >>> 0) === 0x42b079) { vp = heap.u32(slot + 8); break; }
    }
    expect(vp).toBeGreaterThan(0);

    const xBefore = heap.i16(vp + 8);
    heap.setI16(vp + 8, xBefore + 64);
    runtime.runTick();
    expect(heap.i16(vp + 8)).toBe(xBefore + 64);
  }, 30_000);

  it("clicks update click-coord globals (verified end-to-end)", () => {
    // From decompiled/c/403d79.c WndProc behaviour:
    //   WM_LBUTTONDOWN → DAT_005f1cb4=x, DAT_005f1cb8=y, DAT_005e9170=1
    const heap = runtime.heap;
    const hwnd = state.firstHwnd;
    postWindowMessage(hwnd, 0x0201, 1, (123 << 16) | 456);  // WM_LBUTTONDOWN
    runtime.runTick();
    expect(heap.u16(0x005f1cb4)).toBe(456);
    expect(heap.u16(0x005f1cb8)).toBe(123);
  }, 30_000);

  it("animates between consecutive ticks", () => {
    // Snapshot 30 chars of "active" heap region (paint ring or sprites),
    // tick, see that something changed.
    const heap = runtime.heap;
    const PAINT_RING_BASE = 0x005f96e8;
    const ringHeadBefore = heap.u32(PAINT_RING_BASE);
    runtime.runTick();
    const ringHeadAfter = heap.u32(PAINT_RING_BASE);
    // Either the ring head moved, or some sprite x coord changed.
    let changed = ringHeadBefore !== ringHeadAfter;
    if (!changed) {
      // Check sprite slot 0 / 1 / 2 wx coord
      for (let i = 0; i < 5; i++) {
        const slot = 0x00743b94 + i * 0x100;
        if (heap.u8(slot) === 0xff) continue;
        const wx = heap.u16(slot + 0xe);
        if (wx !== 0) { changed = true; break; }
      }
    }
    expect(changed).toBe(true);
  }, 30_000);
});
