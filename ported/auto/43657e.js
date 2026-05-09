// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43657e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004365c3 } from "./4365c3.js";
import { FUN_00436634 } from "./436634.js";
export function FUN_0043657e(heap) {
  let in_EAX = regs.eax >>> 0;
  let extraout_ECX = 0;
  if (0x00743b10 < heap.u32(0x00981ef4)) {
    do {
      in_EAX = (((regs.eax = FUN_004365c3(heap))) >>> 0);
    } while (extraout_ECX != 1);
    if ((0x00743b10 < heap.u32(0x00981ef4)) && (in_EAX = (((regs.eax = FUN_00436634(heap))) >>> 0), 0x00743b10 < heap.u32(0x00981ef4))) {
      heap.setU32(0x00991efc, (0x393) >>> 0);
      return in_EAX;
    }
  }
  return in_EAX;
}
