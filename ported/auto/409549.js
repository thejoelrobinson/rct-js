// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409549.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00409549(heap, param_1, param_2, param_3) {
  let local_c = 0;
  if ((heap.u32(0x005ebf3c) != 0x0) && (param_2 < 0x100)) {
    if (param_2 < 10) {
      param_2 = ((10) >>> 0);
    }
    if (0xf6 < param_3 + param_2) {
      param_3 = ((0xf6 - param_2) >>> 0);
    }
    for (local_c = ((param_2) >>> 0); local_c < param_3 + param_2; local_c = (((local_c + 1) >>> 0)) >>> 0) {
      heap.setU32(((0x005f0960) + (local_c * 4) * 4), (heap.u8((param_1 + 2 + local_c * 4))) & 0xffffffff);
      heap.setU8((local_c * 4 + 0x5f0961), (heap.u8((param_1 + 1 + local_c * 4))) & 0xff);
      heap.setU8((local_c * 4 + 0x5f0962), (heap.u8((param_1 + local_c * 4))) & 0xff);
      heap.setU8((local_c * 4 + 0x5f0963), (5) & 0xff);
    }
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf3c)) + 0x18)), heap.u32(0x005ebf3c), 0, param_2, param_3, 0x005f0960 + param_2 * 4));
  }
  return;
}
