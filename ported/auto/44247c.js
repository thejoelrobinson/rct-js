// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44247c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042dfd1 } from "./42dfd1.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0044247c(heap) {
  let in_AX = 0;
  let unaff_EBX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar2 = heap.u32(0x0087c398);
  while (uVar2 != 0xffff) {
    uVar3 = uVar2;
    iVar4 = uVar3 * 0x100;
    if ((heap.u32((0x00743bc2) + (iVar4) * 4) == '\0') && (heap.u32((0x00743bbe) + (iVar4) * 4) == '\0')) {
      puVar1 = (0x00743c5e + iVar4);
      uVar2 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xfffe;
      if (((uVar2 & 1) != 0) && (in_AX = heap.u32((0x00743ba2) + (uVar3 * 0x80) * 4), in_AX != -0x8000)) {
        unaff_EBX = unaff_EBX & 0xffff0000;
        in_AX = FUN_0042dfd1(heap);
        heap.u32((0x00743bd9) + (iVar4) * 4) = heap.u32((0x00743bd9) + (iVar4) * 4) | 8;
      }
      if (((heap.u32((0x00743bbf) + (iVar4) * 4) == '\x05') || (heap.u32((0x00743bbf) + (iVar4) * 4) == '\x06')) && (0xfd < heap.u32((byte)(0x00743c05) + (iVar4) * 4))) {
        heap.u32((0x00743c05) + (iVar4) * 4) = 0x1a;
        heap.u32((0x00743c06) + (iVar4) * 4) = 0;
        heap.u32((0x00743c04) + (iVar4) * 4) = 0;
        FUN_0043c60b(heap);
        in_AX = FUN_005e53ca(heap);
      }
    }
    uVar2 = heap.u32((0x00743b98) + (uVar3 * 0x80) * 4);
  }
  FUN_00452fce(heap, unaff_EBX);
  return in_AX;
}
