// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45192e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_0044a3ba } from "./44a3ba.js";
export function FUN_0045192e(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887442 = __sp + 0;
  const __addr_DAT_00887444 = __sp + 4;
  try {
  let puVar1 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  FUN_0044a3ba(heap);
  if (heap.u32((unaff_ESI + 8)) != 0) {
    puVar1 = (heap.u32((unaff_ESI + 8)) + 0x12);
    heap.setU32(puVar1, (heap.u32(puVar1) | 0x800) >>> 0);
  }
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0045192e"); })();
  unique0x00017200 = heap.u32((__addr_DAT_00887444) + ((in_EDX & 0xff) * 0x98) * 4);
  FUN_0042c711(heap);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
