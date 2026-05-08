// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c6b2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/win32.js";
export function FUN_0043c6b2(heap) {
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let uVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  if ((in_EAX < 0x1000) && (in_CX < 0x1000)) {
    uVar3 = in_CX << 7 | in_CX >>> 9 | in_EAX;
    pbVar4 = heap.u32((0x00971ef4) + ((ushort)(uVar3 >>> 5 | uVar3 << 0xb)) * 4);
    bVar2 = heap.u32(pbVar4);
    while ((bVar2 & 0x3c) != 0) {
      pbVar4 = pbVar4 + 8;
      bVar2 = heap.u32(pbVar4);
    }
    if ((byte)((heap.u32(pbVar4 + (5) * 4) & 0x1f) << 2) <= heap.u32(pbVar4 + (2) * 4)) {
      bVar2 = heap.u32(pbVar4 + (2) * 4);
      uVar1 = CONCAT11(heap, bVar2 + 4, bVar2);
      if ((heap.u32(pbVar4 + (4) * 4) & 0x10) != 0) {
        uVar1 = CONCAT11(heap, bVar2 + 8, bVar2);
      }
      do {
        pbVar5 = pbVar4;
        if ((heap.u32(pbVar5 + (1) * 4) & 0x80) != 0) {
          return CONCAT44(heap, in_EDX, in_EAX);
        }
        pbVar4 = pbVar5 + 8;
      } while ((((heap.u32(pbVar5 + (0xb) * 4) <= uVar1) || ((byte)(uVar1 >>> 8) < heap.u32(pbVar5 + (10) * 4))) || (bVar2 = heap.u32(pbVar4) & 0x3c, bVar2 == 4)) || ((bVar2 == 0x14 || ((bVar2 == 0xc && ((heap.u32((uint)(0x006e1ec8) + (heap.u32(pbVar5 + (0xc) * 4) * 2) * 4) & 1) == 0))))));
    }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}
