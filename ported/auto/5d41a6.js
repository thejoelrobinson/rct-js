// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d41a6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

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
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_00887441 = __sp + 4;
  const __addr_DAT_005f598e = __sp + 8;
  const __addr_DAT_00887420 = __sp + 12;
  const __addr_DAT_00887442 = __sp + 16;
  const __addr_DAT_00887444 = __sp + 20;
  try {
  let uVar1 = 0;
  let extraout_ECX = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  FUN_005e687d(heap);
  uVar2 = extraout_EDX & 0xff;
  iVar3 = uVar2 * 0x260;
  if (((heap.u32((__addr_DAT_00887422) + (uVar2 * 0x130) * 4) & 0x80) == 0) && (uVar4 = heap.u32((__addr_DAT_00887441) + (iVar3) * 4) == '\0', uVar4)) {
    uVar2 = extraout_EDX;
    FUN_005dd134(heap);
    FUN_0042635e(heap);
    FUN_005e3b2b(heap, uVar2, extraout_ECX);
    if ((uVar4) || (uVar2 != heap.u32((iVar3 + 0x30)))) {
      FUN_005d3b30(heap);
      heap.setU32(0x00652289, (extraout_EDX_00) >>> 0);
      FUN_005d3527(heap, extraout_EDX_00);
    } else {
      heap.u32((iVar3 + 0x30)) = uVar2;
      FUN_005d21fa(heap);
      heap.setU32(0x00652289, (uVar2) >>> 0);
    }
    FUN_005e680e(heap);
    heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
    heap.setU32(0x00652294, (heap.u32((__addr_DAT_005f598e) + (heap.u32((byte)(__addr_DAT_00887420) + (heap.u32(0x00652289) * 0x260) * 4) * 4) * 4) + '\x10') >>> 0);
    heap.setU32(0x00652295, (0) >>> 0);
    heap.setU32(0x00652296, (0) >>> 0);
    heap.setU32(0x00652297, (0) >>> 0);
    heap.setU32(0x00652298, (0) >>> 0);
    heap.setU32(0x00652299, (0) >>> 0);
    heap.setU32(0x0065229a, (0) >>> 0);
    heap.setU32(0x00652290, (0) >>> 0);
    heap.setU32(0x00652288, (4) >>> 0);
    heap.setU32(0x00652292, (0) >>> 0);
    heap.setU32(0x00652293, (0) >>> 0);
    uVar1 = FUN_005d13e2(heap);
    return uVar1;
  }
  heap.u16(0x971e8c) = heap.u32((__addr_DAT_00887442) + (uVar2 * 0x130) * 4);
  heap.setU32(0x00971e8e, (heap.u32((__addr_DAT_00887444) + (uVar2 * 0x98) * 4)) >>> 0);
  uVar1 = FUN_00427108(heap);
  return uVar1;
} finally {
    heap.freeFrame(24);
  }
}
