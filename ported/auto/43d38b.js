// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43d38b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00423677 } from "./423677.js";
export function FUN_0043d38b(heap) {
  let bVar1 = 0;
  let unaff_ESI = 0;
  bVar1 = heap.u32((unaff_ESI + 0x29));
  if ((bVar1 & 0x18) != 0) {
    FUN_00423677(heap);
    return;
  }
  if ((bVar1 & 4) != 0) {
    switch (bVar1 & 3) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
    }
  }
  return;
}
