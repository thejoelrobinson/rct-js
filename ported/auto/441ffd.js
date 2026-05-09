// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441ffd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00441ffd(heap) {
  return (regs.eax = callIndirect(heap, heap.u32((0x0044200c + ((heap.u8(0x0062d2ff)) >>> 0) * 4))));
}
