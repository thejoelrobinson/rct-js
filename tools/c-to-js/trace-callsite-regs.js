#!/usr/bin/env node
// Trace per-callsite register state by executing each function in the x86
// interpreter and snapshotting registers at every CALL instruction.
//
// Output: tools/c-to-js/callsite-regs.json
//   {
//     "<caller_addr_hex>": {
//       "<callee_addr_hex>": { "eax": 12345, "ebx": ..., ... }
//     }
//   }
//
// Caveats:
//   - Only captures the FIRST execution path through default-init state. Any
//     call sites guarded by branches we don't take are missing.
//   - Recursive / runaway functions hit the per-function instruction limit.
//   - Indirect calls (through function pointers) use the resolved target.
//
// The translator reads this manifest and at each call site to a known
// register-consumer, emits `regs.<reg> = <value>` before the call. This
// unblocks Ghidra's `unaff_*` / `in_*` register-arg convention.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadPE } from "../../harness/loader-node.js";
import { makeCpu, step } from "../../harness/x86.js";
import { scanRegConsumers } from "./scan-reg-consumers.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../../binary/rct.exe");
const PORTED_DIR = resolve(HERE, "../../ported/auto");
const OUT = resolve(HERE, "callsite-regs.json");

const RET_SENTINEL = 0xdeadc0de >>> 0;
const STACK_SIZE = 0x10000;
const PER_FUNC_LIMIT = 200_000;

const consumers = scanRegConsumers(PORTED_DIR);
console.error(`Register consumers: ${consumers.size} functions.`);

const image = loadPE(RCT_EXE);
const baseImage = image.memory;
const totalSize = image.totalSize + STACK_SIZE;

// Read all candidate caller functions from ported/auto/*.js (any .js whose
// name parses as hex). For each: run in interpreter starting from default
// state, record registers at every CALL.
//
// Caller iteration is limited by the per-function instruction cap so a
// runaway loop doesn't stall the whole pipeline.

import { readdirSync } from "node:fs";
const callerFiles = readdirSync(PORTED_DIR).filter(f => /^[0-9a-f]+\.js$/.test(f));
console.error(`Candidate callers: ${callerFiles.length} functions.`);

const out = {};
let traced = 0;
let failed = 0;
const reasonHist = {};

// CALL near rel32 = E8; CALL [mem32] = FF /2 (modrm.reg=2). The interpreter
// already decodes these — we just need to detect "about to CALL". The cheap
// way: before each step, peek at memory[eip] to check for E8 / FF.
// We use an onCall hook by inspecting eip before/after step.

function captureRegs(cpu, calleeAddr) {
  return {
    eax: cpu.regs.eax >>> 0,
    ebx: cpu.regs.ebx >>> 0,
    ecx: cpu.regs.ecx >>> 0,
    edx: cpu.regs.edx >>> 0,
    esi: cpu.regs.esi >>> 0,
    edi: cpu.regs.edi >>> 0,
    ebp: cpu.regs.ebp >>> 0,
    callee: calleeAddr >>> 0,
  };
}

// Decode just enough to know if next instruction is a CALL and what the target is.
// Returns { isCall, target } or null. Skips operand-size prefix.
function peekCall(memory, eip) {
  let i = eip;
  // Skip up to 2 prefix bytes.
  let prefixes = 0;
  while (prefixes < 4) {
    const b = memory[i];
    if (b === 0x66 || b === 0x67 || b === 0xF2 || b === 0xF3 || b === 0xF0 || b === 0x26 || b === 0x2E || b === 0x36 || b === 0x3E || b === 0x64 || b === 0x65) {
      i++; prefixes++; continue;
    }
    break;
  }
  const op = memory[i];
  if (op === 0xE8) {
    // Call rel32
    const rel = (memory[i+1] | (memory[i+2] << 8) | (memory[i+3] << 16) | (memory[i+4] << 24)) | 0;
    const next = (i + 5) >>> 0;
    return { isCall: true, target: (next + rel) >>> 0 };
  }
  if (op === 0xFF) {
    const modrm = memory[i+1];
    const reg = (modrm >>> 3) & 7;
    if (reg === 2 || reg === 3) {
      // CALL r/m32 (subOp 2) or CALL FAR m16:32 (subOp 3 — rare). Target depends on modrm.
      // Not all paths are decodable cheaply; mark as indirect with target=0
      // and let the executing step compute the actual target via cpu state.
      return { isCall: true, target: null, indirect: true };
    }
  }
  return null;
}

for (const file of callerFiles) {
  const callerAddr = parseInt(file.replace(/\.js$/, ""), 16);
  // Initialize a fresh memory + CPU per caller — we only run for one function.
  const memory = new Uint8Array(totalSize);
  memory.set(baseImage, 0);
  const cpu = makeCpu(memory);
  cpu.regs.esp = (image.totalSize + STACK_SIZE - 4) >>> 0;
  // memory.set won't write to non-existent regions; write the sentinel directly:
  const sp = cpu.regs.esp;
  memory[sp]   = RET_SENTINEL & 0xff;
  memory[sp+1] = (RET_SENTINEL >>> 8) & 0xff;
  memory[sp+2] = (RET_SENTINEL >>> 16) & 0xff;
  memory[sp+3] = (RET_SENTINEL >>> 24) & 0xff;
  cpu.regs.eip = callerAddr >>> 0;
  cpu.callDepth = 0;

  const callerOut = {};

  let steps = 0;
  let lastErr = null;
  try {
    while (true) {
      const eip = cpu.regs.eip >>> 0;
      const peek = peekCall(memory, eip);
      if (peek && peek.isCall) {
        // Capture registers BEFORE the call.
        // For direct calls we know the target now; for indirect we only know
        // after step(). Simpler: re-capture after step so we always know target.
        const preRegs = captureRegs(cpu, 0);
        // Step the call.
        const ok = step(cpu);
        if (!ok) break;
        // The new EIP is the call target (interpreter pushed return addr + jumped).
        const calleeAddr = cpu.regs.eip >>> 0;
        // Only record if callee is a known register consumer.
        if (consumers.has(calleeAddr)) {
          const key = calleeAddr.toString(16);
          // First write wins (we want the FIRST call's regs, not a later loop iteration).
          if (!callerOut[key]) {
            callerOut[key] = {
              eax: preRegs.eax, ebx: preRegs.ebx, ecx: preRegs.ecx, edx: preRegs.edx,
              esi: preRegs.esi, edi: preRegs.edi, ebp: preRegs.ebp,
            };
          }
        }
        // Synthetic "instant return" — emulating the call would require running
        // the full callee. We don't have time for that here; just pop the return
        // address and continue at it, with EAX preserved as 0 (caller often
        // ignores it for void calls). For Win32 stdcall functions, we don't
        // know the arg count, so we may pop too few/many args. Use a heuristic:
        // count contiguous PUSHes since last call and pop all of them.
        // For now: simplest approach — set eip to the saved return address and
        // bump esp by 4 (return address). Don't unwind args. May misbehave for
        // stdcall callees but we get OK coverage of straight-line code first.
        const retAddr = (memory[cpu.regs.esp] | (memory[cpu.regs.esp+1] << 8) | (memory[cpu.regs.esp+2] << 16) | (memory[cpu.regs.esp+3] << 24)) >>> 0;
        cpu.regs.eip = retAddr;
        cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
        cpu.callDepth = 0;
        // EAX assumed unchanged. The callee would normally set it to a return
        // value, but we don't know without running it.
        if (++steps > PER_FUNC_LIMIT) break;
        continue;
      }
      // Not a CALL — step normally.
      const ok = step(cpu);
      if (!ok) break;
      if (++steps > PER_FUNC_LIMIT) break;
    }
  } catch (e) {
    lastErr = e.message || String(e);
    const sig = lastErr.split(" at ")[0].slice(0, 60);
    reasonHist[sig] = (reasonHist[sig] || 0) + 1;
    failed++;
  }

  if (Object.keys(callerOut).length > 0) {
    out[callerAddr.toString(16)] = callerOut;
    traced++;
  }
}

writeFileSync(OUT, JSON.stringify(out, null, 2));
console.error(`\nTraced ${traced} callers with at least one consumer call.`);
console.error(`Failed (early exit): ${failed} callers — top reasons:`);
const reasons = Object.entries(reasonHist).sort((a,b) => b[1]-a[1]).slice(0, 8);
for (const [r, n] of reasons) console.error(`  ${String(n).padStart(5)}  ${r}`);
console.error(`\nWrote: ${OUT}`);
