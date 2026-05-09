// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f999.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042f91e } from "./42f91e.js";
export function FUN_0042f999(heap) {
  let uVar1 = 0;
  if (heap.u8(0x005f88ae) != 0) {
    if (heap.u8(0x005f88ae) < 0) {
      if (heap.u8(0x005f8d34) != 0) {
        heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + -1) & 0xff);
        return heap.u32(0x005f8cb4);
      }
    } else {
      if (heap.u8(0x005f8d34) != 0) {
      heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + -1) & 0xff);
      uVar1 = (((regs.eax = FUN_0042f91e(heap))) & 0xff);
      return uVar1;
    }
    }
  }
  heap.setU8(0x005f8d34, ((regs.eax = FUN_0042f91e(heap))) & 0xff);
  if (-1 < (heap.u8(0x005f8d34) | 0)) {
    heap.setU8(0x005f88ae, (1) & 0xff);
    uVar1 = (((regs.eax = FUN_0042f91e(heap))) & 0xff);
    return uVar1;
  }
  heap.setU8(0x005f88ae, (0xff) & 0xff);
  heap.setU8(0x005f8d34, (-heap.u8(0x005f8d34)) & 0xff);
  heap.setU32(0x005f8cb4, ((regs.eax = FUN_0042f91e(heap))) >>> 0);
  return heap.u32(0x005f8cb4);
}
