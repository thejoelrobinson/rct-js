// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450b21.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
export function FUN_00450b21(heap) {
  let bVar1 = 0;
  let in_DL = 0;
  LOCK(heap);
  bVar1 = heap.u32((0x008874a4) + (in_DL * 0x260) * 4);
  heap.u32((0x008874a4) + (in_DL * 0x260) * 4) = 0xff;
  UNLOCK(heap);
  if (bVar1 != 0xff) {
    heap.u32((0x008ae9c4) + (bVar1 * 0x4b0c) * 4) = 0xff;
  }
  return;
}
