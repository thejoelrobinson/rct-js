// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfc50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../runtime/win32.js";
export function FUN_005cfc50(heap) {
  let uVar3 = 0;
  let in_EAX = 0;
  let uVar5 = 0;
  let uVar4 = 0;
  let in_CX = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let iVar11 = 0;
  heap.setU32(0x00652470, (heap.u32(unaff_ESI + (7) * 4)) >>> 0);
  uVar9 = heap.u32((unaff_ESI + 5)) & 0xf;
  puVar2 = heap.u32((0x00652498) + (heap.u32(unaff_ESI + (4) * 4)) * 4);
  iVar11 = heap.u32(unaff_ESI + (4) * 4) * 10;
  sVar7 = in_EAX;
  uVar5 = (undefined2)(in_EAX >>> 0x10);
  switch (heap.u32(unaff_ESI) & 3) {
    case 0:
      uVar4 = CONCAT22(heap, uVar5, sVar7 - heap.u32((puVar2 + uVar9 * 10 + 1)));
      uVar6 = in_CX - heap.u32((puVar2 + uVar9 * 10 + 3));
      break;
    case 1:
      uVar4 = CONCAT22(heap, uVar5, sVar7 - heap.u32((puVar2 + uVar9 * 10 + 3)));
      uVar6 = in_CX + heap.u32((puVar2 + uVar9 * 10 + 1));
      break;
    case 2:
      uVar4 = CONCAT22(heap, uVar5, sVar7 + heap.u32((puVar2 + uVar9 * 10 + 1)));
      uVar6 = in_CX + heap.u32((puVar2 + uVar9 * 10 + 3));
      break;
    case 3:
      uVar4 = CONCAT22(heap, uVar5, sVar7 + heap.u32((puVar2 + uVar9 * 10 + 3)));
      uVar6 = in_CX - heap.u32((puVar2 + uVar9 * 10 + 1));
  }
  sVar7 = (heap.u32(unaff_ESI + (2) * 4) * 4 - heap.u32((puVar2 + uVar9 * 10 + 5))) + heap.u32((0x00653ef9 + iVar11));
  uVar3 = CONCAT11(heap, heap.u32((0x00653ef7) + (iVar11) * 4), heap.u32((0x00653ef7) + (iVar11) * 4)) & 0x4ff;
  uVar9 = CONCAT11(heap, (uVar3 >>> 8), uVar3 + heap.u32(unaff_ESI)) & 0xffffff03;
  heap.setU32(0x00652471, (uVar9 | (byte)(uVar9 >>> 8)) >>> 0);
  bVar8 = heap.u32(0x00652471) ^ 2;
  if ((bVar8 & 4) == 0) {
    uVar4 = CONCAT22(heap, (uVar4 >>> 0x10), uVar4 + heap.u32((0x00652478) + (bVar8 * 2) * 4));
    uVar6 = uVar6 + heap.u32((0x0065247a) + (bVar8 * 2) * 4);
  }
  uVar3 = uVar4;
  uVar6 = uVar6 << 7 | uVar6 >>> 9 | uVar3;
  pbVar10 = heap.u32((0x00971ef4) + ((ushort)(uVar6 >>> 5 | uVar6 << 0xb)) * 4);
  do {
    if ((((heap.u32(pbVar10) & 0x3c) == 8) && (heap.u32(pbVar10 + (7) * 4) == heap.u32(unaff_ESI + (7) * 4))) && (heap.u32(heap.u32((0x00652498) + (heap.u32(pbVar10 + (4) * 4)) * 4) + ((heap.u32((pbVar10 + 5)) & 0xf) * 10 + 10) * 4) == -1)) {
      iVar11 = heap.u32(pbVar10 + (4) * 4) * 10;
      uVar6 = CONCAT11(heap, heap.u32((0x00653ef8) + (iVar11) * 4), heap.u32((0x00653ef8) + (iVar11) * 4)) & 0x4ff;
      uVar9 = CONCAT11(heap, (uVar6 >>> 8), uVar6 + heap.u32(pbVar10)) & 0xffffff03;
      if (((byte)(uVar9 | (byte)(uVar9 >>> 8)) == heap.u32(0x00652471)) && ((ushort)(heap.u32(pbVar10 + (2) * 4) * 4 + (heap.u32((0x00653efb + iVar11)) - heap.u32((heap.u32((0x00652498) + (heap.u32(pbVar10 + (4) * 4)) * 4) + (heap.u32(pbVar10 + (5) * 4) & 0xf) * 10 + 5)))) == sVar7)) {
        switch (heap.u32(pbVar10) & 3) {
          case 0:
            sVar7 = uVar3 - heap.u32((0x00653efd + heap.u32(pbVar10 + (4) * 4) * 10));
            break;
          case 1:
            sVar7 = uVar3 - heap.u32((0x00653eff + heap.u32(pbVar10 + (4) * 4) * 10));
            break;
          case 2:
            sVar7 = uVar3 + heap.u32((0x00653efd + heap.u32(pbVar10 + (4) * 4) * 10));
            break;
          case 3:
            sVar7 = uVar3 + heap.u32((0x00653eff + heap.u32(pbVar10 + (4) * 4) * 10));
        }
        return CONCAT24(heap, heap.u32(pbVar10 + (2) * 4) * 4 + (heap.u32((heap.u32((0x00652498) + (heap.u32(pbVar10 + (4) * 4)) * 4) + 5)) - heap.u32((heap.u32((0x00652498) + (heap.u32(pbVar10 + (4) * 4)) * 4) + (heap.u32((pbVar10 + 5)) & 0xf) * 10 + 5))), CONCAT22(heap, sVar7, uVar3));
      }
    }
    pbVar1 = pbVar10 + 1;
    pbVar10 = pbVar10 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT24(heap, sVar7, uVar4);
    }
  } while (true);
}
