// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418c80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00417140 } from "./417140.js";
export function FUN_00418c80(heap, param_1, param_2) {
  if (param_1 == 0) {
    if ((heap.u32(param_2 + (3) * 4) & 0x1000) != 0) {
      (regs.eax = FUN_00417140(heap, param_2));
    }
  } else {
    if ((heap.u32(param_2 + (3) * 4) & 0x1000) != 0) {
    (regs.eax = FUN_00417140(heap, param_2));
    heap.setU32((param_2 + (6) * 4), (0) & 0xffffffff);
    heap.setU32((param_2 + (3) * 4), (heap.u32(param_2 + (3) * 4) & 0xffffeeff) & 0xffffffff);
    heap.setU32(param_2, (0) & 0xffffffff);
    heap.setU32((param_2 + (2) * 4), (0) & 0xffffffff);
    return;
  }
  }
  return;
}
