// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/421b78.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../runtime/win32.js";
export function FUN_00421b78(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_005f4696 = __sp + 0;
  const __addr_DAT_005f4694 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_005f46c4 = __sp + 12;
  const __addr_DAT_005f46a4 = __sp + 16;
  const __addr_DAT_005f46e4 = __sp + 20;
  const __addr_DAT_005f4704 = __sp + 24;
  const __addr_PTR_LAB_00431bb8 = __sp + 28;
  try {
  let bVar1 = 0;
  let bVar3 = 0;
  let in_CL = 0;
  let bVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let in_EDX = 0;
  let iVar8 = 0;
  let unaff_EBX = 0;
  let uVar10 = 0;
  let uVar12 = 0;
  let iVar13 = 0;
  let cVar2 = 0;
  let cVar4 = 0;
  let uVar9 = 0;
  uVar10 = heap.u32(0x00991f74) + heap.u32((__addr_DAT_005f4696 + heap.u32(0x00991f88) * 4));
  uVar9 = (undefined2)(in_EDX >>> 0x10);
  if (((ushort)(heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4694 + heap.u32(0x00991f88) * 4))) < 0x1000) && (uVar10 < 0x1000)) {
    uVar10 = uVar10 * 0x80 | uVar10 >>> 9 | heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4694 + heap.u32(0x00991f88) * 4));
    pbVar11 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar10 >>> 5 | uVar10 << 0xb)) * 4);
    bVar1 = heap.u32(pbVar11);
    while ((bVar1 & 0x3c) != 0) {
      pbVar11 = pbVar11 + 8;
      bVar1 = heap.u32(pbVar11);
    }
    uVar12 = CONCAT22(heap, uVar9, CONCAT11(heap, heap.u32(pbVar11 + (5) * 4), in_EDX)) & 0xffff1fff;
    if (uVar12 == (uVar12 >>> 8)) {
      return;
    }
    uVar10 = (heap.u32(pbVar11 + (4) * 4) & 0xf) << (in_CL & 0x1f);
    uVar7 = CONCAT22(heap, (uVar12 >>> 0x10), CONCAT11(heap, heap.u32(pbVar11 + (2) * 4) >>> 2, uVar12));
    uVar12 = heap.u32(pbVar11 + (4) * 4) & 0x10 | (ushort)(uVar10 >>> 4 | uVar10) & 0xf;
  } else {
    uVar12 = 0;
    uVar7 = CONCAT22(heap, uVar9, CONCAT11(heap, 1, in_EDX));
  }
  cVar2 = uVar7;
  bVar1 = cVar2 + heap.u32((__addr_DAT_005f46c4) + (unaff_EBX) * 4);
  bVar5 = cVar2 + heap.u32((__addr_DAT_005f46a4) + (unaff_EBX) * 4);
  cVar4 = (uVar7 >>> 8);
  bVar3 = cVar4 + heap.u32((__addr_DAT_005f46e4) + (uVar12) * 4);
  bVar6 = cVar4 + heap.u32((__addr_DAT_005f4704) + (uVar12) * 4);
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    heap.setU32(0x005f4724, (heap.u32(0x005f4774)) >>> 0);
    if ((heap.u32(0x00991f8c) & 1) != 0) {
      heap.setU32(0x005f4724, (heap.u32(0x005f4770)) >>> 0);
    }
    uVar9 = (undefined2)(uVar7 >>> 0x10);
    iVar8 = CONCAT22(heap, uVar9, CONCAT11(heap, bVar6, cVar2));
    iVar13 = iVar8;
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        iVar8 = CONCAT22(heap, uVar9, CONCAT11(heap, bVar3, cVar2));
      }
      bVar3 = (byte)(iVar8 >>> 8);
      iVar13 = iVar8;
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
        iVar8 = CONCAT22(heap, (iVar8 >>> 0x10), CONCAT11(heap, bVar3 + 1, iVar8));
        iVar13 = iVar8;
      }
    }
    while (bVar3 = (byte)(iVar8 >>> 8), bVar3 < bVar1 && (bVar3 < bVar5)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      iVar8 = (uint)(byte)(bVar3 + 1) << 8;
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(iVar13, unaff_EBX);
    }
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}
