// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41069d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteObject, DestroyWindow } from "../../runtime/win32.js";
import { FUN_0040f8ba } from "./40f8ba.js";
import { FUN_00413470 } from "./413470.js";
import { FUN_00413c90 } from "./413c90.js";
export function FUN_0041069d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ec118 = __sp + 0;
  try {
  if (heap.u32(0x005ec0d8) != 0x0) {
    DeleteObject(heap, heap.u32(0x005ec0d8));
    heap.setU32(0x005ec0d8, (0x0) >>> 0);
  }
  if (heap.u32(0x005ec0d0) != 0x0) {
    local_8 = heap.u32(0x005ec0d0);
    while (local_8 != 0x0) {
      FUN_0040f8ba(heap, heap.u32(local_8));
      puVar1 = heap.u32(local_8 + (1) * 4);
      FUN_00413470(heap, local_8);
      local_8 = puVar1;
    }
    heap.setU32(0x005ec0d0, (0x0) >>> 0);
  }
  if (heap.u32(0x005ec0d4) != 0) {
    FUN_00413c90(heap, __addr_DAT_005ec118, 0x005ec104, 0x309);
  }
  if (heap.u32(0x005e916c) != 0x0) {
    DestroyWindow(heap, heap.u32(0x005e916c));
    heap.setU32(0x005e916c, (0x0) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
