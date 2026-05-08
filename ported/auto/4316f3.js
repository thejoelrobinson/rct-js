// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4316f3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00431ad7 } from "./431ad7.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433e1c } from "./433e1c.js";
import { FUN_00436b2a } from "./436b2a.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_009b30f1 } from "./9b30f1.js";
export function FUN_004316f3(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f96d0 = __sp + 0;
  const __addr_DAT_006284ac = __sp + 4;
  const __addr_DAT_00628a3c = __sp + 8;
  try {
  let bVar1 = 0;
  let in_AX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_DX = 0;
  let iVar5 = 0;
  let unaff_BX = 0;
  let uVar6 = 0;
  let unaff_BP = 0;
  let sVar7 = 0;
  let uVar8 = 0;
  let unaff_ESI = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  heap.setU32(0x00991f8c, (heap.u32((unaff_ESI + 0x12))) >>> 0);
  heap.setU32(0x005f96ce, (heap.u32((unaff_ESI + 0x10))) >>> 0);
  uVar8 = -1 << (heap.u32((unaff_ESI + 0x10)) & 0x1f);
  heap.setU32(0x005f96c4, (in_AX & uVar8) >>> 0);
  heap.setU32(0x005f96c6, (unaff_BX & uVar8) >>> 0);
  heap.setU32(0x005f96c8, (in_DX - in_AX & uVar8) >>> 0);
  heap.setU32(0x005f96ca, (unaff_BP - unaff_BX & uVar8) >>> 0);
  bVar1 = heap.u32((unaff_ESI + 0x10));
  heap.setU32(0x005f96cc, (-(((heap.u32(0x005f96c8) >>> (bVar1 & 0x1f)) - heap.u32(unaff_EDI + (2) * 4)) - heap.u32(unaff_EDI + (3) * 4))) >>> 0);
  heap.setU32(0x005f96c0, (heap.u32(unaff_EDI) + ((((heap.u32(0x005f96c4) - (heap.u32((unaff_ESI + 8)) & uVar8)) >>> (bVar1 & 0x1f)) + heap.u32((unaff_ESI + 4))) - heap.u32(unaff_EDI + (1) * 4)) + (heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI + (3) * 4)) * ((((heap.u32(0x005f96c6) - (heap.u32((unaff_ESI + 10)) & uVar8)) >>> (bVar1 & 0x1f)) + heap.u32((unaff_ESI + 6))) - heap.u32((unaff_EDI + 6)))) >>> 0);
  piVar11 = __addr_DAT_005f96d0;
  uVar4 = heap.u32(0x005f96c4) & 0xffffffe0;
  heap.setU32(0x005f96d6, (heap.u32(0x005f96c6)) >>> 0);
  heap.setU32(0x005f96da, (heap.u32(0x005f96ca)) >>> 0);
  heap.setU32(0x005f96de, (heap.u32(0x005f96ce)) >>> 0);
  do {
    uVar3 = heap.u32(0x005f96c4);
    uVar6 = heap.u32(0x005f96c8);
    iVar5 = heap.u32(0x005f96c0);
    sVar7 = heap.u32(0x005f96cc);
    if (uVar3 <= uVar4) {
      uVar6 = uVar6 - (uVar4 - uVar3);
      iVar9 = (uVar4 - uVar3) >>> (heap.u32(0x005f96ce) & 0x1f);
      iVar5 = heap.u32(0x005f96c0) + iVar9;
      sVar7 = heap.u32(0x005f96cc) + iVar9;
      uVar3 = uVar4;
    }
    uVar4 = uVar4 + 0x20;
    iVar9 = uVar6 + uVar3;
    if (uVar4 <= iVar9) {
      iVar10 = iVar9 - uVar4;
      iVar9 = iVar9 - iVar10;
      sVar7 = sVar7 + (iVar10 >>> (heap.u32(0x005f96ce) & 0x1f));
    }
    heap.u32((piVar11 + 1)) = uVar3;
    heap.u32((piVar11 + 2)) = iVar9 - uVar3;
    heap.u32(piVar11) = iVar5;
    heap.u32((piVar11 + 3)) = sVar7;
    if ((heap.u32(0x00991f8c) & 1) != 0) {
      FUN_009b30bc(heap);
    }
    heap.setU32(0x005f96e0, (__addr_DAT_006284ac) >>> 0);
    heap.setU32(0x00981ef8, (piVar11) >>> 0);
    FUN_00431b6f(heap);
    FUN_00436b2a(heap);
    FUN_00433bae(heap);
    FUN_00433e1c(heap);
    piVar2 = heap.u32(0x00981ef8);
    if (heap.u32((__addr_DAT_00628a3c + heap.u32(0x008d7eb4) * 4)) != -1) {
      FUN_009b30f1(heap);
      piVar11 = piVar2;
    }
    FUN_00431ad7(heap);
  } while (uVar4 < (heap.u32(0x005f96c4) + heap.u32(0x005f96c8)));
  return;
} finally {
    heap.freeFrame(12);
  }
}
