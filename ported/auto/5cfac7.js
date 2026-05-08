// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfac7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../runtime/win32.js";
export function FUN_005cfac7(heap) {
  let in_EAX = 0;
  let uVar4 = 0;
  let uVar3 = 0;
  let in_CX = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let uVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let iVar11 = 0;
  heap.setU32(0x00652470, (heap.u32(unaff_ESI + (7) * 4)) >>> 0);
  uVar9 = heap.u32((unaff_ESI + 5)) & 0xf;
  puVar2 = heap.u32((0x00652498) + (heap.u32(unaff_ESI + (4) * 4)) * 4);
  iVar11 = heap.u32(unaff_ESI + (4) * 4) * 10;
  sVar6 = in_EAX;
  uVar4 = (undefined2)(in_EAX >>> 0x10);
  switch (heap.u32(unaff_ESI) & 3) {
    case 0:
      uVar3 = CONCAT22(heap, uVar4, (sVar6 + heap.u32((0x00653efd + iVar11))) - heap.u32((puVar2 + uVar9 * 10 + 1)));
      uVar5 = (in_CX + heap.u32((0x00653eff + iVar11))) - heap.u32((puVar2 + uVar9 * 10 + 3));
      break;
    case 1:
      uVar3 = CONCAT22(heap, uVar4, (sVar6 + heap.u32((0x00653eff + iVar11))) - heap.u32((puVar2 + uVar9 * 10 + 3)));
      uVar5 = (in_CX - heap.u32((0x00653efd + iVar11))) + heap.u32((puVar2 + uVar9 * 10 + 1));
      break;
    case 2:
      uVar3 = CONCAT22(heap, uVar4, (sVar6 - heap.u32((0x00653efd + iVar11))) + heap.u32((puVar2 + uVar9 * 10 + 1)));
      uVar5 = (in_CX - heap.u32((0x00653eff + iVar11))) + heap.u32((puVar2 + uVar9 * 10 + 3));
      break;
    case 3:
      uVar3 = CONCAT22(heap, uVar4, (sVar6 - heap.u32((0x00653eff + iVar11))) + heap.u32((puVar2 + uVar9 * 10 + 3)));
      uVar5 = (in_CX + heap.u32((0x00653efd + iVar11))) - heap.u32((puVar2 + uVar9 * 10 + 1));
  }
  sVar6 = (heap.u32(unaff_ESI + (2) * 4) * 4 - heap.u32((puVar2 + uVar9 * 10 + 5))) + heap.u32((0x00653efb + iVar11));
  uVar7 = CONCAT11(heap, heap.u32((0x00653ef8) + (iVar11) * 4), heap.u32((0x00653ef8) + (iVar11) * 4)) & 0x4ff;
  uVar9 = CONCAT11(heap, (uVar7 >>> 8), uVar7 + heap.u32(unaff_ESI)) & 0xffffff03;
  bVar8 = (byte)(uVar9 >>> 8);
  heap.setU32(0x00652471, (uVar9 | bVar8) >>> 0);
  if (bVar8 == 0) {
    uVar3 = CONCAT22(heap, (uVar3 >>> 0x10), uVar3 + heap.u32((0x00652478) + (heap.u32(0x00652471) * 2) * 4));
    uVar5 = uVar5 + heap.u32((0x0065247a) + (heap.u32(0x00652471) * 2) * 4);
  }
  uVar5 = uVar5 << 7 | uVar5 >>> 9 | uVar3;
  pbVar10 = heap.u32((0x00971ef4) + ((ushort)(uVar5 >>> 5 | uVar5 << 0xb)) * 4);
  do {
    if ((((heap.u32(pbVar10) & 0x3c) == 8) && (heap.u32(pbVar10 + (7) * 4) == heap.u32(unaff_ESI + (7) * 4))) && ((heap.u32(pbVar10 + (5) * 4) & 0xf) == 0)) {
      iVar11 = heap.u32(pbVar10 + (4) * 4) * 10;
      uVar5 = CONCAT11(heap, heap.u32((0x00653ef7) + (iVar11) * 4), heap.u32((0x00653ef7) + (iVar11) * 4)) & 0x4ff;
      uVar9 = CONCAT11(heap, (uVar5 >>> 8), uVar5 + heap.u32(pbVar10)) & 0xffffff03;
      if (((byte)(uVar9 | (byte)(uVar9 >>> 8)) == heap.u32(0x00652471)) && ((ushort)(heap.u32(pbVar10 + (2) * 4) * 4 + (heap.u32((0x00653ef9 + iVar11)) - heap.u32((heap.u32((0x00652498) + (heap.u32(pbVar10 + (4) * 4)) * 4) + 5)))) == sVar6)) {
        return CONCAT24(heap, heap.u32(pbVar10 + (2) * 4) << 2, uVar3);
      }
    }
    pbVar1 = pbVar10 + 1;
    pbVar10 = pbVar10 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT24(heap, sVar6, uVar3);
    }
  } while (true);
}
