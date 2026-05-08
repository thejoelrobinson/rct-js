// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433f20.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00433f8b } from "./433f8b.js";
import { FUN_009b35b4 } from "./9b35b4.js";
export function FUN_00433f20(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  iVar2 = heap.u32(0x005f96e4);
  while (iVar2 = heap.u32((iVar2 + 0x20)), iVar3 = iVar2, iVar2 != 0) {
    while (true) {
      FUN_009b35b4(heap);
      FUN_00433f8b(heap);
      if (heap.u32((iVar3 + 0x1c)) == 0) {
        break;
      }
      iVar3 = heap.u32((iVar3 + 0x1c));
    }
    for (iVar1 = heap.u32((iVar3 + 0x18)); iVar1 != 0; iVar1 = heap.u32((iVar1 + 8))) {
      FUN_009b35b4(heap, iVar3);
      FUN_00433f8b(heap);
    }
  }
  return;
}
