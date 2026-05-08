// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414cb0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetACP, GetOEMCP } from "../runtime/win32.js";
export function FUN_00414cb0(heap, param_1) {
  let iVar1 = 0;
  let bVar2 = 0;
  if (param_1 == -2) {
    heap.setU32(0x005f023c, (1) >>> 0);
    iVar1 = GetOEMCP(heap);
    return iVar1;
  }
  if (param_1 == -3) {
    heap.setU32(0x005f023c, (1) >>> 0);
    iVar1 = GetACP(heap);
    return iVar1;
  }
  bVar2 = param_1 == -4;
  if (bVar2) {
    param_1 = heap.u32(0x005f0280);
  }
  heap.setU32(0x005f023c, (bVar2) >>> 0);
  return param_1;
}
