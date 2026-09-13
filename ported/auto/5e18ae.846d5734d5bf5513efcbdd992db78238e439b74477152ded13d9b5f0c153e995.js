// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e18ae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e18ae(heap) {
  let in_AX = regs.eax & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  if (((heap.i16((unaff_ESI + 0x16e)) | 0) == -1) && ((heap.u16((unaff_ESI + 0x32)) & 4) == 0)) {
    heap.setU16((unaff_ESI + 0x170), (in_AX) & 0xffff);
    heap.setU16((unaff_ESI + 0x172), (unaff_BX) & 0xffff);
    heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) | 8) & 0xffff);
  }
  return;
}
