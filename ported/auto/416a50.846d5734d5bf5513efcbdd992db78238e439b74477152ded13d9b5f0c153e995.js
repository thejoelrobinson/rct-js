// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416a50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00416cd0 } from "./416cd0.js";
import { FUN_00418630 } from "./418630.js";
import { FUN_004186d0 } from "./4186d0.js";
export function FUN_00416a50(heap, param_1, param_2, param_3) {
  let iVar1 = 0;
  let piVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  let puVar5 = 0;
  piVar2 = ((heap.u32(0x005f0250)) >>> 0);
  if (heap.u8(0x005f0254) == 0) {
    piVar2 = (((regs.eax = FUN_004186d0(heap, heap.u32(param_1), heap.u32(param_1 + (1) * 4)))) >>> 0);
    (regs.eax = FUN_00418630(heap, param_2 + (heap.i32(piVar2) == 0x2d), heap.i32(piVar2 + (1) * 4) + param_3, piVar2));
  } else {
    if (heap.u32(0x005f0258) == param_3) {
    iVar1 = ((heap.u32(0x005f0258) + (heap.u32(heap.u32(0x005f0250)) == 0x2d)) >>> 0);
    heap.setU8((param_2 + (iVar1)), (0x30) & 0xff);
    heap.setU32(((param_2 + iVar1) + (1) * 4), (0) & 0xffffffff);
  }
  }
  puVar4 = ((param_2) >>> 0);
  if (heap.i32(piVar2) == 0x2d) {
    heap.setU32(param_2, (0x2d) & 0xffffffff);
    puVar4 = ((param_2 + 1) >>> 0);
  }
  if (heap.i32(piVar2 + (1) * 4) < 1) {
    (regs.eax = FUN_00416cd0(heap, puVar4, 1));
    heap.setU32(puVar4, (0x30) & 0xffffffff);
    puVar4 = ((puVar4 + 1) >>> 0);
  } else {
    puVar4 = ((puVar4 + heap.i32(piVar2 + (1) * 4)) >>> 0);
  }
  if (0 < ((param_3) | 0)) {
    (regs.eax = FUN_00416cd0(heap, puVar4, 1));
    heap.setU32(puVar4, (heap.u32(0x005ee758)) & 0xffffffff);
    iVar1 = ((heap.i32(piVar2 + (1) * 4)) >>> 0);
    if (iVar1 < 0) {
      if ((heap.u8(0x005f0254) != 0) || (-iVar1 <= ((param_3) | 0))) {
        param_3 = ((-iVar1) >>> 0);
      }
      (regs.eax = FUN_00416cd0(heap, puVar4 + 1, param_3));
      puVar5 = (((puVar4 + 1)) >>> 0);
      for (uVar3 = ((param_3 >>> 2) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
        heap.setU32(puVar5, (0x30303030) & 0xffffffff);
        puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
      }
      for (param_3 = ((param_3 & 3) >>> 0); param_3 != 0; param_3 = (((param_3 - 1) >>> 0)) >>> 0) {
        heap.setU8(puVar5, (0x30) & 0xff);
        puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
      }
    }
  }
  return param_2;
}
