// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b3000.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004080e0 } from "./4080e0.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_005df472 } from "./5df472.js";
import { FUN_009b308d } from "./9b308d.js";
export function FUN_009b3000(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let piVar3 = 0;
  (regs.eax = FUN_0042f239(heap));
  iVar1 = (((regs.eax = FUN_004080e0(heap, 0, 0, 0))) >>> 0);
  if (iVar1 != 0) {
    heap.setU32(0x009a2008, (iVar1) >>> 0);
    (regs.eax = FUN_0042f239(heap));
    iVar1 = (((regs.eax = FUN_004083b5(heap, 1))) >>> 0);
    if ((iVar1 | 0) != -1) {
      (regs.eax = FUN_00408276(heap, iVar1, 0x008dc0b4, 0x95dd0, iVar1));
      (regs.eax = FUN_00408387(heap, iVar1));
      iVar1 = ((heap.u32(0x009a2008)) >>> 0);
      piVar3 = ((0x008dc0b4) >>> 0);
      iVar2 = ((0x95dd) >>> 0);
      do {
        heap.setU32(piVar3, (heap.i32(piVar3) + iVar1) & 0xffffffff);
        piVar3 = ((piVar3 + ((4) * 4)) >>> 0);
        iVar2 = ((iVar2 + -1) >>> 0);
      } while (iVar2 != 0);
      if (0x1ffffff < heap.u32(0x005f14fc)) {
        (regs.eax = FUN_009b308d(heap));
      }
      return;
    }
  }
  return (regs.eax = FUN_005df472(heap));
}
