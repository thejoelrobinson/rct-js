// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4109c9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004109c9(heap, param_1, param_2) {
  let iVar1 = 0;
  let bVar2 = 0;
  _memset(heap, param_2, 0, 0x28);
  heap.setU32(param_2, (0x28) & 0xffffffff);
  if (heap.u32(0x005ec158) == 0x0) {
    bVar2 = ((false) & 0xff);
  } else {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x3c)), heap.u32(0x005ec158), param_2))) >>> 0);
    bVar2 = ((iVar1 == 0) & 0xff);
  }
  return bVar2;
}
