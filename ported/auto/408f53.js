// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408f53.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
export function FUN_00408f53(heap, param_1) {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  if ((heap.u32((param_1 + 3)) == 0) && (heap.u32(param_1 + (0x20) * 4) != 0)) {
    do {
      iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(param_1 + (0x20) * 4)) + 100))))(heap.u32(param_1 + (0x20) * 4), 0, param_1 + 5, 1, 0);
      if ((iVar1 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(heap), iVar2 == 0)) {
        break;
      }
    } while (iVar1 == -0x7789fe3e);
    if (iVar1 == 0) {
      heap.u32(param_1) = heap.u32(param_1 + (0xe) * 4);
      heap.u32((param_1 + 1)) = 4;
      heap.u32((param_1 + 6)) = heap.u32(param_1 + (8) * 4);
      heap.u32((param_1 + 2)) = heap.u32(param_1 + (7) * 4);
      heap.u32(param_1 + (4) * 4) = heap.u32(param_1 + (9) * 4);
      heap.u32((param_1 + 10)) = 1;
      heap.u32((param_1 + 3)) = 1;
      uVar3 = 1;
    } else {
      uVar3 = 0;
    }
  } else {
    uVar3 = 0;
  }
  return uVar3;
}
