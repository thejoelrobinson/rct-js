// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455a66.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0043feb6 } from "./43feb6.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_00455a66(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00743bc3 = __sp + 0;
  try {
  let uVar1 = 0;
  let unaff_ESI = 0;
  let bVar2 = 0;
  bVar2 = heap.u32((byte)(__addr_DAT_00743bc3) + ((uint) * (unaff_ESI + 0x30) * 0x100) * 4) < 2;
  uVar1 = FUN_0043feb6(heap);
  if (bVar2) {
    uVar1 = uVar1 | 0x2000;
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0xd & 1) != 0) {
      /* goto LAB_00455aa6 */ throw new Error("goto LAB_00455aa6 not supported");
    }
  } else {
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0xd & 1) == 0) {
    /* goto LAB_00455aa6 */ throw new Error("goto LAB_00455aa6 not supported");
  }
  }
  uVar1 = FUN_005e43de(heap);
  LAB_00455aa6: heap.u32((unaff_ESI + 0x10)) = uVar1;
  return;
} finally {
    heap.freeFrame(4);
  }
}
