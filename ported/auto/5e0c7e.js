// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0c7e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
export function FUN_005e0c7e(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099fd70 = __sp + 0;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e3b2b(heap);
  if (bVar1) {
    FUN_005e3c3c(heap);
    heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_0099fd70;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x34;
    FUN_005e412c(heap);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
