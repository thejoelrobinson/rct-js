// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416700.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
export function FUN_00416700(heap, param_1) {
  let puVar1 = 0;
  let puVar2 = 0;
  puVar1 = heap.u32(param_1);
  puVar2 = puVar1 + 2;
  heap.setU32(param_1, (puVar2) >>> 0);
  return CONCAT22((puVar2 >>> 0x10), heap.u32(puVar1));
}
