// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e429d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005df431 } from "./5df431.js";
import { FUN_005e4355 } from "./5e4355.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_005e429d(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_009a1168 = __sp + 0;
  const __addr_DAT_00743ba4 = __sp + 4;
  const __addr_DAT_009a121c = __sp + 8;
  try {
  let sVar1 = 0;
  let in_EAX = 0;
  let in_CL = 0;
  let in_EDX = 0;
  let sVar2 = 0;
  let unaff_EBX = 0;
  let unaff_ESI = 0;
  piVar3 = __addr_DAT_009a1168;
  do {
    if (heap.u32(piVar3) == 0) {
      heap.u32(piVar3 + (1) * 4) = in_EAX;
      heap.u32(piVar3) = unaff_EBX;
      if ((in_EDX >>> 0x1e & 1) == 0) {
        in_CL = 0;
      }
      heap.u32(piVar3 + (3) * 4) = unaff_EBX << (in_CL & 0x1f);
      heap.u32((piVar3 + 4)) = in_CL;
      heap.u32((piVar3 + 0x12)) = 0;
      if (heap.u32(0x005f8d5c) == '\x01') {
        heap.u32((piVar3 + 0x12)) = heap.u32((piVar3 + 0x12)) | 0x100;
      }
      heap.u32((unaff_ESI + 8)) = piVar3;
      if ((in_EDX & 0x80000000) == 0) {
        sVar2 = ((in_EDX & 0xbfffffff) >>> 0x10);
        heap.u32((unaff_ESI + 0x16e)) = 0xffff;
      } else {
        heap.u32((unaff_ESI + 0x16e)) = (in_EDX & 0xbfffffff);
        sVar2 = heap.u32((__addr_DAT_00743ba4) + ((in_EDX & 0xffff) * 0x80) * 4);
      }
      sVar1 = FUN_005e4355(heap);
      heap.u32((unaff_ESI + 0x170)) = sVar1;
      heap.u32((unaff_ESI + 0x172)) = sVar2;
      heap.u32((piVar3 + 2)) = sVar1;
      heap.u32((piVar3 + 10)) = sVar2;
      FUN_005e6a83(heap);
      return;
    }
    piVar3 = piVar3 + 5;
  } while (piVar3 < __addr_DAT_009a121c);
  FUN_005df431(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
