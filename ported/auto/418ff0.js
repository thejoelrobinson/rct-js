// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418ff0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00418f20 } from "./418f20.js";
import { FUN_00418f90 } from "./418f90.js";
export function FUN_00418ff0(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(4);
  const __addr_local_c = __sp + 0;
  try {
  let uVar1 = 0;
  let puVar2 = 0;
  let sVar3 = 0;
  let local_8 = 0;
  let local_4 = 0;
  puVar2 = param_3;
  sVar3 = 0x404e;
  heap.setU32(param_3, (0) >>> 0);
  heap.setU32((param_3 + (1) * 4), (0) >>> 0);
  heap.setU32((param_3 + (2) * 4), (0) >>> 0);
  if (param_2 != 0) {
    param_3 = param_2;
    do {
      heap.setU32(__addr_local_c, (heap.u32(puVar2)) >>> 0);
      local_8 = heap.u32(puVar2 + (1) * 4);
      local_4 = heap.u32(puVar2 + (2) * 4);
      FUN_00418f90(heap, puVar2);
      FUN_00418f90(heap, puVar2);
      FUN_00418f20(heap, puVar2, __addr_local_c);
      FUN_00418f90(heap, puVar2);
      heap.setU32(__addr_local_c, (heap.u32(param_1)) >>> 0);
      local_8 = 0;
      local_4 = 0;
      FUN_00418f20(heap, puVar2, __addr_local_c);
      param_1 = param_1 + 1;
      param_3 = (param_3 + -1);
    } while (param_3 != 0x0);
  }
  uVar1 = heap.u32(puVar2 + (2) * 4);
  while (uVar1 == 0) {
    sVar3 = sVar3 + -0x10;
    heap.setU32((puVar2 + (2) * 4), (heap.u32(puVar2 + (1) * 4) >>> 0x10) >>> 0);
    uVar1 = heap.u32(puVar2 + (2) * 4);
    heap.setU32((puVar2 + (1) * 4), (heap.u32(puVar2) >>> 0x10 | heap.u32(puVar2 + (1) * 4) << 0x10) >>> 0);
    heap.setU32(puVar2, (heap.u32(puVar2) << 0x10) >>> 0);
  }
  uVar1 = heap.u32(puVar2 + (2) * 4);
  while ((uVar1 & 0x8000) == 0) {
    FUN_00418f90(heap, puVar2);
    sVar3 = sVar3 + -1;
    uVar1 = heap.u32(puVar2 + (2) * 4);
  }
  heap.setU32((puVar2 + 10), (sVar3) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
