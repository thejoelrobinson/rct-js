// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f8e7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044f8e7(heap) {
  let cVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  uVar3 = 0;
  uVar2 = 0;
  do {
    if (heap.u32((unaff_ESI + uVar3 * 2 + 0x2a)) != -1) {
      uVar2 = uVar2 + 1;
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 4);
  cVar1 = heap.u32(unaff_ESI + (4) * 4);
  if ((((cVar1 != '\x02') && (cVar1 != '\x03')) && (cVar1 != '\x17')) && (heap.u32(unaff_ESI) != '\x16')) {
    return uVar2;
  }
  if (1 < uVar2) {
    heap.setU32(0x00991efc, (0x44c) >>> 0);
    return uVar2;
  }
  return uVar2;
}
