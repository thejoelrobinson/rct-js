// Tests for the skipFadeIn() runtime helper.
//
// The binary's boot fade-in (DAT_005f8da2 counter, 0x10 → 0x60 over ~80
// ticks) gates the per-tick input/dispatch chain. skipFadeIn() lets
// tests + dev tools bypass it after the first lazy-init tick.
//
// See runtime/harness.js skipFadeIn() docstring and ported/auto/4385d8.js
// lines ~149-176 for the state-machine details.

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

describe("skipFadeIn helper", () => {
  let runtime, skipFadeIn;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    const harness = await import("../../runtime/harness.js");
    skipFadeIn = harness.skipFadeIn;
    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    // Match playability.test.js VFS bootstrap so the scenario auto-load
    // path inside runInit succeeds — fade-in semantics depend on the
    // post-load world state (sprite pool, viewport, etc).
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
    runtime = harness.createRuntime({ dataBin, vfs });
    runtime.runInit();
    // First tick fires the lazy-init block in 4385d8 and sets DAT_005f8da2
    // = 0x10 (the fade-in start state). After this we're "stuck" in fade-in
    // unless something snaps the counter past 0x60.
    runtime.runTick();
  }, 90_000);

  it("export shape: skipFadeIn is a function", () => {
    expect(typeof skipFadeIn).toBe("function");
  });

  it("after first tick, DAT_005f8da2 == 0x10 (fade-in active)", () => {
    expect(runtime.heap.u8(0x005f8da2)).toBe(0x10);
  });

  it("skipFadeIn sets DAT_005f8da2 past the fade-in gate (< 0x10)", () => {
    skipFadeIn(runtime.heap);
    const counter = runtime.heap.u8(0x005f8da2);
    // Post-fade values per ported/auto/4385d8.js lines 172-174: 1 or 2.
    expect(counter).toBeLessThan(0x10);
    expect([1, 2]).toContain(counter);
  });

  it("the post-skip value matches DAT_00628ce0 semantics (1 if zero, 2 otherwise)", () => {
    // skipFadeIn was called in the previous test; counter is already set.
    // Re-run it to make the assertion deterministic relative to the
    // current heap state.
    skipFadeIn(runtime.heap);
    const expected = runtime.heap.u32(0x00628ce0) !== 0 ? 2 : 1;
    expect(runtime.heap.u8(0x005f8da2)).toBe(expected);
  });

  it("one more tick after skip succeeds without exceptions", () => {
    // Cap at one additional tick — there's an unrelated known bug where
    // runTick() hangs past ~2 iterations (another agent is investigating).
    // This test should not exceed that ceiling.
    expect(() => runtime.runTick()).not.toThrow();
  }, 30_000);
});
