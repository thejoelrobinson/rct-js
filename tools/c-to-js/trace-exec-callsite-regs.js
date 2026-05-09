#!/usr/bin/env node
// Deeper callsite-register tracer: runs the interpreter from real entry
// points and lets execution flow naturally through the call graph,
// snapshotting registers at every CALL instruction.
//
// Compared to trace-callsite-regs.js (instant-return per call), this
// produces register snapshots for call sites DEEP inside the call graph
// — exactly what's needed for the title-screen sprite walker chain
// (9bbfb3 → 9bbff8 → 9bc041 etc.).
//
// Output: tools/c-to-js/callsite-regs-deep.json
//   Same format as callsite-regs.json — merged at translator load.
//
// Win32 calls are stubbed via a no-op shim invoker that pops args and
// returns 0 (matches our runtime/win32 stubs' typical behaviour).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadPE } from "../../harness/loader-node.js";
import { makeCpu, step, setShimInvoker } from "../../harness/x86.js";
import { wireImports } from "../../harness/imports.js";
import { scanRegConsumers } from "./scan-reg-consumers.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../../binary/rct.exe");
const PORTED_DIR = resolve(HERE, "../../ported/auto");
const DATA_BIN = resolve(HERE, "../../decompiled/data.bin");
const OUT = resolve(HERE, "callsite-regs-deep.json");

// Trace EVERY ported function as an entry point. Per-entry instruction
// budget kept small so the total run time stays bounded; 200k instructions
// gets us through the function's prologue and any short-running calls.
import { readdirSync as _readdirSync } from "node:fs";
const _allEntries = _readdirSync(PORTED_DIR)
  .filter(f => /^[0-9a-f]+\.js$/.test(f))
  .map(f => ({ addr: parseInt(f.replace(/\.js$/, ""), 16), name: f, limit: 200_000 }));
// Prioritize known-important entry points first so they get first-write-wins
// for shared call sites.
const PRIORITY = [
  0x00401000, 0x004385d8, 0x009bb9f5, 0x009bb6af, 0x00438aac,
  0x009bbfb3, 0x009bbff8, 0x009b30bc, 0x009bb766, 0x009bb717,
];
_allEntries.sort((a, b) => {
  const ai = PRIORITY.indexOf(a.addr); const bi = PRIORITY.indexOf(b.addr);
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return 0;
});
// Bump priority entries to higher limits.
for (const e of _allEntries) {
  if (PRIORITY.includes(e.addr)) e.limit = 5_000_000;
}
const ENTRY_POINTS = _allEntries;

const consumers = scanRegConsumers(PORTED_DIR);
console.error(`Register consumers: ${consumers.size} functions.`);

// Build the same memory layout as runtime: data.bin at low addresses (the
// PE image), heap above, stack at top. This matches what the runtime sees.
const image = loadPE(RCT_EXE);
const STACK_SIZE = 0x10000;
const HEAP_SIZE = 64 * 1024 * 1024;
const totalSize = image.totalSize + HEAP_SIZE + STACK_SIZE;

// Per-fnAddr shim metadata, populated after wireImports per-entry.
let _shimsByAddr = null;
let _fakeTime = 0;

// Stub shim invoker: pop return address, set EAX based on fn name (1 for
// success, monotonic for time queries, 0 default), continue execution.
// Doesn't unwind args — for stdcall callees this leaves args on the stack,
// but most subsequent code overwrites those slots with new pushes anyway.
function noopShim(cpu, fnAddr) {
  const sp = cpu.regs.esp >>> 0;
  if (sp >= cpu.memory.length - 4) {
    cpu.regs.eip = 0xdeadbeef >>> 0;
    return;
  }
  const retAddr = (cpu.memory[sp]
    | (cpu.memory[sp+1] << 8)
    | (cpu.memory[sp+2] << 16)
    | (cpu.memory[sp+3] << 24)) >>> 0;
  cpu.regs.eip = retAddr;
  cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
  // Choose a return value that's "least likely to lock the program in a
  // busy-wait or take an early-fail branch".
  let ret = 0;
  if (_shimsByAddr) {
    const meta = _shimsByAddr.get(fnAddr);
    if (meta) {
      const n = meta.name || "";
      if (/GetTickCount|timeGetTime|clock|Sleep/i.test(n)) {
        // Monotonic time so busy-wait loops `while (X - lastT < N)` exit.
        _fakeTime += 50;
        ret = _fakeTime;
      } else if (/RegOpen|RegQuery|FindFirst|GetVersion|GetModule|Heap|Global|Create|Register/i.test(n)) {
        ret = 1;   // success-ish
      }
    }
  }
  cpu.regs.eax = ret >>> 0;
}
setShimInvoker(noopShim);

// Detect if the next instruction is a CALL and capture the target.
// Returns { isCall, isDirect, target } or null.
function peekCall(memory, eip) {
  let i = eip;
  // Skip prefixes.
  let safety = 0;
  while (safety < 8) {
    const b = memory[i];
    if (b === 0x66 || b === 0x67 || b === 0xF0 || b === 0xF2 || b === 0xF3 ||
        b === 0x26 || b === 0x2E || b === 0x36 || b === 0x3E || b === 0x64 || b === 0x65) {
      i++; safety++; continue;
    }
    break;
  }
  const op = memory[i];
  if (op === 0xE8) {
    const rel = (memory[i+1] | (memory[i+2] << 8) | (memory[i+3] << 16) | (memory[i+4] << 24)) | 0;
    return { isCall: true, isDirect: true, target: ((i + 5) + rel) >>> 0 };
  }
  if (op === 0xFF) {
    const modrm = memory[i+1];
    const reg = (modrm >>> 3) & 7;
    if (reg === 2) return { isCall: true, isDirect: false, target: null };
  }
  return null;
}

function snap(cpu) {
  return {
    eax: cpu.regs.eax >>> 0, ebx: cpu.regs.ebx >>> 0,
    ecx: cpu.regs.ecx >>> 0, edx: cpu.regs.edx >>> 0,
    esi: cpu.regs.esi >>> 0, edi: cpu.regs.edi >>> 0,
    ebp: cpu.regs.ebp >>> 0,
  };
}

const RET_SENTINEL = 0xdeadbeef >>> 0;
const out = {};            // callerAddr → calleeAddr → regs
let totalCalls = 0;
let consumerCalls = 0;
let runaways = 0;

// We deliberately do NOT overlay data.bin — its layout is sparse-from-0
// and overwriting the PE image's .text section with zeros corrupts the
// instructions we need to execute.

console.error(`Entry-point pool: ${ENTRY_POINTS.length} candidates.`);
let entryIdx = 0;
let lastReport = 0;
for (const entry of ENTRY_POINTS) {
  entryIdx++;
  if (entryIdx - lastReport >= 50) {
    const sites = Object.values(out).reduce((s,v) => s + Object.keys(v).length, 0);
    console.error(`  ${entryIdx}/${ENTRY_POINTS.length}: ${sites} unique sites, ${runaways} runaways`);
    lastReport = entryIdx;
  }
  const memory = new Uint8Array(totalSize);
  memory.set(image.memory, 0);
  // Wire IAT sentinels so Win32 calls trap to the noopShim instead of
  // reading garbage IAT pointers and jumping to wild addresses.
  const wired = wireImports(memory, image);
  _shimsByAddr = wired.shimsByAddr;
  _fakeTime = 0;
  const cpu = makeCpu(memory);
  const stackTop = totalSize - 4;
  cpu.regs.esp = stackTop;
  memory[stackTop]   = RET_SENTINEL & 0xff;
  memory[stackTop+1] = (RET_SENTINEL >>> 8) & 0xff;
  memory[stackTop+2] = (RET_SENTINEL >>> 16) & 0xff;
  memory[stackTop+3] = (RET_SENTINEL >>> 24) & 0xff;
  cpu.regs.eip = entry.addr;
  cpu.callDepth = 0;

  // Track the most recent CALL instruction's PC — the "caller addr"
  // for each call site. Until we see a RET, this is the function that
  // owns the next call site.
  // Actually simpler: the caller of each call site is identified by the
  // function address at the top of the call stack. We don't model that
  // directly; instead, we use the eip of the CALL instruction itself as
  // the call-site key (every site is unique by its instruction PC).
  // For grouping, we round to the function start by looking at which
  // function boundary the eip falls into. Simplest approach: store
  // call sites keyed by the CALL instruction's eip, and post-process
  // to map each to its enclosing function.
  // For now: track which function we entered most recently via CALL.
  // Stack of caller-function-addresses.
  const callStack = [entry.addr];

  let steps = 0;
  // Cycle detection over a rolling window of recent eips. If the same eip
  // repeats too often within the window, we're in a tight loop — bail.
  const RECENT_SIZE = 256;
  const recentCounts = new Map();
  const recentRing = new Array(RECENT_SIZE);
  let recentIdx = 0;
  let stuckCycles = 0;
  try {
    while (true) {
      const eip = cpu.regs.eip >>> 0;
      if (eip === RET_SENTINEL) break;
      // Cycle detection over a rolling window. If the same eip recurs > 256
      // times in the recent window, force-return from the current function
      // (pop stack + jump to caller's return address). This lets the trace
      // escape tight loops rather than spinning forever.
      const old = recentRing[recentIdx];
      if (old !== undefined) {
        const c = recentCounts.get(old) - 1;
        if (c === 0) recentCounts.delete(old); else recentCounts.set(old, c);
      }
      recentRing[recentIdx] = eip;
      const newCount = (recentCounts.get(eip) || 0) + 1;
      recentCounts.set(eip, newCount);
      recentIdx = (recentIdx + 1) % RECENT_SIZE;
      if (newCount > 256) {
        runaways++;
        if (cpu.regs.esp < cpu.memory.length - 4) {
          const sp = cpu.regs.esp >>> 0;
          const retAddr = (cpu.memory[sp] | (cpu.memory[sp+1]<<8) | (cpu.memory[sp+2]<<16) | (cpu.memory[sp+3]<<24)) >>> 0;
          cpu.regs.eip = retAddr;
          cpu.regs.esp = (cpu.regs.esp + 4) >>> 0;
          if (callStack.length > 1) callStack.pop();
          for (let k = 0; k < RECENT_SIZE; k++) recentRing[k] = undefined;
          recentCounts.clear();
          if (++stuckCycles > 200) break;
          continue;
        }
        break;
      }
      // Check if this instruction is a CALL.
      const peek = peekCall(memory, eip);
      if (peek && peek.isCall) {
        const preRegs = snap(cpu);
        const ok = step(cpu);
        if (!ok) break;
        // After step, eip = call target, esp -= 4 (return addr pushed).
        const calleeAddr = cpu.regs.eip >>> 0;
        if (calleeAddr < 0xF0000000) {
          // Real ported function (not Win32 shim).
          const callerAddr = callStack[callStack.length - 1];
          totalCalls++;
          if (consumers.has(calleeAddr)) {
            consumerCalls++;
            const calleeKey = calleeAddr.toString(16);
            const callerKey = callerAddr.toString(16);
            if (!out[callerKey]) out[callerKey] = {};
            // First-write-wins: capture the FIRST hit at this site so
            // we record the "fresh" register state (not stale from a
            // later loop iteration).
            if (!out[callerKey][calleeKey]) {
              out[callerKey][calleeKey] = preRegs;
            }
          }
          callStack.push(calleeAddr);
        }
        if (++steps > entry.limit) break;
        continue;
      }
      // Detect RET: opcodes 0xc3, 0xc2 (ret imm16), 0xcb (retf), 0xca (retf imm16)
      const op = memory[eip];
      const isRet = op === 0xc3 || op === 0xc2 || op === 0xcb || op === 0xca;
      const ok = step(cpu);
      if (!ok) break;
      if (isRet && callStack.length > 1) callStack.pop();
      if (++steps > entry.limit) break;
    }
  } catch (e) {
    // Interpreter faulted — common for un-decoded opcodes or OOB reads.
    // Don't fail the whole pipeline; record what we got so far.
  }
  const sites = Object.values(out).reduce((s, v) => s + Object.keys(v).length, 0);
  console.error(`  ${steps.toLocaleString()} steps, ${totalCalls} total calls, ${consumerCalls} to consumers, ${sites} unique sites so far`);
}

writeFileSync(OUT, JSON.stringify(out, null, 2));
console.error(`\nTotal callers with consumer call sites: ${Object.keys(out).length}`);
console.error(`Total unique call-site bindings: ${Object.values(out).reduce((s,v) => s + Object.keys(v).length, 0)}`);
console.error(`Runaways (stuck-eip stops): ${runaways}`);
console.error(`Wrote: ${OUT}`);
