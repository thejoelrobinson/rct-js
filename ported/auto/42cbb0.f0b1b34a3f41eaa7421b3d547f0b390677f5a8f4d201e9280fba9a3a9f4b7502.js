// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cbb0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042cbb0(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar1 = 0;
  for (pcVar1 = ((0x008d7eb8) >>> 0); heap.i8(pcVar1) != 0; pcVar1 = (((pcVar1 + 0x10c) >>> 0)) >>> 0) {
    if (((((in_EAX) << 24 >> 24) == heap.i8(pcVar1)) && (in_ECX == heap.i32((pcVar1 + 2)))) && (heap.setI8((pcVar1 + (1)), (heap.i8(pcVar1 + (1)) | 1) & 0xff), pcVar1 == 0x008d7eb8)) {
      (regs.eax = FUN_005e5301(heap));
    }
  }
  for (pcVar1 = ((0x008d8a3c) >>> 0); heap.i8(pcVar1) != 0; pcVar1 = (((pcVar1 + 0x10c) >>> 0)) >>> 0) {
    if ((((in_EAX) << 24 >> 24) == heap.i8(pcVar1)) && (in_ECX == heap.i32((pcVar1 + 2)))) {
      heap.setI8((pcVar1 + (1)), (heap.i8(pcVar1 + (1)) | 1) & 0xff);
      (regs.eax = FUN_005e5301(heap));
    }
  }
  return 1;
}
