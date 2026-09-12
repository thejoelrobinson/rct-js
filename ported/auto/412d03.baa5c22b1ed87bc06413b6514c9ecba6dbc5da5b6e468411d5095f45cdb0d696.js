// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412d03.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00412455 } from "./412455.js";
import { FUN_0041263d } from "./41263d.js";
import { FUN_004126ba } from "./4126ba.js";
import { FUN_00412759 } from "./412759.js";
export function FUN_00412d03(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(124);
  const __addr_local_80 = __sp + 0;
  const __addr_local_7c = __sp + 4;
  const __addr_local_78 = __sp + 8;
  const __addr_local_64 = __sp + 28;
  const __addr_local_50 = __sp + 48;
  const __addr_local_8 = __sp + 120;
  try {
  heap.setU32(__addr_local_8, ((regs.eax = FUN_00412455(heap, param_1, __addr_local_80, param_4, __addr_local_64, __addr_local_78))) >>> 0);
  if (((heap.u32(__addr_local_8) == 0) && (heap.setU32(__addr_local_8, ((regs.eax = FUN_0041263d(heap, __addr_local_80, __addr_local_64, __addr_local_50))) >>> 0), heap.u32(__addr_local_8) == 0)) && (heap.setU32(__addr_local_8, ((regs.eax = FUN_004126ba(heap, heap.u32(__addr_local_80), param_2, param_5, __addr_local_64, __addr_local_7c, __addr_local_50))) >>> 0), heap.u32(__addr_local_8) == 0)) {
    heap.setU32(__addr_local_8, ((regs.eax = FUN_00412759(heap, __addr_local_80, __addr_local_64, __addr_local_78, __addr_local_50, param_3))) >>> 0);
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(124);
  }
}
