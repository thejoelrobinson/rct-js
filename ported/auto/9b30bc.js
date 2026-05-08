// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b30bc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009b30bc(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let unaff_EBP = 0;
  bVar3 = (byte) * (unaff_EDI + 0xe);
  uVar2 = heap.u32((unaff_EDI + 2)) >>> (bVar3 & 0x1f);
  uVar5 = (heap.u32((unaff_EDI + 10)) >>> (bVar3 & 0x1f));
  uVar1 = heap.u32((unaff_EDI + 3));
  puVar6 = heap.u32(unaff_EDI);
  do {
    if ((uVar2 & 1) != 0) {
      heap.u32(puVar6) = unaff_EBP;
      puVar6 = (puVar6 + 1);
    }
    uVar4 = (uVar2 >>> 2);
    if ((uVar2 >>> 1 & 1) != 0) {
      heap.u32(puVar6) = unaff_EBP;
      puVar6 = (puVar6 + 2);
    }
    for (; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(puVar6) = unaff_EBP;
      puVar6 = puVar6 + 1;
    }
    puVar6 = (puVar6 + uVar1);
    uVar5 = uVar5 - 1;
  } while (uVar5 != 0);
  return;
}
