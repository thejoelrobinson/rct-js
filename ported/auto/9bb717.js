// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb717.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00405cc0 } from "./405cc0.js";
export function FUN_009bb717(heap) {
  let uVar1 = 0;
  puVar3 = (0x005f2000 + heap.u32(0x008dff1c) * 4);
  uVar1 = heap.u32(0x008dff18);
  puVar2 = heap.u32(0x008dff14);
  do {
    heap.u32(puVar3) = heap.u32(puVar2);
    heap.u32((puVar3 + 1)) = heap.u32((puVar2 + 1));
    puVar2 = (puVar2 + 3);
    puVar3 = puVar3 + 2;
    uVar1 = uVar1 - 1;
  } while (uVar1 != 0);
  FUN_00405cc0(heap, 0x005f2000, 10, 0xec);
  return;
}
