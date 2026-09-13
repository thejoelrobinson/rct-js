// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44151b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043c698 } from "./43c698.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
export function FUN_0044151b(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  if (heap.i8((unaff_ESI + 0x2b)) == 6) {
    (regs.eax = FUN_0043e792(heap));
  }
  (regs.eax = FUN_0044142c(heap));
  heap.setU8((unaff_ESI + 0x2b), (1) & 0xff);
  (regs.eax = FUN_00441452(heap));
  (regs.eax = FUN_0043c698(heap));
  return 1;
}
