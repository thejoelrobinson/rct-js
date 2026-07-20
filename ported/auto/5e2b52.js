// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x5e2b52 is the tooltip/hover
// dwell-timer tick (input subsystem). Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x5e2b52 0x5e2c95
//
// Entry: CX = mode (0/1/3), ESI = widget/window ptr (0 = none), EDI = element
// ptr, AX/BX = cursor coords, DX = widget index. Harness simulates the ret.
//
// Shape:
//   0x5e2b52: if [0x991f36]==0 → one-shot init ([0x991f4e]=ax, [0x991f50]=bx,
//             [0x991f52]=0, [0x991f49]=0xff, [0x991f36]=1, btr [0x991f30],4)
//   0x5e2b87: cx==1 → 0x5e2d13 ; cx==3 → 0x5e2c95 ; cx==0 → 0x5e2ba2 ; else ret
//   0x5e2ba2 (cx==0): if esi!=0 && dx!=-1 && [edi]==0x11 → pushal-wrapped
//             widget block (call 0x5e34d7, 16-bit `div bp` by 0x12, then an
//             INDIRECT `call [esi+4]`) — NOT ported.
//   0x5e2bd7: if [0x991f49]==0xff → dwell accumulate ([0x991f52] += [0x999f98])
//             with the 0x1f4 / 0x3e8 thresholds, optional `call 0x5e3652`
//             (show tooltip) or a far jump to 0x5e2f9f, then reset+store.
//             else → the "same widget still hovered" branch at 0x5e2c47
//             (0x5e5b80 at 0x1770, or 0x5e2fa0).
//
// PORTED PATH (the only one the gameplay soak produces — 30/30 crossings over
// a 30-tick probe, avg 29 steps/call): init already done, cx==0, esi==0,
// [0x991f49]==0xff, [0x991f54]<0x1f4 →
//   0x5e2bfd: bp=[0x999f98] ; [0x991f52]+=bp
//             bp=0x3e8 ; cmp [0x991f54],0x3e8 ; ja skips the bp=0 (NOT taken
//             here: the guard's <0x1f4 implies <0x3e8, so bp is always 0)
//   0x5e2c1e: cmp bp,[0x991f52] ; ja 0x5e2f9f — with bp==0 this is `0 > x`,
//             never true, so the far jump is unreachable under the guard
//   0x5e2c2b: call 0x5e3652
//   0x5e2c30: [0x991f52]=0 ; [0x991f4e]=ax ; [0x991f50]=bx ; ret
// EVERY other shape routes to the embedded interpreter from the entry (no
// side effect precedes the dispatch when the guard's f36!=0 holds, so the
// routing decision is safe to take first — the 4254e0/42a830 orchestrator
// pattern, kept INSIDE the fn so the lockstep oracle exercises production
// routing).
//
// Register exactness: `mov bp,…` are 16-bit dests (upper ebp preserved); the
// two final stores read AX/BX *after* `call 0x5e3652`, i.e. the CALLEE's exit
// values (callNative syncs them back) — reading the pre-call ax/bx would be
// wrong; ebp low16 is 0 at the call, so it is staged before callNative.
//
// Oracle: ADDR=0x5e2b52 FORCE=__forceInterp5e2b52 tools/_lockstep-auto.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { step, getEipHook, clearEipHook, setEipHook } from "../../harness/x86.js";

const ADDR = 0x005e2b52;

// TRUE iff the JS body covers this call. Entry-state only, no side effects.
function canHandle(heap) {
  if (heap.u8(0x00991f36) === 0) return false;          // one-shot init pending
  if ((regs.ecx & 0xffff) !== 0) return false;          // cx 1/3 arms
  if ((regs.esi >>> 0) !== 0) return false;             // widget block
  if (heap.u8(0x00991f49) !== 0xff) return false;       // 0x5e2c47 branch
  return heap.u16(0x00991f54) < 0x1f4;                  // jb 0x5e2bfd
}

// Byte-exact interpreter run of the real body from the current cpu state with
// the hook at ADDR lifted (the 4254e0 runInterpBody pattern). Executes the
// body's real ret; the caller restores esp and simulates the final ret.
function runInterpBody(heap, cpu) {
  const self = getEipHook(ADDR);
  if (self) clearEipHook(ADDR);
  const entryEsp = cpu.regs.esp >>> 0;
  cpu.regs.eip = ADDR;
  let n = 0;
  try {
    while ((cpu.regs.esp >>> 0) <= entryEsp) {
      if (!step(cpu)) break;
      if (++n > 50_000_000) throw new Error("5e2b52: interp fallback step limit");
    }
  } finally {
    if (self) setEipHook(ADDR, self);
  }
}

export function FUN_005e2b52(heap) {
  if (!canHandle(heap)) {
    const cpu = state.__painterCpu;
    if (!cpu) throw new Error("5e2b52: painter-bridge cpu not installed");
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

  // 0x5e2bfd: mov bp,[0x999f98] ; add word [0x991f52],bp
  const dt = heap.u16(0x00999f98);
  regs.ebp = (((regs.ebp & 0xffff0000) >>> 0) | dt) >>> 0;
  heap.setU16(0x00991f52, (heap.u16(0x00991f52) + dt) & 0xffff);
  // mov bp,0x3e8 ; cmp [0x991f54],0x3e8 ; ja 0x5e2c1e ; mov bp,0
  // (guard: [0x991f54] < 0x1f4 < 0x3e8, so the `ja` is never taken → bp = 0)
  regs.ebp = ((regs.ebp & 0xffff0000) >>> 0) >>> 0;
  // 0x5e2c1e: cmp bp,[0x991f52] ; ja 0x5e2f9f — bp==0, `0 > x` is never true.
  // 0x5e2c2b: call 0x5e3652 (tooltip show/refresh)
  callNative(0x5e3652, []);
  // 0x5e2c30: reset the dwell accumulator and latch the cursor position.
  // AX/BX here are the CALLEE's exit values (synced back by callNative).
  heap.setU16(0x00991f52, 0);
  heap.setU16(0x00991f4e, regs.eax & 0xffff);
  heap.setU16(0x00991f50, regs.ebx & 0xffff);
}
