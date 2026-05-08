// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4039ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CreateDialogParamA } from "../../runtime/win32.js";
import { FUN_004037cf } from "./4037cf.js";
export function FUN_004039ff(heap, param_1, param_2, param_3, param_4, param_5) {
  let bVar1 = 0;
  if (heap.u32(0x005e91e0) == 0x0) {
    heap.setU32(0x005f1fd4, (param_1) >>> 0);
    heap.setU32(0x005f1fc8, (param_2) >>> 0);
    heap.setU32(0x005f1390, (param_3) >>> 0);
    heap.setU32(0x005f13b0, (param_4) >>> 0);
    heap.setU32(0x005f1ca8, (param_5) >>> 0);
    heap.u32(param_4) = 0;
    heap.setU32(0x005e91e0, (CreateDialogParamA(heap, heap.u32(0x005f1398), 0x65, heap.u32(0x005e916c), FUN_004037cf, 0)) >>> 0);
    bVar1 = heap.u32(0x005e91e0) != 0x0;
  } else {
    bVar1 = false;
  }
  return bVar1;
}
