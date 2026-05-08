// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4167c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00416f60 } from "./416f60.js";
import { FUN_00418010 } from "./418010.js";
export function FUN_004167c0(heap, param_1) {
  let cVar1 = 0;
  let cVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  iVar3 = FUN_00418010(heap, heap.u32(param_1));
  if (iVar3 != 0x65) {
    do {
      param_1 = param_1 + 1;
      if (heap.u32(0x005ee754) < 2) {
        uVar4 = heap.u32(heap.u32(0x005ee548) + (heap.u32(param_1) * 2) * 4) & 4;
      } else {
        uVar4 = FUN_00416f60(heap, heap.u32(param_1), 4);
      }
    } while (uVar4 != 0);
  }
  cVar2 = heap.u32(param_1);
  heap.u32(param_1) = heap.u32(0x005ee758);
  do {
    param_1 = param_1 + 1;
    cVar1 = heap.u32(param_1);
    heap.u32(param_1) = cVar2;
    cVar2 = cVar1;
  } while (heap.u32(param_1) != '\0');
  return;
}
