// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450b21.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00450b21(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_008874a4 = __sp + 0;
  const __addr_DAT_008ae9c4 = __sp + 4;
  try {
  let bVar1 = 0;
  let in_DL = 0;
  LOCK();
  bVar1 = heap.u32((__addr_DAT_008874a4) + (in_DL * 0x260) * 4);
  heap.u32((__addr_DAT_008874a4) + (in_DL * 0x260) * 4) = 0xff;
  UNLOCK();
  if (bVar1 != 0xff) {
    heap.u32((__addr_DAT_008ae9c4) + (bVar1 * 0x4b0c) * 4) = 0xff;
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
