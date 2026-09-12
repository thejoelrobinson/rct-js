// @manual - do not regenerate.
//
// Hand-ported from rct.exe disassembly at VA 0x9bbf08 (CodeSeg) - Ghidra
// did not lift this; it is a thin wrapper called only via the indirect
// table DAT_009b22f0 (slot 2) when DAT_008d7eb6 selects this style.
//
// Like FUN_009bbeaf this is a multi-call wrapper around FUN_009bbdc2,
// using DAT_006e3b84 (frame counter) to derive per-frame offsets. It
// fires FOUR sprite draws per call:
//
//   call 1: edi = -frame      + 0    + eax    esi = -(frame*5)      + ebx   ebp=0
//   call 2: edi = -frame      + 0x10 + eax    esi = -(frame*6 + 5)  + ebx   ebp=0
//   call 3: edi = -frame      + 0x8  + eax    esi = -(frame*3 + 7)  + ebx   ebp=0
//   call 4: edi = -frame      + 0x18 + eax    esi = -(frame*4 + 13) + ebx   ebp=0
//
// Each call is bracketed by push eax/ebx/ecx/edx and matching pop, so
// the caller's EAX/EBX/ECX/EDX are preserved across all four calls.
//
// Disassembly outline:
//   009BBF08-009BBF2D : call#1  (frame*5,   0,   0)
//   009BBF2E-009BBF59 : call#2  (frame*6+5, 0x10, 5)
//   009BBF5A-009BBF85 : call#3  (frame*3+7, 0x8,  7)
//   009BBF86-009BBFB1 : call#4  (frame*4+13,0x18, 13)
//   009BBFB2          : ret

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009bbdc2 } from "./9bbdc2.js";

export function FUN_009bbf08(heap) {
  const eax = regs.eax >>> 0;
  const ebx = regs.ebx >>> 0;
  const ecx = regs.ecx >>> 0;
  const edx = regs.edx >>> 0;
  const frame = heap.u32(0x6e3b84) >>> 0;

  // call 1: edi = -frame + 0 + eax,  esi = -(frame*5) + ebx
  regs.eax = eax; regs.ebx = ebx; regs.ecx = ecx; regs.edx = edx;
  regs.edi = ((-frame + eax) >>> 0);
  regs.esi = ((-(Math.imul(frame, 5)) + ebx) >>> 0);
  regs.ebp = 0;
  FUN_009bbdc2(heap);

  // call 2: edi = -frame + 0x10 + eax, esi = -(frame*6 + 5) + ebx
  regs.eax = eax; regs.ebx = ebx; regs.ecx = ecx; regs.edx = edx;
  regs.edi = ((-frame + 0x10 + eax) >>> 0);
  regs.esi = ((-(Math.imul(frame, 6) + 5) + ebx) >>> 0);
  regs.ebp = 0;
  FUN_009bbdc2(heap);

  // call 3: edi = -frame + 0x8 + eax,  esi = -(frame*3 + 7) + ebx
  regs.eax = eax; regs.ebx = ebx; regs.ecx = ecx; regs.edx = edx;
  regs.edi = ((-frame + 0x8 + eax) >>> 0);
  regs.esi = ((-(Math.imul(frame, 3) + 7) + ebx) >>> 0);
  regs.ebp = 0;
  FUN_009bbdc2(heap);

  // call 4: edi = -frame + 0x18 + eax, esi = -(frame*4 + 13) + ebx
  regs.eax = eax; regs.ebx = ebx; regs.ecx = ecx; regs.edx = edx;
  regs.edi = ((-frame + 0x18 + eax) >>> 0);
  regs.esi = ((-(Math.imul(frame, 4) + 13) + ebx) >>> 0);
  regs.ebp = 0;
  FUN_009bbdc2(heap);

  // final pop sequence — restore caller-saved regs
  regs.eax = eax;
  regs.ebx = ebx;
  regs.ecx = ecx;
  regs.edx = edx;
  return 0;
}
