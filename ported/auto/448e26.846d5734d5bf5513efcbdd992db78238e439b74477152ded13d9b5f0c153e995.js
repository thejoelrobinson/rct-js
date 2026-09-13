// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448e26.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_004490cb } from "./4490cb.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_00448e26(heap) {
  if (heap.u8(0x00630b21) == 2) {
    if ((heap.u8(0x00630b1a) & 1) == 0) {
      if ((heap.u8(0x00630b1a) & 2) != 0) {
        heap.setU8(0x00630b1a, (heap.u8(0x00630b1a) & 0xfd) & 0xff);
        return (regs.eax = FUN_00426f56(heap));
      }
    } else {
      (regs.eax = FUN_004490cb(heap));
      (regs.eax = FUN_005e5562(heap));
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
    }
  }
  return;
}
