// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d316.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0042d316(heap) {
  let iVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let pbVar2 = 0;
  pbVar2 = ((0x008d8a3c) >>> 0);
  iVar1 = ((0) >>> 0);
  while (true) {
    if (heap.u8(pbVar2) == 0) {
      return -1;
    }
    if (in_DX < 0x2a) {
      break;
    }
    pbVar2 = ((pbVar2 + 0x10c) >>> 0);
    iVar1 = ((iVar1 + 1) >>> 0);
    in_DX = ((in_DX + -0x2a) & 0xffff);
    if (0x008dbe94 <= pbVar2) {
      return -1;
    }
  }
  if ((((heap.u8(pbVar2 + (1)) & 1) == 0) && (0xd < in_DX)) && (in_DX < 0x26)) {
    if ((in_CX < 0x148) || (0x15f < in_CX)) {
      if ((0x15f < in_CX) && ((in_CX < 0x178 && ((heap.u32((0x005f5540) + (heap.u8(pbVar2)) * 4) & 1) != 0)))) {
        return iVar1;
      }
    } else {
      if ((heap.u32((0x005f5540) + (heap.u8(pbVar2)) * 4) & 2) != 0) {
      return iVar1;
    }
    }
  }
  return iVar1;
}
