// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ba8c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0040ba8c(heap, param_1) {
  if (param_1 == 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50)), heap.u32(0x005ebf30), heap.u32(0x005e916c), 0xb));
  } else {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50)), heap.u32(0x005ebf30), heap.u32(0x005e916c), 0x13));
  }
  if (heap.u32(0x005ebf3c) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf3c)) + 0x18)), heap.u32(0x005ebf3c), 0, 0, 0x100, 0x005f0960));
  }
  return;
}
