// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448331.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uint3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT21, CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00448c64 } from "./448c64.js";
import { FUN_00448d15 } from "./448d15.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_00448331(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let extraout_ECX = 0;
  let bVar6 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar9 = 0;
  let iVar8 = 0;
  let extraout_EDX = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar13 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let uVar7 = 0;
  LAB_004484b1: {
  uVar14 = (((regs.eax = FUN_00448c64(heap))) >>> 0);
  uVar7 = ((((((uVar14) >>> 0) >>> 0x20) >>> 0)) >>> 0);
  uVar11 = ((0) >>> 0);
  LAB_00448339: uVar9 = ((CONCAT21((((((uVar7) >>> 0) >>> 0x10)) << 16 >> 16), heap.u8(unaff_ESI))) >>> 0);
  uVar2 = ((uVar9 & 0xffff3c) >>> 0);
  iVar8 = ((((uVar2) >>> 0) << 8) >>> 0);
  bVar10 = ((((uVar11) & 0xff)) & 0xff);
  if ((((uVar2) << 24 >> 24) == 4) && ((heap.u8(unaff_ESI + (4)) & 4) != 0)) {
    uVar12 = ((CONCAT31(uVar9, heap.u8(unaff_ESI + (4))) & 0xffff3c03) >>> 0);
    uVar9 = (((regs.eax = callIndirect(heap, uint3, uVar12 >>> 8))) >>> 0);
    bVar6 = ((((uVar12) << 24 >> 24) - bVar10) & 0xff);
    uVar7 = ((CONCAT31(uVar9, bVar6)) >>> 0);
    if ((bVar6 & 1) == 0) {
      iVar8 = ((((uVar9) >>> 0) << 8) >>> 0);
      if ((heap.u8(unaff_ESI + (4)) & 3) == bVar10) {
        iVar8 = ((CONCAT31(uVar9, 4)) >>> 0);
      }
      /* goto LAB_0044836a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00448331/LAB_0044836a"); return 0;
    }
  } else {
    LAB_0044836a: bVar6 = ((((iVar8) << 24 >> 24) + heap.u8(unaff_ESI + (2))) & 0xff);
    uVar7 = ((CONCAT22((((((iVar8) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(bVar6 - 4, bVar6))) >>> 0);
    uVar3 = ((((uVar14) << 16 >> 16) + heap.u32((0x00652478) + (uVar11 * 2) * 4)) & 0xffff);
    uVar4 = ((extraout_CX + heap.u32((0x0065247a) + (uVar11 * 2) * 4)) & 0xffff);
    uVar5 = ((uVar4 * 0x80 | uVar4 >>> 9 | uVar3) & 0xffff);
    pbVar13 = ((heap.u32((0x00971ef4) + (((uVar5 >>> 5 | uVar5 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if ((heap.u8(pbVar13) & 0x3c) == 4) {
        if (bVar6 == heap.u8(pbVar13 + (2))) {
          if ((heap.u8(pbVar13 + (4)) & 4) != 0) {
            bVar6 = ((heap.u8(pbVar13 + (4)) & 3) & 0xff);
            /* goto joined_r0x004483cb — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00448331/joined_r0x004483cb"); return 0;
          }
        } else {
          if (((bVar6 - 4) & 0xff) != heap.u8(pbVar13 + (2))) {
            /* goto LAB_004483ae — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00448331/LAB_004483ae"); return 0;
          }
          if ((heap.u8(pbVar13 + (4)) & 4) == 0) {
            break;
          }
          bVar6 = ((heap.u8(pbVar13 + (4)) & 3 ^ 2) & 0xff);
          joined_r0x004483cb: if (bVar6 != bVar10) {
            break;
          }
        }
        if ((heap.u8(pbVar13 + (4)) & 0xf0) == 0) {
          (regs.eax = FUN_00448d15(heap, uVar7, uVar4, uVar3));
        }
        uVar3 = ((((uVar11) & 0xffff) ^ 2) & 0xffff);
        heap.setU8((pbVar13 + ((((((uVar3) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar13 + ((((((uVar3) << 16 >> 16)) >>> 0) >>> 3) + 6)) & ~(1 << (uVar3 & 7))) & 0xff);
        uVar3 = ((uVar3 - 1 & 3) & 0xffff);
        uVar4 = ((uVar3 + 4) & 0xffff);
        heap.setU8((pbVar13 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar13 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 6)) & ~(1 << (uVar4 & 7))) & 0xff);
        uVar3 = (((uVar3 + 1 & 3) + 4) & 0xffff);
        heap.setU8((pbVar13 + ((((((uVar3) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar13 + ((((((uVar3) << 16 >> 16)) >>> 0) >>> 3) + 6)) & ~(1 << (uVar3 & 7))) & 0xff);
        uVar15 = (((regs.eax = FUN_005e56d3(heap, pbVar13, unaff_EDI))) >>> 0);
        uVar7 = ((((((uVar15) >>> 0) >>> 0x20) >>> 0)) >>> 0);
        uVar12 = ((uVar11 + 1 & 3) >>> 0);
        uVar3 = ((((extraout_ECX) << 16 >> 16) + heap.u32((0x0065247a) + (uVar12 * 2) * 4)) & 0xffff);
        uVar3 = ((uVar3 * 0x80 | uVar3 >>> 9 | ((uVar15) << 16 >> 16) + heap.u32((0x00652478) + (uVar12 * 2) * 4)) & 0xffff);
        pbVar13 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
        /* goto LAB_00448460 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00448331/LAB_00448460"); return 0;
      }
      LAB_004483ae: pbVar1 = ((pbVar13 + 1) >>> 0);
      pbVar13 = ((pbVar13 + 8) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
  }
  break LAB_004484b1;
  while (pbVar1 = ((pbVar13 + 1) >>> 0), pbVar13 = ((pbVar13 + 8) >>> 0), (heap.u8(pbVar1) & 0x80) == 0) {
    LAB_00448460: if (((heap.u8(pbVar13) & 0x3c) == 4) && (((((uVar15) >>> 0) >>> 0x20) & 0xff) == heap.u8(pbVar13 + (2)))) {
      if ((heap.u8(pbVar13 + (4)) & 4) == 0) {
        uVar3 = (((((uVar12) << 16 >> 16) + 1 & 3) + 4) & 0xffff);
        heap.setU8((pbVar13 + ((((((uVar3) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar13 + ((((((uVar3) << 16 >> 16)) >>> 0) >>> 3) + 6)) & ~(1 << (uVar3 & 7))) & 0xff);
        (regs.eax = FUN_005e56d3(heap, pbVar13, unaff_EDI, extraout_ECX, uVar11, ((uVar15) >>> 0)));
        uVar7 = ((extraout_EDX) >>> 0);
      }
      break;
    }
  }
  }
  uVar11 = ((uVar11 + 1) >>> 0);
  if (3 < uVar11) {
    if ((heap.u8(unaff_ESI) & 0x3c) == 4) {
      heap.setU8((unaff_ESI + (6)), (0) & 0xff);
    }
    return 1;
  }
  /* goto LAB_00448339 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00448331/LAB_00448339"); return 0;
}
