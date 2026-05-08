// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412224.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { HMMIO } from "../runtime/win32.js";
export function FUN_00412224(heap, param_1, param_2, param_3) {
  let MVar1 = 0;
  mmioSeek((HMMIO) * param_1, heap.u32((param_3 + 12)) + 4, 0);
  heap.u32(param_2) = 0x61746164;
  MVar1 = mmioDescend((HMMIO) * param_1, param_2, param_3, 0x10);
  return MVar1;
}
