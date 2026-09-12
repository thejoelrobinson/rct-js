// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406ee7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00406ee7(heap) {
  if (heap.u32(0x005ebf04) != 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x20)), heap.u32(0x005ebefc)));
    heap.setU32(0x005ebf04, (0) >>> 0);
  }
  if (heap.u32(0x005ebefc) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebefc)) + 8)), heap.u32(0x005ebefc)));
    heap.setU32(0x005ebefc, (0x0) >>> 0);
  }
  if (heap.u32(0x005ebf08) != 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf00)) + 0x20)), heap.u32(0x005ebf00)));
    heap.setU32(0x005ebf08, (0) >>> 0);
  }
  if (heap.u32(0x005ebf00) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf00)) + 8)), heap.u32(0x005ebf00)));
    heap.setU32(0x005ebf00, (0x0) >>> 0);
  }
  if (heap.u32(0x005ebef8) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebef8)) + 8)), heap.u32(0x005ebef8)));
    heap.setU32(0x005ebef8, (0x0) >>> 0);
  }
  return;
}
