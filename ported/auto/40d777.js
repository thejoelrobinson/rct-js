// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d777.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040d777(heap, param_1, param_2) {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32((0x005ebfe8 + param_1 * 4)) == 0) {
    uVar1 = 0;
  } else {
    iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x3c))))(heap.u32((0x005ebfe8 + param_1 * 4)), param_2);
    if (iVar2 == 0) {
      uVar1 = 1;
    } else {
      uVar1 = 0;
    }
  }
  return uVar1;
}
