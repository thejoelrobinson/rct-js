// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440072.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0043fe80 } from "./43fe80.js";
import { FUN_0043fecb } from "./43fecb.js";
import { FUN_004400eb } from "./4400eb.js";
import { FUN_00455a66 } from "./455a66.js";
import { FUN_00455ade } from "./455ade.js";
import { FUN_00455c5b } from "./455c5b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00440072(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00743bbf = __sp + 0;
  try {
  let in_EDX = 0;
  let bVar1 = 0;
  bVar1 = heap.u32((in_EDX + 0x2e)) == '\x01';
  if (!bVar1) {
    FUN_005e5fcb(heap);
    if (bVar1) {
      FUN_004400eb(heap);
      heap.u32(unaff_ESI + (0x57) * 4) = 0xffffffff;
    }
    heap.u32((unaff_ESI + 0x59)) = 0;
    FUN_005e43de(heap);
    heap.u32(unaff_ESI + (7) * 4) = heap.u32(0x00629138);
    heap.u32(unaff_ESI + (3) * 4) = heap.u32(0x00629180);
    heap.u32(unaff_ESI + (6) * 4) = heap.u32(0x00629198);
    heap.u32(unaff_ESI) = heap.u32(0x00629150);
    heap.u32(unaff_ESI + (1) * 4) = heap.u32(0x00629168);
    heap.u32(unaff_ESI + (5) * 4) = 0;
    FUN_0043fe80(heap);
    FUN_005e412c(heap);
    FUN_0043fecb(heap);
    return;
  }
  FUN_005e5fcb(heap);
  if (bVar1) {
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
  if (heap.u32((__addr_DAT_00743bbf) + (heap.u32((unaff_ESI + 0xc)) * 0x100) * 4) == '\t') {
    (heap.u32(heap.u32(unaff_ESI + (1) * 4)))();
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
