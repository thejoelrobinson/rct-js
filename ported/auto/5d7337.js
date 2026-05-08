// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d7337.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005d6a1d } from "./5d6a1d.js";
export function FUN_005d7337(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  let uVar3 = 0;
  let pbVar4 = 0;
  uVar3 = unaff_BX << 7 | unaff_BX >>> 9 | in_EAX;
  pbVar4 = heap.u32((__addr_DAT_00971ef4) + ((uVar3 >>> 5 | uVar3 << 0xb)) * 4);
  bVar1 = heap.u32(pbVar4);
  while ((bVar1 & 0x3c) != 0) {
    pbVar4 = pbVar4 + 8;
    bVar1 = heap.u32(pbVar4);
  }
  uVar2 = heap.u32(pbVar4 + (2) * 4) * 4;
  uVar3 = uVar2;
  if (((heap.u32(pbVar4 + (4) * 4) & 0xf) != 0) && (uVar3 = uVar2 + 0x10, (heap.u32(pbVar4 + (4) * 4) & 0x10) != 0)) {
    uVar3 = uVar2 + 0x20;
  }
  if ((heap.u32(pbVar4 + (5) * 4) & 0x1f) != 0) {
    uVar2 = (heap.u32(pbVar4 + (5) * 4) & 0x1f) << 4;
    pbVar4 = uVar2;
    if (uVar3 < uVar2) {
      uVar3 = uVar2;
    }
  }
  FUN_005d6a1d(heap);
  return CONCAT44(CONCAT22((in_EDX >>> 0x10), uVar3 + CONCAT31((int3)(pbVar4 >>> 8), 3)), in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
