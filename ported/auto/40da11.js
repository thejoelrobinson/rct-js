// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40da11.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DirectSoundEnumerateA } from "../../runtime/win32.js";
import { FUN_0040d9f4 } from "./40d9f4.js";
export function FUN_0040da11(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  heap.setU32(0x005ec06c, (0) >>> 0);
  iVar1 = DirectSoundEnumerateA(heap, FUN_0040d9f4, 0);
  uVar2 = heap.u32(0x005ec06c);
  if (iVar1 != 0) {
    uVar2 = 0;
  }
  return uVar2;
}
