// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b3000.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004080e0 } from "./4080e0.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_005df472 } from "./5df472.js";
import { FUN_009b308d } from "./9b308d.js";
export function FUN_009b3000(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_008dc0b4 = __sp + 0;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  FUN_0042f239(heap);
  iVar1 = FUN_004080e0(heap, 0, 0, 0);
  if (iVar1 != 0) {
    heap.setU32(0x009a2008, (iVar1) >>> 0);
    FUN_0042f239(heap);
    iVar1 = FUN_004083b5(heap, 1);
    if (iVar1 != -1) {
      FUN_00408276(heap, iVar1, __addr_DAT_008dc0b4, 0x95dd0, iVar1);
      FUN_00408387(heap, iVar1);
      iVar1 = heap.u32(0x009a2008);
      piVar3 = __addr_DAT_008dc0b4;
      iVar2 = 0x95dd;
      do {
        heap.u32(piVar3) = heap.u32(piVar3) + iVar1;
        piVar3 = piVar3 + 4;
        iVar2 = iVar2 + -1;
      } while (iVar2 != 0);
      if (0x1ffffff < heap.u32(0x005f14fc)) {
        FUN_009b308d(heap);
      }
      return;
    }
  }
  FUN_005df472(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
