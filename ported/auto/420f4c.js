// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420f4c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { FUN_00433b76 } from "./433b76.js";
export function FUN_00420f4c(heap) {
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
  let in_DL = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_EBX = 0;
  let uVar9 = 0;
  let pbVar10 = 0;
  let uVar11 = 0;
  let cVar2 = 0;
  let cVar4 = 0;
  uVar9 = heap.u32(0x00991f74) + heap.u32((__addr_DAT_005f4696 + heap.u32(0x00991f88) * 4));
  if (((heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4694 + heap.u32(0x00991f88) * 4))) < 0x1000) && (uVar9 < 0x1000)) {
    uVar9 = uVar9 * 0x80 | uVar9 >>> 9 | heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4694 + heap.u32(0x00991f88) * 4));
    pbVar10 = heap.u32((__addr_DAT_00971ef4) + ((uVar9 >>> 5 | uVar9 << 0xb)) * 4);
    bVar1 = heap.u32(pbVar10);
    while ((bVar1 & 0x3c) != 0) {
      pbVar10 = pbVar10 + 8;
      bVar1 = heap.u32(pbVar10);
    }
    uVar9 = (heap.u32(pbVar10 + (4) * 4) & 0xf) << (in_CL & 0x1f);
    uVar7 = CONCAT11(heap.u32(pbVar10 + (2) * 4) >>> 2, in_DL);
    uVar11 = heap.u32(pbVar10 + (4) * 4) & 0x10 | (uVar9 >>> 4 | uVar9) & 0xf;
  } else {
    uVar11 = 0;
    uVar7 = CONCAT11(1, in_DL);
  }
  cVar2 = uVar7;
  bVar1 = cVar2 + heap.u32((__addr_DAT_005f46c4) + (unaff_EBX) * 4);
  bVar5 = cVar2 + heap.u32((__addr_DAT_005f46a4) + (unaff_EBX) * 4);
  cVar4 = (uVar7 >>> 8);
  bVar3 = cVar4 + heap.u32((__addr_DAT_005f46e4) + (uVar11) * 4);
  bVar6 = cVar4 + heap.u32((__addr_DAT_005f4704) + (uVar11) * 4);
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    if ((heap.u32(0x00991f8c) & 1) == 0) {
      FUN_00433b76(heap, uVar7);
      return;
    }
    heap.setU32(0x005f4724, (heap.u32(0x005f4770)) >>> 0);
    uVar8 = CONCAT11(bVar6, cVar2);
    uVar11 = uVar8;
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        uVar8 = CONCAT11(bVar3, cVar2);
      }
      bVar3 = (uVar8 >>> 8);
      uVar11 = uVar8;
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
        uVar8 = CONCAT11(bVar3 + 1, uVar8);
        uVar11 = uVar8;
      }
    }
    while (bVar3 = (uVar8 >>> 8), bVar3 < bVar1 && (bVar3 < bVar5)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar8 = (bVar3 + 1) << 8;
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(uVar11, unaff_EBX);
    }
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}
