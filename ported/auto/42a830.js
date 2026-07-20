// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x42a830 is the EVENT PROC of
// the window registered by the routine at 0x429960 (`mov edx,0x42a830 ;
// mov ebp,0x42afb5 ; call 0x5e3f31` — event proc + paint proc; the sole
// reference to this address in the binary). Disassembly:
//   python3 tools/disasm-va.py 0x42a830 0x42afb5
//
// Entry: BP = event id, DX/CX = event params. The body is `jmp 0x42af5a`
// into a cmp-bp dispatch chain: events {1,2,3,4,7,8,9,0xa,0xb} jump to arms
// spread across 0x42a835..0x42b8xx (a full window-proc subsystem, ~0x1000
// bytes of button/dropdown handling — NOT ported); any other event falls
// through all nine compares to the `ret` at 0x42afb4.
//
// In the gameplay soak the proc is ONLY ever entered with bp=0x12
// (unhandled event → pure fall-through, 19 interp steps/call, ~2
// calls/tick — the whole 40 steps/tick rank entry). JS ports the
// fall-through dispatch; a matched event routes through the EMBEDDED
// interpreter from entry (no side effect precedes the dispatch — the
// 4254e0/444e08 orchestrator pattern, so the lockstep oracle exercises the
// same routing production does).
//
// Exit exactness (fall-through): no register is written; the exit flags are
// those of the last compare, `cmp bp,0xb` (16-bit sub), replicated on the
// painter cpu.
//
// Oracle: ADDR=0x42a830 FORCE=__forceInterp42a830 tools/_lockstep-auto.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { step, getEipHook, clearEipHook, setEipHook } from "../../harness/x86.js";

const ADDR = 0x0042a830;
const HANDLED = new Set([1, 2, 3, 4, 7, 8, 9, 0xa, 0xb]);

// Byte-exact interpreter run of the real body from the current cpu state,
// with any eip hook at ADDR lifted (the 4254e0 runInterpBody pattern). The
// run executes the body's real `ret`; the caller (wiring hook / oracle)
// restores esp and simulates the final ret itself.
function runInterpBody(heap, cpu) {
  const self = getEipHook(ADDR);
  if (self) clearEipHook(ADDR);
  const entryEsp = cpu.regs.esp >>> 0;
  cpu.regs.eip = ADDR;
  let n = 0;
  try {
    while ((cpu.regs.esp >>> 0) <= entryEsp) {
      if (!step(cpu)) break;
      if (++n > 50_000_000) throw new Error("42a830: interp fallback step limit");
    }
  } finally {
    if (self) setEipHook(ADDR, self);
  }
}

export function FUN_0042a830(heap) {
  const bp = regs.ebp & 0xffff;
  if (HANDLED.has(bp)) {
    // ---- matched event: unported arm — embedded interpreter from entry ----
    const cpu = state.__painterCpu;
    if (!cpu) throw new Error("42a830: painter-bridge cpu not installed");
    cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0;
    cpu.regs.edx = regs.edx >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
    if (typeof regs.esp === "number") cpu.regs.esp = regs.esp >>> 0;
    const entryEsp = cpu.regs.esp >>> 0;
    const entryEip = cpu.regs.eip >>> 0;
    const entryCD = cpu.callDepth;
    try {
      runInterpBody(heap, cpu);
    } finally {
      cpu.regs.esp = entryEsp;
      cpu.regs.eip = entryEip;
      cpu.callDepth = entryCD;
    }
    regs.eax = cpu.regs.eax >>> 0; regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0; regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0; regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    return;
  }
  // ---- unhandled event: fall through the compare chain to ret (0x42afb4).
  // No register writes; exit flags = `cmp bp,0xb` (16-bit).
  const c = state.__painterCpu;
  if (c) {
    const r = (bp - 0xb) & 0xffff;
    c.eflags.CF = bp < 0xb ? 1 : 0;
    c.eflags.ZF = r === 0 ? 1 : 0;
    c.eflags.SF = (r >>> 15) & 1;
    c.eflags.OF = ((bp ^ 0xb) & (bp ^ r) & 0x8000) !== 0 ? 1 : 0;
  }
}
