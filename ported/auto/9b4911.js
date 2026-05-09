// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b4911.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b4911(heap) {
  let in_EAX = regs.eax >>> 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let iVar9 = 0;
  let uVar11 = 0;
  let puVar10 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar12 = 0;
  let puVar13 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let puVar14 = 0;
  let puVar15 = 0;
  let uVar5 = 0;
  uVar11 = ((((((heap.u32(0x009a2020)) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
      puVar10 = (((CONCAT22(uVar11, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
      do {
        uVar2 = ((heap.u16(puVar10)) & 0xffff);
        heap.setU32(0x009aa032, (((uVar2) & 0xff)) >>> 0);
        uVar6 = ((((heap.u32(0x009aa032) & 0x7f) >>> 0)) >>> 0);
        puVar10 = (((((puVar10) >>> 0) + uVar6 + 2)) >>> 0);
        iVar9 = ((((uVar2 >>> 8) >>> 0) - heap.u32(0x009a2024)) >>> 0);
        if (iVar9 == 0 || ((((uVar2 >>> 8) >>> 0)) >>> 0) < heap.u32(0x009a2024)) {
          uVar4 = ((((heap.u32(0x009aa032) & 0x7f) & 0xffff) + ((iVar9) << 16 >> 16)) & 0xffff);
          uVar6 = ((((uVar4) >>> 0)) >>> 0);
          if ((-1 < (((uVar4) << 16 >> 16) | 0)) && (uVar4 != 0)) {
            iVar9 = ((0) >>> 0);
            /* goto LAB_009b583f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b4911/LAB_009b583f"); return 0;
          }
        } else {
          LAB_009b583f: sVar3 = ((((uVar6) << 16 >> 16)) & 0xffff);
          sVar7 = ((((iVar9) << 16 >> 16) + sVar3) & 0xffff);
          sVar8 = ((sVar7 - heap.u32(0x009a2028)) & 0xffff);
          if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar6 = ((((sVar3 - sVar8) >>> 0)) >>> 0), ((sVar3 - sVar8) & 0xffff) != 0 && sVar8 <= sVar3)) {
            LOCK();
            UNLOCK();
            heap.setU32(0x009a200c, (puVar10) >>> 0);
            uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b5864) + (uVar6) * 4)))) >>> 0);
            return uVar1;
          }
        }
        if (((uVar2 & 0x80) != 0) && (heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0), heap.u32(0x009a202c) == 0)) {
          return 0;
        }
      } while (true);
    }
    puVar10 = (((CONCAT22(uVar11, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
    do {
      uVar2 = ((heap.u16(puVar10)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar2) & 0xff)) >>> 0);
      uVar6 = ((((heap.u32(0x009aa032) & 0x7f) >>> 0)) >>> 0);
      puVar10 = (((((puVar10) >>> 0) + uVar6 + 2)) >>> 0);
      iVar9 = ((((uVar2 >>> 8) >>> 0) - heap.u32(0x009a2024)) >>> 0);
      if (iVar9 == 0 || ((((uVar2 >>> 8) >>> 0)) >>> 0) < heap.u32(0x009a2024)) {
        uVar4 = ((((heap.u32(0x009aa032) & 0x7f) & 0xffff) + ((iVar9) << 16 >> 16)) & 0xffff);
        uVar6 = ((((uVar4) >>> 0)) >>> 0);
        if ((-1 < (((uVar4) << 16 >> 16) | 0)) && (uVar4 != 0)) {
          iVar9 = ((0) >>> 0);
          /* goto LAB_009b4a07 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b4911/LAB_009b4a07"); return 0;
        }
      } else {
        LAB_009b4a07: sVar3 = ((((uVar6) << 16 >> 16)) & 0xffff);
        sVar7 = ((((iVar9) << 16 >> 16) + sVar3) & 0xffff);
        sVar8 = ((sVar7 - heap.u32(0x009a2028)) & 0xffff);
        if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar6 = ((((sVar3 - sVar8) >>> 0)) >>> 0), ((sVar3 - sVar8) & 0xffff) != 0 && sVar8 <= sVar3)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar10) >>> 0);
          uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b4a2c) + (uVar6) * 4)))) >>> 0);
          return uVar1;
        }
      }
      if (((uVar2 & 0x80) != 0) && (heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0), heap.u32(0x009a202c) == 0)) {
        return 0;
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar10 = (((CONCAT22(uVar11, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
    do {
      uVar2 = ((heap.u16(puVar10)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar2) & 0xff)) >>> 0);
      uVar6 = ((((heap.u32(0x009aa032) & 0x7f) >>> 0)) >>> 0);
      puVar10 = (((((puVar10) >>> 0) + uVar6 + 2)) >>> 0);
      iVar9 = ((((uVar2 >>> 8) >>> 0) - heap.u32(0x009a2024)) >>> 0);
      if (iVar9 == 0 || ((((uVar2 >>> 8) >>> 0)) >>> 0) < heap.u32(0x009a2024)) {
        uVar4 = ((((heap.u32(0x009aa032) & 0x7f) & 0xffff) + ((iVar9) << 16 >> 16)) & 0xffff);
        uVar6 = ((((uVar4) >>> 0)) >>> 0);
        if ((-1 < (((uVar4) << 16 >> 16) | 0)) && (uVar4 != 0)) {
          iVar9 = ((0) >>> 0);
          /* goto LAB_009b5123 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b4911/LAB_009b5123"); return 0;
        }
      } else {
        LAB_009b5123: sVar3 = ((((uVar6) << 16 >> 16)) & 0xffff);
        sVar7 = ((((iVar9) << 16 >> 16) + sVar3) & 0xffff);
        sVar8 = ((sVar7 - heap.u32(0x009a2028)) & 0xffff);
        if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar6 = ((((sVar3 - sVar8) >>> 0)) >>> 0), ((sVar3 - sVar8) & 0xffff) != 0 && sVar8 <= sVar3)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar10) >>> 0);
          uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b5148) + (uVar6) * 4)))) >>> 0);
          return uVar1;
        }
      }
      if (((uVar2 & 0x80) != 0) && (heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0), heap.u32(0x009a202c) == 0)) {
        return 0;
      }
    } while (true);
  }
  puVar10 = (((CONCAT22(uVar11, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
  do {
    heap.setU32(0x009aa032, (heap.u8(puVar10)) >>> 0);
    puVar12 = ((puVar10 + ((1) * 2)) >>> 0);
    uVar6 = ((((heap.u16(puVar10) >>> 8) >>> 0)) >>> 0);
    uVar5 = ((((heap.u32(0x009aa032) & 0x7f) >>> 0)) >>> 0);
    puVar10 = (((((puVar12) >>> 0) + uVar5)) >>> 0);
    iVar9 = ((uVar6 - heap.u32(0x009a2024)) >>> 0);
    if (iVar9 == 0 || ((uVar6) >>> 0) < heap.u32(0x009a2024)) {
      puVar12 = (((((puVar12) >>> 0) - iVar9)) >>> 0);
      uVar2 = ((((heap.u32(0x009aa032) & 0x7f) & 0xffff) + ((iVar9) << 16 >> 16)) & 0xffff);
      uVar5 = ((((uVar2) >>> 0)) >>> 0);
      if ((-1 < (((uVar2) << 16 >> 16) | 0)) && (uVar2 != 0)) {
        iVar9 = ((0) >>> 0);
        puVar14 = ((unaff_EDI) >>> 0);
        /* goto LAB_009b4972 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b4911/LAB_009b4972"); return 0;
      }
    } else {
      puVar14 = (((((unaff_EDI) >>> 0) + iVar9)) >>> 0);
      LAB_009b4972: sVar3 = ((((uVar5) << 16 >> 16)) & 0xffff);
      sVar7 = ((((iVar9) << 16 >> 16) + sVar3) & 0xffff);
      sVar8 = ((sVar7 - heap.u32(0x009a2028)) & 0xffff);
      if ((sVar8 == 0 || sVar7 < heap.u32(0x009a2028)) || (uVar5 = ((((sVar3 - sVar8) >>> 0)) >>> 0), ((sVar3 - sVar8) & 0xffff) != 0 && sVar8 <= sVar3)) {
        puVar13 = ((puVar12) >>> 0);
        puVar15 = ((puVar14) >>> 0);
        if ((uVar5 & 1) != 0) {
          puVar15 = (((((puVar14) >>> 0) + 1)) >>> 0);
          puVar13 = (((((puVar12) >>> 0) + 1)) >>> 0);
          heap.setI8(puVar14, (((heap.u16(puVar12)) << 24 >> 24)) & 0xff);
        }
        uVar6 = ((uVar5 >>> 2) >>> 0);
        if ((uVar5 >>> 1 & 1) != 0) {
          heap.setU32(puVar15, (heap.u16(puVar13)) & 0xffffffff);
          puVar13 = ((puVar13 + ((1) * 2)) >>> 0);
          puVar15 = ((puVar15 + ((1) * 2)) >>> 0);
        }
        for (; uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
          heap.setU32(puVar15, (heap.u32(puVar13)) & 0xffffffff);
          puVar13 = ((puVar13 + ((2) * 2)) >>> 0);
          puVar15 = ((puVar15 + ((2) * 2)) >>> 0);
        }
      }
    }
    if ((heap.u32(0x009aa032) & 0x80) != 0) {
      unaff_EDI = (((((unaff_EDI) >>> 0) + ((heap.u32(0x009a2030)) >>> 0))) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_EAX;
      }
    }
  } while (true);
}
