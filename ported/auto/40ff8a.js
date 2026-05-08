// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ff8a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040f685 } from "./40f685.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040ff8a(heap, param_1, param_2) {
  let iVar1 = 0;
  let iVar3 = 0;
  let local_10 = 0;
  iVar1 = FUN_004133c0(heap, 0xa8);
  if (iVar1 != 0) {
    piVar2 = FUN_004133c0(heap, 8);
    if (piVar2 != 0x0) {
      heap.u32(piVar2) = iVar1;
      heap.u32(piVar2 + (1) * 4) = 0;
      iVar3 = FUN_0040f685(heap, iVar1, param_1, param_2);
      if (iVar3 != 0) {
        local_10 = heap.u32(0x005ec0d0);
        if (heap.u32(0x005ec0d0) == 0x0) {
          heap.setU32(0x005ec0d0, (piVar2) >>> 0);
          return iVar1;
        }
        for (; heap.u32((local_10 + 4)) != 0; local_10 = heap.u32((local_10 + 4))) {
        
        }
        heap.u32((local_10 + 4)) = piVar2;
        return iVar1;
      }
      FUN_00413470(heap, piVar2);
    }
    FUN_00413470(heap, iVar1);
  }
  return 0;
}
