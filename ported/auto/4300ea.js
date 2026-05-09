// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4300ea.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004046fc } from "./4046fc.js";
export function FUN_004300ea(heap) {
  let uVar1 = 0;
  uVar1 = (((regs.eax = FUN_004046fc(heap))) >>> 0);
  if (((heap.u32(0x005f1cbc) == 0x7ce) && (heap.u32(0x005f1394) == 0xc)) && (heap.u32(0x005f1ca4) == 0x14)) {
    return uVar1;
  }
  return uVar1;
}
