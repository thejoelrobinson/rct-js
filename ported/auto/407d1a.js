// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407d1a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00407d1a(heap, param_1) {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32(param_1) == 0) {
    uVar1 = 0;
  } else {
    iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(param_1)) + 0x48))))(heap.u32(param_1));
    if (iVar2 == 0) {
      uVar1 = 1;
    } else {
      uVar1 = 0;
    }
  }
  return uVar1;
}
