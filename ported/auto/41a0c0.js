// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41a0c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { RtlUnwind } from "../../runtime/ghidra-builtins.js";
export function FUN_0041a0c0(heap, TargetFrame, TargetIp, ExceptionRecord, ReturnValue) {
  return RtlUnwind(TargetFrame, TargetIp, ExceptionRecord, ReturnValue);
}
