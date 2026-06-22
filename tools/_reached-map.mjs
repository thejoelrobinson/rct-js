#!/usr/bin/env node
// Reached-function MAP via the interpreter's own call-edge tracing (ADDENDUM 31
// plan). The interp (harness/x86.js) records call edges into cpu.callEdges when
// set (both direct 0xe8 and indirect 0xff). All interp executions during the soak
// run on the painter-bridge's single cpu, so enabling callEdges on it captures
// every callee the CORRECT (interpreter) execution reaches — the set of functions
// whose production auto-translations actually matter. Cross-refs C-size + @manual
// to rank small + auto candidates for the ADDENDUM 30 fix pattern.
//
//   TICKS=8 node tools/_reached-map.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { getEipHook, setEipHook } = await import("../harness/x86.js");

const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);

// Enable callEdges on the bridge cpu the first time any hook fires (the hook
// receives the cpu). Wrap 0x5dbeeb's hook (fires every tick) to stash the cpu +
// set callEdges; then chain to the original.
// Force the vehicle-update 0x5da274 to run in the interpreter (its hook supports
// __forceInterp5da274) so its WHOLE subtree executes via the interp and records
// callEdges — capturing the JS-dispatch sim functions the harness otherwise can't
// reach. (HOOK env=5dbeeb restores the narrower interp-delegated-only map.)
const HOOK = parseInt(process.env.HOOK || "0x5da274", 16) >>> 0;
// Force the hooked subsystem through the interpreter so its whole subtree records
// callEdges. The painter-bridge gates each on globalThis.__forceInterp<hex>.
globalThis["__forceInterp" + HOOK.toString(16)] = true;
const edges = new Map();
const prod = getEipHook(HOOK);
let cpuRef = null;
setEipHook(HOOK, function (c) {
  if (!c.callEdges) c.callEdges = edges;   // set before the forced-interp run so all edges are captured
  cpuRef = c;
  return prod ? prod(c) : undefined;
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); } }

// Collect distinct callees.
const callees = new Set();
for (const [, inner] of (cpuRef?.callEdges || edges)) for (const [callee] of inner) callees.add(callee >>> 0);

// Cross-ref C-size + @manual.
const rows = [];
for (const a of callees) {
  const hex = a.toString(16).padStart(6, "0");
  let cl = -1; try { cl = readFileSync(resolve(ROOT, "decompiled/c/" + hex + ".c"), "utf8").split("\n").length; } catch {}
  let manual = false; try { manual = readFileSync(resolve(ROOT, "ported/auto/" + hex + ".js"), "utf8").startsWith("// @manual"); } catch {}
  let hasJs = false; try { readFileSync(resolve(ROOT, "ported/auto/" + hex + ".js")); hasJs = true; } catch {}
  rows.push({ hex, cl, manual, hasJs });
}
console.log(`reached callees: ${callees.size} (distinct)`);
const smallAuto = rows.filter((r) => r.hasJs && !r.manual && r.cl > 0 && r.cl <= 60).sort((a, b) => a.cl - b.cl);
console.log(`small auto (<=60 C-lines, not @manual): ${smallAuto.length}`);
console.log(smallAuto.map((r) => `0x${r.hex}(${r.cl})`).join(" "));
console.log("--- medium auto (61..150) ---");
const medAuto = rows.filter((r) => r.hasJs && !r.manual && r.cl > 60 && r.cl <= 150).sort((a, b) => a.cl - b.cl);
console.log(medAuto.map((r) => `0x${r.hex}(${r.cl})`).join(" "));
