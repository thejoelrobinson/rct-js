// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d4a8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004080e0 } from "./4080e0.js";
import { FUN_00408254 } from "./408254.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042d56c } from "./42d56c.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_0043054e } from "./43054e.js";
import { FUN_0045268c } from "./45268c.js";
import { FUN_00452835 } from "./452835.js";
import { FUN_005e698a } from "./5e698a.js";
import { FUN_009bb4b4 } from "./9bb4b4.js";
import { FUN_009bb717 } from "./9bb717.js";
import { FUN_009bb9f5 } from "./9bb9f5.js";
export function FUN_0042d4a8(heap) {
  let pcVar1 = 0;
  let iVar2 = 0;
  (regs.ebx = 0x13, regs.eax = FUN_0042f239(heap));
  iVar2 = (((regs.eax = FUN_004083b5(heap, 0x13))) >>> 0);
  if ((iVar2 | 0) != -1) {
    heap.setU32(0x005f5550, (iVar2) >>> 0);
    heap.setU32(0x005f5554, ((regs.eax = FUN_00408254(heap, iVar2, 0))) >>> 0);
    (regs.eax = FUN_00408387(heap, heap.u32(0x005f5550)));
    (regs.ebx = 0x13, regs.eax = FUN_0042f239(heap));
    iVar2 = (((regs.eax = FUN_004080e0(heap, 0x13, 0, 0))) >>> 0);
    if (iVar2 != 0) {
      heap.setU32(0x005f5554, (heap.u32(0x005f5554) + iVar2) >>> 0);
      heap.setU32(0x005f554c, (iVar2) >>> 0);
      heap.setU32(0x005f5550, (iVar2) >>> 0);
      if (heap.u8(0x005f8d5b) != 1) {
        (regs.eax = FUN_005e698a(heap));
        (regs.eax = FUN_00452835(heap));
        (regs.eax = FUN_009bb4b4(heap));
        heap.setU32(0x005e9184, (0) >>> 0);
        (regs.eax = FUN_009bb9f5(heap));
        (regs.eax = FUN_009bb717(heap));
        (regs.eax = FUN_0045268c(heap));
      }
      heap.setU8(0x0099c16b, (1) & 0xff);
      iVar2 = ((-1) >>> 0);
      do {
        pcVar1 = ((0x0043091b + iVar2) >>> 0);
        iVar2 = ((iVar2 + 1) >>> 0);
      } while (heap.i8(pcVar1) != 2);
      (regs.eax = FUN_0043054e(heap));
      (regs.eax = FUN_0042d56c(heap));
    }
  }
  return;
}
