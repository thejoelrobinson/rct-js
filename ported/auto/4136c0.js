// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4136c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004167c0 } from "./4167c0.js";
export function FUN_004136c0(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_LAB_00416820 = __sp + 0;
  const __addr_LAB_00416c60 = __sp + 4;
  const __addr_LAB_004168b0 = __sp + 8;
  const __addr_LAB_00416890 = __sp + 12;
  try {
  PTR_FUN_005ee534 = __addr_LAB_00416820;
  PTR_FUN_005ee530 = __addr_LAB_00416c60;
  PTR_FUN_005ee538 = __addr_LAB_004168b0;
  PTR_FUN_005ee53c = FUN_004167c0;
  PTR_FUN_005ee540 = __addr_LAB_00416890;
  PTR_FUN_005ee544 = __addr_LAB_00416c60;
  return;
} finally {
    heap.freeFrame(16);
  }
}
