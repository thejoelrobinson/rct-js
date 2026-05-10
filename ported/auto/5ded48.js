// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ded48.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e4198 } from "./5e4198.js";
export function FUN_005ded48(heap) {
  let uVar1 = 0;
  let extraout_CX = 0;
  let uVar2 = 0;
  let psVar3 = 0;
  let sVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  sVar4 = ((0) & 0xffff);
  for (psVar3 = ((heap.u32((0x006e2788) + (heap.u32(0x006e1eaa)) * 4)) >>> 0); (heap.i16(psVar3) | 0) != -1; psVar3 = (((psVar3 + ((1) * 2)) >>> 0)) >>> 0) {
    if (heap.i16(psVar3) == heap.u32((0x006e1eab) + (heap.u32(0x006e1eaa)) * 4)) {
      uVar1 = (((heap.u32(0x006e1e44) - heap.u32(0x006e1e42)) - 1) & 0xffff);
      uVar2 = ((extraout_CX - uVar1) & 0xffff);
      if (extraout_CX < uVar1) {
        uVar2 = ((0) & 0xffff);
      }
      uVar1 = ((sVar4 * 0x42) & 0xffff);
      if (uVar2 < ((sVar4 * 0x42) & 0xffff)) {
        uVar1 = ((uVar2) & 0xffff);
      }
      heap.setU16((unaff_ESI + 0x36), (uVar1) & 0xffff);
      return (regs.eax = 0xfffa, regs.edi = 0x6e1e40, regs.eax = FUN_005e4198(heap));
    }
    sVar4 = ((sVar4 + 1) & 0xffff);
  }
  sVar4 = ((0) & 0xffff);
  LAB_005ded7f: uVar1 = (((heap.u32(0x006e1e44) - heap.u32(0x006e1e42)) - 1) & 0xffff);
  uVar2 = ((extraout_CX - uVar1) & 0xffff);
  if (extraout_CX < uVar1) {
    uVar2 = ((0) & 0xffff);
  }
  uVar1 = ((sVar4 * 0x42) & 0xffff);
  if (uVar2 < ((sVar4 * 0x42) & 0xffff)) {
    uVar1 = ((uVar2) & 0xffff);
  }
  heap.setU16((unaff_ESI + 0x36), (uVar1) & 0xffff);
  return (regs.eax = 0xfffa, regs.edi = 0x6e1e40, regs.eax = FUN_005e4198(heap));
}
