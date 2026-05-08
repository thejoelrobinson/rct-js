// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb4b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00401220 } from "./401220.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
export function FUN_009bb4b4(heap) {
  let in_AL = 0;
  let cVar1 = 0;
  if (in_AL == '\x01') {
    LAB_009bb511: heap.setU32(0x005f8d5b, (1) >>> 0);
    cVar1 = FUN_00401220(heap, 3);
    if (cVar1 != '\0') {
      /* goto LAB_009bb526 */ throw new Error("goto LAB_009bb526 not supported");
    }
  } else {
    if (in_AL == '\x02') {
      LAB_009bb4fc: heap.setU32(0x005f8d5b, (2) >>> 0);
      cVar1 = FUN_00401220(heap, 4);
      if (cVar1 != '\0') {
        /* goto LAB_009bb526 */ throw new Error("goto LAB_009bb526 not supported");
      }
      /* goto LAB_009bb511 */ throw new Error("goto LAB_009bb511 not supported");
    }
    if (in_AL == '\x03') {
      heap.setU32(0x005f8d5b, (3) >>> 0);
      cVar1 = FUN_00401220(heap, 5);
      if (cVar1 != '\0') {
        /* goto LAB_009bb526 */ throw new Error("goto LAB_009bb526 not supported");
      }
      /* goto LAB_009bb4fc */ throw new Error("goto LAB_009bb4fc not supported");
    }
  }
  heap.setU32(0x005f8d5b, (0) >>> 0);
  cVar1 = FUN_00401220(heap, 1);
  if (cVar1 == '\0') {
    heap.setU32(0x005f8d5b, (1) >>> 0);
    FUN_00401220(heap, 3);
    return;
  }
  LAB_009bb526: FUN_0042f3a2(heap);
  return;
}
