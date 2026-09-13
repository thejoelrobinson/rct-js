// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406bdf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00411324 } from "./411324.js";
export function FUN_00406bdf(heap, param_1, param_2) {
  let uVar1 = 0;
  let iVar2 = 0;
  if ((heap.u32(0x005ebedc) == 0) || (heap.u32(0x005ebee0) == 0)) {
    uVar1 = ((2) >>> 0);
  } else {
    if ((heap.u32(0x005ec148) == 0) || (heap.u32(0x005ec1c4) != 0)) {
    uVar1 = ((1) >>> 0);
  } else {
    iVar2 = (((regs.eax = FUN_00411324(heap, heap.u32(0x005ebee0), param_1, param_2))) >>> 0);
    if (iVar2 == 0) {
      uVar1 = ((3) >>> 0);
    } else {
      uVar1 = ((0) >>> 0);
    }
  }
  }
  return uVar1;
}
