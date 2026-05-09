// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408b7e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408a4d } from "./408a4d.js";
export function FUN_00408b7e(heap) {
  let iVar1 = 0;
  iVar1 = (((regs.eax = FUN_00408a4d(heap))) >>> 0);
  if (iVar1 != 0) {
    heap.setU32(0x005f1294, (heap.u32(0x005f1294) | 2) >>> 0);
  }
  return;
}
