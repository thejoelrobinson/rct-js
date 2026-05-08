// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402ce0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { MessageBoxA } from "../runtime/win32.js";
export function FUN_00402ce0(heap) {
  if (heap.u32(0x005e9198) != 0) {
    switch (heap.u32(0x005f1b5c)) {
      case 1:
        wsprintfA(0x005f1a20, 0x005ebad4, 0x005f1a20);
      case 2:
        wsprintfA(0x005f1a20, 0x005ebafc, 0x005f1a20);
      case 3:
        wsprintfA(0x005f1a20, 0x005ebb28, 0x005f1a20);
      case 4:
        wsprintfA(0x005f1a20, 0x005ebb50, 0x005f1a20);
      default:
        wsprintfA(0x005f1a20, 0x005ebb7c, 0x005f1a20);
    }
  }
  if (heap.u32(0x005f1b40) != 0) {
    wsprintfA(0x005f1a20, 0x005ebb98, 0x005f1a20, heap.u32(0x005f1b40), heap.u32(0x005f1b44), heap.u32(0x005f1b48), heap.u32(0x005f1b4c), heap.u32(0x005f1b50), heap.u32(0x005f1b54), heap.u32(0x005f1b58), heap.u32(0x005f1b5c));
  }
  MessageBoxA(heap, heap.u32(0x005e916c), 0x005f1a20, 0x005f17e0, 0x10);
  return;
}
