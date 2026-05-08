// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402ce0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { MessageBoxA } from "../../runtime/win32.js";
export function FUN_00402ce0(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f1a20 = __sp + 0;
  const __addr_DAT_005f17e0 = __sp + 4;
  try {
  if (heap.u32(0x005e9198) != 0) {
    switch (heap.u32(0x005f1b5c)) {
      case 1:
        wsprintfA(__addr_DAT_005f1a20, 0x005ebad4, __addr_DAT_005f1a20);
      case 2:
        wsprintfA(__addr_DAT_005f1a20, 0x005ebafc, __addr_DAT_005f1a20);
      case 3:
        wsprintfA(__addr_DAT_005f1a20, 0x005ebb28, __addr_DAT_005f1a20);
      case 4:
        wsprintfA(__addr_DAT_005f1a20, 0x005ebb50, __addr_DAT_005f1a20);
      default:
        wsprintfA(__addr_DAT_005f1a20, 0x005ebb7c, __addr_DAT_005f1a20);
    }
  }
  if (heap.u32(0x005f1b40) != 0) {
    wsprintfA(__addr_DAT_005f1a20, 0x005ebb98, __addr_DAT_005f1a20, heap.u32(0x005f1b40), heap.u32(0x005f1b44), heap.u32(0x005f1b48), heap.u32(0x005f1b4c), heap.u32(0x005f1b50), heap.u32(0x005f1b54), heap.u32(0x005f1b58), heap.u32(0x005f1b5c));
  }
  MessageBoxA(heap, heap.u32(0x005e916c), __addr_DAT_005f1a20, __addr_DAT_005f17e0, 0x10);
  return;
} finally {
    heap.freeFrame(8);
  }
}
