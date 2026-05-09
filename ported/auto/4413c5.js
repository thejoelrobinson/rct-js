// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4413c5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004413c5(heap) {
  let bVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_EDI = regs.edi >>> 0;
  heap.setU32(((0x0088751c) + (unaff_EDI) * 4), (heap.u32((0x0088751c) + (unaff_EDI) * 4) + unaff_BL) & 0xffffffff);
  heap.setU32(((0x0088751b) + (unaff_EDI) * 4), (heap.u32((0x0088751b) + (unaff_EDI) * 4) + 1) & 0xffffffff);
  if (0x13 < heap.u32(((0x0088751b) & 0xff) + (unaff_EDI) * 4)) {
    LOCK();
    bVar1 = ((heap.u32((0x0088751c) + (unaff_EDI) * 4)) & 0xff);
    heap.setU32(((0x0088751c) + (unaff_EDI) * 4), (0) & 0xffffffff);
    UNLOCK();
    heap.setU32(((0x0088751a) + (unaff_EDI) * 4), (bVar1 >>> 2) & 0xffffffff);
    heap.setU32(((0x0088751b) + (unaff_EDI) * 4), (0) & 0xffffffff);
    heap.setU32(((0x0088751d) + (unaff_EDI) * 4), (heap.u32((0x0088751d) + (unaff_EDI) * 4) | 1) & 0xffffffff);
  }
  return;
}
