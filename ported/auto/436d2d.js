// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436d2d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { FUN_00436e2b } from "./436e2b.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00436d2d(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00981efc = __sp + 0;
  const __addr_DAT_00981ef8 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let cVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let bVar8 = 0;
  let iVar7 = 0;
  let uVar9 = 0;
  let bVar11 = 0;
  let iVar10 = 0;
  let iVar13 = 0;
  let cVar14 = 0;
  puVar12 = __addr_DAT_00981efc;
  for (iVar7 = 0x2000; iVar7 != 0; iVar7 = iVar7 + -1) {
    heap.u32(puVar12) = 0x5050505;
    puVar12 = puVar12 + 1;
  }
  uVar5 = FUN_005df40c(heap);
  uVar3 = heap.u32(0x006e3b8c);
  uVar2 = heap.u32(0x006e3b88);
  sVar6 = (uVar5 & 0x1ff) + 0x28;
  heap.setU32(0x00628aea, (0) >>> 0);
  do {
    FUN_00436e2b(heap);
    sVar6 = sVar6 + -1;
  } while (sVar6 != 0);
  iVar10 = 0x101;
  iVar7 = 0x81;
  heap.setU32(0x006e3b88, (uVar2) >>> 0);
  heap.setU32(0x006e3b8c, (uVar3) >>> 0);
  do {
    do {
      iVar13 = iVar7;
      sVar6 = heap.u32((iVar10 + 0x981dfb));
      sVar1 = heap.u32((__addr_DAT_00981ef8 + iVar10 + 3));
      bVar8 = (byte)(sVar1 >>> 8);
      bVar11 = sVar1;
      if (bVar8 <= sVar1) {
        bVar11 = bVar8;
      }
      if (sVar6 <= bVar11) {
        bVar11 = sVar6;
      }
      bVar8 = (byte)(sVar6 >>> 8);
      if (bVar8 <= bVar11) {
        bVar11 = bVar8;
      }
      uVar5 = sVar1 - CONCAT11(bVar11, bVar11);
      uVar9 = sVar6 - CONCAT11(bVar11, bVar11);
      cVar14 = uVar5 == '\x02';
      if (cVar14) {
        uVar5 = CONCAT11((uVar5 >>> 8), 1);
      }
      if ((uVar5 >>> 8) == '\x02') {
        uVar5 = CONCAT11(1, uVar5);
        cVar14 = cVar14 + '\x01';
      }
      if (uVar9 == '\x02') {
        uVar9 = CONCAT11((uVar9 >>> 8), 1);
        cVar14 = cVar14 + '\x01';
      }
      if ((uVar9 >>> 8) == '\x02') {
        uVar9 = CONCAT11(1, uVar9);
        cVar14 = cVar14 + '\x01';
      }
      cVar4 = bVar11 * '\x04';
      iVar7 = heap.u32((__addr_DAT_00971ef4) + (iVar13) * 4);
      heap.u32((iVar7 + 2)) = cVar4;
      if ((((uVar5 & 1) != 0 || (uVar9 & 1) != 0) || (uVar9 & 0x100) != 0) || (uVar5 & 0x100) != 0) {
        cVar4 = cVar4 + '\x04';
      }
      if ((cVar14 << 1 & 2U) != 0) {
        cVar4 = cVar4 + '\x04';
      }
      heap.u32((iVar7 + 3)) = cVar4;
      heap.u32((iVar7 + 4)) = (((cVar14 << 1 | uVar5 & 1) << 1 | uVar9 & 1) << 1 | (byte)(uVar9 >>> 8) & 1) << 1 | (byte)(uVar5 >>> 8) & 1;
      iVar10 = iVar10 + 1;
      iVar7 = iVar13 + 1;
    } while (iVar10 < 0x7f);
    bVar11 = (iVar10 >>> 8) + 1;
    iVar10 = CONCAT22((iVar10 >>> 0x10), CONCAT11(bVar11, 1));
    iVar7 = iVar13 + 3;
  } while (bVar11 < 0x7f);
  return;
} finally {
    heap.freeFrame(12);
  }
}
