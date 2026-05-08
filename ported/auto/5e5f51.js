// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5f51.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e5f51(heap) {
  let sVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  puVar6 = 0x009a013c;
  sVar5 = 8;
  do {
    if (heap.u32(0x009a1164) <= puVar6) {
      return;
    }
    if ((heap.u32((puVar6 + 0x20)) + 10) < heap.u32(0x00971ed6)) {
      sVar4 = heap.u32((puVar6 + 0x22)) + 10;
      if ((heap.u32((puVar6 + 0x32)) & 3) != 0) {
        sVar4 = heap.u32((puVar6 + 0x22)) + -0x18;
      }
      if (heap.u32(0x00971ed8) <= sVar4) {
        /* goto LAB_005e5f90 */ throw new Error("goto LAB_005e5f90 not supported");
      }
    } else {
      LAB_005e5f90: sVar4 = heap.u32((puVar6 + 0x20));
      sVar1 = heap.u32((puVar6 + 0x22));
      heap.u32((puVar6 + 0x20)) = sVar5;
      heap.u32((puVar6 + 0x22)) = sVar5 + 0x1e;
      sVar5 = sVar5 + 8;
      iVar3 = heap.u32((puVar6 + 8));
      if (iVar3 != 0) {
        sVar2 = heap.u32((puVar6 + 0x22));
        heap.u32((iVar3 + 4)) = heap.u32((iVar3 + 4)) - (sVar4 - heap.u32((puVar6 + 0x20)));
        heap.u32((iVar3 + 6)) = heap.u32((iVar3 + 6)) - (sVar1 - sVar2);
      }
    }
    puVar6 = puVar6 + 0x178;
  } while (true);
}
