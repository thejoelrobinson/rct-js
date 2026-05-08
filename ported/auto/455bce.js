// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455bce.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00455a66 } from "./455a66.js";
import { FUN_00455ade } from "./455ade.js";
import { FUN_00455c5b } from "./455c5b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00455bce(heap) {
  let in_ZF = 0;
  FUN_005e5fcb(heap);
  if (in_ZF) {
    FUN_00455c5b(heap);
    heap.u32(unaff_ESI + (0x57) * 4) = 0xffffffff;
  }
  heap.u32((unaff_ESI + 0x59)) = 0;
  FUN_005e43de(heap);
  heap.u32(unaff_ESI + (7) * 4) = heap.u32(0x00632d8c);
  heap.u32(unaff_ESI + (3) * 4) = heap.u32(0x00632db0);
  heap.u32(unaff_ESI + (6) * 4) = heap.u32(0x00632dbc);
  heap.u32(unaff_ESI) = heap.u32(0x00632d98);
  heap.u32(unaff_ESI + (1) * 4) = heap.u32(0x00632da4);
  heap.u32(unaff_ESI + (5) * 4) = 0;
  FUN_00455a66(heap);
  FUN_005e412c(heap);
  FUN_00455ade(heap);
  if (heap.u32((0x00743bbf) + ((uint) * (unaff_ESI + 0xc) * 0x100) * 4) == '\t') {
    (heap.u32(heap.u32(unaff_ESI + (1) * 4)))();
  }
  return;
}
