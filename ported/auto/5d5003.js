// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5003.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005d5003(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let uVar1 = 0;
  let unaff_ESI = 0;
  let in_ZF = 0;
  FUN_005e3b2b(heap);
  if (!in_ZF) {
    uVar1 = heap.u32((unaff_ESI + 0x14)) & 0xfffffe3f;
    if (heap.u32(0x00652288) == '\x06') {
      uVar1 = uVar1 | 0x40;
    }
    if (heap.u32(0x00652288) == '\a') {
      uVar1 = uVar1 | 0x80;
    }
    if (heap.u32(0x00652288) == '\b') {
      uVar1 = uVar1 | 0x100;
    }
    heap.u32((unaff_ESI + 0x14)) = uVar1;
    FUN_005e43de(heap);
  }
  return CONCAT44(in_EDX, in_EAX);
}
