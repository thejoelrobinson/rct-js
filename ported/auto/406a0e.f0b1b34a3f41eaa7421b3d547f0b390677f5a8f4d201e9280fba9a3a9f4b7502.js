// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406a0e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00406ce7 } from "./406ce7.js";
import { FUN_00410c53 } from "./410c53.js";
import { FUN_004111ad } from "./4111ad.js";
export function FUN_00406a0e(heap, param_1, param_2, param_3) {
  let iVar1 = 0;
  if (heap.u32(0x005ebed8) != 0) {
    (regs.eax = FUN_00406ce7(heap));
  }
  heap.setU32(0x005ebed8, (0) >>> 0);
  heap.setU32(0x005ebee0, (0) >>> 0);
  heap.setU32(0x005ebedc, (0) >>> 0);
  iVar1 = (((regs.eax = FUN_00410c53(heap, param_1, 2))) >>> 0);
  if ((iVar1 != 0) && (iVar1 = (((regs.eax = FUN_004111ad(heap, param_3, param_2))) >>> 0), iVar1 != 0)) {
    heap.setU32(0x005ebed8, (1) >>> 0);
    return 1;
  }
  (regs.eax = FUN_00406ce7(heap));
  return 0;
}
