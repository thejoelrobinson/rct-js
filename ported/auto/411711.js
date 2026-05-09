// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411711.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mciSendStringA } from "../../runtime/win32.js";
export function FUN_00411711(heap) {
  let MVar1 = 0;
  MVar1 = ((mciSendStringA(heap, 0x005ec228, ((0x0) >>> 0), 0, heap.u32(0x005e916c))) >>> 0);
  return MVar1 == 0;
}
