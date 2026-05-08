// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413050.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { ExitProcess } from "../runtime/win32.js";
import { FUN_004151d0 } from "./4151d0.js";
import { FUN_00415210 } from "./415210.js";
export function FUN_00413050(heap, param_1) {
  if (heap.u32(0x005efeb4) == 1) {
    FUN_004151d0(heap);
  }
  FUN_00415210(heap, param_1);
  ExitProcess(heap, 0xff);
}
