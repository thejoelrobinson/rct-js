// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e13d2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e13d2(heap) {
  let puVar1 = 0;
  let iVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let in_AX = regs.eax & 0xffff;
  let sVar8 = 0;
  let sVar9 = 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let puVar10 = 0;
  let puVar11 = 0;
  puVar10 = ((unaff_ESI) >>> 0);
  while (puVar11 = ((puVar10) >>> 0), sVar7 = ((heap.u32(0x0099fb98)) & 0xffff), sVar6 = ((heap.u32(0x0099fb96)) & 0xffff), sVar5 = ((heap.u32(0x0099fb94)) & 0xffff), sVar4 = ((heap.u32(0x0099fb92)) & 0xffff), sVar3 = ((heap.u32(0x0099fb90)) & 0xffff), iVar2 = ((heap.u32(0x0099fb8c)) >>> 0), puVar10 = ((puVar11 + ((0x5e) * 4)) >>> 0), puVar10 < heap.u32(0x009a1164)) {
    if ((((heap.i16((puVar11 + ((0x66) * 4))) < in_DX) && (heap.i16((((puVar11) >>> 0) + 0x19a)) < unaff_BP)) && (in_AX < (((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4))))) << 16 >> 16))) && ((unaff_BX < (((heap.i16((((puVar11) >>> 0) + 0x19a)) + heap.i16((((puVar11) >>> 0) + 0x19e)))) << 16 >> 16) && ((heap.u16((((puVar11) >>> 0) + 0x1aa)) & 0x10) == 0)))) {
      if (in_AX < heap.i16((puVar11 + ((0x66) * 4)))) {
        (regs.eax = FUN_005e13d2(heap));
        in_AX = ((heap.i16((puVar11 + ((0x66) * 4)))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if ((((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4))))) << 16 >> 16) < in_DX) {
        (regs.eax = FUN_005e13d2(heap));
        in_AX = ((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4)))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if (unaff_BX < heap.i16((((puVar11) >>> 0) + 0x19a))) {
        (regs.eax = FUN_005e13d2(heap));
        unaff_BX = ((heap.i16((((puVar11) >>> 0) + 0x19a))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if (unaff_BP <= (((heap.i16((((puVar11) >>> 0) + 0x19a)) + heap.i16((((puVar11) >>> 0) + 0x19e)))) << 16 >> 16)) {
          return;
        }
        (regs.eax = FUN_005e13d2(heap));
        unaff_BX = ((heap.i16((((puVar11) >>> 0) + 0x19a)) + heap.i16((((puVar11) >>> 0) + 0x19e))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      }
      }
      }
    }
  }
  sVar9 = ((heap.i16((unaff_ESI + ((8) * 4)))) & 0xffff);
  if (in_AX < sVar9) {
    in_AX = ((sVar9) & 0xffff);
  }
  if ((((sVar9 + heap.i16((unaff_ESI + ((9) * 4))))) << 16 >> 16) < in_DX) {
    in_DX = ((sVar9 + heap.i16((unaff_ESI + ((9) * 4)))) & 0xffff);
  }
  sVar9 = ((heap.i16((((unaff_ESI) >>> 0) + 0x22))) & 0xffff);
  if (unaff_BX < sVar9) {
    unaff_BX = ((sVar9) & 0xffff);
  }
  sVar9 = ((sVar9 + heap.i16((((unaff_ESI) >>> 0) + 0x26))) & 0xffff);
  if (sVar9 < unaff_BP) {
    unaff_BP = ((sVar9) & 0xffff);
  }
  if ((in_DX <= in_AX) || (unaff_BP <= unaff_BX)) {
    return;
  }
  do {
    sVar9 = ((in_AX - sVar3) & 0xffff);
    heap.setU32(0x0099fb8c, (iVar2) >>> 0);
    heap.setU32(0x0099fb90, (sVar3) >>> 0);
    heap.setU32(0x0099fb94, (sVar5) >>> 0);
    heap.setU32(0x0099fb98, (sVar7) >>> 0);
    if (sVar9 == 0 || in_AX < sVar3) {
      LAB_005e1566: sVar9 = ((heap.u32(0x0099fb94)) & 0xffff);
      sVar8 = (((heap.u32(0x0099fb90) + heap.u32(0x0099fb94)) - in_DX) & 0xffff);
      if (sVar8 != 0 && in_DX <= (((heap.u32(0x0099fb90) + heap.u32(0x0099fb94))) << 16 >> 16)) {
        heap.setU32(0x0099fb94, (heap.u32(0x0099fb94) - sVar8) >>> 0);
        if (heap.u32(0x0099fb94) == 0 || sVar9 < sVar8) {
          /* goto LAB_005e1637 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e13d2/LAB_005e1637"); return 0;
        }
        heap.setU32(0x0099fb98, (heap.u32(0x0099fb98) + sVar8) >>> 0);
      }
      sVar9 = ((unaff_BX - sVar4) & 0xffff);
      heap.setU32(0x0099fb92, (sVar4) >>> 0);
      heap.setU32(0x0099fb96, (sVar6) >>> 0);
      if (sVar9 != 0 && sVar4 <= unaff_BX) {
        heap.setU32(0x0099fb92, (sVar4 + sVar9) >>> 0);
        heap.setU32(0x0099fb96, (sVar6 - sVar9) >>> 0);
        if (heap.u32(0x0099fb96) == 0 || sVar6 < sVar9) {
          /* goto LAB_005e1637 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e13d2/LAB_005e1637"); return 0;
        }
        heap.setU32(0x0099fb8c, (heap.u32(0x0099fb8c) + ((heap.u32(0x0099fb94) + heap.u32(0x0099fb98)) >>> 0) * ((sVar9) >>> 0)) >>> 0);
      }
      sVar9 = ((heap.u32(0x0099fb96)) & 0xffff);
      sVar8 = (((heap.u32(0x0099fb92) + heap.u32(0x0099fb96)) - unaff_BP) & 0xffff);
      if ((sVar8 == 0 || (((heap.u32(0x0099fb92) + heap.u32(0x0099fb96))) << 16 >> 16) < unaff_BP) || (heap.setU32(0x0099fb96, (heap.u32(0x0099fb96) - sVar8) >>> 0), heap.u32(0x0099fb96) != 0 && sVar8 <= sVar9)) {
        heap.setU32(0x009a0129, (heap.u16((0x009a1517 + (heap.u8((heap.u32(unaff_ESI + (7) * 4) + 1)) & 0x7f) * 2))) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
      }
    } else {
      heap.setU32(0x0099fb90, (sVar3 + sVar9) >>> 0);
      heap.setU32(0x0099fb94, (sVar5 - sVar9) >>> 0);
      if (heap.u32(0x0099fb94) != 0 && sVar9 <= sVar5) {
        heap.setU32(0x0099fb98, (sVar7 + sVar9) >>> 0);
        heap.setU32(0x0099fb8c, (iVar2 + sVar9) >>> 0);
        /* goto LAB_005e1566 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e13d2/LAB_005e1566"); return 0;
      }
    }
    LAB_005e1637: do {
      puVar10 = ((unaff_ESI + ((0x5e) * 4)) >>> 0);
      if (heap.u32(0x009a1164) <= puVar10) {
        heap.setU32(0x0099fb8c, (iVar2) >>> 0);
        heap.setU32(0x0099fb90, (sVar3) >>> 0);
        heap.setU32(0x0099fb92, (sVar4) >>> 0);
        heap.setU32(0x0099fb94, (sVar5) >>> 0);
        heap.setU32(0x0099fb96, (sVar6) >>> 0);
        heap.setU32(0x0099fb98, (sVar7) >>> 0);
        return;
      }
      puVar1 = (((((unaff_ESI) >>> 0) + 0x1aa)) >>> 0);
      unaff_ESI = ((puVar10) >>> 0);
    } while ((heap.u16(puVar1) & 0x10) == 0);
  } while (true);
}
