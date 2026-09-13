// @manual — do not regenerate.
// Source: decompiled/c/4238b4.c
// Fix: Ghidra `(int3)X` is a 3-byte truncation cast; translator emitted
// `callIndirect(heap, int3, X)` — replaced with `(X & 0xffffff)`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004238b4(heap) {
  let iVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let extraout_DX = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar9 = 0;
  let uVar3 = 0;
  LAB_00423a9a: {
  heap.setU8(0x005f4949, (0) & 0xff);
  if (((heap.u32(0x00991f8c) & 8) != 0) || ((heap.u32(0x00991f2b) & 1) == 0)) {
    return 1 & 0xffffffffffffff00;
  }
  uVar4 = ((heap.u32(0x00991f28) + 0xf) & 0xffff);
  uVar7 = ((CONCAT22((((((unaff_ESI) >>> 0) >>> 0x10)) << 16 >> 16), uVar4) & 0xfffffff0) >>> 0);
  uVar6 = ((((uVar7) & 0xffff)) & 0xffff);
  if (((in_EDX) & 0xffff) < uVar6) {
    LAB_00423c4a: return 1 & 0xffffffffffffff00;
  }
  uVar2 = ((((((in_EDX) & 0xffff) - uVar6) & 0xffff) >>> 4) & 0xffff);
  uVar3 = ((((uVar2) >>> 0)) >>> 0);
  if ((heap.u32(0x00991f2a) & 0x20) == 0) {
    uVar8 = ((((uVar7 >>> 0x10) & 0xffff)) & 0xffff);
    if ((heap.u32(0x00991f2a) & 0x10) == 0) {
      if ((heap.u32(0x00991f2a) & 0xf) == 0) {
        break LAB_00423a9a;
      }
      uVar3 = ((((uVar2 - 1) >>> 0)) >>> 0);
      if (uVar2 == 0) {
        /* goto LAB_00423c4a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004238b4/LAB_00423c4a"); return 0;
      }
      if (heap.i16((0x005f43d2 + unaff_EDI * 8)) != 0) {
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, ((uVar4 & 0xfff0) + 2) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
        uVar7 = ((((((uVar7) << 16 >> 16) + 0x10) >>> 0)) >>> 0);
        heap.setU8(0x005f4949, (1) & 0xff);
        break LAB_00423a9a;
      }
      uVar7 = ((CONCAT22(uVar8, uVar6 + 0x10)) >>> 0);
    } else {
      uVar3 = ((((uVar2 - 2) >>> 0)) >>> 0);
      if (uVar2 < 2) {
        /* goto LAB_00423c4a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004238b4/LAB_00423c4a"); return 0;
      }
      if (heap.i16((0x005f43d2 + unaff_EDI * 8)) != 0) {
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, ((uVar4 & 0xfff0) + 2) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), ((heap.i16((0x005f43d2 + unaff_EDI * 8)) + heap.i16((0x005f45c4 + (heap.u32(0x00991f2a) & 0x1f) * 2))) & 0xffff) | unaff_EBP));
        sVar5 = ((((uVar7) << 16 >> 16)) & 0xffff);
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, (extraout_DX + 0x12) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
        heap.setU8(0x005f4949, (1) & 0xff);
        uVar7 = ((((sVar5 + 0x20) >>> 0)) >>> 0);
        break LAB_00423a9a;
      }
      uVar7 = ((CONCAT22(uVar8, uVar6 + 0x20)) >>> 0);
    }
  }
  (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar7, unaff_EBP));
  heap.setU8(0x005f4949, (1) & 0xff);
  }
  uVar4 = ((((uVar3) & 0xffff)) & 0xffff);
  do {
    uVar6 = ((((uVar7) & 0xffff)) & 0xffff);
    if (uVar4 == 0) {
      LAB_00423b53: iVar1 = ((heap.u8(0x00991f88)) >>> 0);
      if (((((in_EAX) << 16 >> 16) != 0) && (in_EAX = ((((((in_EAX) << 16 >> 16) - 1) >>> 0)) >>> 0), heap.i16((0x005f442c + unaff_EDI * 2)) != 0)) && (heap.u32((0x005f444b) + (in_EAX * 8) * 4) != 0)) {
        heap.setU32(0x0099a4e8, (heap.u32(((0x005f4444) & 0xffff) + (in_EAX * 8) * 4)) >>> 0);
        heap.setU32(0x0099a4ea, (heap.u32(((0x005f4445) & 0xffff) + (in_EAX * 8) * 4)) >>> 0);
        heap.setU32(0x0099a4ec, (((((heap.u32((0x005f4446) + (in_EAX * 8) * 4)) << 24 >> 24)) << 16 >> 16) + uVar6) >>> 0);
        if ((heap.u32((0x005f444a) + (in_EAX * 8) * 4) == 0) || (heap.u32(0x0099a4f0) == 0)) {
          in_EAX = (((regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), unaff_EBP, unaff_EDI, uVar3))) >>> 0);
          heap.setU8(0x005f4949, (1) & 0xff);
        } else {
          heap.setU8(0x005f4949, (1) & 0xff);
          bVar9 = ((false) & 0xff);
          in_EAX = (((regs.eax = callIndirect(heap, heap.u32((0x004328e0) + (heap.u8(0x00991f88)) * 4)))) >>> 0);
          if (!bVar9) {
            heap.setI32((heap.u32(0x0099a4f0) + 0x1c), (iVar1) & 0xffffffff);
          }
        }
      }
      return CONCAT44(in_EDX, CONCAT31((in_EAX >>> 8) & 0xffffff, heap.u8(0x005f4949)));
    }
    while (true) {
      sVar5 = ((((uVar7) << 16 >> 16)) & 0xffff);
      uVar4 = ((((uVar3) & 0xffff)) & 0xffff);
      if ((((uVar7 & 0x10) != 0) || (uVar4 < 2)) || ((((sVar5 + 0x10)) << 16 >> 16) == heap.u32(0x00991f2c))) {
        break;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar6 = ((sVar5 + 0x20) & 0xffff);
      uVar7 = ((((uVar6) >>> 0)) >>> 0);
      heap.setU8(0x005f4949, (1) & 0xff);
      uVar3 = ((((uVar4 - 2) >>> 0)) >>> 0);
      if (((uVar4 - 2) & 0xffff) == 0) {
        uVar3 = ((0) >>> 0);
        /* goto LAB_00423b53 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004238b4/LAB_00423b53"); return 0;
      }
    }
    (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar7, unaff_EBP));
    uVar7 = ((((sVar5 + 0x10) >>> 0)) >>> 0);
    heap.setU8(0x005f4949, (1) & 0xff);
    uVar4 = ((uVar4 - 1) & 0xffff);
    uVar3 = ((((uVar4) >>> 0)) >>> 0);
  } while (true);
}
