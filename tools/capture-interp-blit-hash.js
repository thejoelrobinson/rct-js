// Capture the title-screen back-buffer hash with the in-game blit entrypoints
// routed through the x86 interpreter (original rct.exe code) — see
// runtime/native/sprites/_interp_blit.js. This is the ground-truth oracle for
// β2: which JS blit chain (old translated, or decoder.js) matches the binary?
//
// Requires the 4 shims (ported/auto/9b{438b,4457,4660,4911}.js) to be routing
// through _interp_blit.js when this runs. Prints the per-tick hashes; compare
// against the committed fixture (old chain) and the decoder.js hashes.
//
// Usage: node tools/capture-interp-blit-hash.js [maxTick]
//   defaults to ticks 1 and 5 (the interpreter is slow; tick 1 alone already
//   adjudicates since the fixture diverges there).

import { bootAndHash } from "./lib/replay-runner.js";

const maxTick = process.argv[2] ? parseInt(process.argv[2], 10) : 5;
const tickSamples = maxTick >= 5 ? [1, 5] : [1];

// bootAndHash overrides Date.now/performance.now for determinism; use hrtime
// (untouched) for real wall timing.
const t0 = process.hrtime.bigint();
const { ticks, surfaceAddr } = await bootAndHash({
  tickSamples,
  log: (m) => process.stderr.write(`[capture-interp] ${m}\n`),
});
const dt = (Number(process.hrtime.bigint() - t0) / 1e9).toFixed(1);

console.log("\n=== INTERPRETER GROUND-TRUTH (original rct.exe blit code) ===");
console.log(`surface 0x${surfaceAddr.toString(16)}  (${dt}s wall)`);
for (const t of tickSamples) console.log(`  tick ${t}: ${ticks[t]}`);
const s = globalThis.__interpBlitStats;
if (s) {
  console.log(`\noracle stats: ${s.calls} blit calls, ${s.errors} errored (${(100*s.errors/Math.max(1,s.calls)).toFixed(1)}%), ${s.steps.toLocaleString()} interp steps`);
  console.log(`  by addr: ${Object.entries(s.byAddr).map(([a,n]) => `0x${(+a).toString(16)}=${n}`).join("  ")}`);
  if (s.lastErr) console.log(`  last error: ${s.lastErr}`);
}
console.log("\nCompare vs:");
console.log("  old translated chain (fixture): tick1=0x1c8c8fb3  tick5=0x7442901b");
console.log("  decoder.js (β2 shims):          tick1=0x205d7c22  tick5=0x5262de72");
