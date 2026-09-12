// @manual — do not regenerate.
// Source: decompiled/c/5d88ec.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004518fc } from "./4518fc.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005d88ec(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  uVar6 = ((CONCAT44(in_EDX, in_EAX)) >>> 0);
  iVar3 = ((0) >>> 0);
  do {
    if ((((heap.u16((unaff_ESI + 0x48)) & 0x100) == 0) || (heap.u8(unaff_ESI + (0xb5)) == 0)) || ((uVar4 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0)) >>> 0), iVar5 = ((uVar4 * 0x260) >>> 0), heap.u32((0x0088755c) + (iVar5) * 4) != 2 && (heap.u32((0x0088755c) + (iVar5) * 4) != 4)))) {
      pbVar1 = ((unaff_ESI + 0xb5) >>> 0);
      bVar2 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) - 0x14) & 0xff);
      if (0x13 < bVar2) {
        /* goto LAB_005d8994 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d88ec/LAB_005d8994"); return 0;
      }
      heap.setU8((unaff_ESI + (0xb5)), (0) & 0xff);
    } else {
      if ((heap.u32((0x00887422) + (uVar4 * 0x130) * 4) & 0x80) == 0) {
        heap.setU32(((0x00887422) + (uVar4 * 0x130) * 4), (heap.u32((0x00887422) + (uVar4 * 0x130) * 4) | 0x80) & 0xffffffff);
        (regs.eax = FUN_004518fc(heap, (((((uVar6) >>> 0) >>> 0x20)) | 0), unaff_EDI, unaff_EBX));
        heap.setU32(((0x0088751d) + (iVar5) * 4), (heap.u32((0x0088751d) + (iVar5) * 4) | 0x1c) & 0xffffffff);
        heap.setU32(((0x0088755d) + (iVar5) * 4), (1) & 0xffffffff);
        heap.setU32(((0x00887560) + (iVar5) * 4), (heap.u32((0x00743bdf) + (heap.u32((0x0088747e + heap.u32(((0x00887561) >>> 0) + (iVar5) * 4) * 2 + iVar5)) * 0x100) * 4)) & 0xffffffff);
        heap.setU32(((0x00887563) + (iVar5) * 4), (heap.u32((0x0088755c) + (iVar5) * 4)) & 0xffffffff);
      }
      LAB_005d8994: uVar6 = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
      iVar3 = ((iVar3 + 1) >>> 0);
    }
    if ((heap.i16((unaff_ESI + 0x3e)) | 0) == -1) {
      if (iVar3 == 0) {
        return ((uVar6) | 0);
      }
      return ((uVar6) | 0);
    }
    unaff_ESI = ((0x00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100) >>> 0);
  } while (true);
}
