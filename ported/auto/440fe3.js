// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440fe3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_00440fe3(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0062d324 = __sp + 0;
  try {
  let uVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = 0;
  if ((heap.u32((__addr_DAT_0062d324) + ((in_EAX & 0xff) * 2) * 4) != -1) && (0xfd < heap.u32((unaff_ESI + 0x71)))) {
    heap.u32((unaff_ESI + 0x71)) = heap.u32((__addr_DAT_0062d324) + ((in_EAX & 0xff) * 2) * 4);
    heap.u32((unaff_ESI + 0x72)) = 0;
    heap.u32((unaff_ESI + 0x70)) = 0;
    FUN_0043c60b(heap);
    in_EAX = FUN_005e53ca(heap);
  }
  uVar3 = 0;
  do {
    while (true) {
      if (heap.u32((unaff_ESI + 0xb0 + uVar3 * 4)) == -1) {
        /* goto LAB_00441052 */ throw new Error("goto LAB_00441052 not supported");
      }
      uVar4 = uVar3;
      if (in_EAX != heap.u32((unaff_ESI + 0xb0 + uVar3 * 4))) {
        break;
      }
      for (; uVar4 != 4; uVar4 = uVar4 + 1) {
        heap.u32((unaff_ESI + 0xb0 + uVar4 * 4)) = heap.u32((unaff_ESI + 0xb4 + uVar4 * 4));
      }
      heap.u32((unaff_ESI + 0xc0)) = 0xff;
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 5);
  LAB_00441052: uVar4 = 0;
  uVar3 = in_EAX & 0xffff;
  do {
    LOCK(heap);
    puVar1 = (unaff_ESI + 0xb0 + uVar4 * 4);
    uVar2 = heap.u32(puVar1);
    heap.u32(puVar1) = uVar3;
    UNLOCK(heap);
    uVar4 = uVar4 + 1;
    uVar3 = uVar2;
  } while (uVar4 < 5);
  heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 1;
  return;
} finally {
    heap.freeFrame(4);
  }
}
