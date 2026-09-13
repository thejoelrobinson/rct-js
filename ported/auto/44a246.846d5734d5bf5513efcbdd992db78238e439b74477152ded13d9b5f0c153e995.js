// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a246.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004429db } from "./4429db.js";
export function FUN_0044a246(heap) {
  let uVar1 = 0;
  let pcVar2 = 0;
  heap.setU8(0x0099c163, (heap.u32(0x008d7ea4)) & 0xff);
  pcVar2 = ((0x00887420) >>> 0);
  uVar1 = ((0) >>> 0);
  do {
    if ((heap.i8(pcVar2) | 0) != -1) {
      if ((heap.i8(pcVar2 + (0x21)) != 0) && (heap.u16((pcVar2 + 0x132)) != 0xffff)) {
        heap.setU32((pcVar2 + 0x104), (heap.i32((pcVar2 + 0x104)) - heap.u32((pcVar2 + 0x132))) & 0xffffffff);
        heap.setI8((pcVar2 + (0xfd)), (heap.i8(pcVar2 + (0xfd)) | 2) & 0xff);
        heap.setU8(0x0099c167, (4) & 0xff);
        (regs.eax = FUN_004429db(heap));
      }
      if (heap.i8(pcVar2 + (0x15e)) != 0) {
        heap.setI8((pcVar2 + (0x15e)), (heap.i8(pcVar2 + (0x15e)) + -1) & 0xff);
      }
    }
    pcVar2 = ((pcVar2 + 0x260) >>> 0);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0xff);
  return;
}
