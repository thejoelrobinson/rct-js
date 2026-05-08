// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4251ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_004251ff(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_AX = 0;
  let in_CX = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  let unaff_EDI = 0;
  let pbVar6 = 0;
  if ((in_AX < 0x1000) && (in_CX < 0x1000)) {
    uVar4 = in_CX << 7 | in_CX >>> 9 | in_AX;
    pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
    bVar3 = heap.u32(pbVar5);
    while ((bVar3 & 0x3c) != 0) {
      pbVar5 = pbVar5 + 8;
      bVar3 = heap.u32(pbVar5);
    }
    bVar3 = heap.u32(pbVar5 + (7) * 4) & 0xf0;
    if ((heap.u32(pbVar5 + (7) * 4) & 0x20) == 0) {
      uVar4 = in_CX << 7 | in_CX >>> 9 | in_AX;
      unaff_EDI = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
      do {
        if (((heap.u32(unaff_EDI) & 0x3c) == 0x10) && (heap.u32(unaff_EDI + (4) * 4) == 2)) {
          /* goto LAB_00425371 */ throw new Error("goto LAB_00425371 not supported");
        }
        pbVar6 = unaff_EDI + 8;
        pbVar1 = unaff_EDI + 1;
        unaff_EDI = pbVar6;
      } while ((heap.u32(pbVar1) & 0x80) == 0);
      if ((in_AX - 0x20) < 0x1000) {
        uVar4 = in_CX << 7 | in_CX >>> 9 | in_AX - 0x20;
        unaff_EDI = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar2 = heap.u32(unaff_EDI);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = heap.u32(unaff_EDI);
        }
        if ((heap.u32(unaff_EDI + (7) * 4) & 0x20) != 0) {
          bVar3 = bVar3 | 8;
        }
      }
      uVar4 = in_CX - 0x20;
      if (uVar4 < 0x1000) {
        uVar4 = uVar4 * 0x80 | uVar4 >>> 9 | in_AX;
        unaff_EDI = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar2 = heap.u32(unaff_EDI);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = heap.u32(unaff_EDI);
        }
        if ((heap.u32(unaff_EDI + (7) * 4) & 0x20) != 0) {
          bVar3 = bVar3 | 4;
        }
      }
      if ((in_AX + 0x20) < 0x1000) {
        uVar4 = in_CX << 7 | in_CX >>> 9 | in_AX + 0x20;
        unaff_EDI = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar2 = heap.u32(unaff_EDI);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = heap.u32(unaff_EDI);
        }
        if ((heap.u32(unaff_EDI + (7) * 4) & 0x20) != 0) {
          bVar3 = bVar3 | 2;
        }
      }
      uVar4 = in_CX + 0x20;
      if (uVar4 < 0x1000) {
        uVar4 = uVar4 * 0x80 | uVar4 >>> 9 | in_AX;
        unaff_EDI = heap.u32((__addr_DAT_00971ef4) + ((uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar2 = heap.u32(unaff_EDI);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = heap.u32(unaff_EDI);
        }
        if ((heap.u32(unaff_EDI + (7) * 4) & 0x20) != 0) {
          bVar3 = bVar3 | 1;
        }
      }
    }
    LAB_00425371: if (bVar3 != heap.u32(pbVar5 + (7) * 4)) {
      FUN_005e56d3(heap, pbVar5, unaff_EDI);
    }
    heap.setU32((pbVar5 + (7) * 4), (bVar3) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
