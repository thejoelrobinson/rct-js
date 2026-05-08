// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fe80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0043feb6 } from "./43feb6.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_0043fe80(heap) {
  let uVar1 = 0;
  let unaff_ESI = 0;
  let bVar2 = 0;
  bVar2 = 0xff8bc46b < (uint) * (unaff_ESI + 0x30) << 8;
  uVar1 = FUN_0043feb6(heap);
  if (bVar2) {
    uVar1 = uVar1 | 0x10000;
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0x10 & 1) != 0) {
      /* goto LAB_0043feb2 */ throw new Error("goto LAB_0043feb2 not supported");
    }
  } else {
    if ((heap.u32((unaff_ESI + 0x10)) >>> 0x10 & 1) == 0) {
    /* goto LAB_0043feb2 */ throw new Error("goto LAB_0043feb2 not supported");
  }
  }
  uVar1 = FUN_005e43de(heap);
  LAB_0043feb2: heap.u32((unaff_ESI + 0x10)) = uVar1;
  return;
}
