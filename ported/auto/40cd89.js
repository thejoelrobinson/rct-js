// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40cd89.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040cb41 } from "./40cb41.js";
import { FUN_00411fd0 } from "./411fd0.js";
import { FUN_004123ff } from "./4123ff.js";
import { FUN_00412dcd } from "./412dcd.js";
export function FUN_0040cd89(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(24);
  const __addr_local_1c = __sp + 0;
  const __addr_local_18 = __sp + 4;
  const __addr_local_14 = __sp + 8;
  const __addr_local_c = __sp + 16;
  const __addr_local_8 = __sp + 20;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  iVar1 = (((regs.eax = FUN_00411fd0(heap, param_2, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c, param_1 * 0x16c + 0x5f04d8))) >>> 0);
  if (iVar1 == 0) {
    if (heap.u32(heap.u32((0x005f04bc + param_1 * 0x16c))) == 1) {
      iVar1 = (((regs.eax = FUN_00412dcd(heap, 0x005f04c0 + param_1 * 0x16c, param_1 * 0x16c + 0x5f04c4, param_1 * 0x16c + 0x5f04d8, param_3))) >>> 0);
      if (iVar1 == 0) {
        heap.setU32((0x005f04f0 + param_1 * 0x16c), (((heap.i32((heap.i32((0x005f04bc + param_1 * 0x16c)) + 8)) * 0x78) >>> 0) / 100) & 0xffffffff);
        _memset(heap, __addr_local_1c, 0, 0x14);
        heap.setU32(__addr_local_1c, (0x14) >>> 0);
        heap.setU32(__addr_local_18, (heap.u32(0x005ebfe0) | 0x100e0) >>> 0);
        heap.setU32(__addr_local_14, (heap.u32((0x005f04f0 + param_1 * 0x16c))) >>> 0);
        heap.setU32(__addr_local_c, (heap.u32((0x005f04bc + param_1 * 0x16c))) >>> 0);
        heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0xc)), heap.u32(0x005ec05c), __addr_local_1c, 0x005ebfe8 + param_1 * 4, 0))) >>> 0);
        if (heap.u32(__addr_local_8) == 0) {
          heap.setU32((0x005f04ec + param_1 * 0x16c), (heap.u32((0x005ebfe8 + param_1 * 4))) & 0xffffffff);
          heap.setU32((0x005f0508 + param_1 * 0x16c), (0) & 0xffffffff);
          heap.setU32((0x005f04fc + param_1 * 0x16c), (0) & 0xffffffff);
          heap.setU32((0x005f0504 + param_1 * 0x16c), (1) & 0xffffffff);
          (regs.eax = FUN_0040cb41(heap, param_1));
          heap.setU32((0x005f04f8 + param_1 * 0x16c), (param_3) & 0xffffffff);
          heap.setU32((0x005f0500 + param_1 * 0x16c), (0) & 0xffffffff);
          uVar2 = ((0) >>> 0);
        } else {
          uVar2 = ((0xffffff9a) >>> 0);
        }
      } else {
        (regs.eax = FUN_004123ff(heap, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c));
        uVar2 = ((0xffffff99) >>> 0);
      }
    } else {
      (regs.eax = FUN_004123ff(heap, 0x005f04c0 + param_1 * 0x16c, 0x005f04bc + param_1 * 0x16c));
      uVar2 = ((0xffffff9b) >>> 0);
    }
  } else {
    uVar2 = ((0xffffff9c) >>> 0);
  }
  return uVar2;
} finally {
    heap.freeFrame(24);
  }
}
