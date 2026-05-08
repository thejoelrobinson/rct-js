// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42727a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042756b } from "./42756b.js";
import { FUN_00428c0b } from "./428c0b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0042727a(heap) {
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e5fcb(heap);
  if (bVar1) {
    FUN_0042756b(heap);
    heap.u32(unaff_ESI + (0x57) * 4) = 0xffffffff;
  }
  heap.u32((unaff_ESI + 0x59)) = 0;
  FUN_005e43de(heap);
  heap.u32(unaff_ESI + (7) * 4) = heap.u32(0x005f5084);
  heap.u32(unaff_ESI + (3) * 4) = heap.u32(0x005f50d8);
  heap.u32(unaff_ESI + (6) * 4) = heap.u32(0x005f50f4);
  heap.u32(unaff_ESI) = heap.u32(0x005f50a0);
  heap.u32(unaff_ESI + (1) * 4) = heap.u32(0x005f50bc);
  heap.u32(unaff_ESI + (5) * 4) = 0;
  FUN_005e412c(heap);
  FUN_00428c0b(heap);
  return;
}
