// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/424db7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_00424db7(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let unaff_ESI = 0;
  let bVar3 = 0;
  bVar3 = false;
  if ((heap.u32(0x005f4948) == '\0') && (FUN_005e68e2(heap), !bVar3)) {
    puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
    uVar2 = heap.u32(puVar1);
    heap.setU32(puVar1, (heap.u32(puVar1) | 0x100) >>> 0);
    if ((uVar2 >>> 8 & 1) == 0) {
      FUN_005e43de(heap);
    }
  }
  heap.setU32(0x005f4948, (heap.u32(0x005f4948) + '\x01') >>> 0);
  return;
}
