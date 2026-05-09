// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414cb0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetACP, GetOEMCP } from "../../runtime/win32.js";
export function FUN_00414cb0(heap, param_1) {
  let iVar1 = 0;
  let bVar2 = 0;
  if ((param_1 | 0) == -2) {
    heap.setU32(0x005f023c, (1) >>> 0);
    iVar1 = ((GetOEMCP(heap)) >>> 0);
    return iVar1;
  }
  if ((param_1 | 0) == -3) {
    heap.setU32(0x005f023c, (1) >>> 0);
    iVar1 = ((GetACP(heap)) >>> 0);
    return iVar1;
  }
  bVar2 = (((param_1 | 0) == -4) & 0xff);
  if (bVar2) {
    param_1 = ((heap.u32(0x005f0280)) >>> 0);
  }
  heap.setU32(0x005f023c, (((bVar2) >>> 0)) >>> 0);
  return param_1;
}
