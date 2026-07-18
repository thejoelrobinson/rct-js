// Diagnose: what does the render pipeline do at a poked camera rotation?
// Counts crossings of the rot-slot painters, 444820, and 439178 (fnDispatch
// wrapping + eip hooks) over TICKS ticks with POKE applied.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { setEipHook, getEipHook } = await import("../harness/x86.js");
const { state } = await import("../runtime/win32/context.js");
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs, exeBytes: readFileSync(resolve(ROOT, "binary/rct.exe")) });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap); enterScenarioPlay(r.heap);
for (const p of (process.env.POKE || "").split(",").filter((s) => s.length)) {
  const [lhs, rhs] = p.split("=");
  const [valStr, szStr] = rhs.split("/");
  const a = parseInt(lhs, 16) >>> 0, v = parseInt(valStr, 16) >>> 0, sz = szStr ? parseInt(szStr, 10) : 1;
  if (sz === 4) r.heap.setU32(a, v); else if (sz === 2) r.heap.setU16(a, v & 0xffff); else r.heap.setU8(a, v & 0xff);
  console.log(`POKE [0x${a.toString(16)}] = 0x${v.toString(16)}`);
}
const counts = new Map();
const bump = (k) => counts.set(k, (counts.get(k) || 0) + 1);
// wrap fnDispatch entries
for (const a of [0x436b50, 0x436bc3, 0x436c3d, 0x436cb3, 0x444820, 0x439178, 0x5d7503]) {
  const orig = state.fnDispatch.get(a);
  if (orig) state.fnDispatch.set(a, (...args) => { bump(`fnDispatch:0x${a.toString(16)}`); return orig(...args); });
  else bump.noop; // note absence below
  if (!orig) console.log(`(no fnDispatch entry for 0x${a.toString(16)})`);
}
// eip hooks (chain to existing)
for (const a of [0x436bc3, 0x436c3d, 0x436cb3, 0x444820, 0x439178]) {
  const prev = getEipHook(a);
  setEipHook(a, (c) => { bump(`eip:0x${a.toString(16)}`); return prev ? prev(c) : undefined; });
}
const TICKS = parseInt(process.env.TICKS || "4", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} threw: ${(e.message||e).toString().slice(0,80)}`); } }
console.log("rot byte now =", r.heap.u8(0x991f88));
for (const [k, v] of [...counts.entries()].sort()) console.log(`${k}: ${v}`);
