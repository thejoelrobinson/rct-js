// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4251ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_004251ff(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let bVar3 = 0;
  let uVar4 = 0;
  let pbVar5 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar6 = 0;
  if ((in_AX < 0x1000) && (in_CX < 0x1000)) {
    LAB_00425371: {
    uVar4 = ((in_CX << 7 | in_CX >>> 9 | in_AX) & 0xffff);
    pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar3 = ((heap.u8(pbVar5)) & 0xff);
    while ((bVar3 & 0x3c) != 0) {
      pbVar5 = ((pbVar5 + 8) >>> 0);
      bVar3 = ((heap.u8(pbVar5)) & 0xff);
    }
    bVar3 = ((heap.u8(pbVar5 + (7)) & 0xf0) & 0xff);
    if ((heap.u8(pbVar5 + (7)) & 0x20) == 0) {
      uVar4 = ((in_CX << 7 | in_CX >>> 9 | in_AX) & 0xffff);
      unaff_EDI = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        if (((heap.u8(unaff_EDI) & 0x3c) == 0x10) && (heap.u8(unaff_EDI + (4)) == 2)) {
          break LAB_00425371;
        }
        pbVar6 = ((unaff_EDI + 8) >>> 0);
        pbVar1 = ((unaff_EDI + 1) >>> 0);
        unaff_EDI = ((pbVar6) >>> 0);
      } while ((heap.u8(pbVar1) & 0x80) == 0);
      if (((in_AX - 0x20) & 0xffff) < 0x1000) {
        uVar4 = ((in_CX << 7 | in_CX >>> 9 | in_AX - 0x20) & 0xffff);
        unaff_EDI = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = ((unaff_EDI + 8) >>> 0);
          bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        }
        if ((heap.u8(unaff_EDI + (7)) & 0x20) != 0) {
          bVar3 = ((bVar3 | 8) & 0xff);
        }
      }
      uVar4 = ((in_CX - 0x20) & 0xffff);
      if (uVar4 < 0x1000) {
        uVar4 = ((uVar4 * 0x80 | uVar4 >>> 9 | in_AX) & 0xffff);
        unaff_EDI = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = ((unaff_EDI + 8) >>> 0);
          bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        }
        if ((heap.u8(unaff_EDI + (7)) & 0x20) != 0) {
          bVar3 = ((bVar3 | 4) & 0xff);
        }
      }
      if (((in_AX + 0x20) & 0xffff) < 0x1000) {
        uVar4 = ((in_CX << 7 | in_CX >>> 9 | in_AX + 0x20) & 0xffff);
        unaff_EDI = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = ((unaff_EDI + 8) >>> 0);
          bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        }
        if ((heap.u8(unaff_EDI + (7)) & 0x20) != 0) {
          bVar3 = ((bVar3 | 2) & 0xff);
        }
      }
      uVar4 = ((in_CX + 0x20) & 0xffff);
      if (uVar4 < 0x1000) {
        uVar4 = ((uVar4 * 0x80 | uVar4 >>> 9 | in_AX) & 0xffff);
        unaff_EDI = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = ((unaff_EDI + 8) >>> 0);
          bVar2 = ((heap.u8(unaff_EDI)) & 0xff);
        }
        if ((heap.u8(unaff_EDI + (7)) & 0x20) != 0) {
          bVar3 = ((bVar3 | 1) & 0xff);
        }
      }
    }
    }
    if (bVar3 != heap.u8(pbVar5 + (7))) {
      (regs.eax = FUN_005e56d3(heap, pbVar5, unaff_EDI));
    }
    heap.setU8((pbVar5 + (7)), (bVar3) & 0xff);
  }
  return;
}
