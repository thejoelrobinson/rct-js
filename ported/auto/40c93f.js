// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40c93f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040d0ac } from "./40d0ac.js";
import { FUN_004123ff } from "./4123ff.js";
import { FUN_00412dcd } from "./412dcd.js";
export function FUN_0040c93f(heap, param_1) {
  let iVar1 = 0;
  if (heap.i32((0x005f03a4 + param_1 * 0x16c)) == 0) {
    iVar1 = (((regs.eax = FUN_00412dcd(heap, 0x005f04c0 + param_1 * 0x16c, param_1 * 0x16c + 0x5f04c4, param_1 * 0x16c + 0x5f04d8, heap.u32((0x005f04b8 + param_1 * 0x16c))))) >>> 0);
    heap.setU32((0x005f04f8 + param_1 * 0x16c), (heap.u32((0x005f04b8 + param_1 * 0x16c))) & 0xffffffff);
    if (iVar1 != 0) {
      return 0;
    }
  } else {
    if (heap.i32((0x005f04c0 + param_1 * 0x16c)) != 0) {
      (regs.eax = FUN_004123ff(heap, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c));
    }
    iVar1 = (((regs.eax = FUN_0040d0ac(heap, param_1, param_1 * 0x16c + 0x5f03a8, heap.u32((0x005f04b0 + param_1 * 0x16c))))) >>> 0);
    if (iVar1 != 0) {
      return 0;
    }
    heap.setU32((0x005f0504 + param_1 * 0x16c), (heap.u32((0x005f04b4 + param_1 * 0x16c))) & 0xffffffff);
    heap.setU32((0x005f04b8 + param_1 * 0x16c), (heap.u32((0x005f04b0 + param_1 * 0x16c))) & 0xffffffff);
    heap.setU32((0x005f03a4 + param_1 * 0x16c), (0) & 0xffffffff);
  }
  return 1;
}
