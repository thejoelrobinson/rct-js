// TRUE accuracy gate. Unlike title_replay.test.js (which hashes whatever the
// current JS chain emits — a self-referential baseline that goes red when a
// rewrite gets MORE correct), this test compares the JS render byte-for-byte
// against the ORIGINAL BINARY's output.
//
// The fixture test/fixtures/title-truth-surface-tick1.bin is the raw 8bpp
// back-buffer the x86 interpreter produces running raw rct.exe through the
// in-game blit chain (regenerate with `node tools/capture-truth-surface.js`).
// So a passing assertion here means "the JS render matches the actual binary",
// which is the property we actually care about.
//
// MAX_DIVERGENCE is a RATCHET: the goal is 0 (byte-exact). It must only ever go
// DOWN. As blit-chain bugs are fixed against the single-sprite isolation oracle
// (tools/_beta2-isolate.js), lower this toward 0. Never raise it to make the
// test pass — that would be blessing a regression.
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// Current known gap between the pure-JS blit chain and the binary, in diverging
// palette-index pixels out of 307200. Goal: 0.  History: shattered(~150k) →
// 14606 (96.10% colour) after 10 oracle-gated fixes. Remaining tail is isolated
// entirely to the RLE inner blitter ported/auto/9b4911.js.
const MAX_DIVERGENCE = 14606;

describe("title-screen accuracy vs original binary", () => {
  it("JS tick-1 render matches the interpreter ground truth (ratchet → 0)", async () => {
    let _t = 1700000000000; Date.now = () => ++_t;
    if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
    globalThis._renderTrace = () => {};

    const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");
    const { state } = await import("../../runtime/win32/context.js");

    const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
    const vfs = new Map();
    for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
    for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
    const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
    try { r.runInit(); } catch {} try { r.runTick(); } catch {} skipFadeIn(r.heap);

    const W = 640, H = 480, N = W * H;
    let cands = [];
    for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
    const surf = Math.max(...cands);
    r.runTick(); // tick 1

    const truth = readFileSync(resolve(ROOT, "test/fixtures/title-truth-surface-tick1.bin"));
    expect(truth.length).toBe(N);

    let diff = 0;
    for (let i = 0; i < N; i++) if (r.heap.u8(surf + i) !== truth[i]) diff++;

    const pct = (100 * (1 - diff / N)).toFixed(2);
    // Surfaced in the test output so the real accuracy number is always visible.
    console.log(`accuracy vs binary: ${pct}% (${diff}/${N} divergent px; ratchet ceiling ${MAX_DIVERGENCE}; goal 0)`);

    expect(diff).toBeLessThanOrEqual(MAX_DIVERGENCE);
  });
});
