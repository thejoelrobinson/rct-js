// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41174a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mciSendStringA } from "../../runtime/win32.js";
export function FUN_0041174a(heap) {
  let MVar1 = 0;
  MVar1 = ((mciSendStringA(heap, 0x005ec234, ((0x0) >>> 0), 0, ((0x0) >>> 0))) >>> 0);
  if (MVar1 == 0) {
    heap.setU32(0x005ec1c8, (0) >>> 0);
  }
  return MVar1 == 0;
}
