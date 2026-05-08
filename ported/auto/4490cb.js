// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4490cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../../runtime/ghidra-builtins.js";
export function FUN_004490cb(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00652478 = __sp + 0;
  try {
  let in_EAX = 0;
  let cVar1 = 0;
  let uVar2 = 0;
  cVar1 = (heap.u32(0x00630b16) >>> 2);
  uVar2 = CONCAT11(heap.u32(0x00630b28), cVar1);
  if ((heap.u32(0x00630b19) != '\0') && (heap.u32(0x00630b19) != '\x02')) {
    uVar2 = CONCAT11(heap.u32(0x00630b28), cVar1 + -4);
  }
  return CONCAT24(uVar2, CONCAT22((in_EAX >>> 0x10), heap.u32(0x00630b12) + heap.u32((__addr_DAT_00652478) + (heap.u32(0x00630b18) * 2) * 4)));
} finally {
    heap.freeFrame(4);
  }
}
