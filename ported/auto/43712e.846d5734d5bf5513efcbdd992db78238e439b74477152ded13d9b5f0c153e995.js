// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43712e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043725f } from "./43725f.js";
export function FUN_0043712e(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar3 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  let pbVar4 = 0;
  heap.setU32(0x00628af6, (1) >>> 0);
  uVar3 = ((((in_EAX) & 0xffff)) & 0xffff);
  if ((((0xfdf < ((uVar3) << 16 >> 16)) || (0xfdf < ((in_CX) << 16 >> 16))) || (((uVar3) << 16 >> 16) < 0x20)) || (((in_CX) << 16 >> 16) < 0x20)) {
    heap.setU32(0x00991efc, (0x458) >>> 0);
    return 1;
  }
  uVar3 = ((in_CX << 7 | in_CX >>> 9 | uVar3) & 0xffff);
  pbVar4 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    bVar2 = ((heap.u8(pbVar4) & 0x3c) & 0xff);
    if (((bVar2 != 0) && (bVar2 != 0x3c)) && ((((in_EDX) & 0xff) < heap.u8(pbVar4 + (3)) && ((heap.u8(pbVar4 + (2)) < ((((in_EDX) >>> 0) >>> 8) & 0xff) && ((heap.u8(pbVar4 + (1)) & 0xf) != 0)))))) {
      if (bVar2 == 0x10) {
        LAB_0043724b: (regs.eax = FUN_0043725f(heap));
        return 1;
      }
      if (bVar2 == 4) {
        if ((heap.u8(pbVar4 + ((((((unaff_BX) << 16 >> 16)) | 0) >>> 3) + 6)) >>> (unaff_BX & 7) & 1) != 0) {
          /* goto LAB_0043724b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043712e/LAB_0043724b"); return 0;
        }
      } else {
        if (bVar2 == 0x18) {
        uVar3 = ((((0) - heap.u8(pbVar4) + unaff_BX & 3) + 8) & 0xffff);
        if ((heap.u32(heap.u32(((0x00631d74) & 0xff) + (heap.u16((pbVar4 + 4)) & 0x3ff) * 4) + ((((((uVar3) << 16 >> 16)) | 0) >>> 3) + ((heap.u16((pbVar4 + 4)) >>> 10) >>> 0) * 9 + 7) * 4) >>> (uVar3 & 7) & 1) == 0) {
          /* goto LAB_0043724b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043712e/LAB_0043724b"); return 0;
        }
      } else {
        if ((bVar2 == 8) && (((heap.u32(((0x00654f18) & 0xff) + (((heap.u8(pbVar4 + (4))) >>> 0) << 4 | heap.u8(pbVar4 + (5)) & 0xf) * 4) >>> ((0) - heap.u8(pbVar4) + unaff_BX & 3) & 1) == 0 || ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (((heap.u8(pbVar4 + (7))) >>> 0) * 0x260) * 4) * 8)) & 0x40000) != 0)))) {
        /* goto LAB_0043724b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043712e/LAB_0043724b"); return 0;
      }
      }
      }
    }
    pbVar1 = ((pbVar4 + 1) >>> 0);
    pbVar4 = ((pbVar4 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return 1;
    }
  } while (true);
}
