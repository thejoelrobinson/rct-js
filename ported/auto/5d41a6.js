// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d41a6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042635e } from "./42635e.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d3527 } from "./5d3527.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005dd134 } from "./5dd134.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e680e } from "./5e680e.js";
import { FUN_005e687d } from "./5e687d.js";
export function FUN_005d41a6(heap) {
  let uVar1 = 0;
  let extraout_ECX = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  (regs.eax = FUN_005e687d(heap));
  uVar2 = ((extraout_EDX & 0xff) >>> 0);
  iVar3 = ((uVar2 * 0x260) >>> 0);
  if (((heap.u32((0x00887422) + (uVar2 * 0x130) * 4) & 0x80) == 0) && (uVar4 = ((heap.u32((0x00887441) + (iVar3) * 4) == 0) & 0xff), uVar4)) {
    uVar2 = ((extraout_EDX) >>> 0);
    (regs.eax = FUN_005dd134(heap));
    (regs.eax = FUN_0042635e(heap));
    (regs.ecx = 0x8d, regs.eax = FUN_005e3b2b(heap, uVar2, extraout_ECX));
    if ((uVar4) || (((uVar2) << 16 >> 16) != heap.i16((iVar3 + 0x30)))) {
      (regs.eax = FUN_005d3b30(heap));
      heap.setU8(0x00652289, (((extraout_EDX_00) & 0xff)) & 0xff);
      (regs.eax = FUN_005d3527(heap, extraout_EDX_00));
    } else {
      heap.setI16((iVar3 + 0x30), (((uVar2) << 16 >> 16)) & 0xffff);
      (regs.eax = FUN_005d21fa(heap));
      heap.setU8(0x00652289, (((uVar2) & 0xff)) & 0xff);
    }
    (regs.eax = 0xb, regs.edx = 0x17, regs.eax = FUN_005e680e(heap));
    heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
    heap.setU8(0x00652294, (heap.u32((0x005f598e) + (heap.u32(((0x00887420) >>> 0) + (heap.u32(0x00652289) * 0x260) * 4) * 4) * 4) + 16) & 0xff);
    heap.setU8(0x00652295, (0) & 0xff);
    heap.setU8(0x00652296, (0) & 0xff);
    heap.setU8(0x00652297, (0) & 0xff);
    heap.setU8(0x00652298, (0) & 0xff);
    heap.setU8(0x00652299, (0) & 0xff);
    heap.setU8(0x0065229a, (0) & 0xff);
    heap.setU8(0x00652290, (0) & 0xff);
    heap.setU8(0x00652288, (4) & 0xff);
    heap.setU8(0x00652292, (0) & 0xff);
    heap.setU8(0x00652293, (0) & 0xff);
    uVar1 = (((regs.eax = 0x11, regs.edx = 0x17, regs.eax = FUN_005d13e2(heap))) >>> 0);
    return uVar1;
  }
  heap.setU16((0x00971e8a + 2), (heap.u32((0x00887442) + (uVar2 * 0x130) * 4)) & 0xffff);
  heap.setU32(0x00971e8e, (heap.u32((0x00887444) + (uVar2 * 0x98) * 4)) >>> 0);
  uVar1 = (((regs.eax = FUN_00427108(heap))) >>> 0);
  return uVar1;
}
