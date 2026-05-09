// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/449126.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00449126(heap) {
  let in_EDX = regs.edx >>> 0;
  if ((in_EDX & 4) != 0) {
    switch (in_EDX & 3) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
        return;
    }
  }
  return;
}
