// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40864b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetDlgItem, GetParent, ShowWindow } from "../runtime/win32.js";
export function FUN_0040864b(heap, param_1, param_2, param_3, param_4) {
  let pHVar1 = 0;
  if (param_2 == 0x4e) {
    if (heap.u32((param_4 + 8)) == -0x259) {
      pHVar1 = GetParent(heap, param_1);
      GetDlgItem(heap, pHVar1, 0x40e);
    }
  } else {
    if (param_2 == 0x110) {
    pHVar1 = GetParent(heap, param_1);
    pHVar1 = GetDlgItem(heap, pHVar1, 0x40e);
    if (pHVar1 != 0x0) {
      ShowWindow(heap, pHVar1, 5);
    }
  }
  }
  return 1;
}
