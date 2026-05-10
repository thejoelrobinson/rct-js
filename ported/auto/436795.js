// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436795.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00436795(heap) {
  let bVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  bVar1 = ((heap.u8((((unaff_ESI) | 0) + 1))) & 0xff);
  while ((bVar1 & 0x80) == 0) {
    heap.setU32(unaff_ESI, (heap.u32(unaff_ESI + (2) * 4)) & 0xffffffff);
    heap.setU32((unaff_ESI + (1) * 4), (heap.u32(unaff_ESI + (3) * 4)) & 0xffffffff);
    bVar1 = ((heap.u8((((unaff_ESI) | 0) + 9))) & 0xff);
    unaff_ESI = ((unaff_ESI + ((2) * 4)) >>> 0);
  }
  heap.setU8((((unaff_ESI) | 0) + -7), (heap.u8((((unaff_ESI) | 0) + -7)) | 0x80) & 0xff);
  heap.setU8(unaff_ESI, (0xff) & 0xff);
  if (unaff_ESI + ((2) * 4) == heap.u32(0x00981ef4)) {
    heap.setU32(0x00981ef4, (heap.u32(0x00981ef4) + -2) >>> 0);
  }
  return;
}
