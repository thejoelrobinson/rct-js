// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ded48.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e4198 } from "./5e4198.js";
export function FUN_005ded48(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_DAT_006e2788 = __sp + 0;
  const __addr_DAT_006e1eab = __sp + 4;
  try {
  let uVar1 = 0;
  let extraout_CX = 0;
  let uVar2 = 0;
  let sVar4 = 0;
  let unaff_ESI = 0;
  (heap.u32(heap.u32((unaff_ESI + 4))))();
  sVar4 = 0;
  for (psVar3 = heap.u32((__addr_PTR_DAT_006e2788) + (heap.u32(0x006e1eaa)) * 4); heap.u32(psVar3) != -1; psVar3 = psVar3 + 1) {
    if (heap.u32(psVar3) == heap.u32((__addr_DAT_006e1eab) + (heap.u32(0x006e1eaa)) * 4)) {
      /* goto LAB_005ded7f */ throw new Error("goto LAB_005ded7f not supported");
    }
    sVar4 = sVar4 + 1;
  }
  sVar4 = 0;
  LAB_005ded7f: uVar1 = (heap.u32(0x006e1e44) - heap.u32(0x006e1e42)) - 1;
  uVar2 = extraout_CX - uVar1;
  if (extraout_CX < uVar1) {
    uVar2 = 0;
  }
  uVar1 = sVar4 * 0x42;
  if (uVar2 < (ushort)(sVar4 * 0x42)) {
    uVar1 = uVar2;
  }
  heap.u32((unaff_ESI + 0x36)) = uVar1;
  FUN_005e4198(heap);
  return;
} finally {
    heap.freeFrame(8);
  }
}
