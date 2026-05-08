// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4145a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_004145a0(heap) {
  let cVar1 = 0;
  let cVar2 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar8 = 0;
  iVar8 = 0;
  cVar2 = heap.u32(heap.u32(0x005efeac));
  pcVar7 = heap.u32(0x005efeac);
  while (cVar2 != '\0') {
    if (cVar2 != '=') {
      iVar8 = iVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar9 = pcVar7;
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      cVar2 = heap.u32(pcVar9);
      pcVar9 = pcVar9 + 1;
    } while (cVar2 != '\0');
    pcVar9 = pcVar7 + ~uVar4;
    pcVar7 = pcVar7 + ~uVar4;
    cVar2 = heap.u32(pcVar9);
  }
  piVar3 = FUN_004133c0(heap, iVar8 * 4 + 4);
  heap.setU32(0x005efee8, (piVar3) >>> 0);
  if (piVar3 == 0x0) {
    __amsg_exit(9);
  }
  cVar2 = heap.u32(heap.u32(0x005efeac));
  local_4 = piVar3;
  pcVar7 = heap.u32(0x005efeac);
  do {
    if (cVar2 == '\0') {
      FUN_00413470(heap, heap.u32(0x005efeac));
      heap.setU32(0x005efeac, (0x0) >>> 0);
      heap.u32(piVar3) = 0;
      return;
    }
    uVar4 = 0xffffffff;
    pcVar9 = pcVar7;
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      cVar1 = heap.u32(pcVar9);
      pcVar9 = pcVar9 + 1;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    if (cVar2 != '=') {
      iVar8 = FUN_004133c0(heap, uVar4);
      heap.u32(piVar3) = iVar8;
      if (iVar8 == 0) {
        __amsg_exit(9);
      }
      uVar5 = 0xffffffff;
      pcVar9 = pcVar7;
      do {
        pcVar10 = pcVar9;
        if (uVar5 == 0) {
          break;
        }
        uVar5 = uVar5 - 1;
        pcVar10 = pcVar9 + 1;
        cVar2 = heap.u32(pcVar9);
        pcVar9 = pcVar10;
      } while (cVar2 != '\0');
      uVar5 = ~uVar5;
      pcVar9 = pcVar10 + -uVar5;
      pcVar10 = heap.u32(local_4);
      for (uVar6 = uVar5 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar10) = heap.u32(pcVar9);
        pcVar9 = pcVar9 + 4;
        pcVar10 = pcVar10 + 4;
      }
      piVar3 = local_4 + 1;
      for (uVar5 = uVar5 & 3; local_4 = piVar3, uVar5 != 0; uVar5 = uVar5 - 1) {
        heap.u32(pcVar10) = heap.u32(pcVar9);
        pcVar9 = pcVar9 + 1;
        pcVar10 = pcVar10 + 1;
      }
    }
    cVar2 = heap.u32(pcVar7 + (uVar4) * 4);
    pcVar7 = pcVar7 + uVar4;
  } while (true);
}
