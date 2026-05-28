// Per-tick wall-time regression gate.
//
// Boots the runtime the same way the replay test does (createRuntime →
// runInit → priming runTick → skipFadeIn), then measures wall time of 12
// subsequent ticks via process.hrtime.bigint(). Skips the first 2 (init
// noise) and asserts the average of ticks 3-12 stays under 65ms.
//
// Baseline at commit time: ~55ms/tick on the harness machine. 65ms gives
// ~18% headroom for local-dev variance while still catching real
// regressions.
//
// Skipped under CI (process.env.CI === 'true') because CI machine wall
// time is unreliable for absolute perf gates. This test exists to catch
// regressions on developer machines before they land.
//
// Why hrtime.bigint() and not Date.now: tools/lib/replay-runner.js stubs
// Date.now (and performance.now) globally for determinism in the replay
// fixture. We deliberately replicate the boot inline here WITHOUT that
// stub, but hrtime.bigint() is a node-only monotonic clock that nothing
// in the codebase patches, so it's the safer choice either way.

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

function loadVfs() {
  const vfs = new Map();
  for (const n of VFS_FILES) {
    try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
    catch (_) {}
  }
  for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));
  return vfs;
}

const TICKS_TOTAL = 12;
const TICKS_WARMUP = 2;       // skipped from average
const THRESHOLD_MS = 65;
const BASELINE_MS = 55;       // documented baseline for the error message

describe.skipIf(process.env.CI === "true")("per-tick wall-time regression", () => {
  it(`avg ms/tick across ticks ${TICKS_WARMUP + 1}-${TICKS_TOTAL} stays under ${THRESHOLD_MS}ms`, async () => {
    const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");

    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = loadVfs();

    const r = createRuntime({ dataBin, vfs });
    const heap = r.heap;

    try { r.runInit(); } catch (_) {}
    try { r.runTick(); } catch (_) {}  // priming tick (fires 4385d8 lazy init)
    skipFadeIn(heap);

    const samples = [];
    for (let t = 1; t <= TICKS_TOTAL; t++) {
      const t0 = process.hrtime.bigint();
      try { r.runTick(); } catch (_) {}
      const t1 = process.hrtime.bigint();
      samples.push(Number(t1 - t0) / 1e6);  // ns → ms
    }

    const measured = samples.slice(TICKS_WARMUP);
    const avg = measured.reduce((a, b) => a + b, 0) / measured.length;

    // Per-tick samples visible under --reporter=verbose so devs can see
    // what their machine measures.
    console.log(`[perf_regression] per-tick ms (12 ticks):`,
      samples.map((s) => s.toFixed(1)).join(", "));
    console.log(`[perf_regression] avg of ticks ${TICKS_WARMUP + 1}-${TICKS_TOTAL}: ${avg.toFixed(1)}ms (threshold ${THRESHOLD_MS}ms, baseline ~${BASELINE_MS}ms)`);

    expect(avg, `per-tick wall time regression: avg ${avg.toFixed(1)}ms exceeds ${THRESHOLD_MS}ms threshold (current baseline ~${BASELINE_MS}ms)`).toBeLessThan(THRESHOLD_MS);
  }, 60_000);
});
