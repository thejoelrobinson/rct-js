// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40df00.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040df2a } from "./40df2a.js";
import { FUN_004115b0 } from "./4115b0.js";
export function FUN_0040df00(heap) {
  heap.setU32(0x005ebf18, ((regs.eax = FUN_0040df2a(heap))) >>> 0);
  return (regs.eax = FUN_004115b0(heap));
}
