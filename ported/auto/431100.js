// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/431100.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004310fa } from "./4310fa.js";
import { FUN_0043115d } from "./43115d.js";
import { FUN_004312bf } from "./4312bf.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00431100(heap) {
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_0043115d(heap);
    FUN_004312bf(heap);
  }
  heap.u32((unaff_ESI + 0x59)) = 1;
  FUN_005e43de(heap);
  heap.u32(unaff_ESI + (7) * 4) = heap.u32(0x005f967c);
  heap.u32(unaff_ESI + (3) * 4) = heap.u32(0x005f9694);
  heap.u32(unaff_ESI + (6) * 4) = heap.u32(0x005f969c);
  heap.u32(unaff_ESI) = heap.u32(0x005f9684);
  heap.u32(unaff_ESI + (1) * 4) = heap.u32(0x005f968c);
  heap.u32(unaff_ESI + (5) * 4) = 0;
  FUN_004310fa(heap);
  FUN_005e412c(heap);
  return;
}
