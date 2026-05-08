// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416cd0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00418810 } from "./418810.js";
export function FUN_00416cd0(heap, param_1, param_2) {
  let cVar1 = 0;
  let uVar2 = 0;
  if (param_2 != 0) {
    uVar2 = 0xffffffff;
    pcVar3 = param_1;
    do {
      if (uVar2 == 0) {
        break;
      }
      uVar2 = uVar2 - 1;
      cVar1 = heap.u32(pcVar3);
      pcVar3 = pcVar3 + 1;
    } while (cVar1 != '\0');
    FUN_00418810(heap, param_1 + param_2, param_1, ~uVar2);
  }
  return;
}
