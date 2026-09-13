// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4145a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_004145a0(heap) {
  let cVar1 = 0;
  let cVar2 = 0;
  let piVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let pcVar7 = 0;
  let iVar8 = 0;
  let pcVar9 = 0;
  let pcVar10 = 0;
  let local_4 = 0;
  iVar8 = ((0) >>> 0);
  cVar2 = ((heap.u32(heap.u32(0x005efeac))) & 0xff);
  pcVar7 = ((heap.u32(0x005efeac)) >>> 0);
  while (cVar2 != 0) {
    if (cVar2 != 61) {
      iVar8 = ((iVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar9 = ((pcVar7) >>> 0);
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      cVar2 = ((heap.i8(pcVar9)) & 0xff);
      pcVar9 = ((pcVar9 + 1) >>> 0);
    } while (cVar2 != 0);
    pcVar9 = ((pcVar7 + ~uVar4) >>> 0);
    pcVar7 = ((pcVar7 + ~uVar4) >>> 0);
    cVar2 = ((heap.i8(pcVar9)) & 0xff);
  }
  piVar3 = (((regs.eax = FUN_004133c0(heap, iVar8 * 4 + 4))) >>> 0);
  heap.setU32(0x005efee8, (piVar3) >>> 0);
  if (piVar3 == 0x0) {
    __amsg_exit(9);
  }
  cVar2 = ((heap.u32(heap.u32(0x005efeac))) & 0xff);
  local_4 = ((piVar3) >>> 0);
  pcVar7 = ((heap.u32(0x005efeac)) >>> 0);
  do {
    if (cVar2 == 0) {
      (regs.eax = FUN_00413470(heap, heap.u32(0x005efeac)));
      heap.setU32(0x005efeac, (0x0) >>> 0);
      heap.setU32(piVar3, (0) & 0xffffffff);
      return;
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar9 = ((pcVar7) >>> 0);
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      cVar1 = ((heap.i8(pcVar9)) & 0xff);
      pcVar9 = ((pcVar9 + 1) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    if (cVar2 != 61) {
      iVar8 = (((regs.eax = FUN_004133c0(heap, uVar4))) >>> 0);
      heap.setU32(piVar3, (iVar8) & 0xffffffff);
      if (iVar8 == 0) {
        __amsg_exit(9);
      }
      uVar5 = ((0xffffffff) >>> 0);
      pcVar9 = ((pcVar7) >>> 0);
      do {
        pcVar10 = ((pcVar9) >>> 0);
        if (uVar5 == 0) {
          break;
        }
        uVar5 = ((uVar5 - 1) >>> 0);
        pcVar10 = ((pcVar9 + 1) >>> 0);
        cVar2 = ((heap.i8(pcVar9)) & 0xff);
        pcVar9 = ((pcVar10) >>> 0);
      } while (cVar2 != 0);
      uVar5 = ((~uVar5) >>> 0);
      pcVar9 = ((pcVar10 + -uVar5) >>> 0);
      pcVar10 = ((heap.i32(local_4)) >>> 0);
      for (uVar6 = ((uVar5 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar10, (heap.u32(pcVar9)) & 0xffffffff);
        pcVar9 = ((pcVar9 + 4) >>> 0);
        pcVar10 = ((pcVar10 + 4) >>> 0);
      }
      piVar3 = ((local_4 + ((1) * 4)) >>> 0);
      for (uVar5 = ((uVar5 & 3) >>> 0); local_4 = ((piVar3) >>> 0), uVar5 != 0; uVar5 = (((uVar5 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar10, (heap.i8(pcVar9)) & 0xffffffff);
        pcVar9 = ((pcVar9 + 1) >>> 0);
        pcVar10 = ((pcVar10 + 1) >>> 0);
      }
    }
    cVar2 = ((heap.i8(pcVar7 + (uVar4))) & 0xff);
    pcVar7 = ((pcVar7 + uVar4) >>> 0);
  } while (true);
}
