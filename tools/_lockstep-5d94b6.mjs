#!/usr/bin/env node
// Per-call lockstep oracle for the 0x5d94b6 vehicle-sound-params port.
// For every call during a scenario-play soak: run the JS body AND the
// interpreter (the painter-bridge shim on the raw binary bytes) from
// identical entry state, compare the WHOLE HEAP (minus the bridge
// cpu's 64 KB stack carve) + exit registers, report the first
// divergences, and keep the INTERPRETER result live.
//
// The production caller is ported/auto/5d74b4.js (sprite-update loop),
// which calls FUN_005d94b6 — whose __lockstep5d94b6 seam this tool
// wraps.
//
//   TICKS=20 node tools/_lockstep-5d94b6.mjs
//   AB_CONTROL=1 TICKS=20 node tools/_lockstep-5d94b6.mjs  # interp-vs-interp
//
// memMis is the gate; it must be 0. regMis is informational (the
// translated caller consumes no exit register of this function beyond
// what the shim would also sync; divergence cannot compound without
// showing in memMis or the dual-soak hash).

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
const { soundParams5d94b6, FUN_005d94b6 } = await import("../ported/auto/5d94b6.js");

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
let calls = 0, memMis = 0, eaxMis = 0, regMisInfo = 0, reported = 0;
const cov = { crash: 0, music: 0, scream3: 0, chain: 0, friction: 0 };

const bridged = state.fnDispatch.get(0x5d94b6);
if (!bridged || bridged === FUN_005d94b6) {
  console.error("no painter-bridge shim registered for 0x5d94b6");
  process.exit(1);
}

globalThis.__lockstep5d94b6 = function lockstep(h) {
  calls++;
  save.set(bytes);
  const r0 = { ...regs };
  {
    const e = r0.esi >>> 0;
    if ((save[e + 0x48] | (save[e + 0x49] << 8)) & 0x20) cov.crash++;
    const rideOff = save[e + 0x30] * 0x260;
    if ((save[rideOff + 0x887422] | (save[rideOff + 0x887423] << 8)) & 0xc0) cov.music++;
    const type = save[e + 0x31];
    const v = (save[e + 0x28] | (save[e + 0x29] << 8) | (save[e + 0x2a] << 16) | (save[e + 0x2b] << 24)) | 0;
    if (Math.abs(v) >= 0x10000) cov.friction++;
    if (save[0x5f72ee + type * 4] === 3) cov.scream3++;
    else if ((save[0x5f7104 + type * 8] | (save[0x5f7105 + type * 8] << 8)) & 0x10) cov.chain++;
  }

  // --- JS leg (or, with AB_CONTROL=1, a second interpreter run) ---
  let jsThrew = null;
  if (process.env.AB_CONTROL) {
    bridged(heap);
  } else {
    try { soundParams5d94b6(heap); } catch (e) { jsThrew = e; }
  }
  afterJS.set(bytes);
  const rJS = { ...regs };

  // --- restore, then interpreter (truth stays live) ---
  bytes.set(save);
  Object.assign(regs, r0);
  bridged(heap);
  const rIN = { ...regs };

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
  if (((rJS.eax) >>> 0) !== ((rIN.eax) >>> 0)) eaxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || jsThrew) && reported < 8) {
    reported++;
    const e = r0.esi >>> 0;
    console.log(`--- MISMATCH call#${calls} esi=${e.toString(16)} type31=${save[e + 0x31]?.toString(16)} snd50=${save[e + 0x50]?.toString(16)} vel=${(save[e + 0x28] | (save[e + 0x29] << 8) | (save[e + 0x2a] << 16) | (save[e + 0x2b] << 24)).toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 4).join(" | ")}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
};

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
console.log(`coverage (entry-state classes): ${JSON.stringify(cov)}`);
