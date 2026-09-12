// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d26c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040cd89 } from "./40cd89.js";
export function FUN_0040d26c(heap, param_1, param_2) {
  let iVar1 = 0;
  iVar1 = (((regs.eax = FUN_0040cd89(heap, param_1, param_2, 0))) >>> 0);
  if (iVar1 == 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x34)), heap.u32((0x005ebfe8 + param_1 * 4)), 0));
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x30)), heap.u32((0x005ebfe8 + param_1 * 4)), 0, 0, 1));
    heap.setU32((0x005f03a0 + param_1 * 0x16c), (1) & 0xffffffff);
  }
  return iVar1 == 0;
}
