// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fb22.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408210 } from "./408210.js";
import { FUN_00408254 } from "./408254.js";
import { FUN_00408276 } from "./408276.js";
export function FUN_0042fb22(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f88b0 = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  uVar1 = FUN_00408254(heap, heap.u32(0x005f88a4), 0);
  if (0xd < uVar1) {
    uVar1 = uVar1 - 4;
    FUN_00408210(heap, heap.u32(0x005f88a4), 0);
    do {
      uVar2 = uVar1;
      if (0x400 < uVar1) {
        uVar2 = 0x400;
      }
      FUN_00408276(heap, heap.u32(0x005f88a4), __addr_DAT_005f88b0, uVar2);
      uVar3 = uVar2;
      do {
        uVar3 = uVar3 - 1;
      } while (uVar3 != 0);
      uVar1 = uVar1 - uVar2;
    } while (uVar1 != 0);
    FUN_00408276(heap, heap.u32(0x005f88a4), __addr_DAT_005f88b0, 4);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
