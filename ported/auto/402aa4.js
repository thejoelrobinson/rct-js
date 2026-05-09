// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402aa4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402b77 } from "./402b77.js";
export function FUN_00402aa4(heap) {
  (regs.eax = callIndirect(heap, heap.u32(0x005ebe60), heap.u32(0x005e9100)));
  heap.setU32(0x005e9108, (0) >>> 0);
  if (heap.u32(0x005e9130) != 0) {
    (regs.eax = FUN_00402b77(heap));
  }
  return;
}
