#!/usr/bin/env node
// Histogram of opcodes (after 0x66/0x67 prefixes) executed during 1 runTick.
// Surgically monkey-patches harness/x86.js step() with a wrapper that
// pre-reads the next opcode byte.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const { createRuntime } = await import("../runtime/harness.js");
const x86 = await import("../harness/x86.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const n of ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat",
  "css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat",
  "css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"]) {
  try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT,"web/assets",n))); } catch (e) {}
}
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
console.error("runInit...");
r.runInit();
// Enable opcode-histogram instrumentation in harness/x86.js step().
globalThis._X86_OP_HIST = new Uint32Array(256);
globalThis._X86_OP_HIST_EIP = new Map();
x86.enableOpcodeHist(true);

// The step function is captured in the runtime via the painter-bridge cpu.
// To count opcodes, we need to wrap *the actual cpu's step entry*. The
// painter bridge stores `cpu` privately. Instead, monkey-patch the exported
// `step` by re-importing... but JS module exports are immutable.
//
// Easier: use V8 inspector + scriptID matching. Or, wrap `runFunction` to
// count steps by also reading m[cpu.regs.eip] before the call. But that's
// fragile.
//
// Simplest: intercept via x86.setEipHook on *every* EIP using a Proxy on
// memory reads — no, that's worse. Just use Node's coverage / count via
// inspector but we already did that.
//
// Alternative: tap into runFunction's loop. Replace the exported
// runFunction with our own.

const origRun = x86.runFunction;
const hist = new Uint32Array(256);
let lastOpcodeOff = 0;

// We need access to cpu.memory to read instruction bytes.
// Monkey-patch runFunction: it takes (cpu, funcAddr, opts) and we want to
// step ourselves.
const RET_SENTINEL = 0xdeadbeef >>> 0;

function instrumentedRun(cpu, funcAddr, { stackTop, limit = 100_000 } = {}) {
  // Mirror runFunction's setup
  const m = cpu.memory;
  // Write RET_SENTINEL onto stack
  cpu.regs.esp = (stackTop - 4) >>> 0;
  m[cpu.regs.esp]     = 0xef; m[cpu.regs.esp+1] = 0xbe;
  m[cpu.regs.esp+2]   = 0xad; m[cpu.regs.esp+3] = 0xde;
  cpu.regs.eip = funcAddr >>> 0;
  cpu.callDepth = 0;
  let steps = 0;
  while (true) {
    // Read opcode (after prefix bytes 0x66/0x67)
    let ip = cpu.regs.eip >>> 0;
    if (ip < m.length) {
      let opc = m[ip];
      while (opc === 0x66 || opc === 0x67) { ip++; opc = m[ip]; }
      // Handle 0x0f escape: count as 0x100 + next byte.
      if (opc === 0x0f) hist[0x0f]++;
      else hist[opc]++;
    }
    if (!x86.step(cpu)) break;
    if (++steps > limit) throw new Error(`limit ${limit} at eip 0x${cpu.regs.eip.toString(16)}`);
  }
  return steps + 1;
}

// Replace the export by patching the painter-bridge cpu via re-installation.
// Easier: just monkey-patch runFunction by reassigning the module export.
// ESM lets us via `Object.defineProperty` on the namespace object... actually
// no it doesn't (read-only).
//
// Direct route: wrap state.fnDispatch entries (painters bridge entries) to
// take over the cpu.step loop. The painter-bridge.js does
//   try { runFunction(cpu, addr, ...) } catch ...
// We need to install our OWN dispatch entries.
//
// The cpu is private to painter-bridge.js. We can't reach it from outside.
// Workaround: pre-create a fresh cpu of our own and replace fnDispatch.

// Better: instrument by patching ALL fnDispatch entries — each painter shim's
// inner runFunction will use our cpu. But that doesn't help because the cpu
// is captured in the shim closure.
//
// Last resort: patch BY RE-IMPORTING with a custom module loader. Just count
// at the shim level: how many TOTAL steps happen per tick.

let totalSteps = 0;
const origStep = x86.step;
// Can we override by Object.defineProperty? Let's try.
try {
  Object.defineProperty(x86, "step", { configurable: true, value: function(cpu) {
    const m = cpu.memory;
    let ip = cpu.regs.eip >>> 0;
    if (ip < m.length) {
      let opc = m[ip];
      while (opc === 0x66 || opc === 0x67) { ip++; opc = m[ip]; }
      hist[opc]++;
    }
    totalSteps++;
    return origStep(cpu);
  }});
  console.error("[opcode-hist] Successfully patched x86.step via defineProperty");
} catch (e) {
  console.error("[opcode-hist] Could not patch x86.step:", e.message);
}

console.error("runTick...");
const t0 = Date.now();
try { r.runTick(); } catch (e) { console.error(`tick error: ${(e.message||e).slice(0,80)}`); }
const fhist = globalThis._X86_OP_HIST;
const totalSteps2 = fhist.reduce((a,b) => a+b, 0);
console.error(`runTick ${Date.now()-t0}ms; steps=${totalSteps2.toLocaleString()}`);

const top = [];
for (let i = 0; i < 256; i++) {
  if (fhist[i] > 0) top.push({ opc: i, count: fhist[i] });
}
top.sort((a,b) => b.count - a.count);
console.log("\nTop 30 opcodes by execution count in 1 runTick:");
console.log("  opc     count       %");
let cum = 0;
for (const rec of top.slice(0, 30)) {
  cum += rec.count;
  console.log(`  0x${rec.opc.toString(16).padStart(2,"0")}  ${String(rec.count).padStart(10)}  ${(100*rec.count/totalSteps2).toFixed(1).padStart(5)}%`);
}
console.log(`Top 30 cumulative: ${cum.toLocaleString()} = ${(100*cum/totalSteps2).toFixed(1)}% of ${totalSteps2.toLocaleString()} steps`);

// Where are the 0x00 opcodes? Top EIP 4KB-bucket sources.
const eipBkts = [...globalThis._X86_OP_HIST_EIP.entries()].sort((a,b) => b[1]-a[1]);
console.log("\nTop 0x00-opcode EIP buckets (4KB-aligned):");
for (const [bk, ct] of eipBkts.slice(0, 10)) {
  console.log(`  0x${bk.toString(16).padStart(8,"0")}  ${ct.toLocaleString()}`);
}
