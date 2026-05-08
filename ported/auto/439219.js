// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/439219.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
export function FUN_00439219(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let pbVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let unaff_ESI = 0;
  let pbVar4 = 0;
  heap.setU32((unaff_ESI + 0xc4), (heap.u32((unaff_ESI + 0xc4)) + '\x01') >>> 0);
  if ((heap.u32((unaff_ESI + 10)) & 0xf) != (heap.u32((unaff_ESI + 0xc4)) & 0xf)) {
    return;
  }
  uVar2 = heap.u32((unaff_ESI + 0x26)) << 7 | heap.u32((unaff_ESI + 0x26)) >>> 9 | heap.u32((unaff_ESI + 0x24));
  bVar3 = 0;
  pbVar4 = heap.u32((__addr_DAT_00971ef4) + ((uVar2 >>> 5 | uVar2 << 0xb)) * 4);
  if ((heap.u32((unaff_ESI + 0x29)) & 0x18) == 0) {
    bVar3 = 4;
  }
  while ((heap.u32(pbVar4) & 0x3c) != bVar3 || (heap.u32((unaff_ESI + 0x28)) != heap.u32(pbVar4 + (2) * 4))) {
    pbVar1 = pbVar4 + 1;
    pbVar4 = pbVar4 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      FUN_0044142c(heap);
      heap.setU32((unaff_ESI + 0x2b), (0) >>> 0);
      FUN_00441452(heap);
      return;
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
