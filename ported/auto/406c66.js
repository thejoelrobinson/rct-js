// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406c66.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004113d9 } from "./4113d9.js";
export function FUN_00406c66(heap, param_1, param_2) {
  let iVar1 = 0;
  let uVar2 = 0;
  iVar1 = FUN_004113d9(heap, param_1, heap.u32(param_2), 0);
  heap.setU32(param_2, (iVar1) >>> 0);
  if (heap.u32(0x005ebedc) == 0) {
    uVar2 = 2;
  } else {
    if ((heap.u32(0x005ec148) == 0) || (heap.u32(0x005ec1c4) != 0)) {
    uVar2 = 1;
  } else {
    if (heap.u32(param_2) < 1) {
    uVar2 = 3;
  } else {
    uVar2 = 0;
  }
  }
  }
  return uVar2;
}
