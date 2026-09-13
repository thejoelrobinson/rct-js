// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407f70.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00407f70(heap) {
  let iVar1 = 0;
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec060)) + 0xc)), heap.u32(0x005ec060), heap.u32(0x005ec068)))) >>> 0);
  return iVar1 == 0;
}
