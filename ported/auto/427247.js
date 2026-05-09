// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/427247.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004528a0 } from "./4528a0.js";
import { FUN_004528c4 } from "./4528c4.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00427247(heap) {
  let unaff_EBX = regs.ebx >>> 0;
  if ((unaff_EBX & 1) != 0) {
    heap.setU8(0x0099c169, (heap.u8(0x0099c169) ^ 1) & 0xff);
    (regs.eax = FUN_005e5301(heap));
    if ((heap.u8(0x0099c169) & 1) == 0) {
      (regs.eax = FUN_004528c4(heap));
    } else {
      (regs.eax = FUN_004528a0(heap));
    }
  }
  return;
}
