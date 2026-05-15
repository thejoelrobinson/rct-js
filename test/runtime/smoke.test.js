// Browser-flow smoke test: simulates web/main-native.js sequence in node.
// Boots runtime, simulates mouse/keyboard input, runs ticks, asserts
// visible content on FRONT.

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

describe("browser-flow smoke test", () => {
  let runtime, state, postWindowMessage, inputState;
  beforeAll(async () => {
    // runInit + first ticks do heavy work (asset load, scenario decompress,
    // painter chain runs). Allow up to 120s.
    globalThis._renderTrace = () => {};
    const { createRuntime } = await import("../../runtime/harness.js");
    const ctx = await import("../../runtime/win32/context.js");
    state = ctx.state;
    const u = await import("../../runtime/win32/user32.js");
    postWindowMessage = u.postWindowMessage;
    const input = await import("../../runtime/input.js");
    inputState = input.inputState;

    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
      catch (e) { /* placeholder */ }
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    // First tick completes init phase 2 (heavy: asset load + scenario decompress).
    // Subsequent ticks run the painter chain including the bridged interpreter
    // for CODESEG painters — slow but functional. Smoke test does just 1 tick
    // to stay under 60s; full perf is a separate concern.
    runtime.runTick();
  }, 90_000);

  it("creates a window with a known WndProc", () => {
    expect(state.firstHwnd).toBeGreaterThan(0);
    expect(state.windows.size).toBeGreaterThanOrEqual(1);
    expect(state.windowClasses.size).toBeGreaterThanOrEqual(1);
  });

  it("renders a non-empty FRONT surface", () => {
    // Find the 640x480 surface with the most non-zero content.
    let best = null, bestCount = 0;
    for (const surf of state.ddrawSurfaces.values()) {
      if (surf.width < 320 || surf.height < 240) continue;
      let nz = 0;
      const len = surf.width * surf.height;
      for (let i = 0; i < len; i += 64) {
        if (runtime.heap.bytes[surf.bytes + i] !== 0) nz++;
      }
      if (nz > bestCount) { best = surf; bestCount = nz; }
    }
    expect(best).not.toBeNull();
    expect(bestCount).toBeGreaterThan(100);
  });

  it("FRONT surface has rich palette content (≥8 distinct indices)", () => {
    let best = null, bestDistinct = 0;
    for (const surf of state.ddrawSurfaces.values()) {
      if (surf.width < 320 || surf.height < 240) continue;
      const dist = new Set();
      const len = surf.width * surf.height;
      for (let i = 0; i < len; i += 64) {
        dist.add(runtime.heap.bytes[surf.bytes + i]);
      }
      if (dist.size > bestDistinct) { best = surf; bestDistinct = dist.size; }
    }
    expect(bestDistinct).toBeGreaterThanOrEqual(8);
  });

  it("processes WM_MOUSEMOVE through DispatchMessageA to WndProc", () => {
    const hwnd = state.firstHwnd;
    let dispatched = 0;
    for (const cls of state.windowClasses.values()) {
      if (!cls.wndProc) continue;
      const orig = state.fnDispatch.get(cls.wndProc);
      if (!orig) continue;
      state.fnDispatch.set(cls.wndProc, function probe(heap, h, m, w, l) {
        if (m === 0x200 || m === 0x201) dispatched++;
        return orig(heap, h, m, w, l);
      });
    }
    postWindowMessage(hwnd, 0x0200, 0, (240 << 16) | 320);
    postWindowMessage(hwnd, 0x0201, 1, (240 << 16) | 320);
    runtime.runTick();
    expect(dispatched).toBeGreaterThan(0);
  }, 60_000);

  it("GetCursorPos returns live cursor coords", async () => {
    inputState.cursorX = 100;
    inputState.cursorY = 50;
    // Call GetCursorPos via the exported function.
    const { GetCursorPos } = await import("../../runtime/win32/user32.js");
    const heap = runtime.heap;
    // Use a known scratch slot — global at 0x99fb78 is a known "scratch" area.
    const scratch = 0x99fb78;
    GetCursorPos(heap, scratch);
    expect(heap.u32(scratch)).toBe(100);
    expect(heap.u32(scratch + 4)).toBe(50);
  });

  it("GetAsyncKeyState reflects keysDown state", async () => {
    inputState.keysDown[0x41] = 1;  // 'A' down
    inputState.keysDown[0x42] = 0;  // 'B' up
    const { GetAsyncKeyState } = await import("../../runtime/win32/user32.js");
    expect(GetAsyncKeyState(runtime.heap, 0x41) & 0x8000).not.toBe(0);
    expect(GetAsyncKeyState(runtime.heap, 0x42) & 0x8000).toBe(0);
    inputState.keysDown[0x41] = 0;
  });

  it("runs 1 more tick without throwing", () => {
    expect(() => {
      runtime.runTick();
    }).not.toThrow();
  }, 60_000);
});
