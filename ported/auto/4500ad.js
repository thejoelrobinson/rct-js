// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4500ad.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00448a45 } from "./448a45.js";
export function FUN_004500ad(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00887462 = __sp + 0;
  const __addr_DAT_00887452 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  try {
  let uVar1 = 0;
  let in_EAX = 0;
  let bVar3 = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let uVar4 = 0;
  uVar2 = 0;
  do {
    uVar1 = heap.u32((__addr_DAT_00887462) + ((in_EDX & 0xff) * 0x130 + (uVar2 >>> 8)) * 4);
    if (uVar1 != 0xffff) {
      uVar4 = heap.u32((byte)(__addr_DAT_00887452) + ((in_EDX & 0xff) * 0x260 + (uVar2 >>> 8)) * 4);
      for (puVar5 = heap.u32((__addr_DAT_00971ef4) + ((((uVar1 >>> 8) << 0xc | (uVar1 & 0xff) << 5) >>> 5 | (((uVar1 >>> 8) << 5) >>> 9) << 0xb)) * 4); (uVar4 = CONCAT11(heap.u32(puVar5), uVar4) & 0x3cff, (uVar4 >>> 8) != '\x10' || (uVar4 != heap.u32(puVar5 + (2) * 4))); puVar5 = puVar5 + 8) {
      
      }
      FUN_00448a45(heap);
    }
    bVar3 = (uVar2 >>> 8) + 1;
    uVar2 = bVar3 << 8;
  } while (bVar3 < 4);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(12);
  }
}
