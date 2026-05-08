// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4034b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetWindowTextA } from "../../runtime/win32.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_004034b4(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f1ba0 = __sp + 0;
  try {
  FUN_00413170(heap, __addr_DAT_005f1ba0, param_1);
  SetWindowTextA(heap, heap.u32(0x005e916c), __addr_DAT_005f1ba0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
