// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415770.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { VirtualAlloc } from "../runtime/win32.js";
import { FUN_00415410 } from "./415410.js";
import { FUN_004159b0 } from "./4159b0.js";
export function FUN_00415770(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LOOP_005ec500 = __sp + 0;
  try {
  let iVar9 = 0;
  let bVar11 = 0;
  piVar10 = heap.u32(0x005ee520);
  do {
    if (heap.u32(piVar10 + (4) * 4) != -1) {
      piVar5 = heap.u32(piVar10 + (2) * 4);
      iVar9 = (piVar5 + (-0x18 - piVar10) >>> 3) * 0x1000 + heap.u32(piVar10 + (4) * 4);
      for (; piVar5 < piVar10 + 0x806; piVar5 = piVar5 + 2) {
        if ((param_1 <= heap.u32(piVar5)) && (param_1 < heap.u32(piVar5 + (1) * 4))) {
          piVar3 = FUN_004159b0(heap, iVar9, heap.u32(piVar5), param_1);
          if (piVar3 != 0x0) {
            PTR_LOOP_005ee520 = piVar10;
            heap.u32(piVar5) = heap.u32(piVar5) - param_1;
            heap.u32(piVar10 + (2) * 4) = piVar5;
            return piVar3;
          }
          heap.u32(piVar5 + (1) * 4) = param_1;
        }
        iVar9 = iVar9 + 0x1000;
      }
      piVar3 = heap.u32(piVar10 + (2) * 4);
      iVar9 = heap.u32(piVar10 + (4) * 4);
      for (piVar5 = piVar10 + 6; piVar5 < piVar3; piVar5 = piVar5 + 2) {
        if ((param_1 <= heap.u32(piVar5)) && (param_1 < heap.u32(piVar5 + (1) * 4))) {
          piVar4 = FUN_004159b0(heap, iVar9, heap.u32(piVar5), param_1);
          if (piVar4 != 0x0) {
            PTR_LOOP_005ee520 = piVar10;
            heap.u32(piVar5) = heap.u32(piVar5) - param_1;
            heap.u32(piVar10 + (2) * 4) = piVar5;
            return piVar4;
          }
          heap.u32(piVar5 + (1) * 4) = param_1;
        }
        iVar9 = iVar9 + 0x1000;
      }
    }
    piVar10 = heap.u32(piVar10);
  } while (piVar10 != heap.u32(0x005ee520));
  ppuVar8 = __addr_PTR_LOOP_005ec500;
  while (heap.u32(ppuVar8 + (4) * 4) == 0xffffffff || (heap.u32(ppuVar8 + (3) * 4) == 0x0)) {
    ppuVar8 = heap.u32(ppuVar8);
    if (ppuVar8 == __addr_PTR_LOOP_005ec500) {
      puVar6 = FUN_00415410(heap);
      if (puVar6 == 0x0) {
        return 0x0;
      }
      piVar10 = heap.u32((puVar6 + 0x10));
      heap.u32((piVar10 + 2)) = param_1;
      PTR_LOOP_005ee520 = puVar6;
      heap.u32(piVar10) = piVar10 + param_1 + 8;
      heap.u32(piVar10 + (1) * 4) = 0xf0 - param_1;
      heap.u32((puVar6 + 0x18)) = heap.u32((puVar6 + 0x18)) - (param_1 & 0xff);
      return piVar10 + 0x40;
    }
  }
  ppuVar2 = heap.u32(ppuVar8 + (3) * 4);
  puVar6 = heap.u32(ppuVar2);
  piVar10 = (heap.u32(ppuVar8 + (4) * 4) + (ppuVar2 + (-0x18 - ppuVar8) >>> 3) * 0x1000);
  ppuVar7 = ppuVar2;
  for (iVar9 = 0; (puVar6 == 0xffffffff && (iVar9 < 0x10)); iVar9 = iVar9 + 1) {
    puVar6 = heap.u32(ppuVar7 + (2) * 4);
    ppuVar7 = ppuVar7 + 2;
  }
  piVar5 = VirtualAlloc(heap, piVar10, iVar9 << 0xc, 0x1000, 4);
  if (piVar5 != piVar10) {
    return 0x0;
  }
  ppuVar7 = ppuVar2;
  if (0 < iVar9) {
    piVar5 = piVar10 + 1;
    do {
      heap.u32(piVar5) = 0xf0;
      heap.u32(piVar5 + (-1) * 4) = (piVar5 + 1);
      heap.u32((piVar5 + 0x3d)) = 0xff;
      heap.u32(ppuVar7) = 0xf0;
      heap.u32(ppuVar7 + (1) * 4) = 0xf1;
      piVar5 = piVar5 + 0x400;
      ppuVar7 = ppuVar7 + 2;
      iVar9 = iVar9 + -1;
    } while (iVar9 != 0);
  }
  ppuVar1 = ppuVar8 + 0x806;
  bVar11 = false;
  if (ppuVar7 < ppuVar1) {
    do {
      if (heap.u32(ppuVar7) == 0xffffffff) {
        break;
      }
      ppuVar7 = ppuVar7 + 2;
    } while (ppuVar7 < ppuVar1);
    bVar11 = ppuVar7 < ppuVar1;
  }
  PTR_LOOP_005ee520 = ppuVar8;
  heap.u32(ppuVar8 + (3) * 4) = (-bVar11 & ppuVar7);
  heap.u32((piVar10 + 2)) = param_1;
  heap.u32(ppuVar8 + (2) * 4) = ppuVar2;
  heap.u32(ppuVar2) = heap.u32(ppuVar2) + -param_1;
  heap.u32(piVar10 + (1) * 4) = heap.u32(piVar10 + (1) * 4) - param_1;
  heap.u32(piVar10) = piVar10 + param_1 + 8;
  return piVar10 + 0x40;
} finally {
    heap.freeFrame(4);
  }
}
