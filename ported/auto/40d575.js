// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d575.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { InterlockedExchange, Sleep } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004123ff } from "./4123ff.js";
export function FUN_0040d575(heap, param_1) {
  let LVar1 = 0;
  heap.setU32((0x005f03a0 + param_1 * 0x16c), (0) & 0xffffffff);
  heap.setU32((0x005f0500 + param_1 * 0x16c), (1) & 0xffffffff);
  while (true) {
    LVar1 = ((InterlockedExchange(heap, 0x005ebfe4, 1)) >>> 0);
    if (LVar1 == 0) {
      break;
    }
    Sleep(heap, 10);
  }
  if (heap.i32((0x005f04c0 + param_1 * 0x16c)) != 0) {
    (regs.eax = FUN_004123ff(heap, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c));
  }
  if (heap.i32((0x005ebfe8 + param_1 * 4)) != 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 0x48)), heap.u32((0x005ebfe8 + param_1 * 4))));
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + param_1 * 4))) + 8)), heap.u32((0x005ebfe8 + param_1 * 4))));
    heap.setU32((0x005ebfe8 + param_1 * 4), (0) & 0xffffffff);
  }
  InterlockedExchange(heap, 0x005ebfe4, 0);
  return 1;
}
