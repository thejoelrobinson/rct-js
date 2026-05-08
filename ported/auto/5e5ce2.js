// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5ce2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_005e5ce2(heap) {
  let uVar1 = 0;
  let unaff_BX = 0;
  let unaff_BP = 0;
  let unaff_ESI = 0;
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xfffffff9) >>> 0);
  if (unaff_BX < 0) {
    heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 2) >>> 0);
  }
  heap.setU32(0x009a15bd, (FUN_005e5b80(heap)) >>> 0);
  heap.setU32(0x009a15c4, ((unaff_BX & 0x7fff) * 10 + 0xb) >>> 0);
  heap.setU32(0x009a15c0, (unaff_BP + 3) >>> 0);
  heap.setU32(0x009a1244, (unaff_BX & 0x7fff) >>> 0);
  FUN_005e3f31(heap);
  heap.u32((unaff_ESI + 0x1c)) = 0x009a15bc;
  if ((heap.u32(0x009a15bd) & 0x80) != 0) {
    heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) | 0x10;
  }
  puVar2 = 0x009a1248;
  uVar1 = heap.u32(0x009a1244);
  do {
    heap.u32(puVar2) = 0;
    puVar2 = puVar2 + 1;
    uVar1 = uVar1 - 1;
  } while (uVar1 != 0);
  heap.setU32(0x009a1246, (0xffff) >>> 0);
  heap.setU32(0x009a13d8, (0) >>> 0);
  heap.setU32(0x009a13dc, (0) >>> 0);
  heap.setU32(0x00991f36, (5) >>> 0);
  return;
}
