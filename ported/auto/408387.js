// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408387.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CloseHandle } from "../../runtime/win32.js";
export function FUN_00408387(heap, param_1) {
  let BVar1 = 0;
  if (param_1 == 0x0) {
    BVar1 = 1;
  } else {
    BVar1 = CloseHandle(heap, param_1);
  }
  return BVar1;
}
