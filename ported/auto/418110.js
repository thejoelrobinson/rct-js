// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418110.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418110(heap, param_1, param_2) {
  let bVar1 = 0;
  let piVar2 = 0;
  let iVar3 = 0;
  bVar1 = (param_2 >>> 0x1f);
  iVar3 = (param_2 + (param_2 >>> 0x1f & 0x1f)) >>> 5;
  if ((heap.u32((param_1 + iVar3 * 4)) & ~(-1 << (0x1f - (((param_2 ^ bVar1) - bVar1 & 0x1f ^ bVar1) - bVar1) & 0x1f))) != 0) {
    return 0;
  }
  iVar3 = iVar3 + 1;
  if (iVar3 < 3) {
    piVar2 = (param_1 + iVar3 * 4);
    do {
      if (heap.u32(piVar2) != 0) {
        return 0;
      }
      iVar3 = iVar3 + 1;
      piVar2 = piVar2 + 1;
    } while (iVar3 < 3);
    return 1;
  }
  return 1;
}
