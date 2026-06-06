// Gameplay smoke/perf probe. Boots into gameplay (skipFadeIn + skipTitleIntro),
// runs TICKS gameplay ticks, and reports per-tick timing (flagging any tick that
// hangs/slows). Run plain to time, or under `node --prof tools/probe-gameplay.js`
// then `node --prof-process isolate-*.log` to find the hot function of a runaway
// tick (read the [JavaScript] section). Bound a hang with the perl-alarm wrapper:
//   perl -e 'alarm shift; exec @ARGV' 50 node --prof tools/probe-gameplay.js
//
// Background: the post-skipTitleIntro gameplay tick used to never return; the
// perf wall was a chain of u16-as-u32 / wrong-field translator bugs causing
// linked-list-walk runaways (4533d0 sprite-sound, 444927 tile-grid relink, ...).
// Each is found by profiling the hot FUN_ and diffing it vs its C source.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, skipTitleIntro } = await import(resolve(ROOT, "runtime/harness.js"));
const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {}
skipFadeIn(r.heap); skipTitleIntro(r.heap);
process.stdout.write("boot done; gameplay ticks:\n");

const TICKS = parseInt(process.env.TICKS || "300", 10);
let slow = 0, maxms = 0;
for (let i = 0; i < TICKS; i++) {
  const t = performance.now();
  try { r.runTick(); } catch (e) { process.stdout.write(`tick ${i} ERR ${e.message}\n`); }
  const ms = performance.now() - t;
  if (ms > maxms) maxms = ms;
  if (ms > 100) { slow++; process.stdout.write(`SLOW tick ${i}: ${ms | 0}ms\n`); }
  else if (i % 50 === 0) process.stdout.write(`tick ${i}: ${ms | 0}ms\n`);
}
process.stdout.write(`DONE ${TICKS} ticks; slow(>100ms)=${slow}; max=${maxms | 0}ms\n`);
