// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df431.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005df531 } from "./5df531.js";
export function FUN_005df431(heap) {
  let in_EAX = regs.eax >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  heap.setU32(0x005e9198, (1) >>> 0);
  heap.setU32(0x005f1a20, (0) >>> 0);
  heap.setU32(0x005f1b40, (in_EAX) >>> 0);
  if ((unaff_BX | 0) != -1) {
    (regs.eax = FUN_00458bcf(heap));
  }
  heap.setU32(0x005e9194, (1) >>> 0);
  return (regs.eax = FUN_005df531(heap));
}
