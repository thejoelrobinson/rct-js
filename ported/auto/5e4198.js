// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e4198.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e4198(heap) {
  let uVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  if ((heap.u16((unaff_EBX + 0x34 + unaff_ESI)) & 1) != 0) {
    sVar5 = ((heap.i16((unaff_EDI + 4)) - heap.i16((unaff_EDI + 2))) & 0xffff);
    uVar6 = ((sVar5 - 0x15) & 0xffff);
    if ((heap.u16((unaff_EBX + 0x34 + unaff_ESI)) & 0x10) != 0) {
      uVar6 = ((sVar5 - 0x20) & 0xffff);
    }
    uVar1 = ((heap.u32((unaff_EBX + 0x36 + unaff_ESI)) * ((uVar6) >>> 0)) >>> 0);
    sVar5 = ((((uVar1) << 16 >> 16)) & 0xffff);
    uVar3 = ((heap.u16((unaff_EBX + 0x38 + unaff_ESI))) & 0xffff);
    if (uVar3 != 0) {
      sVar5 = (((((uVar1 / uVar3)) << 16 >> 16)) & 0xffff);
    }
    heap.setI16((unaff_EBX + 0x3a + unaff_ESI), (sVar5 + 0xb) & 0xffff);
    sVar5 = ((heap.i16((unaff_EDI + 4)) - heap.i16((unaff_EDI + 2))) & 0xffff);
    sVar2 = ((sVar5 + -2) & 0xffff);
    if ((heap.u16((unaff_EBX + 0x34 + unaff_ESI)) & 0x10) != 0) {
      sVar2 = ((sVar5 + -0xd) & 0xffff);
    }
    uVar3 = ((sVar2 + heap.i16((unaff_EBX + 0x36 + unaff_ESI))) & 0xffff);
    if (heap.i16((unaff_EBX + 0x38 + unaff_ESI)) != 0) {
      uVar3 = (((((((uVar3) >>> 0) * ((uVar6) >>> 0)) / (0) * (unaff_EBX + 0x38 + unaff_ESI)) & 0xffff)) & 0xffff);
    }
    sVar5 = ((uVar3 + 0xb) & 0xffff);
    if ((((uVar6 + 10)) << 16 >> 16) < (((uVar3 + 0xb)) << 16 >> 16)) {
      sVar5 = ((uVar6 + 10) & 0xffff);
    }
    heap.setI16((unaff_EBX + 0x3c + unaff_ESI), (sVar5) & 0xffff);
  }
  if ((heap.u16((unaff_EBX + 0x34 + unaff_ESI)) & 0x10) != 0) {
    sVar5 = ((heap.i16((unaff_EDI + 8)) - heap.i16((unaff_EDI + 6))) & 0xffff);
    uVar6 = ((sVar5 - 0x15) & 0xffff);
    if ((heap.u16((unaff_EBX + 0x34 + unaff_ESI)) & 1) != 0) {
      uVar6 = ((sVar5 - 0x20) & 0xffff);
    }
    uVar1 = ((heap.u32((unaff_EBX + 0x3e + unaff_ESI)) * ((uVar6) >>> 0)) >>> 0);
    sVar5 = ((((uVar1) << 16 >> 16)) & 0xffff);
    uVar3 = ((heap.u16((unaff_EBX + 0x40 + unaff_ESI))) & 0xffff);
    if (uVar3 != 0) {
      sVar5 = (((((uVar1 / uVar3)) << 16 >> 16)) & 0xffff);
    }
    heap.setI16((unaff_EBX + 0x42 + unaff_ESI), (sVar5 + 0xb) & 0xffff);
    sVar5 = ((heap.i16((unaff_EDI + 8)) - heap.i16((unaff_EDI + 6))) & 0xffff);
    sVar2 = ((sVar5 + -2) & 0xffff);
    if ((heap.u16((unaff_EBX + 0x34 + unaff_ESI)) & 1) != 0) {
      sVar2 = ((sVar5 + -0xd) & 0xffff);
    }
    uVar3 = ((sVar2 + heap.i16((unaff_EBX + 0x3e + unaff_ESI))) & 0xffff);
    if (heap.i16((unaff_EBX + 0x40 + unaff_ESI)) != 0) {
      uVar3 = (((((((uVar3) >>> 0) * ((uVar6) >>> 0)) / (0) * (unaff_EBX + 0x40 + unaff_ESI)) & 0xffff)) & 0xffff);
    }
    uVar4 = ((uVar3 + 0xb) & 0xffff);
    if (((uVar6 + 10) & 0xffff) < ((uVar3 + 0xb) & 0xffff)) {
      uVar4 = ((uVar6 + 10) & 0xffff);
    }
    heap.setU16((unaff_EBX + 0x44 + unaff_ESI), (uVar4) & 0xffff);
  }
  return in_EAX;
}
