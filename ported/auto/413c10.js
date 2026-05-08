// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413c10.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00417016 } from "./417016.js";
export function FUN_00413c10(heap, param_1, param_2) {
  let cVar3 = 0;
  if (heap.u32(param_2) == '\0') {
    return param_1;
  }
  if (heap.u32(param_2 + (1) * 4) == '\0') {
    pcVar4 = FUN_00417016(heap);
    return pcVar4;
  }
  do {
    cVar3 = heap.u32(param_1);
    do {
      while (param_1 = param_1 + 1, cVar3 != heap.u32(param_2)) {
        if (cVar3 == '\0') {
          return 0x0;
        }
        cVar3 = heap.u32(param_1);
      }
      cVar3 = heap.u32(param_1);
      pcVar5 = param_1 + 1;
      pcVar4 = param_2;
    } while (cVar3 != heap.u32(param_2 + (1) * 4));
    do {
      if (heap.u32(pcVar4 + (2) * 4) == '\0') {
        LAB_00413c83: return param_1 + -1;
      }
      if (heap.u32(pcVar5) != heap.u32(pcVar4 + (2) * 4)) {
        break;
      }
      pcVar1 = pcVar4 + 3;
      if (heap.u32(pcVar1) == '\0') {
        /* goto LAB_00413c83 */ throw new Error("goto LAB_00413c83 not supported");
      }
      pcVar2 = pcVar5 + 1;
      pcVar4 = pcVar4 + 2;
      pcVar5 = pcVar5 + 2;
    } while (heap.u32(pcVar1) == heap.u32(pcVar2));
  } while (true);
}
