// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43670c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_0043657e } from "./43657e.js";
export function FUN_0043670c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let uVar1 = 0;
  let extraout_CX = 0;
  let unaff_BL = 0;
  let unaff_BH = 0;
  uVar1 = FUN_0043657e(heap);
  uVar1 = extraout_CX << 7 | extraout_CX >>> 9 | uVar1;
  LOCK(heap);
  puVar2 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar1 >>> 5 | uVar1 << 0xb)) * 4);
  heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar1 >>> 5 | uVar1 << 0xb)) * 4) = heap.u32(0x00981ef4);
  UNLOCK(heap);
  do {
    puVar3 = heap.u32(0x00981ef4);
    heap.setU32(0x00981ef4, (puVar3) >>> 0);
    if (unaff_BL < heap.u32((puVar2 + 2))) {
      /* goto LAB_00436759 */ throw new Error("goto LAB_00436759 not supported");
    }
    heap.u32(puVar3) = heap.u32(puVar2);
    heap.u32(puVar3 + (1) * 4) = heap.u32(puVar2 + (1) * 4);
    heap.u32(puVar2) = 0xff;
    heap.setU32(0x00981ef4, (puVar3 + 2) >>> 0);
    puVar2 = puVar2 + 2;
  } while ((heap.u32((puVar3 + 1)) & 0x80) == 0);
  unaff_BH = unaff_BH | 0x80;
  heap.u32((puVar3 + 1)) = heap.u32((puVar3 + 1)) & 0x7f;
  LAB_00436759: heap.u32((heap.u32(0x00981ef4) + 2)) = unaff_BL;
  heap.u32((heap.u32(0x00981ef4) + 1)) = unaff_BH;
  heap.u32((heap.u32(0x00981ef4) + 3)) = unaff_BL;
  heap.u32(heap.u32(0x00981ef4) + (1) * 4) = 0;
  while (puVar3 = heap.u32(0x00981ef4) + 2, (unaff_BH & 0x80) == 0) {
    heap.u32(puVar3) = heap.u32(puVar2);
    heap.u32(heap.u32(0x00981ef4) + (3) * 4) = heap.u32(puVar2 + (1) * 4);
    heap.u32(puVar2) = 0xff;
    puVar2 = puVar2 + 2;
    unaff_BH = heap.u32((heap.u32(0x00981ef4) + 9));
    heap.setU32(0x00981ef4, (puVar3) >>> 0);
  }
  heap.setU32(0x00981ef4, (puVar3) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
