// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458a7c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00458a7c(heap) {
  let bVar1 = 0;
  while (true) {
    pbVar2 = unaff_ESI;
    bVar1 = heap.u32(pbVar2);
    unaff_ESI = pbVar2 + 1;
    if (bVar1 == 0) {
      break;
    }
    if (bVar1 < 0x20) {
      if (bVar1 < 5) {
        unaff_ESI = pbVar2 + 2;
      } else {
        if ((((bVar1 != 7) && (bVar1 != 8)) && (bVar1 != 9)) && (bVar1 != 10)) {
        if (bVar1 == 0x17) {
          unaff_ESI = pbVar2 + 5;
        } else {
          if ((0x10 < bVar1) && (unaff_ESI = pbVar2 + 3, 0x16 < bVar1)) {
          unaff_ESI = pbVar2 + 5;
        }
        }
      }
      }
    }
  }
  return;
}
