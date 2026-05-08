// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42ddb9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
export function FUN_0042ddb9(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let bVar3 = 0;
  pbVar2 = heap.u32((__addr_DAT_00971ef4) + ((ushort)((ushort)((in_CX & 0xffe0) << 7 | in_CX >>> 9 | in_EAX & 0xffe0) >>> 5 | (in_CX >>> 9) << 0xb)) * 4);
  bVar1 = heap.u32(pbVar2);
  while ((bVar1 & 0x3c) != 0) {
    pbVar2 = pbVar2 + 8;
    bVar1 = heap.u32(pbVar2);
  }
  bVar3 = in_EDX == (ushort)(heap.u32(pbVar2 + (2) * 4) * 4);
  if (((ushort)(heap.u32(pbVar2 + (2) * 4) * 4) < in_EDX) && (FUN_00444bd4(heap), !bVar3)) {
    heap.u32(unaff_ESI + (0x14) * 4) = 0x14;
    heap.u32(unaff_ESI + (9) * 4) = 0x12;
    heap.u32(unaff_ESI + (0x15) * 4) = 0x10;
    heap.u32(unaff_ESI) = 2;
    FUN_00444927(heap);
    heap.u32(unaff_ESI + (1) * 4) = 0;
    heap.u32((unaff_ESI + 0x26)) = 0x100;
    heap.u32((unaff_ESI + 0x24)) = 0;
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
