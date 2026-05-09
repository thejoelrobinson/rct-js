// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406a97.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00406ce7 } from "./406ce7.js";
import { FUN_00410d3d } from "./410d3d.js";
import { FUN_0041102c } from "./41102c.js";
import { FUN_00411041 } from "./411041.js";
import { FUN_004111ad } from "./4111ad.js";
export function FUN_00406a97(heap, param_1, param_2, param_3) {
  let iVar1 = 0;
  if (heap.u32(0x005ebed8) != 0) {
    (regs.eax = FUN_00406ce7(heap));
  }
  heap.setU32(0x005ebed8, (0) >>> 0);
  heap.setU32(0x005ebee0, (0) >>> 0);
  heap.setU32(0x005ebedc, (0) >>> 0);
  iVar1 = (((regs.eax = FUN_00410d3d(heap, param_1))) >>> 0);
  if ((iVar1 != 0) && (iVar1 = (((regs.eax = FUN_004111ad(heap, param_3, param_2))) >>> 0), iVar1 != 0)) {
    heap.setU32(0x005ebed8, (1) >>> 0);
    if (0 < heap.u32(0x005ec148)) {
      heap.setU32(0x005ebedc, (1) >>> 0);
      (regs.eax = FUN_0041102c(heap));
      heap.setU32(0x005ebee0, ((regs.eax = FUN_00411041(heap))) >>> 0);
    }
    return 1;
  }
  (regs.eax = FUN_00406ce7(heap));
  return 0;
}
