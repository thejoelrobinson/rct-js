// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4115b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0041174a } from "./41174a.js";
export function FUN_004115b0(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f02e8 = __sp + 0;
  try {
  let MVar1 = 0;
  FUN_0041174a(heap);
  MVar1 = midiOutGetVolume(0xffffffff, __addr_DAT_005f02e8);
  if (MVar1 == 0) {
    heap.setU32(0x005ec1d0, (1) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
