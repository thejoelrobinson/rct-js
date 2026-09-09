// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415710.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004155e0 } from "./4155e0.js";
export function FUN_00415710(heap, param_1, param_2, param_3) {
  let piVar1 = 0;
  let iVar2 = 0;
  iVar2 = ((param_2 - heap.i32((param_1 + 0x10)) >>> 0xc) >>> 0);
  piVar1 = (((param_1 + 0x18 + iVar2 * 8)) >>> 0);
  heap.setU32(piVar1, (heap.i32((param_1 + 0x18 + iVar2 * 8)) + heap.u32(param_3)) & 0xffffffff);
  heap.setU32(param_3, (0) & 0xffffffff);
  heap.setI32((piVar1 + (1) * 4), (0xf1) & 0xffffffff);
  if ((heap.i32(piVar1) == 0xf0) && (heap.setU32(0x005f024c, (heap.u32(0x005f024c) + 1) >>> 0), heap.u32(0x005f024c) == 0x20)) {
    (regs.eax = FUN_004155e0(heap, 0x10));
  }
  return;
}
