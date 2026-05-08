// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41181d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { midiOutSetVolume } from "../../runtime/win32.js";
export function FUN_0041181d(heap, param_1, param_2) {
  let MVar1 = 0;
  if ((heap.u32(0x005ec1d0) != 0) && (MVar1 = midiOutSetVolume(heap, 0xffffffff, param_2 * 0x10000 + param_1), MVar1 == 0)) {
    heap.setU32(0x005ec1d4, (1) >>> 0);
    return 1;
  }
  return 0;
}
