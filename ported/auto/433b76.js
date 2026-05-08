// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433b76.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00433b76(heap) {
  let uVar1 = 0;
  let puVar2 = 0;
  let in_AX = 0;
  let in_CX = 0;
  let unaff_EBX = 0;
  puVar2 = heap.u32(0x005f96e8);
  if (heap.u32(0x005f96e8) < heap.u32(0x005f96e0)) {
    heap.setU32(heap.u32(0x005f96e8), (unaff_EBX) >>> 0);
    heap.setU32((puVar2 + 1), (in_AX) >>> 0);
    heap.setU32((puVar2 + 6), (in_CX) >>> 0);
    if (heap.u32(0x00628928) != 0) {
      heap.setU32(0x005f96e8, (heap.u32(0x005f96e8) + 3) >>> 0);
      LOCK();
      uVar1 = heap.u32((heap.u32(0x00628928) + 0x18));
      heap.setU32((heap.u32(0x00628928) + 0x18), (puVar2) >>> 0);
      UNLOCK();
      heap.setU32((puVar2 + (2) * 4), (uVar1) >>> 0);
      return in_AX;
    }
  }
  return in_AX;
}
