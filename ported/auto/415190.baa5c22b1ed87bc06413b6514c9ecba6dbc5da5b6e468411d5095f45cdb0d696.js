// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415190.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapCreate, HeapDestroy } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00415410 } from "./415410.js";
export function FUN_00415190(heap) {
  let iVar1 = 0;
  heap.setU32(0x005f3e44, (HeapCreate(heap, 1, 0x1000, 0)) >>> 0);
  if (heap.u32(0x005f3e44) == 0x0) {
    return 0;
  }
  iVar1 = (((regs.eax = FUN_00415410(heap))) >>> 0);
  if (iVar1 == 0) {
    HeapDestroy(heap, heap.u32(0x005f3e44));
    return 0;
  }
  return 1;
}
