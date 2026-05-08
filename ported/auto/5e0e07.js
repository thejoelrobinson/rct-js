// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0e07.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_009b30f1 } from "./9b30f1.js";
export function FUN_005e0e07(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0099ac8b = __sp + 0;
  const __addr_DAT_009a147c = __sp + 4;
  try {
  let unaff_EBP = 0;
  let uVar1 = 0;
  let unaff_SI = 0;
  let uVar2 = 0;
  if ((unaff_EBP & 0x80) == 0) {
    uVar2 = heap.u32((__addr_DAT_0099ac8b + unaff_EBP * 8 + 3));
    if ((unaff_SI & 8) == 0) {
      if ((unaff_SI & 0x20) == 0) {
        FUN_009b30f1(heap, uVar2);
        FUN_009b30f1(heap);
        FUN_009b30f1(heap);
        FUN_009b30f1(heap);
        if ((unaff_SI & 0x10) == 0) {
          FUN_009b30f1(heap, uVar2);
        }
      } else {
        FUN_009b30f1(heap, uVar2);
        FUN_009b30f1(heap);
        FUN_009b30f1(heap);
        FUN_009b30f1(heap);
        if ((unaff_SI & 0x10) == 0) {
          FUN_009b30f1(heap, uVar2);
        }
      }
    } else {
      FUN_009b30f1(heap, uVar2);
    }
    return;
  }
  uVar1 = heap.u32((__addr_DAT_009a147c) + (unaff_EBP) * 4) | 0x2000000;
  if ((unaff_SI & 8) == 0) {
    if ((unaff_SI & 0x20) == 0) {
      FUN_009b30f1(heap, uVar1);
      FUN_009b30f1(heap);
      FUN_009b30f1(heap);
      FUN_009b30f1(heap);
      if ((unaff_SI & 0x10) == 0) {
        FUN_009b30f1(heap, uVar1);
      }
    } else {
      FUN_009b30f1(heap, uVar1);
      FUN_009b30f1(heap);
      FUN_009b30f1(heap);
      FUN_009b30f1(heap);
      if ((unaff_SI & 0x10) == 0) {
        FUN_009b30f1(heap, uVar1);
      }
    }
  } else {
    FUN_009b30f1(heap, uVar1);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
