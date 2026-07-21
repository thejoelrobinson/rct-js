// Dual-soak heap-hash differential: run TICKS gameplay ticks with an optional
// __forceInterp<hex> toggle, then FNV-1a hash the whole heap. Byte-identical
// hashes between FORCE=1 and FORCE=0 runs prove a wired JS port is
// production-equivalent on the live path.
//   FORCE=__forceInterp439178 TICKS=30 node tools/_soakhash.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
// SCENARIO=<basename.sc4> — soak a different retail park (ADDENDUM 84).
if (process.env.SCENARIO) globalThis.__scenarioFile = process.env.SCENARIO.toLowerCase();
if (process.env.FORCE) globalThis[process.env.FORCE] = true;
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
if (process.env.SCENARIO) { const f = process.env.SCENARIO.toLowerCase(); try { vfs.set(f, readFileSync(resolve(ROOT, "web/assets", process.env.SCENARIO))); } catch { try { vfs.set(f, readFileSync(resolve(ROOT, "web/assets", process.env.SCENARIO.toUpperCase()))); } catch (e) { console.log("SCENARIO load failed: " + e.message); process.exit(1); } } }
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs, exeBytes: readFileSync(resolve(ROOT, "binary/rct.exe")) });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap); enterScenarioPlay(r.heap);
// ROTATE=n — rotate the camera n times before the soak via the binary's real
// rotate handler FUN_004340f5 (esi = main world window; see _lockstep-auto.mjs).
// Both legs of a FORCE on/off pair must use the same ROTATE.
const ROTATE = parseInt(process.env.ROTATE || "0", 10) & 3;
if (ROTATE) {
  const { getEipHook, setEipHook, clearEipHook, runFunction } = await import("../harness/x86.js");
  let cpu = null;
  const CAP = 0x5da274;
  const prevCap = getEipHook(CAP);
  setEipHook(CAP, function (c) { cpu = c; return prevCap ? prevCap(c) : undefined; });
  try { r.runTick(); } catch {}
  if (prevCap) setEipHook(CAP, prevCap); else clearEipHook(CAP);
  let mainWin = 0;
  const listEnd = r.heap.u32(0x009a1164) >>> 0;
  for (let w = 0x009a013c; w < listEnd; w += 0x178) {
    if (r.heap.u8(w + 0x174) === 0) { mainWin = w >>> 0; break; }
  }
  if (!cpu || !mainWin) { console.log(`ROTATE: FAILED (cpu=${!!cpu} mainWin=0x${mainWin.toString(16)})`); process.exit(1); }
  const stackTop = (r.heap.bytes.byteLength - 0x800) >>> 0;
  for (let i = 0; i < ROTATE; i++) {
    cpu.regs.esi = mainWin;
    try { runFunction(cpu, 0x004340f5, { stackTop, limit: 50_000_000 }); }
    catch (e) { console.log(`ROTATE: rotate ${i} threw ${(e.message || e).toString().slice(0, 80)}`); }
  }
  try { r.runTick(); } catch {}
  console.log(`ROTATE: rotated ${ROTATE}x, [0x991f88] = ${r.heap.u32(0x00991f88)}`);
}
// POKE="addr=val[/size],..." — craft heap state before the soak (both legs of a
// FORCE on/off pair must use the same POKE). E.g. POKE="991f88=1/4" = camera rot 1.
for (const p of (process.env.POKE || "").split(",").filter((s) => s.length)) {
  const [lhs, rhs] = p.split("=");
  const [valStr, szStr] = rhs.split("/");
  const a = parseInt(lhs, 16) >>> 0, v = parseInt(valStr, 16) >>> 0, sz = szStr ? parseInt(szStr, 10) : 1;
  if (sz === 4) r.heap.setU32(a, v); else if (sz === 2) r.heap.setU16(a, v & 0xffff); else r.heap.setU8(a, v & 0xff);
  console.log(`  POKE [0x${a.toString(16)}] = 0x${v.toString(16)} (${sz}B)`);
}
const TICKS = parseInt(process.env.TICKS || "30", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} threw: ${(e.message||e).toString().slice(0,100)}`); } }
const b = r.heap.bytes;
let h = 0x811c9dc5;
for (let i = 0; i < b.byteLength - 64 * 1024; i++) { h ^= b[i]; h = Math.imul(h, 0x01000193); }
console.log(`${process.env.FORCE || "(js)"} TICKS=${TICKS} hash=${(h >>> 0).toString(16)}`);
