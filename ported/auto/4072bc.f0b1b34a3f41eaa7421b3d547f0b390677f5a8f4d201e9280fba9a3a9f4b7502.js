// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4072bc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetCursorPos } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004070be } from "./4070be.js";
export function FUN_004072bc(heap) {
  (regs.eax = FUN_004070be(heap));
  heap.setU32(0x005ebef4, (0) >>> 0);
  return SetCursorPos(heap, heap.u32(0x005eee90), heap.u32(0x005eee94));
}
