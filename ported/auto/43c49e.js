// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c49e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../runtime/win32.js";
import { FUN_0042e062 } from "./42e062.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c49e(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_PTR_DAT_0062d640 = __sp + 0;
  const __addr_stack0x00000000 = __sp + 4;
  const __addr_DAT_00629264 = __sp + 8;
  try {
  let bVar3 = 0;
  let sVar4 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let extraout_var = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let extraout_var_00 = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let iVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let unaff_ESI = 0;
  let iVar16 = 0;
  let uVar8 = 0;
  heap.setU32(0x006293d8, (heap.u32((unaff_ESI + 0x70))) >>> 0);
  if (heap.u32((unaff_ESI + 0x71)) == -2) {
    heap.u32((unaff_ESI + 0x71)) = 0xff;
  }
  uVar6 = heap.u32((unaff_ESI + 0xe)) - heap.u32((unaff_ESI + 0x32));
  uVar12 = uVar6;
  uVar11 = uVar6;
  if (uVar6 < 0) {
    uVar11 = -uVar6;
  }
  uVar7 = heap.u32((unaff_ESI + 0x10)) - heap.u32((unaff_ESI + 0x34));
  uVar8 = uVar7;
  uVar9 = uVar7;
  if (uVar7 < 0) {
    uVar9 = -uVar7;
  }
  uVar15 = (uint)(ushort)(uVar11 + uVar9);
  if (heap.u32((unaff_ESI + 0x71)) < 0xfe) {
    uVar10 = (uint) * (unaff_ESI + 0x6e);
    iVar13 = heap.u32((heap.u32((__addr_PTR_DAT_0062d640) + ((uint) * (unaff_ESI + 0x2d) * 2) * 4) + uVar10 * 8 + 4));
    heap.u32((unaff_ESI + 0x72)) = heap.u32((unaff_ESI + 0x72)) + '\x01';
    bVar3 = heap.u32((heap.u32((unaff_ESI + 0x72)) + 1 + iVar13));
    uVar14 = bVar3;
    if (bVar3 == 0xff) {
      heap.u32((unaff_ESI + 0x70)) = 0;
      heap.u32((unaff_ESI + 0x71)) = 0xff;
      FUN_0043c60b(heap);
    } else {
      heap.u32((unaff_ESI + 0x70)) = bVar3;
      if ((heap.u32((unaff_ESI + 0x71)) == '\b') && (heap.u32((unaff_ESI + 0x72)) == '\x0f')) {
        heap.u32((unaff_ESI + 0x3e)) = heap.u32((unaff_ESI + 0x3e)) >>> 1;
        heap.u32((unaff_ESI + 0x3d)) = heap.u32((unaff_ESI + 0x3d)) >>> 1;
        pbVar5 = (unaff_ESI + 0x3c);
        bVar3 = heap.u32(pbVar5);
        heap.u32(pbVar5) = heap.u32(pbVar5) - 0x1e;
        if (bVar3 < 0x1e) {
          heap.u32((unaff_ESI + 0x3c)) = 0;
        }
        heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 4;
        FUN_0042e062(heap, iVar13);
        iVar16 = unaff_ESI;
        uVar12 = FUN_005df40c(heap, iVar13, unaff_ESI, uVar15, __addr_stack0x00000000, uVar14, uVar10, uVar8, uVar12);
        puVar1 = (unaff_ESI + 0xe);
        puVar2 = (unaff_ESI + 0x10);
        unaff_ESI = iVar16;
        FUN_00452fce(heap, CONCAT22(heap, extraout_var_00, heap.u32(puVar2)), CONCAT22(heap, extraout_var, heap.u32(puVar1)), uVar14, (uVar12 & 3) + 0x18);
      }
    }
    FUN_005e53ca(heap);
    return (uint) * (unaff_ESI + 0xe);
  }
  if ((ushort)(uVar11 + uVar9) <= (ushort) * (unaff_ESI + 0x36)) {
    return uVar12;
  }
  if (uVar11 < uVar9) {
    uVar12 = 8;
    if (-1 < uVar7) {
      uVar12 = 0x18;
    }
  } else {
    uVar12 = 0x10;
    if (-1 < uVar6) {
      uVar12 = 0;
    }
  }
  heap.u32((unaff_ESI + 0x1e)) = uVar12;
  sVar4 = heap.u32((__addr_DAT_00629264 + (uVar12 >>> 1)));
  iVar13 = heap.u32((unaff_ESI + 0xe0)) + 1;
  pbVar5 = heap.u32((heap.u32((__addr_PTR_DAT_0062d640) + ((uint) * (unaff_ESI + 0x2d) * 2) * 4) + (uint) * (unaff_ESI + 0x6e) * 8 + 4));
  if (heap.u32(pbVar5) <= iVar13) {
    iVar13 = 0;
  }
  heap.u32((unaff_ESI + 0xe0)) = iVar13;
  heap.u32((unaff_ESI + 0x70)) = heap.u32(pbVar5 + (iVar13 + 1) * 4);
  return (uint)(ushort)(heap.u32((unaff_ESI + 0xe)) + sVar4);
} finally {
    heap.freeFrame(12);
  }
}
