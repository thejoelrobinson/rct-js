// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fc2c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fb22 } from "./42fb22.js";
export function FUN_0042fc2c(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  heap.setU8(0x005f8d35, (1) & 0xff);
  uVar1 = (((regs.eax = FUN_004083b5(heap, 0x0099aa88))) >>> 0);
  bVar2 = ((uVar1 != 0xffffffff) & 0xff);
  if (uVar1 != 0xffffffff) {
    heap.setU32(0x005f88a4, (uVar1) >>> 0);
    (regs.eax = FUN_0042fb22(heap));
    if (bVar2) {
      uVar1 = (((regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)))) >>> 0);
    } else {
      (regs.eax = FUN_0042f96d(heap));
      (regs.eax = FUN_0042f98e(heap));
      (regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)));
      uVar1 = ((((heap.u32(0x00656b3b) >>> 2) >>> 0)) >>> 0);
      if (heap.u32(0x00656b3b) >>> 2 == 0) {
        return 0;
      }
    }
  }
  return uVar1;
}
