// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416f30.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00416f30(heap, param_1, param_2) {
  let iVar2 = 0;
  iVar2 = param_2;
  for (pcVar1 = param_1; (iVar2 != 0 && (iVar2 = iVar2 + -1, heap.u32(pcVar1) != '\0')); pcVar1 = pcVar1 + 1) {
  
  }
  if (heap.u32(pcVar1) != '\0') {
    return param_2;
  }
  return pcVar1 - param_1;
}
