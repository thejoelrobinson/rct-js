#!/usr/bin/env node
// Per-call lockstep oracle for the 0x43d5a0 guest-motion-handler port.
// For every dispatch during a scenario-play soak: run the JS body AND
// the interpreter (callNative on the raw binary bytes) from identical
// entry state, compare the WHOLE HEAP (minus the bridge cpu's 64 KB
// stack carve) + exit registers + exit CF, report the first
// divergences, and keep the INTERPRETER result live.
//
// The production caller is the JS 43c751 port (extra_peepwalk), whose
// motion-handler dispatch routes handler==0x43d5a0 through the
// globalThis.__lockstep43d5a0 seam — exactly what this tool wraps.
// Native callers (bridged peep-state handlers running 0x43c751 raw)
// don't route through the dispatch seam and are not wrapped (they run
// the original bytes either way), same caveat as _lockstep-43c751.mjs.
//
//   TICKS=8 node tools/_lockstep-43d5a0.mjs
//   AB_CONTROL=1 TICKS=8 node tools/_lockstep-43d5a0.mjs  # interp-vs-interp
//
// memMis is the gate; it must be 0. cfMis must be 0 too (the caller
// consumes CF). regMis is informational (the binary caller re-stages
// every register it uses after the call; scratch divergence cannot
// compound without showing up in memMis or the dual-soak hash).

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
const { FUN_extra_guestmotion_43d5a0 } = await import("../ported/auto/extra_guestmotion_43d5a0.js");

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
const CMP_END = bytes.byteLength - 64 * 1024;   // exclude bridge stack carve
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
let calls = 0, memMis = 0, cfMis = 0, eaxMis = 0, regMisInfo = 0, reported = 0;

const cpu = state.__painterCpu;

const cov = { wander: 0, deadEnd: 0, corridor: 0, junctionRand: 0,
              pathfindGate: 0, pathfindSpawn: 0, pathfindRide: 0,
              checkMap: 0, prune: 0, noPath: 0 };

globalThis.__lockstep43d5a0 = function lockstep(h) {
  calls++;
  save.set(bytes);
  const r0 = { ...regs };
  // coarse entry/branch classification (drives the coverage line)
  {
    const e = r0.esi >>> 0;
    if ((save[e + 0x29] & 0x18) !== 0) cov.wander++;
    else {
      const st = save[e + 0x2b];
      if (save[e + 0x2a] !== 0) {
        if (st === 0xd) cov.pathfindGate++;
        else if (st === 0xe) cov.pathfindSpawn++;
        else cov.junctionRand++;
      } else {
        if ((save[e + 0xca] | (save[e + 0xcb] << 8)) & 4) cov.checkMap++;
        if (((save[e + 0xca] | (save[e + 0xcb] << 8)) & 0xa3e0) === 0) cov.prune++;
        if ((save[e + 0xc8] | (save[e + 0xc9] << 8)) & 1) cov.pathfindGate++;
        else if (save[e + 0xc5] !== 0xff) cov.pathfindRide++;
        else cov.junctionRand++;
      }
    }
  }

  // --- JS leg (or, with AB_CONTROL=1, a second interpreter run) ---
  let jsThrew = null;
  if (process.env.AB_CONTROL) {
    callNative(0x43d5a0, []);
  } else {
    try { FUN_extra_guestmotion_43d5a0(heap); } catch (e) { jsThrew = e; }
  }
  afterJS.set(bytes);
  const rJS = { ...regs };
  const cfJS = cpu.eflags.CF | 0;

  // --- restore, then interpreter (truth stays live) ---
  bytes.set(save);
  Object.assign(regs, r0);
  callNative(0x43d5a0, []);
  const rIN = { ...regs };
  const cfIN = cpu.eflags.CF | 0;

  // --- compare ---
  const a = Buffer.from(afterJS.buffer, 0, CMP_END);
  const b = Buffer.from(bytes.buffer, 0, CMP_END);
  let firstDiffs = [];
  if (!a.equals(b)) {
    memMis++;
    for (let i = 0; i < CMP_END && firstDiffs.length < 12; i++) {
      if (afterJS[i] !== bytes[i]) firstDiffs.push(`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`);
    }
  }
  if (cfJS !== cfIN) cfMis++;
  if (((rJS.eax) >>> 0) !== ((rIN.eax) >>> 0)) eaxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || jsThrew || cfJS !== cfIN) && reported < 8) {
    reported++;
    const e = r0.esi >>> 0;
    console.log(`--- MISMATCH call#${calls} esi=${e.toString(16)} state2b=${save[e + 0x2b]?.toString(16)} [29]=${save[e + 0x29]?.toString(16)} [2a]=${save[e + 0x2a]?.toString(16)} c5=${save[e + 0xc5]?.toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 4).join(" | ")}`);
    console.log(`    cf js=${cfJS} in=${cfIN}  tile=${(save[e + 0x24] | (save[e + 0x25] << 8)).toString(16)},${(save[e + 0x26] | (save[e + 0x27] << 8)).toString(16)} h=${save[e + 0x28].toString(16)} dir78=${save[e + 0x78].toString(16)}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
};

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} cfMis=${cfMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
console.log(`coverage (entry-state classes, junction sub-blocks approximate): ${JSON.stringify(cov)}`);
