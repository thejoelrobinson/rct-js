// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40c93f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040d0ac } from "./40d0ac.js";
import { FUN_004123ff } from "./4123ff.js";
import { FUN_00412dcd } from "./412dcd.js";
export function FUN_0040c93f(heap, param_1) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_005f03a4 = __sp + 0;
  const __addr_DAT_005f04c0 = __sp + 4;
  const __addr_DAT_005f04b8 = __sp + 8;
  const __addr_DAT_005f04f8 = __sp + 12;
  const __addr_DAT_005f04bc = __sp + 16;
  const __addr_DAT_005f04b0 = __sp + 20;
  const __addr_DAT_005f0504 = __sp + 24;
  const __addr_DAT_005f04b4 = __sp + 28;
  try {
  let iVar1 = 0;
  if (heap.u32((__addr_DAT_005f03a4 + param_1 * 0x16c)) == 0) {
    iVar1 = FUN_00412dcd(heap, __addr_DAT_005f04c0 + param_1 * 0x16c, param_1 * 0x16c + 0x5f04c4, param_1 * 0x16c + 0x5f04d8, heap.u32((__addr_DAT_005f04b8 + param_1 * 0x16c)));
    heap.setU32((__addr_DAT_005f04f8 + param_1 * 0x16c), (heap.u32((__addr_DAT_005f04b8 + param_1 * 0x16c))) >>> 0);
    if (iVar1 != 0) {
      return 0;
    }
  } else {
    if (heap.u32((__addr_DAT_005f04c0 + param_1 * 0x16c)) != 0) {
      FUN_004123ff(heap, __addr_DAT_005f04c0 + param_1 * 0x16c, __addr_DAT_005f04bc + param_1 * 0x16c);
    }
    iVar1 = FUN_0040d0ac(heap, param_1, param_1 * 0x16c + 0x5f03a8, heap.u32((__addr_DAT_005f04b0 + param_1 * 0x16c)));
    if (iVar1 != 0) {
      return 0;
    }
    heap.setU32((__addr_DAT_005f0504 + param_1 * 0x16c), (heap.u32((__addr_DAT_005f04b4 + param_1 * 0x16c))) >>> 0);
    heap.setU32((__addr_DAT_005f04b8 + param_1 * 0x16c), (heap.u32((__addr_DAT_005f04b0 + param_1 * 0x16c))) >>> 0);
    heap.setU32((__addr_DAT_005f03a4 + param_1 * 0x16c), (0) >>> 0);
  }
  return 1;
} finally {
    heap.freeFrame(32);
  }
}
