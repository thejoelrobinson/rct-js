// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416910.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00416cd0 } from "./416cd0.js";
import { FUN_00418630 } from "./418630.js";
import { FUN_004186d0 } from "./4186d0.js";
export function FUN_00416910(heap, param_1, param_2, param_3, param_4) {
  let piVar1 = 0;
  let puVar2 = 0;
  let iVar3 = 0;
  let puVar4 = 0;
  piVar1 = ((heap.u32(0x005f0250)) >>> 0);
  if (heap.u8(0x005f0254) == 0) {
    piVar1 = (((regs.eax = FUN_004186d0(heap, heap.u32(param_1), heap.u32(param_1 + (1) * 4)))) >>> 0);
    (regs.eax = FUN_00418630(heap, param_2 + ((heap.i32(piVar1) == 0x2d) >>> 0) + ((0 < param_3) >>> 0), param_3 + 1, piVar1));
  } else {
    (regs.eax = FUN_00416cd0(heap, param_2 + (heap.u32(heap.u32(0x005f0250)) == 0x2d), 0 < param_3));
  }
  puVar2 = ((param_2) >>> 0);
  if (heap.i32(piVar1) == 0x2d) {
    heap.setU32(param_2, (0x2d) & 0xffffffff);
    puVar2 = ((param_2 + 1) >>> 0);
  }
  if (0 < param_3) {
    heap.setU32(puVar2, (heap.u8(puVar2 + (1))) & 0xffffffff);
    puVar2 = ((puVar2 + 1) >>> 0);
    heap.setU32(puVar2, (heap.u32(0x005ee758)) & 0xffffffff);
  }
  puVar4 = (((puVar2 + param_3 + ((heap.u8(0x005f0254) == 0) >>> 0))) >>> 0);
  heap.setU32(puVar4, (0x30302b65) & 0xffffffff);
  heap.setU16((puVar4 + ((1) * 4)), (0x30) & 0xffff);
  if (param_4 != 0) {
    heap.setU8(puVar4, (0x45) & 0xff);
  }
  if (heap.i8(heap.i32(piVar1 + (3) * 4)) != 48) {
    iVar3 = ((heap.i32(piVar1 + (1) * 4) + -1) >>> 0);
    if (iVar3 < 0) {
      iVar3 = ((-iVar3) >>> 0);
      heap.setU8((((puVar4) >>> 0) + 1), (0x2d) & 0xff);
    }
    if (99 < iVar3) {
      heap.setI8((((puVar4) >>> 0) + 2), (heap.i8((((puVar4) >>> 0) + 2)) + (((((iVar3 / 100)) << 24 >> 24) + (((iVar3 >>> 0x1f)) << 24 >> 24)) - (((((iVar3) >>> 0) * 0x51eb851f >>> 0x3f)) << 24 >> 24))) & 0xff);
      iVar3 = ((iVar3 % 100) >>> 0);
    }
    if (9 < iVar3) {
      heap.setI8((((puVar4) >>> 0) + 3), (heap.i8((((puVar4) >>> 0) + 3)) + (((((iVar3 / 10)) << 24 >> 24) + (((iVar3 >>> 0x1f)) << 24 >> 24)) - (((((iVar3) >>> 0) * 0x66666667 >>> 0x3f)) << 24 >> 24))) & 0xff);
      iVar3 = ((iVar3 % 10) >>> 0);
    }
    heap.setI8((puVar4 + ((1) * 4)), (heap.i8((puVar4 + ((1) * 4))) + ((iVar3) << 24 >> 24)) & 0xff);
  }
  return param_2;
}
