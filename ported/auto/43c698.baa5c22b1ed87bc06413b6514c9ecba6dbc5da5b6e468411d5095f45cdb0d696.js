// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c698.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0043c60b } from "./43c60b.js";
export function FUN_0043c698(heap) {
  let in_AL = regs.eax & 0xff;
  let unaff_ESI = regs.esi >>> 0;
  if (in_AL != heap.i8((unaff_ESI + 0x6d))) {
    heap.setI8((unaff_ESI + 0x6d), (in_AL) & 0xff);
    if (0xfd < heap.u8((unaff_ESI + 0x71))) {
      heap.setU8((unaff_ESI + 0x70), (0) & 0xff);
    }
    (regs.eax = FUN_0043c60b(heap));
  }
  return;
}
