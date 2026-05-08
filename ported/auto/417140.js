// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417140.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00417a60 } from "./417a60.js";
export function FUN_00417140(heap, param_1) {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = 0;
  if (((heap.u32(param_1 + (3) * 4) & 3) == 2) && ((heap.u32(param_1 + (3) * 4) & 0x108U) != 0)) {
    iVar4 = heap.u32(param_1) - heap.u32(param_1 + (2) * 4);
    if (0 < iVar4) {
      iVar2 = FUN_00417a60(heap, heap.u32(param_1 + (4) * 4), heap.u32(param_1 + (2) * 4), iVar4);
      uVar1 = heap.u32(param_1 + (3) * 4);
      if (iVar2 == iVar4) {
        if ((uVar1 & 0x80) != 0) {
          heap.u32(param_1 + (1) * 4) = 0;
          heap.u32(param_1 + (3) * 4) = uVar1 & 0xfffffffd;
          heap.u32(param_1) = heap.u32(param_1 + (2) * 4);
          return 0;
        }
      } else {
        uVar3 = 0xffffffff;
        heap.u32(param_1 + (3) * 4) = uVar1 | 0x20;
      }
    }
  }
  heap.u32(param_1 + (1) * 4) = 0;
  heap.u32(param_1) = heap.u32(param_1 + (2) * 4);
  return uVar3;
}
