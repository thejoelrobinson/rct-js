// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/427377.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_0042756b } from "./42756b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
import { FUN_005e687d } from "./5e687d.js";
export function FUN_00427377(heap) {
  let bVar2 = 0;
  bVar2 = true;
  FUN_005e5fcb(heap);
  if (bVar2) {
    FUN_0042756b(heap);
    heap.u32(unaff_ESI + (0x57) * 4) = 0xffffffff;
  }
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u32((unaff_ESI + 0x5d)) == heap.u32(0x00991f5a))) && (heap.u32((unaff_ESI + 0xc)) == heap.u32(0x00991f58))) {
    FUN_005e687d(heap);
  }
  LOCK();
  puVar1 = heap.u32(unaff_ESI + (2) * 4);
  heap.u32(unaff_ESI + (2) * 4) = 0;
  UNLOCK();
  if (puVar1 != 0x0) {
    heap.u32(puVar1) = 0;
  }
  heap.u32((unaff_ESI + 0x59)) = 2;
  FUN_005e43de(heap);
  heap.u32(unaff_ESI + (7) * 4) = heap.u32(0x005f508c);
  heap.u32(unaff_ESI + (3) * 4) = heap.u32(0x005f50e0);
  heap.u32(unaff_ESI + (6) * 4) = heap.u32(0x005f50fc);
  heap.u32(unaff_ESI) = heap.u32(0x005f50a8);
  heap.u32(unaff_ESI + (1) * 4) = heap.u32(0x005f50c4);
  heap.u32(unaff_ESI + (5) * 4) = 0;
  FUN_005e412c(heap);
  return;
}
