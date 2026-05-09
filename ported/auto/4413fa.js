// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4413fa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004413fa(heap) {
  let uVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_EDI = regs.edi >>> 0;
  heap.setU32(((0x0088752a) + (unaff_EDI) * 4), (heap.u32((0x0088752a) + (unaff_EDI) * 4) + unaff_BL) & 0xffffffff);
  heap.setU32(((0x00887529) + (unaff_EDI) * 4), (heap.u32((0x00887529) + (unaff_EDI) * 4) + 1) & 0xffffffff);
  if (0x18 < heap.u32(((0x00887529) & 0xff) + (unaff_EDI) * 4)) {
    LOCK();
    uVar1 = ((heap.u32((0x0088752a) + (unaff_EDI) * 4)) & 0xff);
    heap.setU32(((0x0088752a) + (unaff_EDI) * 4), (0) & 0xffffffff);
    UNLOCK();
    heap.setU32(((0x00887528) + (unaff_EDI) * 4), (uVar1) & 0xffffffff);
    heap.setU32(((0x00887529) + (unaff_EDI) * 4), (0) & 0xffffffff);
    heap.setU32(((0x0088751d) + (unaff_EDI) * 4), (heap.u32((0x0088751d) + (unaff_EDI) * 4) | 1) & 0xffffffff);
  }
  return;
}
