// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403abb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SendMessageA } from "../../runtime/win32.js";
export function FUN_00403abb(heap) {
  let bVar1 = 0;
  if (heap.u32(0x005e91e0) == 0x0) {
    bVar1 = false;
  } else {
    SendMessageA(heap, heap.u32(0x005e91e0), 0x111, 2, 0);
    bVar1 = heap.u32(0x005e91e0) == 0x0;
  }
  return bVar1;
}
