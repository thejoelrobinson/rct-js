// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4171c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004170f0 } from "./4170f0.js";
export function FUN_004171c0(heap, param_1) {
  let iVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  let iVar4 = 0;
  iVar2 = 0;
  iVar4 = 0;
  iVar3 = 0;
  if (0 < heap.u32(0x005f3e40)) {
    do {
      iVar1 = heap.u32((heap.u32(0x005f2e20) + iVar3 * 4));
      if ((iVar1 != 0) && ((heap.u32((iVar1 + 0xc)) & 0x83) != 0)) {
        if (param_1 == 1) {
          iVar1 = FUN_004170f0(heap, iVar1);
          if (iVar1 != -1) {
            iVar2 = iVar2 + 1;
          }
        } else {
          if ((param_1 == 0) && ((heap.u32((iVar1 + 0xc)) & 2) != 0)) {
          iVar1 = FUN_004170f0(heap, iVar1);
          if (iVar1 == -1) {
            iVar4 = -1;
          }
        }
        }
      }
      iVar3 = iVar3 + 1;
    } while (iVar3 < heap.u32(0x005f3e40));
  }
  if (param_1 != 1) {
    iVar2 = iVar4;
  }
  return iVar2;
}
