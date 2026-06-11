#!/usr/bin/env node
// Shared per-call lockstep oracle for the peep stat-decay trio
// 0x442816 / 0x442867 / 0x4428d6 (and, through their thought paths, the
// hand-fixed FUN_00440fe3). For every dispatch during a scenario-play
// soak: run the fixed JS translation AND the interpreter (callNative on
// the raw bytes) from identical entry state, compare the WHOLE HEAP
// (minus the bridge cpu's 64 KB stack carve) + exit regs, and keep the
// INTERPRETER result live.
//
// The production caller is the JS 439b86 port, which calls the trio via
// state.fnDispatch — exactly the entries this tool wraps.
//
//   TICKS=8 node tools/_lockstep-statrio.mjs
//   SEED=1 TICKS=8 node tools/_lockstep-statrio.mjs
//
// memMis is the gate; it must be 0 for every wrapped address.
//
// SEED=1 — coverage mode: the trio's interesting branches (thought
// windows, dec-to-zero rearm + sound/notification tails) fire rarely in
// a short soak (`fired` in the summary counts them). With SEED=1 the
// wrapper forces the peep's counters/gates into those windows BEFORE
// snapshotting the entry state, cycling through the branch matrix —
// both legs run from the identical seeded state, so the comparison
// stays sound (this perturbs the live soak, which is fine for an
// oracle tool; it is NOT a replay/neutrality fixture).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { regs } = await import("../runtime/regs.js");
const { callNative } = await import("../runtime/painter-bridge.js");

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
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);
const heap = r.heap;

const bytes = heap.bytes;
const CMP_END = bytes.byteLength - 64 * 1024;
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
const stats = new Map();
let reported = 0;

for (const addr of [0x442816, 0x442867, 0x4428d6]) {
  const jsFn = state.fnDispatch.get(addr);
  const st = { calls: 0, memMis: 0, eaxMis: 0, regMisInfo: 0, fired: 0 };
  stats.set(addr, st);
  state.fnDispatch.set(addr, function lockstep(h) {
    st.calls++;
    if (process.env.SEED) {
      const e = regs.esi >>> 0, k = st.calls % 6;
      if (addr === 0x442816) {
        heap.setU8(e + 0xc5, k < 5 ? 1 : 0xff);           // target ride 1 / none
        heap.setU8(e + 0xc6, [0x1e, 0x3c, 1, 2, 0x10, 0x1e][k]);
      } else if (addr === 0x442867) {
        if (k < 5) heap.setU16(e + 0xc8, heap.u16(e + 0xc8) | 1);
        else heap.setU16(e + 0xc8, heap.u16(e + 0xc8) & ~1);
        heap.setU8(e + 0xc6, [1, 0x1e, 0x3c, 2, 0x10, 1][k]);
      } else {
        heap.setU8(e + 0xf4, [0xfd, 0xfd, 0x10, 0xfd, 0x80, 0xfd][k]);
        if (k === 3) heap.setU16(0x87d7a0, 1);            // gate closed
        else if (heap.u16(0x87d7a0) < 2) heap.setU16(0x87d7a0, 2);
      }
    }
    save.set(bytes);
    const r0 = { ...regs };

    let jsThrew = null;
    try { jsFn(h); } catch (e) { jsThrew = e; }
    afterJS.set(bytes);
    const rJS = { ...regs };

    bytes.set(save);
    Object.assign(regs, r0);
    callNative(addr, []);
    const rIN = { ...regs };

    const a = Buffer.from(afterJS.buffer, 0, CMP_END);
    const b = Buffer.from(bytes.buffer, 0, CMP_END);
    let firstDiffs = [];
    if (!a.equals(b)) {
      st.memMis++;
      for (let i = 0; i < CMP_END && firstDiffs.length < 12; i++) {
        if (afterJS[i] !== bytes[i]) firstDiffs.push(`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`);
      }
    }
    // count "interesting" calls (counter window / thought fired) for
    // coverage visibility — a green run with fired=0 proves nothing.
    const e = r0.esi >>> 0;
    const c6 = save[e + 0xc6];
    if ((addr === 0x442816 && save[e + 0xc5] !== 0xff && (c6 === 0x1e || c6 === 0x3c || c6 === 1)) ||
        (addr === 0x442867 && (save[e + 0xc8] & 1) && (c6 === 1 || c6 === 0x1e || c6 === 0x3c)) ||
        (addr === 0x4428d6 && save[e + 0xf4] === 0xfd)) st.fired++;
    if (((rJS.eax >>> 0) !== (rIN.eax >>> 0))) st.eaxMis++;
    if (REGN.some((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0))) st.regMisInfo++;
    if ((firstDiffs.length || jsThrew) && reported < 10) {
      reported++;
      console.log(`--- MISMATCH 0x${addr.toString(16)} call#${st.calls} esi=${e.toString(16)} c5=${save[e + 0xc5].toString(16)} c6=${c6.toString(16)} c8=${(save[e + 0xc8] | (save[e + 0xc9] << 8)).toString(16)} f4=${save[e + 0xf4].toString(16)}`);
      if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 4).join(" | ")}`);
      for (const d of firstDiffs) console.log(`    mem ${d}`);
      const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
      if (badR.length) console.log(`    regs: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
    }
  });
}

const TICKS = parseInt(process.env.TICKS || "4", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
for (const [addr, st] of stats) {
  console.log(`0x${addr.toString(16)}: calls=${st.calls} fired=${st.fired} memMis=${st.memMis} eaxMis=${st.eaxMis} regMisInfo=${st.regMisInfo}`);
}
