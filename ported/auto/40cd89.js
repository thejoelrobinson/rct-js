// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40cd89.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040cb41 } from "./40cb41.js";
import { FUN_00411fd0 } from "./411fd0.js";
import { FUN_004123ff } from "./4123ff.js";
import { FUN_00412dcd } from "./412dcd.js";
export function FUN_0040cd89(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_005f04c0 = __sp + 0;
  const __addr_DAT_005f04bc = __sp + 4;
  const __addr_DAT_005f04f0 = __sp + 8;
  const __addr_local_1c = __sp + 12;
  const __addr_DAT_005ebfe8 = __sp + 16;
  const __addr_DAT_005f04ec = __sp + 20;
  const __addr_DAT_005f0508 = __sp + 24;
  const __addr_DAT_005f04fc = __sp + 28;
  const __addr_DAT_005f0504 = __sp + 32;
  const __addr_DAT_005f04f8 = __sp + 36;
  const __addr_DAT_005f0500 = __sp + 40;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_c = 0;
  let local_8 = 0;
  iVar1 = FUN_00411fd0(heap, param_2, __addr_DAT_005f04c0 + param_1 * 0x16c, __addr_DAT_005f04bc + param_1 * 0x16c, param_1 * 0x16c + 0x5f04d8);
  if (iVar1 == 0) {
    if (heap.u32(heap.u32((__addr_DAT_005f04bc + param_1 * 0x16c))) == 1) {
      iVar1 = FUN_00412dcd(heap, __addr_DAT_005f04c0 + param_1 * 0x16c, param_1 * 0x16c + 0x5f04c4, param_1 * 0x16c + 0x5f04d8, param_3);
      if (iVar1 == 0) {
        heap.u32((__addr_DAT_005f04f0 + param_1 * 0x16c)) = (heap.u32((heap.u32((__addr_DAT_005f04bc + param_1 * 0x16c)) + 8)) * 0x78) / 100;
        _memset(__addr_local_1c, 0, 0x14);
        heap.setU32(__addr_local_1c, (0x14) >>> 0);
        local_18 = heap.u32(0x005ebfe0) | 0x100e0;
        local_14 = heap.u32((__addr_DAT_005f04f0 + param_1 * 0x16c));
        local_c = heap.u32((__addr_DAT_005f04bc + param_1 * 0x16c));
        local_8 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0xc))))(heap.u32(0x005ec05c), __addr_local_1c, __addr_DAT_005ebfe8 + param_1 * 4, 0);
        if (local_8 == 0) {
          heap.u32((__addr_DAT_005f04ec + param_1 * 0x16c)) = heap.u32((__addr_DAT_005ebfe8 + param_1 * 4));
          heap.u32((__addr_DAT_005f0508 + param_1 * 0x16c)) = 0;
          heap.u32((__addr_DAT_005f04fc + param_1 * 0x16c)) = 0;
          heap.u32((__addr_DAT_005f0504 + param_1 * 0x16c)) = 1;
          FUN_0040cb41(heap, param_1);
          heap.u32((__addr_DAT_005f04f8 + param_1 * 0x16c)) = param_3;
          heap.u32((__addr_DAT_005f0500 + param_1 * 0x16c)) = 0;
          uVar2 = 0;
        } else {
          uVar2 = 0xffffff9a;
        }
      } else {
        FUN_004123ff(heap, __addr_DAT_005f04c0 + param_1 * 0x16c, __addr_DAT_005f04bc + param_1 * 0x16c);
        uVar2 = 0xffffff99;
      }
    } else {
      FUN_004123ff(heap, __addr_DAT_005f04c0 + param_1 * 0x16c, __addr_DAT_005f04bc + param_1 * 0x16c);
      uVar2 = 0xffffff9b;
    }
  } else {
    uVar2 = 0xffffff9c;
  }
  return uVar2;
} finally {
    heap.freeFrame(44);
  }
}
