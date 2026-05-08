// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c65e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c65e(heap) {
  let bVar1 = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  bVar1 = heap.u32((unaff_ESI + 0x6f));
  uVar3 = bVar1;
  if (bVar1 != heap.u32((unaff_ESI + 0x6e))) {
    FUN_005e53ca(heap);
    heap.u32((unaff_ESI + 0x6e)) = bVar1;
    puVar2 = heap.u32((0x0062d644) + ((uint) * (unaff_ESI + 0x2d) * 2) * 4);
    heap.u32((unaff_ESI + 0x14)) = heap.u32(puVar2 + (uVar3 * 4) * 4);
    heap.u32((unaff_ESI + 9)) = heap.u32(puVar2 + (uVar3 * 4 + 1) * 4);
    heap.u32((unaff_ESI + 0x15)) = heap.u32(puVar2 + (uVar3 * 4 + 2) * 4);
    FUN_005e53ca(heap);
  }
  return;
}
