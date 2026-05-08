// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cbb0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042cbb0(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_008d7eb8 = __sp + 0;
  const __addr_DAT_008d8a3c = __sp + 4;
  try {
  let in_EAX = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  for (pcVar1 = __addr_DAT_008d7eb8; heap.u32(pcVar1) != '\0'; pcVar1 = pcVar1 + 0x10c) {
    if (((in_EAX == heap.u32(pcVar1)) && (in_ECX == heap.u32((pcVar1 + 2)))) && (heap.u32(pcVar1 + (1) * 4) = heap.u32(pcVar1 + (1) * 4) | 1, pcVar1 == __addr_DAT_008d7eb8)) {
      FUN_005e5301(heap);
    }
  }
  for (pcVar1 = __addr_DAT_008d8a3c; heap.u32(pcVar1) != '\0'; pcVar1 = pcVar1 + 0x10c) {
    if ((in_EAX == heap.u32(pcVar1)) && (in_ECX == heap.u32((pcVar1 + 2)))) {
      heap.u32(pcVar1 + (1) * 4) = heap.u32(pcVar1 + (1) * 4) | 1;
      FUN_005e5301(heap);
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
