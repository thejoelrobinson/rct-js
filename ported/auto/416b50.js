// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416b50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00416c00 } from "./416c00.js";
import { FUN_00416c30 } from "./416c30.js";
import { FUN_00418630 } from "./418630.js";
import { FUN_004186d0 } from "./4186d0.js";
export function FUN_00416b50(heap, param_1, param_2, param_3, param_4) {
  let cVar1 = 0;
  heap.setU32(0x005f0250, (FUN_004186d0(heap, heap.u32(param_1), heap.u32(param_1 + (1) * 4))) >>> 0);
  heap.setU32(0x005f0258, (heap.u32(heap.u32(0x005f0250) + (1) * 4) + -1) >>> 0);
  pcVar2 = ((uint)(heap.u32(heap.u32(0x005f0250)) == 0x2d) + param_2);
  FUN_00418630(heap, pcVar2, param_3, heap.u32(0x005f0250));
  heap.setU32(0x005f025c, (heap.u32(0x005f0258) < heap.u32(heap.u32(0x005f0250) + (1) * 4) + -1) >>> 0);
  heap.setU32(0x005f0258, (heap.u32(heap.u32(0x005f0250) + (1) * 4) + -1) >>> 0);
  if ((-5 < heap.u32(0x005f0258)) && (heap.u32(0x005f0258) < param_3)) {
    if (heap.u32(0x005f025c)) {
      cVar1 = heap.u32(pcVar2);
      while (cVar1 != '\0') {
        cVar1 = heap.u32(pcVar2 + (1) * 4);
        pcVar2 = pcVar2 + 1;
      }
      heap.u32(pcVar2 + (-1) * 4) = '\0';
    }
    FUN_00416c30(heap, param_1, param_2, param_3);
    return;
  }
  FUN_00416c00(heap, param_1, param_2, param_3, param_4);
  return;
}
