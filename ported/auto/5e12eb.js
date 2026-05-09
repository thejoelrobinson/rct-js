// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e12eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e13d2 } from "./5e13d2.js";
import { FUN_009bb355 } from "./9bb355.js";
export function FUN_005e12eb(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar1 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let puVar2 = 0;
  (regs.eax = FUN_009bb355(heap));
  heap.setU32(0x0099fb94, (in_DX - in_AX) >>> 0);
  heap.setU32(0x0099fb98, (-((heap.u32(0x0099fb94) - heap.u32(0x0099fb84)) - heap.u32(0x0099fb88))) >>> 0);
  heap.setU32(0x0099fb96, (unaff_BP - unaff_BX) >>> 0);
  uVar1 = ((((unaff_BX) >>> 0)) >>> 0);
  heap.setU32(0x0099fb8c, (heap.u32(0x0099fb7c) + in_AX + ((heap.u32(0x0099fb84) + heap.u32(0x0099fb88)) & 0xffff) * uVar1) >>> 0);
  heap.setU32(0x0099fb90, (in_AX) >>> 0);
  heap.setU32(0x0099fb92, (unaff_BX) >>> 0);
  for (puVar2 = ((0x009a013c) >>> 0); puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
    if (((((heap.u16((puVar2 + 0x32)) & 0x10) == 0) && (heap.i16((puVar2 + 0x20)) < in_DX)) && (heap.i16((puVar2 + 0x22)) < unaff_BP)) && ((in_AX < (((heap.i16((puVar2 + 0x20)) + heap.i16((puVar2 + 0x24)))) << 16 >> 16) && (((uVar1) << 16 >> 16) < (((heap.i16((puVar2 + 0x22)) + heap.i16((puVar2 + 0x26)))) << 16 >> 16))))) {
      (regs.eax = FUN_005e13d2(heap));
      uVar1 = ((uVar1 & 0xffff) >>> 0);
    }
  }
  return;
}
