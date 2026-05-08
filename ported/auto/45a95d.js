// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a95d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0045a95d(heap) {
  let uVar1 = 0;
  let uVar3 = 0;
  let in_AX = 0;
  let bVar4 = 0;
  let in_CX = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_BP = 0;
  let bVar13 = 0;
  if (heap.u32((heap.u32(0x00981ef8) + 0xe)) != 0) {
    return;
  }
  heap.setU32(0x0064baf8, (heap.u32(0x0064baf8) + 1) >>> 0);
  uVar7 = 0;
  psVar11 = 0x006439d8;
  uVar6 = 0xffffffff;
  do {
    if (heap.u32((psVar11 + 7)) <= uVar6) {
      uVar6 = heap.u32((psVar11 + 7));
      heap.setU32(0x0064bafc, (uVar7) >>> 0);
      heap.setU32(0x0064bb00, (psVar11) >>> 0);
    }
    psVar2 = heap.u32(0x0064bb00);
    if ((((in_AX == heap.u32(psVar11)) && (heap.u32(0x00971e86) == heap.u32((psVar11 + 1)))) && (heap.u32(0x00971e8a) == heap.u32((psVar11 + 3)))) && ((in_CX == heap.u32(psVar11 + (5) * 4) && (unaff_BP == heap.u32(psVar11 + (6) * 4))))) {
      heap.u32((psVar11 + 7)) = heap.u32(0x0064baf8);
      return;
    }
    uVar7 = uVar7 + 1;
    psVar11 = psVar11 + 0x409;
  } while (uVar7 < 0x10);
  heap.u32(heap.u32(0x0064bb00)) = in_AX;
  heap.u32((psVar2 + 1)) = heap.u32(0x00971e86);
  heap.u32((psVar2 + 3)) = heap.u32(0x00971e8a);
  heap.u32(psVar2 + (5) * 4) = in_CX;
  heap.u32(psVar2 + (6) * 4) = unaff_BP;
  heap.u32((psVar2 + 7)) = heap.u32(0x0064baf8);
  psVar11 = psVar2 + 9;
  for (iVar5 = 0x200; iVar5 != 0; iVar5 = iVar5 + -1) {
    heap.u32(psVar11 + (0) * 4) = 0;
    heap.u32(psVar11 + (1) * 4) = 0;
    psVar11 = psVar11 + 2;
  }
  FUN_00458bcf(heap);
  psVar11 = heap.u32(0x0064bb00);
  uVar6 = heap.u32(heap.u32(0x0064bb00) + (5) * 4);
  puVar9 = heap.u32((0x0064bb08) + (heap.u32(heap.u32(0x0064bb00) + (6) * 4)) * 4);
  pbVar10 = 0x0099a888;
  LAB_0045aa35: do {
    do {
      while (true) {
        while (true) {
          bVar4 = heap.u32(pbVar10);
          pbVar10 = pbVar10 + 1;
          if (bVar4 != 0) {
            break;
          }
          pbVar10 = 0x0099a888;
        }
        if ((0x9b < bVar4) || (bVar4 < 0x8e)) {
          break;
        }
        heap.setU32(0x0064bb04, (heap.u32((heap.u32(0x0093a464) + (uint)(byte)(bVar4 + 0x72) * 4))) >>> 0);
      }
    } while (bVar4 < 0x20);
    uVar7 = heap.u32((uint)(byte)(0x0099a6c8) + ((byte)(bVar4 - 0x20)) * 4);
    pbVar8 = 0x006432d8 + (uint)(byte)(bVar4 - 0x20) * 8;
    do {
      while (uVar3 = heap.u32(0x0064bb04), uVar6 != 0) {
        uVar6 = uVar6 - 1;
        pbVar8 = pbVar8 + 1;
        uVar7 = uVar7 - 1;
        if (uVar7 == 0) {
          /* goto LAB_0045aa35 */ throw new Error("goto LAB_0045aa35 not supported");
        }
      }
      uVar1 = heap.u32(puVar9);
      if (uVar1 == 0xffff) {
        return;
      }
      if (-2 < uVar1) {
        puVar12 = (psVar11 + uVar1 + 0x12);
        bVar4 = heap.u32(pbVar8);
        do {
          bVar13 = (bVar4 & 1);
          bVar4 = bVar4 >>> 1;
          if (bVar13) {
            heap.u32(puVar12) = uVar3;
          }
          puVar12 = puVar12 + 0x40;
        } while (bVar4 != 0);
      }
      pbVar8 = pbVar8 + 1;
      puVar9 = puVar9 + 1;
      uVar7 = uVar7 - 1;
    } while (uVar7 != 0);
  } while (true);
}
