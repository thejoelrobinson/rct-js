// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e69bd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00403a92 } from "./403a92.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e698a } from "./5e698a.js";
import { FUN_005e6a55 } from "./5e6a55.js";
export function FUN_005e69bd(heap) {
  let iVar1 = 0;
  let unaff_ESI = 0;
  let uVar2 = 0;
  uVar2 = heap.u32(0x009a0128) == -1;
  if (uVar2) {
    return;
  }
  FUN_005e3b2b(heap);
  if (!uVar2) {
    if (heap.u32(0x009a0118) == 1) {
      uVar2 = heap.u32(0x009a0120) == 2;
      if (!uVar2) {
        FUN_005e6a55(heap);
        FUN_005e3b2b(heap);
        (heap.u32(heap.u32((unaff_ESI + 4))))();
        FUN_005e698a(heap);
        return;
      }
    } else {
      iVar1 = FUN_00403a92(heap);
      uVar2 = 0;
      if (iVar1 == 1) {
        return;
      }
    }
  }
  FUN_005e3b2b(heap);
  if (!uVar2) {
    (heap.u32(heap.u32((unaff_ESI + 4))))();
  }
  FUN_005e698a(heap);
  return;
}
