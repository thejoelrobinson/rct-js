// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fd81.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_004447f6 } from "./4447f6.js";
export function FUN_0042fd81(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  heap.setU8(0x005f8d35, (1) & 0xff);
  iVar1 = (((regs.eax = FUN_004083b5(heap, 0x0099aa88))) >>> 0);
  bVar2 = (((iVar1 | 0) != -1) & 0xff);
  if ((iVar1 | 0) != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    (regs.eax = FUN_0042fa5f(heap));
    if (!bVar2) {
      (regs.eax = FUN_0042f96d(heap));
      (regs.eax = FUN_0042f98e(heap));
      iVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)))) >>> 0);
      heap.setU32(0x0099fe00, (0) >>> 0);
      if (heap.u32(0x0087d79c) == 0) {
        iVar1 = (((regs.eax = FUN_004447f6(heap))) >>> 0);
      }
      return iVar1;
    }
    iVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)))) >>> 0);
  }
  return iVar1;
}
