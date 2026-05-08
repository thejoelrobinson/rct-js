// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40840d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteFileA } from "../../runtime/win32.js";
export function FUN_0040840d(heap, param_1) {
  let BVar1 = 0;
  let uVar2 = 0;
  BVar1 = DeleteFileA(heap, param_1);
  if (BVar1 == 0) {
    uVar2 = 0xffffffff;
  } else {
    uVar2 = 0;
  }
  return uVar2;
}
