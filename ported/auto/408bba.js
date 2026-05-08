// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408bba.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408b9d } from "./408b9d.js";
export function FUN_00408bba(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  if (heap.u32(0x005ebf30) == 0x0) {
    uVar2 = 0;
  } else {
    heap.setU32(0x005ebf58, (0) >>> 0);
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x20))))(heap.u32(0x005ebf30), 0, 0, 0, FUN_00408b9d);
    uVar2 = heap.u32(0x005ebf58);
    if (iVar1 != 0) {
      uVar2 = 0;
    }
  }
  return uVar2;
}
