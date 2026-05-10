// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/430081.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_00430081(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  (regs.ebx = 0x2, regs.eax = FUN_0042f239(heap));
  iVar1 = (((regs.eax = FUN_0040844b(heap, 2, 0x005f92e7))) >>> 0);
  if ((iVar1 | 0) != -1) {
    uVar2 = ((heap.u32(0x005f92eb) >>> 0x10) >>> 0);
    (regs.eax = FUN_00408490(heap, iVar1));
    return uVar2;
  }
  return 0xffff0000;
}
