// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/423c54.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00423c54(heap) {
  let iVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let extraout_DX = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar9 = 0;
  let uVar3 = 0;
  LAB_00423efc: {
  heap.setU8(0x005f4949, (0) & 0xff);
  if (((heap.u32(0x00991f8c) & 8) != 0) || ((heap.u32(0x00991f2b) & 1) == 0)) {
    return 1 & 0xffffffffffffff00;
  }
  uVar4 = ((heap.u32(0x00991f28) + 0xf) & 0xffff);
  uVar7 = ((CONCAT22((((((unaff_ESI) >>> 0) >>> 0x10)) << 16 >> 16), uVar4) & 0xfffffff0) >>> 0);
  uVar5 = ((((uVar7) & 0xffff)) & 0xffff);
  if (((in_EDX) & 0xffff) < uVar5) {
    LAB_00423ff3: return 1 & 0xffffffffffffff00;
  }
  uVar2 = ((((((in_EDX) & 0xffff) - uVar5) & 0xffff) >>> 4) & 0xffff);
  uVar3 = ((((uVar2) >>> 0)) >>> 0);
  if ((heap.u32(0x00991f2a) & 0x20) == 0) {
    uVar8 = ((((uVar7 >>> 0x10) & 0xffff)) & 0xffff);
    if ((heap.u32(0x00991f2a) & 0x10) == 0) {
      if ((heap.u32(0x00991f2a) & 0xf) != 0) {
        uVar3 = ((((uVar2 - 1) >>> 0)) >>> 0);
        if (uVar2 == 0) {
          /* goto LAB_00423ff3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00423c54/LAB_00423ff3"); return 0;
        }
        if (heap.i16((0x005f43d2 + unaff_EDI * 8)) == 0) {
          uVar7 = ((CONCAT22(uVar8, uVar5 + 0x10)) >>> 0);
          /* goto LAB_00423d83 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00423c54/LAB_00423d83"); return 0;
        }
        heap.setU32(0x0099a4e8, (0) >>> 0);
        heap.setU32(0x0099a4ea, (0) >>> 0);
        heap.setU32(0x0099a4ec, ((uVar4 & 0xfff0) + 2) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
        uVar7 = ((((((uVar7) << 16 >> 16) + 0x10) >>> 0)) >>> 0);
        heap.setU8(0x005f4949, (1) & 0xff);
      }
    } else {
      uVar3 = ((((uVar2 - 2) >>> 0)) >>> 0);
      if (uVar2 < 2) {
        /* goto LAB_00423ff3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00423c54/LAB_00423ff3"); return 0;
      }
      if (heap.i16((0x005f43d2 + unaff_EDI * 8)) == 0) {
        uVar7 = ((CONCAT22(uVar8, uVar5 + 0x20)) >>> 0);
        /* goto LAB_00423d83 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00423c54/LAB_00423d83"); return 0;
      }
      heap.setU32(0x0099a4e8, (0) >>> 0);
      heap.setU32(0x0099a4ea, (0) >>> 0);
      heap.setU32(0x0099a4ec, ((uVar4 & 0xfff0) + 2) >>> 0);
      (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4), ((heap.i16((0x005f43d2 + unaff_EDI * 8)) + heap.i16((0x005f45c4 + (heap.u32(0x00991f2a) & 0x1f) * 2))) & 0xffff) | unaff_EBP));
      sVar6 = ((((uVar7) << 16 >> 16)) & 0xffff);
      heap.setU32(0x0099a4e8, (0) >>> 0);
      heap.setU32(0x0099a4ea, (0) >>> 0);
      heap.setU32(0x0099a4ec, (extraout_DX + 0x12) >>> 0);
      (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
      heap.setU8(0x005f4949, (1) & 0xff);
      uVar7 = ((((sVar6 + 0x20) >>> 0)) >>> 0);
    }
  } else {
    LAB_00423d83: if (((uVar3) << 16 >> 16) == 0) {
      break LAB_00423efc;
    }
    (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar7, unaff_EBP));
    heap.setU8(0x005f4949, (1) & 0xff);
  }
  uVar4 = ((((uVar3) & 0xffff)) & 0xffff);
  while (uVar4 != 0) {
    while (true) {
      sVar6 = ((((uVar7) << 16 >> 16)) & 0xffff);
      uVar4 = ((((uVar3) & 0xffff)) & 0xffff);
      if ((((uVar7 & 0x10) != 0) || (uVar4 < 2)) || ((((sVar6 + 0x10)) << 16 >> 16) == heap.u32(0x00991f2c))) {
        break;
      }
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar7 = ((((sVar6 + 0x20) >>> 0)) >>> 0);
      heap.setU8(0x005f4949, (1) & 0xff);
      uVar3 = ((((uVar4 - 2) >>> 0)) >>> 0);
      if (((uVar4 - 2) & 0xffff) == 0) {
        uVar3 = ((0) >>> 0);
        break LAB_00423efc;
      }
    }
    (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar7, unaff_EBP));
    uVar7 = ((((sVar6 + 0x10) >>> 0)) >>> 0);
    heap.setU8(0x005f4949, (1) & 0xff);
    uVar4 = ((uVar4 - 1) & 0xffff);
    uVar3 = ((((uVar4) >>> 0)) >>> 0);
  }
  }
  iVar1 = ((heap.u8(0x00991f88)) >>> 0);
  if (((((in_EAX) << 16 >> 16) != 0) && (in_EAX = ((((((in_EAX) << 16 >> 16) - 1) >>> 0)) >>> 0), heap.i16((0x005f442c + unaff_EDI * 2)) != 0)) && (heap.u32((0x005f444b) + (in_EAX * 8) * 4) != 0)) {
    heap.setU32(0x0099a4e8, (heap.u32(((0x005f4444) & 0xffff) + (in_EAX * 8) * 4)) >>> 0);
    heap.setU32(0x0099a4ea, (heap.u32(((0x005f4445) & 0xffff) + (in_EAX * 8) * 4)) >>> 0);
    heap.setU32(0x0099a4ec, (((((heap.u32((0x005f4446) + (in_EAX * 8) * 4)) << 24 >> 24)) << 16 >> 16) + ((uVar7) << 16 >> 16)) >>> 0);
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
  return CONCAT44(in_EDX, CONCAT31((regs.eax = callIndirect(heap, int3, in_EAX >>> 8)), heap.u8(0x005f4949)));
}
