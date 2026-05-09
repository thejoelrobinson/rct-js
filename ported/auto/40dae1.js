// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40dae1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DirectSoundEnumerateA } from "../../runtime/win32.js";
export function FUN_0040dae1(heap) {
  let iVar1 = 0;
  heap.setU32(0x005f0394, (0) >>> 0);
  iVar1 = ((DirectSoundEnumerateA(heap, 0x0040da50, 0)) >>> 0);
  if (iVar1 == 0) {
    iVar1 = ((heap.u32(0x005f0394)) >>> 0);
  }
  return iVar1;
}
