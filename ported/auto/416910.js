// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416910.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00416cd0 } from "./416cd0.js";
import { FUN_00418630 } from "./418630.js";
import { FUN_004186d0 } from "./4186d0.js";
export function FUN_00416910(heap, param_1, param_2, param_3, param_4) {
  let piVar1 = 0;
  let puVar2 = 0;
  let iVar3 = 0;
  let puVar4 = 0;
  piVar1 = heap.u32(0x005f0250);
  if (heap.u32(0x005f0254) == '\0') {
    piVar1 = FUN_004186d0(heap, heap.u32(param_1), heap.u32(param_1 + (1) * 4));
    FUN_00418630(heap, param_2 + (heap.u32(piVar1) == 0x2d) + (0 < param_3), param_3 + 1, piVar1);
  } else {
    FUN_00416cd0(heap, param_2 + (heap.u32(heap.u32(0x005f0250)) == 0x2d), 0 < param_3);
  }
  puVar2 = param_2;
  if (heap.u32(piVar1) == 0x2d) {
    heap.setU32(param_2, (0x2d) >>> 0);
    puVar2 = param_2 + 1;
  }
  if (0 < param_3) {
    heap.setU32(puVar2, (heap.u32(puVar2 + (1) * 4)) >>> 0);
    puVar2 = puVar2 + 1;
    heap.setU32(puVar2, (heap.u32(0x005ee758)) >>> 0);
  }
  puVar4 = (puVar2 + param_3 + (heap.u32(0x005f0254) == '\0'));
  heap.setU32(puVar4, (0x30302b65) >>> 0);
  heap.setU32((puVar4 + 1), (0x30) >>> 0);
  if (param_4 != 0) {
    heap.setU32(puVar4, (0x45) >>> 0);
  }
  if (heap.u32(heap.u32(piVar1 + (3) * 4)) != '0') {
    iVar3 = heap.u32(piVar1 + (1) * 4) + -1;
    if (iVar3 < 0) {
      iVar3 = -iVar3;
      heap.setU32((puVar4 + 1), (0x2d) >>> 0);
    }
    if (99 < iVar3) {
      heap.setU32((puVar4 + 2), (heap.u32((puVar4 + 2)) + (((iVar3 / 100) + (iVar3 >>> 0x1f)) - (iVar3 * 0x51eb851f >>> 0x3f))) >>> 0);
      iVar3 = iVar3 % 100;
    }
    if (9 < iVar3) {
      heap.setU32((puVar4 + 3), (heap.u32((puVar4 + 3)) + (((iVar3 / 10) + (iVar3 >>> 0x1f)) - (iVar3 * 0x66666667 >>> 0x3f))) >>> 0);
      iVar3 = iVar3 % 10;
    }
    heap.setU32((puVar4 + 1), (heap.u32((puVar4 + 1)) + iVar3) >>> 0);
  }
  return param_2;
}
