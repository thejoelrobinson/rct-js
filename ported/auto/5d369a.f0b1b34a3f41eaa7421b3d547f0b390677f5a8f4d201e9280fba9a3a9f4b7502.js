// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d369a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT21, CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
export function FUN_005d369a(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar8 = 0;
  let uVar10 = 0;
  let uVar9 = 0;
  let uVar11 = 0;
  let puVar12 = 0;
  let iVar13 = 0;
  heap.setU32(0x006522c1, (0) >>> 0);
  uVar8 = ((unaff_EBX & 0xffff0000) >>> 0);
  do {
    uVar11 = ((0) & 0xffff);
    LAB_005d36aa: do {
      puVar12 = ((heap.u32((0x00971ef4) + (((((uVar11 << 7 | uVar11 >>> 9 | ((uVar8) & 0xffff)) & 0xffff) >>> 5 | (uVar11 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        in_EDX = ((CONCAT22((((in_EDX >>> 0x10)) << 16 >> 16), CONCAT11(heap.u8(puVar12), ((in_EDX) << 24 >> 24))) & 0xffff3cff) >>> 0);
        uVar10 = ((((uVar8 >>> 0x10) & 0xffff)) & 0xffff);
        if (((((in_EDX >>> 8)) << 24 >> 24) == 8) && (((in_EDX) << 24 >> 24) == heap.u8(puVar12 + (7)))) {
          uVar3 = ((uVar8 & 0xffff) >>> 0);
          uVar4 = ((((uVar11) >>> 0)) >>> 0);
          iVar13 = ((((((heap.u8(puVar12 + (2))) & 0xff)) >>> 0) << 2) >>> 0);
          uVar9 = ((CONCAT31(CONCAT21(uVar10, heap.u8(puVar12)), 1) & 0xffff03ff) >>> 0);
          if (heap.u8(puVar12 + (4)) == 101) {
            uVar5 = ((CONCAT22((((in_EDX >>> 0x10)) << 16 >> 16), CONCAT11(2, heap.u8(puVar12 + (7))))) >>> 0);
            uVar2 = ((uVar9 >>> 0x10) >>> 0);
            bVar6 = ((((uVar9) & 0xff)) & 0xff);
            (regs.eax = FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3));
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(((uVar2) << 16 >> 16), ((bVar6) & 0xffff))) >>> 0);
            uVar2 = ((uVar9 >>> 0x10) >>> 0);
            uVar7 = ((((uVar9) & 0xff)) & 0xff);
            (regs.eax = FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3));
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(((uVar2) << 16 >> 16), CONCAT11(1, uVar7))) >>> 0);
            uVar2 = ((uVar9 >>> 0x10) >>> 0);
            uVar7 = ((((uVar9) & 0xff)) & 0xff);
            (regs.eax = FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3));
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22(((uVar2) << 16 >> 16), CONCAT11(2, uVar7))) >>> 0);
            (regs.eax = FUN_00426f56(heap, iVar13, uVar5, uVar4, uVar9, uVar3));
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + CONCAT22((((uVar9 >>> 0x10)) << 16 >> 16), CONCAT11(3, ((uVar9) << 24 >> 24)))) >>> 0);
          } else {
            (regs.eax = FUN_00426f56(heap));
            heap.setU32(0x006522c1, (heap.u32(0x006522c1) + uVar9) >>> 0);
          }
          /* goto LAB_005d36aa — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d369a/LAB_005d36aa"); return 0;
        }
        pbVar1 = ((puVar12 + 1) >>> 0);
        puVar12 = ((puVar12 + 8) >>> 0);
      } while ((heap.u8(pbVar1) & 0x80) == 0);
      uVar11 = ((uVar11 + 0x20) & 0xffff);
    } while (uVar11 < 0x1000);
    uVar11 = ((((uVar8) & 0xffff) + 0x20) & 0xffff);
    uVar8 = ((CONCAT22(uVar10, uVar11)) >>> 0);
    if (0xfff < uVar11) {
      return;
    }
  } while (true);
}
