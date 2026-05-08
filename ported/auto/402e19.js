// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402e19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { UnhandledExceptionFilter } from "../../runtime/win32.js";
import { FUN_00402ce0 } from "./402ce0.js";
import { FUN_004061b9 } from "./4061b9.js";
export function FUN_00402e19(heap, param_1) {
  FUN_004061b9(heap);
  FUN_00402ce0(heap);
  UnhandledExceptionFilter(heap, param_1);
  return;
}
