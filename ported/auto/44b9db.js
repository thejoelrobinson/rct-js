// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44b9db.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0044ba3c } from "./44ba3c.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_0044b9db(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00630f60 = __sp + 0;
  try {
  let in_AX = 0;
  let unaff_ESI = 0;
  FUN_005e3c3c(heap);
  heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_00630f60;
  heap.u32((unaff_ESI + 0xc)) = heap.u32(0x00631c2c);
  heap.u32((unaff_ESI + 0x30)) = in_AX;
  heap.u32((unaff_ESI + 0x164)) = 0;
  heap.u32((unaff_ESI + 0x166)) = 0;
  heap.u32((unaff_ESI + 0x168)) = 0;
  heap.u32((unaff_ESI + 0x16a)) = 0;
  heap.u32((unaff_ESI + 0x16c)) = 0;
  FUN_0044ba3c(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
