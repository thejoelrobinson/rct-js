// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e16f7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00423677 } from "./423677.js";
import { FUN_00434a94 } from "./434a94.js";
import { FUN_005e19eb } from "./5e19eb.js";
import { FUN_005e4355 } from "./5e4355.js";
export function FUN_005e16f7(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_005e17b8 = __sp + 0;
  try {
  let iVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let unaff_ESI = 0;
  let cVar4 = 0;
  (heap.u32(heap.u32((unaff_ESI + 4))))();
  iVar1 = heap.u32((unaff_ESI + 8));
  if (iVar1 != 0) {
    if (heap.u32((unaff_ESI + 0x16e)) == -1) {
      sVar3 = (heap.u32((iVar1 + 0xe)) >>> 1) + heap.u32((unaff_ESI + 0x172));
      sVar2 = FUN_00434a94(heap);
      cVar4 = (sVar2 + 0x100) < 0;
      if (cVar4) {
        sVar2 = -0x100;
      }
      if ((sVar3 + 0x100) < 0) {
        sVar3 = -0x100;
        cVar4 = cVar4 + '\x01';
      }
      if (0x10fe < sVar2) {
        cVar4 = cVar4 + '\x01';
      }
      if (0x10fe < sVar3) {
        cVar4 = cVar4 + '\x01';
      }
      if (cVar4 != '\0') {
        FUN_00423677(heap);
        (heap.u32(heap.u32((__addr_PTR_LAB_005e17b8) + (heap.u32(0x00991f88)) * 4)))();
        return;
      }
      if ((heap.u32((unaff_ESI + 0x32)) & 8) != 0) {
        sVar2 = heap.u32((unaff_ESI + 0x170)) - heap.u32((iVar1 + 8));
        if (sVar2 < 0) {
          sVar2 = -sVar2;
        }
        sVar3 = heap.u32((unaff_ESI + 0x172)) - heap.u32((iVar1 + 10));
        if (sVar3 < 0) {
          sVar3 = -sVar3;
        }
        if ((sVar2 + 7U | sVar3 + 7U) >>> 3 == 0) {
          heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) & 0xfff7;
        }
      }
    } else {
      FUN_005e4355(heap);
    }
    FUN_005e19eb(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
