// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3bbf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e3bbf(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let puVar1 = 0;
  if ((((-1 < (in_DX | 0)) && (0x1d < in_AX)) && ((((in_DX + unaff_BX)) << 16 >> 16) <= heap.u32(0x00971ed6))) && ((((in_AX + in_CX)) << 16 >> 16) <= heap.u32(0x00971ed8))) {
    puVar1 = ((0x009a013c) >>> 0);
    while (true) {
      if (heap.u32(0x009a1164) <= puVar1) {
        return in_AX;
      }
      if ((((heap.u16((puVar1 + 0x32)) & 1) == 0) && (heap.i16((puVar1 + 0x20)) < (((in_DX + unaff_BX)) << 16 >> 16))) && ((in_DX < (((heap.i16((puVar1 + 0x20)) + heap.i16((puVar1 + 0x24)))) << 16 >> 16) && ((heap.i16((puVar1 + 0x22)) < (((in_AX + in_CX)) << 16 >> 16) && (in_AX < (((heap.i16((puVar1 + 0x22)) + heap.i16((puVar1 + 0x26)))) << 16 >> 16))))))) {
        break;
      }
      puVar1 = ((puVar1 + 0x178) >>> 0);
    }
  }
  return in_AX;
}
