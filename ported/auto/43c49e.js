// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c49e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042e062 } from "./42e062.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c49e(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let puVar1 = 0;
  let puVar2 = 0;
  let bVar3 = 0;
  let sVar4 = 0;
  let pbVar5 = 0;
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
  let unaff_ESI = regs.esi >>> 0;
  let iVar16 = 0;
  let uVar8 = 0;
  heap.setU8(0x006293d8, (heap.u8((unaff_ESI + 0x70))) & 0xff);
  if ((heap.i8((unaff_ESI + 0x71)) | 0) == -2) {
    heap.setU8((unaff_ESI + 0x71), (0xff) & 0xff);
  }
  uVar6 = ((heap.i16((unaff_ESI + 0xe)) - heap.i16((unaff_ESI + 0x32))) & 0xffff);
  uVar12 = ((((uVar6) >>> 0)) >>> 0);
  uVar11 = ((uVar6) & 0xffff);
  if (((uVar6) << 16 >> 16) < 0) {
    uVar11 = ((-uVar6) & 0xffff);
  }
  uVar7 = ((heap.i16((unaff_ESI + 0x10)) - heap.i16((unaff_ESI + 0x34))) & 0xffff);
  uVar8 = ((((uVar7) >>> 0)) >>> 0);
  uVar9 = ((uVar7) & 0xffff);
  if (((uVar7) << 16 >> 16) < 0) {
    uVar9 = ((-uVar7) & 0xffff);
  }
  uVar15 = ((((uVar11 + uVar9) >>> 0)) >>> 0);
  if (heap.u8((unaff_ESI + 0x71)) < 0xfe) {
    uVar10 = ((heap.u32((unaff_ESI + 0x6e))) >>> 0);
    iVar13 = ((heap.i32((heap.u32((0x0062d640) + (heap.u32((unaff_ESI + 0x2d)) * 2) * 4) + uVar10 * 8 + 4))) >>> 0);
    heap.setI8((unaff_ESI + 0x72), (heap.i8((unaff_ESI + 0x72)) + 1) & 0xff);
    bVar3 = ((heap.u8((heap.u8((unaff_ESI + 0x72)) + 1 + iVar13))) & 0xff);
    uVar14 = ((((bVar3) >>> 0)) >>> 0);
    if (bVar3 == 0xff) {
      heap.setU8((unaff_ESI + 0x70), (0) & 0xff);
      heap.setU8((unaff_ESI + 0x71), (0xff) & 0xff);
      (regs.eax = FUN_0043c60b(heap));
    } else {
      heap.setU8((unaff_ESI + 0x70), (bVar3) & 0xff);
      if ((heap.i8((unaff_ESI + 0x71)) == 8) && (heap.i8((unaff_ESI + 0x72)) == 15)) {
        heap.setU8((unaff_ESI + 0x3e), (heap.u8((unaff_ESI + 0x3e)) >>> 1) & 0xff);
        heap.setU8((unaff_ESI + 0x3d), (heap.u8((unaff_ESI + 0x3d)) >>> 1) & 0xff);
        pbVar5 = (((unaff_ESI + 0x3c)) >>> 0);
        bVar3 = ((heap.u8(pbVar5)) & 0xff);
        heap.setU32(pbVar5, (heap.u8(pbVar5) - 0x1e) & 0xffffffff);
        if (bVar3 < 0x1e) {
          heap.setU8((unaff_ESI + 0x3c), (0) & 0xff);
        }
        heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 4) & 0xff);
        (regs.eax = FUN_0042e062(heap, iVar13));
        iVar16 = ((unaff_ESI) >>> 0);
        uVar12 = (((regs.eax = FUN_005df40c(heap, iVar13, unaff_ESI, uVar15, __addr_stack0x00000000, uVar14, uVar10, uVar8, uVar12))) >>> 0);
        puVar1 = (((unaff_ESI + 0xe)) >>> 0);
        puVar2 = (((unaff_ESI + 0x10)) >>> 0);
        unaff_ESI = ((iVar16) >>> 0);
        (regs.eax = FUN_00452fce(heap, CONCAT22(extraout_var_00, heap.u16(puVar2)), CONCAT22(extraout_var, heap.u16(puVar1)), uVar14, (uVar12 & 3) + 0x18));
      }
    }
    (regs.eax = FUN_005e53ca(heap));
    return heap.u32((unaff_ESI + 0xe));
  }
  if (((uVar11 + uVar9) & 0xffff) <= heap.u16((unaff_ESI + 0x36))) {
    return uVar12;
  }
  if (uVar11 < uVar9) {
    uVar12 = ((8) >>> 0);
    if (-1 < (((uVar7) << 16 >> 16) | 0)) {
      uVar12 = ((0x18) >>> 0);
    }
  } else {
    uVar12 = ((0x10) >>> 0);
    if (-1 < (((uVar6) << 16 >> 16) | 0)) {
      uVar12 = ((0) >>> 0);
    }
  }
  heap.setI8((unaff_ESI + 0x1e), (((uVar12) << 24 >> 24)) & 0xff);
  sVar4 = ((heap.i16((((0x00629264) | 0) + (uVar12 >>> 1)))) & 0xffff);
  iVar13 = ((heap.u8((unaff_ESI + 0xe0)) + 1) >>> 0);
  pbVar5 = ((heap.u32((heap.u32((0x0062d640) + (heap.u32((unaff_ESI + 0x2d)) * 2) * 4) + heap.u32((unaff_ESI + 0x6e)) * 8 + 4))) >>> 0);
  if (heap.u8(pbVar5) <= ((iVar13) & 0xff)) {
    iVar13 = ((0) >>> 0);
  }
  heap.setI8((unaff_ESI + 0xe0), (((iVar13) << 24 >> 24)) & 0xff);
  heap.setU8((unaff_ESI + 0x70), (heap.u8(pbVar5 + (iVar13 + 1))) & 0xff);
  return ((heap.i16((unaff_ESI + 0xe)) + sVar4) >>> 0);
} finally {
    heap.freeFrame(4);
  }
}
