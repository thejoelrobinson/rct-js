// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d0ac.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00411fd0 } from "./411fd0.js";
import { FUN_004123ff } from "./4123ff.js";
import { FUN_00412dcd } from "./412dcd.js";
export function FUN_0040d0ac(heap, param_1, param_2, param_3) {
  let iVar1 = 0;
  let uVar2 = 0;
  iVar1 = FUN_00411fd0(heap, param_2, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c, param_1 * 0x16c + 0x5f04d8);
  if (iVar1 == 0) {
    if (heap.u32(heap.u32((0x005f04bc + param_1 * 0x16c))) == 1) {
      iVar1 = FUN_00412dcd(heap, 0x005f04c0 + param_1 * 0x16c, param_1 * 0x16c + 0x5f04c4, param_1 * 0x16c + 0x5f04d8, param_3);
      if (iVar1 == 0) {
        heap.u32((0x005f04f8 + param_1 * 0x16c)) = param_3;
        uVar2 = 0;
      } else {
        FUN_004123ff(heap, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c);
        uVar2 = 0xffffff99;
      }
    } else {
      FUN_004123ff(heap, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c);
      uVar2 = 0xffffff9b;
    }
  } else {
    uVar2 = 0xffffff9c;
  }
  return uVar2;
}
