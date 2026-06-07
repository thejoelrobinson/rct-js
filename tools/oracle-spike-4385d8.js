// Feasibility spike for the whole-tick gameplay oracle-diff (plan: partitioned-
// churning-flask). Proves that the binary's per-tick game update FUN_004385d8
// can be run FAITHFULLY through the x86 interpreter on the painter-bridge cpu,
// so it can be oracle-diffed against the JS port. Verifies four gates:
//   1. runs without throwing / hitting the step limit (no timeGetTime busy-wait hang),
//   2. did REAL game work (>=1 write into the sprite/entity array),
//   3. wall time is tolerable,
//   4. deterministic (two runs from the same pre-state produce identical write-sets).
//
// The blocker this resolves: createRuntime never wires the IAT, so FUN_0040473c
// (= `call [0x5e7330]` timeGetTime) would bail the interpreter (wild-jump guard)
// or hang the `do{}while(timeGetTime-X < 0x19)` busy-wait. We wire the IAT
// (wireImports+bindShims) for all imports and hook FUN_0040473c to return the
// mock clock so the busy-wait terminates deterministically.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
globalThis.__t = 1700000000000;
Date.now = () => ++globalThis.__t;
if (typeof performance !== "undefined") performance.now = () => globalThis.__t - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, skipTitleIntro } = await import(resolve(ROOT, "runtime/harness.js"));
const { dispatch } = await import(resolve(ROOT, "ported/auto/_dispatch.js"));
const { state } = await import(resolve(ROOT, "runtime/win32/context.js"));
const { regs } = await import(resolve(ROOT, "runtime/regs.js"));
const { runFunction, setEipHook } = await import(resolve(ROOT, "harness/x86.js"));
const { wireImports } = await import(resolve(ROOT, "harness/imports.js"));
const { bindShims } = await import(resolve(ROOT, "harness/shims.js"));

const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {}
skipFadeIn(r.heap); skipTitleIntro(r.heap);
const h = r.heap, b = h.bytes;

// --- IAT wiring + timeGetTime bypass (oracle-only) ---
const { iatEntries } = wireImports(b, { imageBase: 0x400000 });
bindShims(iatEntries);
// FUN_0040473c = `call [0x5e7330](timeGetTime); ret` — hook the whole wrapper to
// return the advancing mock clock so the 25ms busy-wait terminates.
setEipHook(0x0040473c, (cpu) => { cpu.regs.eax = Date.now() >>> 0; });
const cpu = state.__painterCpu;
if (!cpu) { console.log("FAIL: state.__painterCpu not exposed"); process.exit(1); }

const f403 = dispatch.get(0x403c2a), f402 = dispatch.get(0x402bef), f438 = dispatch.get(0x4385d8), f179 = dispatch.get(0x40179d);
const STACK_TOP = b.byteLength, LIMIT = 50_000_000;
const SPR_LO = 0x743b94, SPR_HI = 0x743b94 + 5000 * 0x100;
const DATA_LO = 0, DATA_HI = 0x9a2000;

// Settle only a FEW ticks: the JS sim's divergence accumulates and corrupts a
// list that the binary's sim then can't walk (infinite), so the interp tick must
// run from a still-clean early state. The harness scans from tick 1 anyway.
const SETTLE = parseInt(process.env.SETTLE || "3", 10);
for (let i = 0; i < SETTLE; i++) { try { r.runTick(); } catch {} }
console.log(`(settled ${SETTLE} ticks)`);

// Set up ONE tick's pre-state: run the msg-pump + timing as JS (both paths share this).
const t0 = globalThis.__t;
try { f403(h); } catch {} try { f402(h); } catch {}
h.setU16(0x99f98, 0x1f);                       // pin gate-loop iteration count
h.setU8(0x971ef0, 0);                          // close the paint gate (FUN_005e1653 / FUN_009bbfb3
                                               // both `if (DAT_00971ef0 != 0)`) so the interp doesn't
                                               // run the slow per-tick window paint — we diff SIM state,
                                               // and this skip is applied to BOTH paths so it's fair.
const P = b.slice();                            // pre-state
const clockP = globalThis.__t;

// Run interp 4385d8, capturing the full sim-region write-set (x86 + JS-hook writes)
// plus a count of sprite-array writes (the "did real work" signal).
function interpTick() {
  const W = new Map(); let sprWrites = 0;
  const cb = (a, size, value) => {
    for (let k = 0; k < size; k++) {
      const addr = (a + k) >>> 0; const byte = (value >>> (8 * k)) & 0xff;
      W.set(addr, byte);
      if (addr >= SPR_LO && addr < SPR_HI) sprWrites++;
    }
  };
  globalThis._x86Watch = { lo: DATA_LO, hi: DATA_HI, cb };
  globalThis._heapWatch = { lo: DATA_LO, hi: DATA_HI, cb };
  cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0; cpu.regs.edx = regs.edx >>> 0;
  cpu.regs.ebx = regs.ebx >>> 0; cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0; cpu.regs.ebp = regs.ebp >>> 0;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
  let steps = 0, err = null, hitLimit = false;
  const ns0 = process.hrtime.bigint();      // REAL wall clock (mocked performance.now is the game clock)
  try {
    steps = runFunction(cpu, 0x4385d8, { stackTop: STACK_TOP, limit: LIMIT });
    if (h.u32(0x005e9104) !== 0) runFunction(cpu, 0x40179d, { stackTop: STACK_TOP, limit: LIMIT });
  } catch (e) { err = e.message; if (/instruction limit/.test(err)) hitLimit = true; }
  const ms = Number(process.hrtime.bigint() - ns0) / 1e6;
  globalThis._x86Watch = undefined; globalThis._heapWatch = undefined;
  return { W, sprWrites, steps, err, hitLimit, ms };
}

console.log("=== interp 4385d8 spike (gate-open, ~tick 21) ===");
b.set(P); globalThis.__t = clockP;
const A = interpTick();
console.log(`run A: steps=${A.steps} ms=${A.ms | 0} throw=${A.err || "none"} hitLimit=${A.hitLimit} writes=${A.W.size} sprWrites=${A.sprWrites}`);

// Determinism: second run from the identical pre-state + clock.
b.set(P); globalThis.__t = clockP;
const B = interpTick();
let detOK = A.W.size === B.W.size;
if (detOK) for (const [k, v] of A.W) if (B.W.get(k) !== v) { detOK = false; break; }
console.log(`run B: steps=${B.steps} ms=${B.ms | 0} writes=${B.W.size} sprWrites=${B.sprWrites}`);

console.log("\n=== GATES ===");
console.log(`  1. no throw / no step-limit : ${(!A.err && !A.hitLimit) ? "PASS" : "FAIL (" + (A.err || "") + ")"}`);
console.log(`  2. did real work (sprite writes>0): ${A.sprWrites > 0 ? "PASS" : "FAIL"} (${A.sprWrites})`);
console.log(`  3. wall time tolerable (<3000ms): ${A.ms < 3000 ? "PASS" : "SLOW"} (${A.ms | 0}ms)`);
console.log(`  4. deterministic (A==B writeset): ${detOK ? "PASS" : "FAIL"}`);
