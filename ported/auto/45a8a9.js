// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a8a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0045a8a9(heap) {
  let cVar1 = 0;
  let in_AX = regs.eax & 0xffff;
  let uVar2 = 0;
  let in_CX = regs.ecx & 0xffff;
  let pcVar3 = 0;
  let pcVar4 = 0;
  let uVar5 = 0;
  let pcVar6 = 0;
  let pcVar7 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pcVar8 = 0;
  LAB_0045a920: {
  pcVar3 = ((0x0087f41c) >>> 0);
  uVar5 = ((0) & 0xffff);
  pcVar6 = ((0x0) >>> 0);
  do {
    uVar2 = ((uVar5) & 0xffff);
    pcVar4 = ((pcVar3) >>> 0);
    pcVar7 = ((pcVar3) >>> 0);
    pcVar8 = ((unaff_EDI) >>> 0);
    if (heap.i8(pcVar3) != 0) {
      while (cVar1 = ((heap.i8(pcVar8)) & 0xff), uVar2 = ((in_AX) & 0xffff), pcVar7 = ((pcVar6) >>> 0), cVar1 == heap.i8(pcVar4)) {
        pcVar4 = ((pcVar4 + 1) >>> 0);
        pcVar8 = ((pcVar8 + 1) >>> 0);
        if (cVar1 == 0) {
          heap.setU32(0x00991efc, (0x338) >>> 0);
          return 0;
        }
      }
    }
    pcVar3 = ((pcVar3 + 0x20) >>> 0);
    uVar5 = ((uVar5 + 1) & 0xffff);
    in_AX = ((uVar2) & 0xffff);
    pcVar6 = ((pcVar7) >>> 0);
  } while (uVar5 < 0x400);
  if (pcVar7 == 0x0) {
    heap.setU32(0x00991efc, (0x339) >>> 0);
    return 0;
  }
  uVar5 = ((0) & 0xffff);
  do {
    pcVar6 = ((pcVar7) >>> 0);
    cVar1 = ((heap.i8(unaff_EDI)) & 0xff);
    heap.setU32(pcVar6, (cVar1) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
    if (cVar1 == 0) {
      break LAB_0045a920;
    }
    uVar5 = ((uVar5 + 1) & 0xffff);
    pcVar7 = ((pcVar6 + 1) >>> 0);
  } while (uVar5 < 0x20);
  heap.setU32(pcVar6, (0) & 0xffffffff);
  }
  return (uVar2 | in_CX << 9) + 0x8000;
}
