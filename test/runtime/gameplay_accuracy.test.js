// Gameplay TRUE accuracy gate (Workstream B) — the scenario-play sibling of
// title_accuracy.test.js.
//
// The fixture test/fixtures/gameplay-truth-surface.bin is the raw 8bpp
// GAME-BACK surface the x86 interpreter produces running raw rct.exe's
// blit chain AND its own terrain/element painters (every JS-port eip hook
// cleared) over the SAME JS-simulated game state and boot: runInit + tick +
// skipFadeIn + enterScenarioPlay + 2 ticks. Regenerate with
// `node tools/capture-gameplay-truth.js` (MODE=interp default) — only ever
// alongside interpreter evidence, per the two-step rule.
//
// MAX_DIVERGENCE is a RATCHET: it must only ever go DOWN. Measured starting
// value (2026-06-11, first capture): 0 — the title campaign's blit-chain
// fixes carry over byte-exactly to this gameplay frame (4,812 interp-routed
// blits incl. the in-game terrain + peep sprites; idx=105 distinct palette
// entries). Never raise it to make the test pass.
//
// Coverage caveat: one frame of one scenario. Paths this frame does not
// draw (e.g. vehicles of every type, weather overlays, remap-dispatch blit
// variants beyond what the panned viewport contains) are NOT proven by a
// green run here — extend the capture (more ticks / different pans) before
// relying on it for such paths.
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const MAX_DIVERGENCE = 0;
const TICKS = 2;   // must match the capture (tools/capture-gameplay-truth.js)

describe("gameplay accuracy vs original binary", () => {
  it("JS scenario-play render matches the interpreter ground truth (ratchet → 0)", async () => {
    let _t = 1700000000000; Date.now = () => ++_t;
    if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
    globalThis._renderTrace = () => {};

    const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../../runtime/harness.js");
    const { state } = await import("../../runtime/win32/context.js");

    const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
    const vfs = new Map();
    for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
    for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
    const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
    try { r.runInit(); } catch {} try { r.runTick(); } catch {}
    skipFadeIn(r.heap);
    enterScenarioPlay(r.heap);

    const W = 640, H = 480, N = W * H;
    let cands = [];
    for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
    const surf = Math.max(...cands);
    for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch {} }

    const truth = readFileSync(resolve(ROOT, "test/fixtures/gameplay-truth-surface.bin"));
    expect(truth.length).toBe(N);

    let diff = 0;
    for (let i = 0; i < N; i++) if (r.heap.u8(surf + i) !== truth[i]) diff++;

    const pct = (100 * (1 - diff / N)).toFixed(2);
    console.log(`gameplay accuracy vs binary: ${pct}% (${diff}/${N} divergent px; ratchet ceiling ${MAX_DIVERGENCE}; goal 0)`);

    expect(diff).toBeLessThanOrEqual(MAX_DIVERGENCE);
  });
});
