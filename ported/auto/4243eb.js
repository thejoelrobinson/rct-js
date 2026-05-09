// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4243eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004243eb(heap) {
  let in_EAX = regs.eax >>> 0;
  let sVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let uVar5 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar6 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar8 = 0;
  let puVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  if ((heap.u32(0x00991f8c) & 8) == 0) {
    if ((heap.u32(0x00991f2b) & 1) == 0) {
      LAB_004247d8: return 1;
    }
    heap.setU32(0x005f4728, (0xffff) >>> 0);
    uVar4 = ((((in_EDX) & 0xffff)) & 0xffff);
    uVar5 = ((in_EDX) >>> 0);
    uVar6 = ((unaff_EBX) >>> 0);
    if (uVar4 < heap.u16((0x00991f04 + unaff_EBX * 4))) {
      heap.setU32(0x005f4728, (uVar4) >>> 0);
      uVar2 = ((uVar4 - heap.i16((0x005f438a + unaff_EDI * 2))) & 0xffff);
      if (((uVar2) << 16 >> 16) < 0) {
        /* goto LAB_004247d8 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004243eb/LAB_004247d8"); return 0;
      }
      iVar8 = ((heap.u8(0x00991f88) * 2) >>> 0);
      puVar9 = ((0x005f419a + iVar8) >>> 0);
      uVar7 = ((((((heap.u8(puVar9 + (unaff_EBX * 8))) & 0xff)) >>> 0)) >>> 0);
      if (uVar2 <= heap.u16((0x00991f04 + uVar7 * 4))) {
        puVar9 = (((iVar8 + 0x5f41e2)) >>> 0);
        uVar7 = ((((((heap.u8(puVar9 + (unaff_EBX * 8))) & 0xff)) >>> 0)) >>> 0);
        if (uVar2 <= heap.u16((0x00991f04 + uVar7 * 4))) {
          puVar9 = (((iVar8 + 0x5f422a)) >>> 0);
          uVar7 = ((((((heap.u8(puVar9 + (unaff_EBX * 8))) & 0xff)) >>> 0)) >>> 0);
          if (uVar2 <= heap.u16((0x00991f04 + uVar7 * 4))) {
            puVar9 = (((iVar8 + 0x5f4272)) >>> 0);
            uVar7 = ((((((heap.u8(puVar9 + (unaff_EBX * 8))) & 0xff)) >>> 0)) >>> 0);
            if (uVar2 <= heap.u16((0x00991f04 + uVar7 * 4))) {
              /* goto LAB_004247e0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004243eb/LAB_004247e0"); return 0;
            }
          }
        }
      }
      if (3 < ((heap.u8(puVar9 + (unaff_EBX * 8 + 1))) & 0xff)) {
        LAB_004247e0: return 1;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      unaff_EBX = ((uVar7) >>> 0);
      in_EDX = ((extraout_EDX) >>> 0);
    }
    if ((((heap.u32((0x00991f06) + (unaff_EBX * 4) * 4) & 0x20) == 0) && (5 < (((((in_EDX) << 16 >> 16) - heap.i16((0x00991f04 + unaff_EBX * 4)))) << 16 >> 16))) && (heap.i16((0x005f43a0 + unaff_EDI * 4)) != 0)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), unaff_EBP, unaff_EDI));
      sVar3 = ((heap.i16((0x00991f04 + unaff_EBX * 4)) + 6) & 0xffff);
      uVar7 = ((in_EDX) >>> 0);
    } else {
      sVar3 = ((heap.i16((0x00991f04 + unaff_EBX * 4))) & 0xffff);
      uVar7 = ((in_EDX) >>> 0);
    }
    in_EDX = ((uVar5) >>> 0);
    uVar5 = ((uVar7 & 0xffff) >>> 0);
    uVar4 = ((sVar3 + 0x10 & 0xfff0) & 0xffff);
    if (((uVar7) & 0xffff) < uVar4) {
      uVar4 = ((((uVar7) & 0xffff)) & 0xffff);
    }
    sVar1 = ((uVar4 - sVar3) & 0xffff);
    if (sVar1 != 0 && sVar3 <= ((uVar4) << 16 >> 16)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), unaff_EBP, uVar5, unaff_EDI));
    }
    uVar4 = ((sVar3 + sVar1) & 0xffff);
    while (true) {
      uVar2 = ((uVar4 + 0x10) & 0xffff);
      if (((uVar5) & 0xffff) < ((uVar4 + 0x10) & 0xffff)) {
        uVar2 = ((((uVar5) & 0xffff)) & 0xffff);
      }
      sVar3 = ((uVar2 - uVar4) & 0xffff);
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), unaff_EBP, uVar5, unaff_EDI));
      uVar4 = ((uVar4 + sVar3) & 0xffff);
      uVar2 = ((uVar4 + 0x10) & 0xffff);
      if (((uVar5) & 0xffff) < ((uVar4 + 0x10) & 0xffff)) {
        uVar2 = ((((uVar5) & 0xffff)) & 0xffff);
      }
      sVar3 = ((uVar2 - uVar4) & 0xffff);
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar4 = ((uVar4 + sVar3) & 0xffff);
      uVar2 = ((uVar4 + 0x10) & 0xffff);
      if (((uVar5) & 0xffff) < ((uVar4 + 0x10) & 0xffff)) {
        uVar2 = ((((uVar5) & 0xffff)) & 0xffff);
      }
      sVar3 = ((uVar2 - uVar4) & 0xffff);
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar4 = ((uVar4 + sVar3) & 0xffff);
      uVar2 = ((uVar4 + 0x10) & 0xffff);
      if (((uVar5) & 0xffff) < ((uVar4 + 0x10) & 0xffff)) {
        uVar2 = ((((uVar5) & 0xffff)) & 0xffff);
      }
      sVar3 = ((uVar2 - uVar4) & 0xffff);
      if (uVar2 < uVar4 || sVar3 == 0) {
        break;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar4 = ((uVar4 + sVar3) & 0xffff);
    }
    heap.setU16((0x00991f04 + unaff_EBX * 4), (heap.u32(0x005f4728)) & 0xffff);
    heap.setU32(((0x00991f06) + (unaff_EBX * 4) * 4), (0x20) & 0xffffffff);
    if (((in_EAX) << 16 >> 16) != 0) {
      heap.setU32(0x0099a4ec, (((in_EDX) << 16 >> 16)) >>> 0);
      uVar7 = ((((((in_EAX) << 16 >> 16) + heap.u32(0x0099a4ec)) >>> 0)) >>> 0);
      heap.setU32(0x0099a4e8, (heap.u32(((0x005f4188) & 0xffff) + (uVar6 * 2) * 4)) >>> 0);
      heap.setU32(0x0099a4ea, (heap.u32(((0x005f4189) & 0xffff) + (uVar6 * 2) * 4)) >>> 0);
      uVar5 = ((in_EDX) >>> 0);
      while (true) {
        uVar2 = ((((uVar5) & 0xffff)) & 0xffff);
        uVar4 = ((uVar2 + 0x10) & 0xffff);
        if (((uVar7) & 0xffff) < ((uVar2 + 0x10) & 0xffff)) {
          uVar4 = ((((uVar7) & 0xffff)) & 0xffff);
        }
        sVar3 = ((uVar4 - uVar2) & 0xffff);
        if (uVar4 < uVar2 || sVar3 == 0) {
          break;
        }
        in_EAX = (((regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), unaff_EBP, uVar7, unaff_EDI, uVar5, sVar3, uVar6, unaff_ESI))) >>> 0);
        uVar5 = ((((uVar2 + sVar3) >>> 0)) >>> 0);
      }
    }
  }
  return 1;
}
