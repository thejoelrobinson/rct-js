// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e43de.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e117d } from "./5e117d.js";
export function FUN_005e43de(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if (unaff_ESI != 0) {
    (regs.eax = FUN_005e117d(heap));
  }
  return;
}
