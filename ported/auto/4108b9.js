// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4108b9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { Ordinal_2 } from "../../runtime/win32.js";
export function FUN_004108b9(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  if (heap.u32(0x005ec124) == 0) {
    iVar1 = ((Ordinal_2(heap, 0x00410810, 0)) >>> 0);
    bVar2 = ((iVar1 == 0) & 0xff);
  } else {
    bVar2 = ((true) & 0xff);
  }
  return bVar2;
}
