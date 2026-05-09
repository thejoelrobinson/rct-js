// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d89c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004518fc } from "./4518fc.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005d89c0(heap) {
  let puVar1 = 0;
  let pbVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let extraout_EDX_01 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar6 = 0;
  let iVar7 = 0;
  iVar5 = ((0) >>> 0);
  do {
    heap.setU16((unaff_ESI + 0x4c), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0x4e), (0) & 0xffff);
    heap.setU8((unaff_ESI + (0x4a)), (0) & 0xff);
    bVar3 = ((heap.u8(unaff_ESI + (0x31))) & 0xff);
    if ((heap.u16((0x005f7104 + ((bVar3) >>> 0) * 8)) & 4) == 0) {
      LAB_005d8a4f: if ((bVar3 == 0x22) && (heap.u8(unaff_ESI + (0xc5)) != 0)) {
        puVar1 = (((unaff_ESI + 200)) >>> 0);
        uVar4 = ((heap.u16(puVar1)) & 0xffff);
        heap.setU32(puVar1, (heap.u16(puVar1) + 0x3333) & 0xffffffff);
        if (0xcccc < uVar4) {
          heap.setU8((unaff_ESI + (0xc5)), (heap.u8(unaff_ESI + (0xc5)) + 1) & 0xff);
          heap.setU8((unaff_ESI + (0xc5)), (heap.u8(unaff_ESI + (0xc5)) & 7) & 0xff);
          (regs.eax = FUN_005e53ca(heap));
          in_EDX = ((extraout_EDX_00) >>> 0);
        }
        iVar5 = ((iVar5 + 1) >>> 0);
      } else {
        if ((((heap.u16((unaff_ESI + 0x48)) & 0x100) == 0) || ((heap.u8(unaff_ESI + (0xb5)) | 0) == -1)) || ((uVar6 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0)) >>> 0), iVar7 = ((uVar6 * 0x260) >>> 0), heap.u32((0x0088755c) + (iVar7) * 4) != 1 && (heap.u32((0x0088755c) + (iVar7) * 4) != 3)))) {
          pbVar2 = ((unaff_ESI + 0xb5) >>> 0);
          bVar3 = ((heap.u8(pbVar2)) & 0xff);
          heap.setU32(pbVar2, (heap.u8(pbVar2) + 0x14) & 0xffffffff);
          if (0xeb < bVar3) {
            heap.setU8((unaff_ESI + (0xb5)), (0xff) & 0xff);
            /* goto LAB_005d8b29 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d89c0/LAB_005d8b29"); return 0;
          }
        } else {
          if ((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 0x80) == 0) {
          heap.setU32(((0x00887422) + (uVar6 * 0x130) * 4), (heap.u32((0x00887422) + (uVar6 * 0x130) * 4) | 0x80) & 0xffffffff);
          (regs.eax = FUN_004518fc(heap, in_EDX, unaff_EDI, unaff_EBX));
          heap.setU32(((0x0088751d) + (iVar7) * 4), (heap.u32((0x0088751d) + (iVar7) * 4) | 0x1c) & 0xffffffff);
          heap.setU32(((0x0088755d) + (iVar7) * 4), (1) & 0xffffffff);
          heap.setU32(((0x00887560) + (iVar7) * 4), (heap.u32((0x00743bdf) + (heap.u32((0x0088747e + heap.u32(((0x00887561) >>> 0) + (iVar7) * 4) * 2 + iVar7)) * 0x100) * 4)) & 0xffffffff);
          heap.setU32(((0x00887563) + (iVar7) * 4), (heap.u32((0x0088755c) + (iVar7) * 4)) & 0xffffffff);
        }
        }
        (regs.eax = FUN_005e53ca(heap));
        iVar5 = ((iVar5 + 1) >>> 0);
        in_EDX = ((extraout_EDX_01) >>> 0);
      }
    } else {
      uVar4 = ((heap.u16((unaff_ESI + 0xb6))) & 0xffff);
      if (((uVar4) << 16 >> 16) < 0) {
        uVar4 = ((-uVar4) & 0xffff);
      }
      bVar3 = ((((uVar4) & 0xff)) & 0xff);
      if ((uVar4 < 0x1f5) && ((heap.u8(unaff_ESI + (0xba)) & 0x30) == 0)) {
        heap.setU16((unaff_ESI + 0xb6), (0) & 0xffff);
        /* goto LAB_005d8a4f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d89c0/LAB_005d8a4f"); return 0;
      }
      iVar5 = ((iVar5 + 1) >>> 0);
      uVar4 = ((heap.u16((unaff_ESI + 0xb6))) & 0xffff);
      if (((uVar4) << 16 >> 16) < 0) {
        uVar4 = ((-uVar4) & 0xffff);
      }
      if (uVar4 < 400) {
        heap.setU16((unaff_ESI + 0xb6), (400) & 0xffff);
      }
      heap.setU8((unaff_ESI + (0xba)), (heap.u8(unaff_ESI + (0xba)) + (((heap.u16((unaff_ESI + 0xb6)) >>> 8)) << 24 >> 24)) & 0xff);
      heap.setI16((unaff_ESI + 0xb6), (heap.i16((unaff_ESI + 0xb6)) - (heap.i16((unaff_ESI + 0xb6)) >>> 8)) & 0xffff);
      (regs.eax = FUN_005e53ca(heap));
      in_EDX = ((extraout_EDX) >>> 0);
    }
    LAB_005d8b29: if ((heap.i16((unaff_ESI + 0x3e)) | 0) == -1) {
      if (iVar5 == 0) {
        return in_EAX;
      }
      return in_EAX;
    }
    unaff_ESI = ((0x00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100) >>> 0);
  } while (true);
}
