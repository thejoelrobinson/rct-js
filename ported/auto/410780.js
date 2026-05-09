// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410780.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00410780(heap) {
  if (heap.u32(0x005ec158) != 0x0) {
    if (heap.u32(0x005ec15c) != 0) {
      heap.setU32(0x005ec15c, (0) >>> 0);
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x20)), heap.u32(0x005ec158), heap.u32(0x005ec170)));
    }
    if (heap.u32(0x005ec160) != 0) {
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x10)), heap.u32(0x005ec158)));
      heap.setU32(0x005ec160, (0) >>> 0);
      heap.setU32(0x005ec164, (0) >>> 0);
    }
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 8)), heap.u32(0x005ec158)));
    heap.setU32(0x005ec158, (0x0) >>> 0);
  }
  return;
}
