// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b37b8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_009b37b8(heap) {
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) == 0) {
      if ((heap.u32(0x009a201c) & 1) != 0) {
        if (heap.u8(unaff_ESI) == 0) {
          return;
        }
        heap.setU8(0x0099c164, (1) & 0xff);
        return;
      }
      heap.setU8(0x0099c164, (1) & 0xff);
    }
    return;
  }
  if ((heap.u32(0x009a201c) & 1) == 0) {
    return;
  }
  if (heap.i8((heap.u32(unaff_ESI) + heap.u32(0x009a200c))) == 0) {
    return;
  }
  heap.setU8(0x0099c164, (1) & 0xff);
  return;
}
