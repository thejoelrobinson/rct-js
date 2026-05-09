// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3b30.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_005d3b30(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  (regs.ecx = 0x8d, regs.eax = FUN_005e5b80(heap));
  (regs.ecx = 0x8d, regs.eax = FUN_005e5b80(heap));
  (regs.ecx = 0x8d, regs.eax = FUN_005e5b80(heap));
  return 1;
}
