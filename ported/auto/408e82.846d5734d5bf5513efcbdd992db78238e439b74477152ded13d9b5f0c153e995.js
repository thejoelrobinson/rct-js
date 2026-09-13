// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408e82.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
export function FUN_00408e82(heap, param_1, param_2) {
  let uVar1 = 0;
  if ((param_2 < 0) || (heap.u32(0x005f12b4) <= param_2)) {
    uVar1 = ((0) >>> 0);
  } else {
    _memset(heap, param_1, 0, 0xa8);
    _memset(heap, (((param_1) | 0) + 0x14), 0, 0x6c);
    heap.setU32((((param_1) | 0) + 0x14), (0x6c) & 0xffffffff);
    heap.setU32((((param_1) | 0) + 0x80), (heap.u32((heap.u32(0x005ebf38) + param_2 * 4))) & 0xffffffff);
    uVar1 = ((1) >>> 0);
  }
  return uVar1;
}
