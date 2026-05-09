// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4039bc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DialogBoxParamA } from "../../runtime/win32.js";
export function FUN_004039bc(heap, param_1, param_2, param_3) {
  heap.setU32(0x005f1fd4, (param_1) >>> 0);
  heap.setU32(0x005f1fc8, (param_2) >>> 0);
  heap.setU32(0x005f1390, (param_3) >>> 0);
  return DialogBoxParamA(heap, heap.u32(0x005f1398), ((0x65) >>> 0), heap.u32(0x005e916c), 0x00403625, 0);
}
