// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410eee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_00410eee(heap, param_1) {
  let local_c = 0;
  let local_8 = 0;
  local_8 = ((0x0) >>> 0);
  for (local_c = ((heap.u32(0x005ec14c)) >>> 0); (local_c != 0x0 && (heap.i32(local_c) != param_1)); local_c = (((heap.i32(local_c + (0x13) * 4)) >>> 0)) >>> 0) {
    local_8 = ((local_c) >>> 0);
  }
  if (local_c != 0x0) {
    if (local_8 == 0x0) {
      heap.setU32(0x005ec14c, (heap.i32(local_c + (0x13) * 4)) >>> 0);
    } else {
      heap.setI32((local_8 + (0x13) * 4), (heap.i32(local_c + (0x13) * 4)) & 0xffffffff);
    }
    (regs.eax = FUN_00413470(heap, local_c));
    heap.setU32(0x005ec148, (heap.u32(0x005ec148) + -1) >>> 0);
  }
  return;
}
