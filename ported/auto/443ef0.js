// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/443ef0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00443e92 } from "./443e92.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_00443ef0(heap) {
  let unaff_ESI = 0;
  FUN_005e3c3c(heap);
  heap.u32((unaff_ESI + 0x1c)) = 0x00630380;
  heap.u32((unaff_ESI + 0xc)) = heap.u32(0x00630740);
  heap.u32((unaff_ESI + 0x30)) = 0;
  heap.u32((unaff_ESI + 0x164)) = 0;
  heap.u32((unaff_ESI + 0x168)) = 0;
  FUN_00443e92(heap);
  return;
}
