// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f74a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408342 } from "./408342.js";
import { FUN_0042f8a9 } from "./42f8a9.js";
export function FUN_0042f74a(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  uVar1 = FUN_0042f8a9(heap);
  uVar3 = heap.u32(0x005f88ac);
  if ((uVar3 != 0) && (uVar2 = FUN_00408342(heap, heap.u32(0x005f88a4), 0x005f88b0, uVar3), uVar2 != uVar3)) {
    heap.setU32(0x005f88af, (1) >>> 0);
  }
  return uVar1;
}
