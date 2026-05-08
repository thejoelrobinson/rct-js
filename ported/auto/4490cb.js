// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4490cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../runtime/win32.js";
export function FUN_004490cb(heap) {
  let in_EAX = 0;
  let cVar1 = 0;
  let uVar2 = 0;
  cVar1 = (heap.u32(0x00630b16) >>> 2);
  uVar2 = CONCAT11(heap, heap.u32(0x00630b28), cVar1);
  if ((heap.u32(0x00630b19) != '\0') && (heap.u32(0x00630b19) != '\x02')) {
    uVar2 = CONCAT11(heap, heap.u32(0x00630b28), cVar1 + -4);
  }
  return CONCAT24(heap, uVar2, CONCAT22(heap, (in_EAX >>> 0x10), heap.u32(0x00630b12) + heap.u32((0x00652478) + (heap.u32(0x00630b18) * 2) * 4)));
}
