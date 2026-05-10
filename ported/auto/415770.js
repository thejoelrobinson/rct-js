// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415770.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { VirtualAlloc } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00415410 } from "./415410.js";
import { FUN_004159b0 } from "./4159b0.js";
export function FUN_00415770(heap, param_1) {
  let ppuVar1 = 0;
  let ppuVar2 = 0;
  let piVar3 = 0;
  let piVar4 = 0;
  let piVar5 = 0;
  let puVar6 = 0;
  let ppuVar7 = 0;
  let ppuVar8 = 0;
  let iVar9 = 0;
  let piVar10 = 0;
  let bVar11 = 0;
  piVar10 = ((heap.u32(0x005ee520)) >>> 0);
  do {
    if ((heap.i32(piVar10 + (4) * 4) | 0) != -1) {
      piVar5 = ((heap.i32(piVar10 + (2) * 4)) >>> 0);
      iVar9 = (((((piVar5) | 0) + (-0x18 - ((piVar10) | 0)) >>> 3) * 0x1000 + heap.i32(piVar10 + (4) * 4)) >>> 0);
      for (; piVar5 < piVar10 + ((0x806) * 4); piVar5 = (((piVar5 + ((2) * 4)) >>> 0)) >>> 0) {
        if ((((param_1) | 0) <= heap.i32(piVar5)) && (param_1 < ((heap.i32(piVar5 + (1) * 4)) >>> 0))) {
          piVar3 = (((regs.eax = FUN_004159b0(heap, iVar9, heap.i32(piVar5), param_1))) >>> 0);
          if (piVar3 != 0x0) {
            heap.setU32(0x005ee520, (piVar10) >>> 0);
            heap.setU32(piVar5, (heap.i32(piVar5) - param_1) & 0xffffffff);
            heap.setI32((piVar10 + (2) * 4), (((piVar5) | 0)) & 0xffffffff);
            return piVar3;
          }
          heap.setI32((piVar5 + (1) * 4), (param_1) & 0xffffffff);
        }
        iVar9 = ((iVar9 + 0x1000) >>> 0);
      }
      piVar3 = ((heap.i32(piVar10 + (2) * 4)) >>> 0);
      iVar9 = ((heap.i32(piVar10 + (4) * 4)) >>> 0);
      for (piVar5 = ((piVar10 + ((6) * 4)) >>> 0); piVar5 < piVar3; piVar5 = (((piVar5 + ((2) * 4)) >>> 0)) >>> 0) {
        if ((((param_1) | 0) <= heap.i32(piVar5)) && (param_1 < ((heap.i32(piVar5 + (1) * 4)) >>> 0))) {
          piVar4 = (((regs.eax = FUN_004159b0(heap, iVar9, heap.i32(piVar5), param_1))) >>> 0);
          if (piVar4 != 0x0) {
            heap.setU32(0x005ee520, (piVar10) >>> 0);
            heap.setU32(piVar5, (heap.i32(piVar5) - param_1) & 0xffffffff);
            heap.setI32((piVar10 + (2) * 4), (((piVar5) | 0)) & 0xffffffff);
            return piVar4;
          }
          heap.setI32((piVar5 + (1) * 4), (param_1) & 0xffffffff);
        }
        iVar9 = ((iVar9 + 0x1000) >>> 0);
      }
    }
    piVar10 = ((heap.i32(piVar10)) >>> 0);
  } while (piVar10 != heap.u32(0x005ee520));
  ppuVar8 = ((0x005ec500) >>> 0);
  while (heap.u32(ppuVar8 + (4) * 4) == 0xffffffff || (heap.u32(ppuVar8 + (3) * 4) == 0x0)) {
    ppuVar8 = ((heap.u32(ppuVar8)) >>> 0);
    if (ppuVar8 == 0x005ec500) {
      puVar6 = (((regs.eax = FUN_00415410(heap))) >>> 0);
      if (puVar6 == 0x0) {
        return 0x0;
      }
      piVar10 = ((heap.u32((puVar6 + 0x10))) >>> 0);
      heap.setI8((piVar10 + ((2) * 4)), (((param_1) << 24 >> 24)) & 0xff);
      heap.setU32(0x005ee520, (puVar6) >>> 0);
      heap.setU32(piVar10, (((piVar10) | 0) + param_1 + 8) & 0xffffffff);
      heap.setI32((piVar10 + (1) * 4), (0xf0 - param_1) & 0xffffffff);
      heap.setU32((puVar6 + 0x18), (heap.i32((puVar6 + 0x18)) - (param_1 & 0xff)) & 0xffffffff);
      return piVar10 + ((0x40) * 4);
    }
  }
  ppuVar2 = ((heap.u32(ppuVar8 + (3) * 4)) >>> 0);
  puVar6 = ((heap.u32(ppuVar2)) >>> 0);
  piVar10 = (((heap.u32(ppuVar8 + (4) * 4) + (((ppuVar2) | 0) + (-0x18 - ((ppuVar8) | 0)) >>> 3) * 0x1000)) >>> 0);
  ppuVar7 = ((ppuVar2) >>> 0);
  for (iVar9 = ((0) >>> 0); (puVar6 == 0xffffffff && (iVar9 < 0x10)); iVar9 = (((iVar9 + 1) >>> 0)) >>> 0) {
    puVar6 = ((heap.u32(ppuVar7 + (2) * 4)) >>> 0);
    ppuVar7 = ((ppuVar7 + ((2) * 4)) >>> 0);
  }
  piVar5 = ((VirtualAlloc(heap, piVar10, iVar9 << 0xc, 0x1000, 4)) >>> 0);
  if (piVar5 != piVar10) {
    return 0x0;
  }
  ppuVar7 = ((ppuVar2) >>> 0);
  if (0 < iVar9) {
    piVar5 = ((piVar10 + ((1) * 4)) >>> 0);
    do {
      heap.setU32(piVar5, (0xf0) & 0xffffffff);
      heap.setI32((piVar5 + (-1) * 4), ((((piVar5 + ((1) * 4))) | 0)) & 0xffffffff);
      heap.setU8((piVar5 + ((0x3d) * 4)), (0xff) & 0xff);
      heap.setU32(ppuVar7, (0xf0) & 0xffffffff);
      heap.setU32((ppuVar7 + (1) * 4), (0xf1) & 0xffffffff);
      piVar5 = ((piVar5 + ((0x400) * 4)) >>> 0);
      ppuVar7 = ((ppuVar7 + ((2) * 4)) >>> 0);
      iVar9 = ((iVar9 + -1) >>> 0);
    } while (iVar9 != 0);
  }
  ppuVar1 = ((ppuVar8 + ((0x806) * 4)) >>> 0);
  bVar11 = ((false) & 0xff);
  if (ppuVar7 < ppuVar1) {
    do {
      if (heap.u32(ppuVar7) == 0xffffffff) {
        break;
      }
      ppuVar7 = ((ppuVar7 + ((2) * 4)) >>> 0);
    } while (ppuVar7 < ppuVar1);
    bVar11 = ((ppuVar7 < ppuVar1) & 0xff);
  }
  heap.setU32(0x005ee520, (ppuVar8) >>> 0);
  heap.setU32((ppuVar8 + (3) * 4), ((-((bVar11) >>> 0) & ((ppuVar7) >>> 0))) & 0xffffffff);
  heap.setI8((piVar10 + ((2) * 4)), (((param_1) << 24 >> 24)) & 0xff);
  heap.setU32((ppuVar8 + (2) * 4), (ppuVar2) & 0xffffffff);
  heap.setU32(ppuVar2, (heap.u32(ppuVar2) + -param_1) & 0xffffffff);
  heap.setI32((piVar10 + (1) * 4), (heap.i32(piVar10 + (1) * 4) - param_1) & 0xffffffff);
  heap.setU32(piVar10, (((piVar10) | 0) + param_1 + 8) & 0xffffffff);
  return piVar10 + ((0x40) * 4);
}
