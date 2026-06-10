#!/usr/bin/env node
// Dual-run heap-hash oracle for painter hand-ports.
//
// Verifies a JS painter port against the x86 interpreter by running the SAME
// deterministic scenario-play soak twice (separate processes — the runtime
// holds module-global state) and comparing a full-heap FNV-1a hash after
// every tick:
//
//   FORCE_INTERP=432204 TICKS=6 node tools/painter-port-oracle.mjs   # run A
//   TICKS=6 node tools/painter-port-oracle.mjs                       # run B
//
// FORCE_INTERP sets the port's force-interp switch (e.g.
// globalThis.__forceInterp432204) so the original binary bytes run through
// the interpreter instead of the JS body. The hash covers all of memory
// EXCEPT the top 64 KB stack region the bridge cpu uses (the interpreter
// writes RET_SENTINELs / locals there; the JS body doesn't — both are
// invisible to the binary's own logic).
//
// Equal hash sequences ⇒ the port's heap writes AND its register write-back
// are byte-indistinguishable from the binary across every painter call in
// the soak (any register divergence would change a subsequent interpreter
// write). This is the interpreter-diff gate of CLAUDE.md's two-step rule,
// applied at whole-heap granularity — it sidesteps scenario seeding
// entirely, like the title true-accuracy gate.
//
// NOTE: a hash match proves equivalence over the paths the soak exercises.
// Check call counts (printed per run) to confirm the port actually ran.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const FORCE = (process.env.FORCE_INTERP || "").split(",").filter(Boolean);
for (const f of FORCE) globalThis[`__forceInterp${f}`] = true;

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch (e) { process.stderr.write(`runInit: ${e.message}\n`); }
try { r.runTick(); } catch (e) { process.stderr.write(`tick0: ${e.message}\n`); }
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);

// FNV-1a over memory minus the bridge cpu's carved 64 KB stack at the top.
function heapHash(bytes) {
  const end = bytes.byteLength - 64 * 1024;
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < end; i++) {
    h = (h ^ bytes[i]) >>> 0;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

const TICKS = parseInt(process.env.TICKS || "6", 10);
globalThis.__fnSteps = new Map();
console.log(`mode=${FORCE.length ? "FORCE_INTERP:" + FORCE.join(",") : "JS-port"} ticks=${TICKS}`);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { process.stderr.write(`tick ${i} ERR ${e.message}\n`); }
  console.log(`tick ${i} hash=${heapHash(r.heap.bytes).toString(16).padStart(8, "0")}`);
}
// Call-count visibility: confirm the ported addresses actually fired.
const interesting = [0x432214, 0x4323b8, 0x43256d, 0x432727, 0x5dff38, 0x444e08, 0x42094b, 0x420502];
for (const a of interesting) {
  const v = globalThis.__fnSteps.get(a);
  if (v) console.log(`runFunction 0x${a.toString(16)}: calls=${v.calls} steps=${v.steps}`);
}
