// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e19eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_005e1b3e } from "./5e1b3e.js";
export function FUN_005e19eb(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_AX = regs.eax & 0xffff;
  let sVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let sVar9 = 0;
  let sVar10 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  sVar6 = ((heap.i16(unaff_EDI + (4) * 2)) & 0xffff);
  sVar9 = ((heap.i16(unaff_EDI + (5) * 2)) & 0xffff);
  heap.setI16((unaff_EDI + (4) * 2), (in_AX) & 0xffff);
  heap.setI16((unaff_EDI + (5) * 2), (unaff_BX) & 0xffff);
  bVar1 = ((heap.u8((unaff_EDI + ((8) * 2)))) & 0xff);
  if ((sVar9 >>> (bVar1 & 0x1f) == unaff_BX >>> (bVar1 & 0x1f)) && (sVar6 >>> (bVar1 & 0x1f) == in_AX >>> (bVar1 & 0x1f))) {
    return;
  }
  if ((heap.u16((unaff_ESI + 0x32)) & 0x40) == 0) {
    sVar6 = ((heap.i16(unaff_EDI + (2) * 2)) & 0xffff);
    sVar9 = ((heap.i16(unaff_EDI)) & 0xffff);
    sVar8 = ((heap.i16(unaff_EDI + (4) * 2)) & 0xffff);
    sVar10 = ((heap.i16(unaff_EDI + (3) * 2)) & 0xffff);
    sVar2 = ((heap.i16(unaff_EDI + (1) * 2)) & 0xffff);
    sVar3 = ((heap.i16(unaff_EDI + (5) * 2)) & 0xffff);
    sVar4 = ((heap.i16(unaff_EDI + (6) * 2)) & 0xffff);
    sVar5 = ((heap.i16(unaff_EDI + (7) * 2)) & 0xffff);
    bVar1 = ((heap.u8((unaff_EDI + ((8) * 2)))) & 0xff);
    sVar7 = ((heap.i16(unaff_EDI + (2) * 2)) & 0xffff);
    if (sVar7 < 0) {
      heap.setU32(unaff_EDI, (heap.i16(unaff_EDI) + sVar7) & 0xffffffff);
      heap.setI16((unaff_EDI + (2) * 2), (0) & 0xffff);
      sVar7 = ((sVar7 << (bVar1 & 0x1f)) & 0xffff);
      heap.setI16((unaff_EDI + (6) * 2), (heap.i16(unaff_EDI + (6) * 2) + sVar7) & 0xffff);
      heap.setI16((unaff_EDI + (4) * 2), (heap.i16(unaff_EDI + (4) * 2) - sVar7) & 0xffff);
    }
    sVar7 = (((heap.i16(unaff_EDI + (2) * 2) + heap.i16(unaff_EDI)) - heap.u32(0x00971ed6)) & 0xffff);
    if (sVar7 != 0 && heap.u32(0x00971ed6) <= (((heap.i16(unaff_EDI + (2) * 2) + heap.i16(unaff_EDI))) << 16 >> 16)) {
      heap.setU32(unaff_EDI, (heap.i16(unaff_EDI) - sVar7) & 0xffffffff);
      heap.setI16((unaff_EDI + (6) * 2), (heap.i16(unaff_EDI + (6) * 2) - (sVar7 << (bVar1 & 0x1f))) & 0xffff);
    }
    if (0 < heap.i16(unaff_EDI)) {
      sVar7 = ((heap.i16(unaff_EDI + (3) * 2)) & 0xffff);
      if (sVar7 < 0) {
        heap.setI16((unaff_EDI + (1) * 2), (heap.i16(unaff_EDI + (1) * 2) + sVar7) & 0xffff);
        heap.setI16((unaff_EDI + (3) * 2), (0) & 0xffff);
        sVar7 = ((sVar7 << (bVar1 & 0x1f)) & 0xffff);
        heap.setI16((unaff_EDI + (7) * 2), (heap.i16(unaff_EDI + (7) * 2) + sVar7) & 0xffff);
        heap.setI16((unaff_EDI + (5) * 2), (heap.i16(unaff_EDI + (5) * 2) - sVar7) & 0xffff);
      }
      sVar7 = (((heap.i16(unaff_EDI + (3) * 2) + heap.i16(unaff_EDI + (1) * 2)) - heap.u32(0x00971ed8)) & 0xffff);
      if (sVar7 != 0 && heap.u32(0x00971ed8) <= (((heap.i16(unaff_EDI + (3) * 2) + heap.i16(unaff_EDI + (1) * 2))) << 16 >> 16)) {
        heap.setI16((unaff_EDI + (1) * 2), (heap.i16(unaff_EDI + (1) * 2) - sVar7) & 0xffff);
        heap.setI16((unaff_EDI + (7) * 2), (heap.i16(unaff_EDI + (7) * 2) - (sVar7 << (bVar1 & 0x1f))) & 0xffff);
      }
      if (0 < heap.i16(unaff_EDI + (1) * 2)) {
        (regs.eax = FUN_005e1b3e(heap));
      }
    }
    heap.setI16((unaff_EDI + (7) * 2), (sVar5) & 0xffff);
    heap.setI16((unaff_EDI + (6) * 2), (sVar4) & 0xffff);
    heap.setI16((unaff_EDI + (5) * 2), (sVar3) & 0xffff);
    heap.setI16((unaff_EDI + (1) * 2), (sVar2) & 0xffff);
    heap.setI16((unaff_EDI + (3) * 2), (sVar10) & 0xffff);
    heap.setI16((unaff_EDI + (4) * 2), (sVar8) & 0xffff);
    heap.setU32(unaff_EDI, (sVar9) & 0xffffffff);
    heap.setI16((unaff_EDI + (2) * 2), (sVar6) & 0xffff);
    return;
  }
  sVar6 = ((heap.i16(unaff_EDI + (2) * 2)) & 0xffff);
  sVar9 = ((heap.i16(unaff_EDI + (3) * 2)) & 0xffff);
  sVar8 = ((heap.i16(unaff_EDI) + sVar6) & 0xffff);
  sVar10 = ((heap.i16(unaff_EDI + (1) * 2) + sVar9) & 0xffff);
  if (sVar6 < 0) {
    sVar6 = ((0) & 0xffff);
  }
  if (sVar9 < 0) {
    sVar9 = ((0) & 0xffff);
  }
  if (heap.u32(0x00971ed6) < sVar8) {
    sVar8 = ((heap.u32(0x00971ed6)) & 0xffff);
  }
  if (heap.u32(0x00971ed8) < sVar10) {
    sVar10 = ((heap.u32(0x00971ed8)) & 0xffff);
  }
  if ((sVar6 < sVar8) && (sVar9 < sVar10)) {
    return (regs.eax = FUN_005e12eb(heap));
  }
  return;
}
