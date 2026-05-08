// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42dfd1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
export function FUN_0042dfd1(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  let unaff_ESI = 0;
  let in_ZF = 0;
  FUN_00444bd4(heap);
  if (!in_ZF) {
    heap.setU32((unaff_ESI + (0x14) * 4), (0xd) >>> 0);
    heap.setU32((unaff_ESI + (9) * 4), (0x16) >>> 0);
    heap.setU32((unaff_ESI + (0x15) * 4), (0xb) >>> 0);
    heap.setU32(unaff_ESI, (2) >>> 0);
    FUN_00444927(heap);
    heap.setU32((unaff_ESI + (1) * 4), (7) >>> 0);
    heap.setU32((unaff_ESI + 0x26), (0) >>> 0);
    heap.setU32((unaff_ESI + 0x24), (unaff_BX) >>> 0);
  }
  return CONCAT44(in_EDX, in_EAX);
}
