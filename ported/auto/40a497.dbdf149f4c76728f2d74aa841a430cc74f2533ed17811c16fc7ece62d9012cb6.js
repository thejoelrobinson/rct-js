// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a497.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004090e3 } from "./4090e3.js";
export function FUN_0040a497(heap) {
  if (heap.u32(0x005ebf54) != 0) {
    if ((heap.u32(0x005f0950) < 2) || (heap.u32(0x005ebf4c) == 0)) {
      heap.setU32(0x005ebf4c, (0) >>> 0);
    } else {
      heap.setU32(0x005ebf4c, (0) >>> 0);
      if (heap.u32(0x005ebf50) != 0) {
        (regs.eax = FUN_004090e3(heap));
        heap.setU32(0x005ebf50, (0) >>> 0);
      }
    }
  }
  return;
}
