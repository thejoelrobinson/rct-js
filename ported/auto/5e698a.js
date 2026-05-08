// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e698a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00403abb } from "./403abb.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e6a55 } from "./5e6a55.js";
export function FUN_005e698a(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let in_ZF = 0;
  FUN_00403abb(heap);
  FUN_005e6a55(heap);
  LOCK();
  heap.setU32(0x009a0128, (0xff) >>> 0);
  UNLOCK();
  FUN_005e3b2b(heap);
  if (!in_ZF) {
    (heap.u32(heap.u32((unaff_ESI + 4))))();
  }
  return CONCAT44(in_EDX, in_EAX);
}
