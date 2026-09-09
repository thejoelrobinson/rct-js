// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d4b8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040d69b } from "./40d69b.js";
import { FUN_0040d709 } from "./40d709.js";
import { FUN_0040d777 } from "./40d777.js";
export function FUN_0040d4b8(heap, param_1, param_2, param_3, param_4, param_5) {
  heap.setU32((0x005f0504 + param_1 * 0x16c), (param_2) & 0xffffffff);
  (regs.eax = FUN_0040d709(heap, param_1, param_4));
  (regs.eax = FUN_0040d777(heap, param_1, param_3));
  (regs.eax = FUN_0040d69b(heap, param_1, param_5));
  (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x34)), heap.u32((0x005ebfe8 + param_1 * 4)), 0));
  (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x30)), heap.u32((0x005ebfe8 + param_1 * 4)), 0, 0, 1));
  heap.setU32((0x005f03a0 + param_1 * 0x16c), (1) & 0xffffffff);
  return 1;
}
