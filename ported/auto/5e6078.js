// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6078.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00404ba4 } from "./404ba4.js";
import { FUN_005e3874 } from "./5e3874.js";
import { FUN_005e3ace } from "./5e3ace.js";
import { FUN_005e613e } from "./5e613e.js";
import { FUN_005e65cf } from "./5e65cf.js";
export function FUN_005e6078(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  LAB_005e6105: {
  heap.setU32(0x005f54f0, (0xffff) >>> 0);
  iVar6 = ((0) >>> 0);
  uVar1 = (((regs.eax = FUN_005e3ace(heap))) >>> 0);
  uVar5 = ((unaff_EBX) >>> 0);
  uVar2 = ((uVar1) >>> 0);
  if (unaff_ESI != 0) {
    uVar4 = (((regs.eax = FUN_005e3874(heap))) >>> 0);
    uVar1 = ((((uVar4) >>> 0)) >>> 0);
    if (((((uVar4 >>> 0x20)) << 16 >> 16) | 0) == -1) {
      break LAB_005e6105;
    }
    if (heap.i8(unaff_EDI) == 12) {
      if ((heap.u32(0x00991f30) >>> 3 & 1) == 0) {
        (regs.eax = FUN_005e613e(heap));
        cVar3 = ((((unaff_EBX) << 24 >> 24)) & 0xff);
        if (((cVar3 == 2) || (cVar3 == 8)) || (cVar3 == 3)) {
          iVar6 = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((iVar6) >>> 0) >>> 8)), 3)) >>> 0);
        }
      } else {
        iVar6 = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((iVar6) >>> 0) >>> 8)), heap.u8(0x00991f5b))) >>> 0);
      }
      (regs.eax = FUN_005e65cf(heap, iVar6, uVar5));
      if (heap.u8(0x00991f36) == 8) {
        iVar6 = ((5) >>> 0);
      }
      if (((iVar6) << 24 >> 24) != heap.u8(0x00991f34)) {
        heap.setU8(0x00991f34, (((iVar6) << 24 >> 24)) & 0xff);
        uVar2 = (((regs.eax = FUN_00404ba4(heap, heap.u32((0x009a1550) + (iVar6) * 4)))) >>> 0);
      }
      return uVar2;
    }
  }
  if ((((heap.i8(unaff_EDI) == 1) && ((heap.u16((unaff_ESI + 0x32)) & 0x80) != 0)) && ((((heap.i16((unaff_ESI + 0x20)) + heap.i16((unaff_ESI + 0x24)) + -0x13)) << 16 >> 16) <= ((uVar1) << 16 >> 16))) && ((((heap.i16((unaff_ESI + 0x22)) + heap.i16((unaff_ESI + 0x26)) + -0x13)) << 16 >> 16) <= ((unaff_EBX) << 16 >> 16))) {
    iVar6 = ((5) >>> 0);
  }
  }
  (regs.eax = FUN_005e65cf(heap, iVar6, uVar5));
  if (heap.u8(0x00991f36) == 8) {
    iVar6 = ((5) >>> 0);
  }
  if (((iVar6) << 24 >> 24) != heap.u8(0x00991f34)) {
    heap.setU8(0x00991f34, (((iVar6) << 24 >> 24)) & 0xff);
    uVar2 = (((regs.eax = FUN_00404ba4(heap, heap.u32((0x009a1550) + (iVar6) * 4)))) >>> 0);
  }
  return uVar2;
}
