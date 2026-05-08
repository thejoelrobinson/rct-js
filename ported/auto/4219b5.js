// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4219b5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
export function FUN_004219b5(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_005f4686 = __sp + 0;
  const __addr_DAT_005f4684 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_005f46c4 = __sp + 12;
  const __addr_DAT_005f46e4 = __sp + 16;
  const __addr_DAT_005f46a4 = __sp + 20;
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
  let iVar11 = 0;
  let uVar13 = 0;
  let cVar2 = 0;
  let cVar4 = 0;
  let uVar9 = 0;
  uVar10 = heap.u32(0x00991f74) + heap.u32((__addr_DAT_005f4686 + heap.u32(0x00991f88) * 4));
  uVar9 = (undefined2)(in_EDX >>> 0x10);
  if (((heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4684 + heap.u32(0x00991f88) * 4))) < 0x1000) && (uVar10 < 0x1000)) {
    uVar10 = uVar10 * 0x80 | uVar10 >>> 9 | heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4684 + heap.u32(0x00991f88) * 4));
    pbVar12 = heap.u32((__addr_DAT_00971ef4) + ((uVar10 >>> 5 | uVar10 << 0xb)) * 4);
    bVar1 = heap.u32(pbVar12);
    while ((bVar1 & 0x3c) != 0) {
      pbVar12 = pbVar12 + 8;
      bVar1 = heap.u32(pbVar12);
    }
    uVar13 = CONCAT22(uVar9, CONCAT11(heap.u32(pbVar12 + (5) * 4), in_EDX)) & 0xffff1fff;
    if (uVar13 == (uVar13 >>> 8)) {
      return;
    }
    uVar10 = (heap.u32(pbVar12 + (4) * 4) & 0xf) << (in_CL & 0x1f);
    uVar7 = CONCAT22((uVar13 >>> 0x10), CONCAT11(heap.u32(pbVar12 + (2) * 4) >>> 2, uVar13));
    uVar13 = heap.u32(pbVar12 + (4) * 4) & 0x10 | (uVar10 >>> 4 | uVar10) & 0xf;
  } else {
    uVar13 = 0;
    uVar7 = CONCAT22(uVar9, CONCAT11(1, in_EDX));
  }
  cVar2 = uVar7;
  bVar1 = cVar2 + heap.u32((__addr_DAT_005f46c4) + (unaff_EBX) * 4);
  bVar5 = cVar2 + heap.u32((__addr_DAT_005f46e4) + (unaff_EBX) * 4);
  cVar4 = (uVar7 >>> 8);
  bVar3 = cVar4 + heap.u32((__addr_DAT_005f46a4) + (uVar13) * 4);
  bVar6 = cVar4 + heap.u32((__addr_DAT_005f4704) + (uVar13) * 4);
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    iVar11 = heap.u32(0x005f4774);
    if ((heap.u32(0x00991f8c) & 1) != 0) {
      iVar11 = heap.u32(0x005f4770);
    }
    heap.setU32(0x005f4724, (iVar11 + 5) >>> 0);
    uVar9 = (undefined2)(uVar7 >>> 0x10);
    iVar8 = CONCAT22(uVar9, CONCAT11(bVar6, cVar2));
    iVar11 = iVar8;
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        iVar8 = CONCAT22(uVar9, CONCAT11(bVar3, cVar2));
      }
      bVar3 = (byte)(iVar8 >>> 8);
      iVar11 = iVar8;
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
        iVar8 = CONCAT22((iVar8 >>> 0x10), CONCAT11(bVar3 + 1, iVar8));
        iVar11 = iVar8;
      }
    }
    while (bVar3 = (byte)(iVar8 >>> 8), bVar3 < bVar1 && (bVar3 < bVar5)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      iVar8 = (byte)(bVar3 + 1) << 8;
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(iVar11, unaff_EBX);
    }
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}
