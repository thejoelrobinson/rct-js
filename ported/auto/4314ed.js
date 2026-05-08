// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4314ed.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004314ed(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  iVar1 = 0;
  uVar2 = heap.u32(0x0087c3dc);
  do {
    uVar3 = uVar2 & 1;
    uVar2 = uVar2 >>> 1;
    iVar1 = iVar1 + (uVar3 != 0);
    uVar3 = heap.u32(0x0087c3e0);
  } while (uVar2 != 0);
  do {
    uVar2 = uVar3 >>> 1;
    iVar1 = iVar1 + ((uVar3 & 1) != 0);
    uVar3 = uVar2;
  } while (uVar2 != 0);
  return iVar1;
}
