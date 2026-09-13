// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4034b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetWindowTextA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_004034b4(heap, param_1) {
  (regs.eax = FUN_00413170(heap, 0x005f1ba0, param_1));
  return SetWindowTextA(heap, heap.u32(0x005e916c), 0x005f1ba0);
}
