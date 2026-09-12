// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ea49.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040eadf } from "./40eadf.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040ea49(heap, param_1) {
  let local_c = 0;
  let local_8 = 0;
  local_c = ((0x0) >>> 0);
  for (local_8 = ((heap.u32(0x005ec074)) >>> 0); (local_8 != 0x0 && (heap.i32(local_8) != param_1)); local_8 = (((heap.i32(local_8 + (1) * 4)) >>> 0)) >>> 0) {
    local_c = ((local_8) >>> 0);
  }
  if (local_8 != 0x0) {
    if (local_c == 0x0) {
      heap.setU32(0x005ec074, (heap.i32(local_8 + (1) * 4)) >>> 0);
    } else {
      heap.setI32((local_c + (1) * 4), (heap.i32(local_8 + (1) * 4)) & 0xffffffff);
    }
    (regs.eax = FUN_0040eadf(heap, param_1));
    (regs.eax = FUN_00413470(heap, local_8));
  }
  return;
}
