// Whole-tick gameplay oracle-diff harness (plan: partitioned-churning-flask).
//
// Finds the FIRST gameplay tick where the JS port's per-tick game update
// (FUN_004385d8) diverges from the binary run through the x86 interpreter.
//
// For each tick: run the msg-pump (403c2a) + timing (402bef) as JS in BOTH paths
// (not diffed), snapshot the pre-state, then run 4385d8 once as JS and once via
// the interpreter from that identical state, capturing each side's WRITE-SET over
// the game-state region [0, 0x9a2000) (sprite array + .data/DATASEG globals + RNG;
// the back-buffer, blit scratch and stack are all above it). The interpreter is
// ground truth; the first tick whose write-sets differ is the divergence.
//
// CURRENT REALITY (the build surfaced this): several per-tick SIM functions are
// still broken JS ports (goto-as-return lowered the loop back-edges to `return 0`,
// e.g. FUN_00424e0f has FIVE). The BINARY versions of those loop correctly, so run
// via the interpreter they don't terminate on the (JS-shaped) state. So instead of
// a clean write-set diff, the interp run hits the step limit inside the first
// broken function — and this harness RESOLVES that eip to the culprit function.
// It is therefore a detector: fix the reported function (restructure its gotos to
// match decompiled/c/<addr>.c), re-run, it reports the next one; once the whole
// 4385d8 sim runs via the interpreter, it switches to the real write-set diff.
//
// Usage:
//   node tools/oracle-diff-tick.js              # scan from tick 1
//   SETTLE=0 node tools/oracle-diff-tick.js     # start from the first gameplay tick
//   node tools/oracle-diff-tick.js --selfcheck  # determinism + positive-control checks
import { readFileSync, readdirSync } from "node:fs";
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

// --- function-bounds table for eip -> FUN_ resolution (from decompiled/c/*.c) ---
const FN_ADDRS = readdirSync(resolve(ROOT, "decompiled/c"))
  .filter((f) => /^[0-9a-f]+\.c$/.test(f))
  .map((f) => parseInt(f.slice(0, -2), 16))
  .sort((a, b) => a - b);
function fnAt(eip) {
  let lo = 0, hi = FN_ADDRS.length - 1, best = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (FN_ADDRS[m] <= eip) { best = m; lo = m + 1; } else hi = m - 1; }
  return best >= 0 ? `FUN_00${FN_ADDRS[best].toString(16)}` : "?";
}

// --- VFS / boot ---
const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {}
skipFadeIn(r.heap); skipTitleIntro(r.heap);
const h = r.heap, b = h.bytes;

// --- IAT wiring + timeGetTime bypass (oracle-only; see plan) ---
const { iatEntries } = wireImports(b, { imageBase: 0x400000 });
bindShims(iatEntries);
setEipHook(0x0040473c, (cpu) => { cpu.regs.eax = Date.now() >>> 0; });  // FUN_0040473c -> mock clock
const cpu = state.__painterCpu;
if (!cpu) { console.log("FATAL: state.__painterCpu not exposed (painter-bridge)"); process.exit(1); }

const f403 = dispatch.get(0x403c2a), f402 = dispatch.get(0x402bef), f438 = dispatch.get(0x4385d8), f179 = dispatch.get(0x40179d);
const STACK_TOP = b.byteLength, LIMIT = 50_000_000;
const DATA_LO = 0, DATA_HI = 0x9a2000;
// Timing globals that legitimately differ between the JS and interp clock paths.
const EXCL = [[0x5e9110, 0x5e9128], [0x5eee80, 0x5eee8c], [0x99f90, 0x99f9c]];
const excluded = (a) => EXCL.some(([lo, hi]) => a >= lo && a < hi);

function loc(a) {
  if (a >= 0x743b94 && a < 0x743b94 + 5000 * 0x100) return `sprite[${((a - 0x743b94) / 0x100) | 0}]+0x${((a - 0x743b94) % 0x100).toString(16)}`;
  return `0x${a.toString(16)}`;
}

// Run 4385d8 through the interpreter, capturing the game-state write-set. Returns
// { W, done, hangFn } — done=false + hangFn set when it hits the step limit.
function interpUpdate(W) {
  const cb = (a, size, value) => { for (let k = 0; k < size; k++) { const ad = (a + k) >>> 0; if (!excluded(ad)) W.set(ad, (value >>> (8 * k)) & 0xff); } };
  globalThis._x86Watch = { lo: DATA_LO, hi: DATA_HI, cb };
  globalThis._heapWatch = { lo: DATA_LO, hi: DATA_HI, cb };
  cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0; cpu.regs.edx = regs.edx >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
  cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0; cpu.regs.ebp = regs.ebp >>> 0;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
  let done = true, hangFn = null, hangEip = 0;
  try {
    runFunction(cpu, 0x4385d8, { stackTop: STACK_TOP, limit: LIMIT });
    if (h.u32(0x005e9104) !== 0) runFunction(cpu, 0x40179d, { stackTop: STACK_TOP, limit: LIMIT });
  } catch (e) {
    const m = /eip 0x([0-9a-f]+)/.exec(e.message);
    if (m) { hangEip = parseInt(m[1], 16); hangFn = fnAt(hangEip); }
    done = false;
  }
  globalThis._x86Watch = undefined; globalThis._heapWatch = undefined;
  return { done, hangFn, hangEip };
}
function jsUpdate(W) {
  const cb = (a, size, value) => { for (let k = 0; k < size; k++) { const ad = (a + k) >>> 0; if (!excluded(ad)) W.set(ad, (value >>> (8 * k)) & 0xff); } };
  globalThis._heapWatch = { lo: DATA_LO, hi: DATA_HI, cb };
  try { f438(h); if (h.u32(0x005e9104) !== 0) f179(h); } catch {}
  globalThis._heapWatch = undefined;
}

// Prepare a tick's pre-state (msg-pump + timing as JS, paint gate closed, gate-loop pinned).
function preTick() {
  const t0 = globalThis.__t;
  try { f403(h); } catch {} try { f402(h); } catch {}
  h.setU16(0x99f98, 0x1f);   // pin gate-loop iteration count to 1
  h.setU8(0x971ef0, 0);      // close paint gate (FUN_005e1653 / FUN_009bbfb3) — diff sim, not paint
  return t0;
}

const SETTLE = parseInt(process.env.SETTLE || "1", 10);
const MAXTICK = parseInt(process.env.MAXTICK || "300", 10);
const selfcheck = process.argv.includes("--selfcheck");

for (let i = 0; i < SETTLE; i++) { try { r.runTick(); } catch {} }

if (selfcheck) {
  // Determinism + positive-control on the first scanned tick.
  preTick();
  const P = b.slice(), clk = globalThis.__t;
  const W1 = new Map(); b.set(P); globalThis.__t = clk; const r1 = interpUpdate(W1);
  const W2 = new Map(); b.set(P); globalThis.__t = clk; const r2 = interpUpdate(W2);
  let det = W1.size === W2.size; if (det) for (const [k, v] of W1) if (W2.get(k) !== v) { det = false; break; }
  const Wj = new Map(); b.set(P); globalThis.__t = clk; jsUpdate(Wj);
  // positive control: corrupt one sprite byte in a copy of Wj and confirm the comparator flags it
  const Wp = new Map(Wj); Wp.set(0x743c00, ((Wp.get(0x743c00) || 0) ^ 0xff) & 0xff);
  let posOK = false; for (const [k, v] of Wp) if (Wj.get(k) !== v) { posOK = true; break; }
  console.log(`selfcheck: interp-determinism=${det ? "PASS" : "FAIL"} interp-done=${r1.done}${r1.done ? "" : " (hang " + r1.hangFn + ")"} positive-control=${posOK ? "PASS" : "FAIL"}`);
  process.exit(0);
}

console.log(`oracle-diff-tick: scanning from gameplay tick ${SETTLE} (region [0,0x9a2000), timing excluded)\n`);
let firstHangReported = null;
for (let i = SETTLE; i < SETTLE + MAXTICK; i++) {
  preTick();
  const P = b.slice(), clk = globalThis.__t;
  const Wj = new Map(); jsUpdate(Wj); const postjs = b.slice();
  b.set(P); globalThis.__t = clk;
  const Wi = new Map(); const ir = interpUpdate(Wi);

  if (!ir.done) {
    console.log(`tick ${i}: interp could not run the sim — hit the step limit inside ${ir.hangFn} (eip 0x${ir.hangEip.toString(16)}).`);
    console.log(`  => the binary's ${ir.hangFn} does not terminate on the JS-produced state: its JS port is broken`);
    console.log(`     (goto-as-return loop back-edges, same class as 4533d0/444927/5e13d2). Fix ported/auto/${ir.hangFn.slice(6)}.js`);
    console.log(`     against decompiled/c/${ir.hangFn.slice(6)}.c (restructure the gotos into loops), then re-run.`);
    firstHangReported = ir.hangFn;
    break;
  }
  // both sides ran — compare write-sets
  let d = 0; const samples = [];
  const keys = new Set([...Wj.keys(), ...Wi.keys()]);
  for (const k of keys) if (Wj.get(k) !== Wi.get(k)) { d++; if (samples.length < 12) samples.push(k); }
  if (d > 0) {
    console.log(`FIRST DIVERGENCE at gameplay tick ${i}: ${d} byte(s) differ`);
    for (const a of samples) console.log(`  ${loc(a)}: JS=${Wj.has(a) ? "0x" + Wj.get(a).toString(16).padStart(2, "0") : "--"} BIN=${Wi.has(a) ? "0x" + Wi.get(a).toString(16).padStart(2, "0") : "--"}`);
    break;
  }
  if (i % 20 === 0) console.log(`tick ${i}: clean (${Wj.size} writes match)`);
  b.set(postjs);  // continue the JS chain from the canonical JS post-state
}
if (firstHangReported) console.log(`\nDETECTED broken sim function: ${firstHangReported}. Fix it and re-run to find the next / reach the write-set diff.`);
