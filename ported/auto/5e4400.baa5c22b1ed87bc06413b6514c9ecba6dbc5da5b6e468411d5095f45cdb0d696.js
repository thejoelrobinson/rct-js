// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e4400.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e4400_js } from "./extra_widget_5e4400.js";

// The body of this function — the widget loop AND the 13 handlers behind the
// jumptable at 0x5e452c — now lives in extra_widget_5e4400.js. The old body
// dispatched the jumptable through callIndirect, i.e. as a CALL, but the binary
// JUMPS to those handlers and each tail-jumps back into this loop; calling one
// therefore ran the entire rest of the loop inside the interpreter (0x5e48f9:
// 30.8 MILLION steps in 10 calls). See that file's header.
export function FUN_005e4400(heap) {
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_005e4400");
  return FUN_005e4400_js(heap);
}
