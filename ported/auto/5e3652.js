// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3652.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005e3f31 } from "./5e3f31.js";
export function FUN_005e3652(heap) {
  let sVar1 = 0;
  let extraout_CX = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar3 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pcVar4 = 0;
  if (((unaff_ESI != 0x0) && ((in_EDX | 0) != -1)) && ((regs.eax = callIndirect(heap, heap.u32(unaff_ESI))), (heap.i16((unaff_EDI + 0xe)) | 0) != -1)) {
    heap.setU32(0x00991f49, (heap.u8((unaff_ESI + ((0x5d) * 4)))) >>> 0);
    heap.setU32(0x00991f4a, (heap.u16((unaff_ESI + ((0xc) * 4)))) >>> 0);
    heap.setU32(0x00991f4c, (((in_EDX) & 0xffff)) >>> 0);
    sVar1 = (((regs.eax = callIndirect(heap, heap.u32(unaff_ESI + (1) * 4), unaff_EDI, in_EDX, heap.u32(0x00991f4a)))) & 0xffff);
    if ((sVar1 | 0) != -1) {
      (regs.eax = FUN_00458bcf(heap, unaff_ESI, unaff_EDI, in_EDX));
      heap.setU32(0x00971e84, (0xe0) >>> 0);
      (regs.eax = FUN_00458a7c(heap));
      iVar2 = ((CONCAT22(0xe, extraout_CX + 4)) >>> 0);
      if (200 < ((extraout_CX + 4) & 0xffff)) {
        iVar2 = (((((((extraout_CX / 0xab)) << 24 >> 24) + 1) >>> 0) * 0xa0000 + 0x400c8) >>> 0);
      }
      pcVar4 = ((0x0099a887) >>> 0);
      while (pcVar3 = ((pcVar4 + 1) >>> 0), heap.i8(pcVar3) != 0) {
        pcVar4 = ((pcVar3) >>> 0);
        if (heap.i8(pcVar3) == 5) {
          iVar2 = ((CONCAT22((((((iVar2 + 0xa0000) >>> 0) >>> 0x10)) << 16 >> 16), (((((iVar2 + 0xa0000)) << 16 >> 16) + 0x32) & 0xffff) >>> 1)) >>> 0);
        }
      }
      heap.setU32(0x009a15ac, (((iVar2) & 0xffff)) >>> 0);
      heap.setU32(0x009a15b0, (((((iVar2) >>> 0) >>> 0x10) & 0xffff)) >>> 0);
      (regs.eax = FUN_005e3f31(heap));
      heap.setU32((pcVar4 + 0x1d), (0x009a15a8) & 0xffffffff);
      heap.setU16((pcVar4 + 0x15b), (heap.u16((unaff_EDI + 0xe))) & 0xffff);
      heap.setU32((pcVar4 + 0x15d), (heap.u32(0x00971e86)) & 0xffffffff);
      heap.setU32((pcVar4 + 0x161), (heap.u32(0x00971e8a)) & 0xffffffff);
      heap.setU32(0x00991f54, (0) >>> 0);
    }
  }
  return;
}
