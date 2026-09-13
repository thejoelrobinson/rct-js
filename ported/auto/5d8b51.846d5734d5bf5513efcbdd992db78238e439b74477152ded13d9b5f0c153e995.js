// @manual — do not regenerate.
//
// Source: decompiled/c/5d8b51.c — per-peep field init for action-switch
// (esi = sprite, edi = per-peep struct offset = peep_index * 0x260).
// Hand-port fix (stride bug, same family as 40179d.js): the translator
// emitted `setU32(addr + edi*4, 0)` for several fields that the binary
// actually byte-stores via `movb $0x0/$-0x1, addr(%edi)` at:
//   0x5d8b7a (0x8874b0), 0x5d8b81 (0x8874b1), 0x5d8bc8 (0x8874ef),
//   0x5d8bea (0x8874e4), 0x5d8bf1 (0x8874e5), 0x5d8c0b (0x8874ee),
//   0x5d8c12 (0x8874e7), 0x5d8c19 (0x8874a5).
// Ghidra typed those DAT_ symbols as int*; everything else here (movl/
// movw) was already typed correctly so left alone.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d8b51(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  heap.setU16((((0x00887422) | 0) + unaff_EDI), (heap.u16((((0x00887422) | 0) + unaff_EDI)) | 4) & 0xffff);
  heap.setU16((((0x00887422) | 0) + unaff_EDI), (heap.u16((((0x00887422) | 0) + unaff_EDI)) & 0xfff7) & 0xffff);
  heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) | 0x20) & 0xffff);
  heap.setU32((0x008874a8 + unaff_EDI), (0) & 0xffffffff);
  heap.setU32((0x008874ac + unaff_EDI), (0) & 0xffffffff);
  // BYTE stores at edi-relative offsets (see header for the bug).
  heap.setU8((0x008874b0 + unaff_EDI) >>> 0, 0);
  heap.setU8((0x008874b1 + unaff_EDI) >>> 0, 0);
  heap.setU16((0x008874cc + unaff_EDI), (100) & 0xffff);
  heap.setU16((0x008874ce + unaff_EDI), (100) & 0xffff);
  heap.setU16((0x008874d0 + unaff_EDI), (0) & 0xffff);
  heap.setU16((0x008874d2 + unaff_EDI), (100) & 0xffff);
  heap.setU16((0x008874d4 + unaff_EDI), (0) & 0xffff);
  heap.setU32((0x008874d8 + unaff_EDI), (0) & 0xffffffff);
  heap.setU16((0x008874dc + unaff_EDI), (0xffff) & 0xffff);
  heap.setU8((0x008874ef + unaff_EDI) >>> 0, 0xff);
  heap.setU16((0x008874de + unaff_EDI), (0) & 0xffff);
  heap.setU16((0x008874e0 + unaff_EDI), (0) & 0xffff);
  heap.setU16((0x008874e2 + unaff_EDI), (0) & 0xffff);
  heap.setU8((0x008874e4 + unaff_EDI) >>> 0, 0);
  heap.setU8((0x008874e5 + unaff_EDI) >>> 0, 0);
  heap.setU32((0x008874e8 + unaff_EDI), (0) & 0xffffffff);
  heap.setU16((0x008874ec + unaff_EDI), (0) & 0xffff);
  heap.setU8((0x008874ee + unaff_EDI) >>> 0, 0);
  heap.setU8((0x008874e7 + unaff_EDI) >>> 0, 0);
  heap.setU8((0x008874a5 + unaff_EDI) >>> 0, 0);
  heap.setU32((0x008874b4 + unaff_EDI), (0) & 0xffffffff);
  heap.setU16((0x008874c4 + unaff_EDI), (0) & 0xffff);
  heap.setU32((0x008874b8 + unaff_EDI), (0) & 0xffffffff);
  heap.setU16((0x008874c6 + unaff_EDI), (0) & 0xffff);
  heap.setU32((0x008874bc + unaff_EDI), (0) & 0xffffffff);
  heap.setU16((0x008874c8 + unaff_EDI), (0) & 0xffff);
  heap.setU32((0x008874c0 + unaff_EDI), (0) & 0xffffffff);
  heap.setU16((0x008874ca + unaff_EDI), (0) & 0xffff);
  return (regs.eax = 0xb, regs.eax = FUN_005e5301(heap));
}
