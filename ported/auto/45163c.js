// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45163c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e4198 } from "./5e4198.js";
export function FUN_0045163c(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_005f5560 = __sp + 0;
  const __addr_DAT_005f5d05 = __sp + 4;
  const __addr_DAT_0087c3dc = __sp + 8;
  const __addr_DAT_00631d0d = __sp + 12;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let unaff_ESI = 0;
  let cStack_10 = 0;
  (heap.u32(heap.u32((unaff_ESI + 4))))();
  sVar7 = 0;
  uVar5 = 0xff00;
  do {
    bVar1 = heap.u32((__addr_DAT_005f5560) + (uVar5 & 0xff) * 4);
    uVar4 = CONCAT31((int3)(uVar5 >>> 8), bVar1);
    uVar2 = bVar1;
    if ((heap.u32(0x00631d0c) == heap.u32((__addr_DAT_005f5d05) + (uVar2 * 8) * 4)) && ((heap.u32((__addr_DAT_0087c3dc + ((uVar2 & 0x1f) >>> 3) + (bVar1 >>> 5) * 4)) >>> (uVar2 & 7) & 1) != 0)) {
      if ((uVar5 >>> 8) == -1) {
        uVar4 = CONCAT11(bVar1, bVar1);
      }
      if (uVar4 == heap.u32((__addr_DAT_00631d0d) + (heap.u32(0x00631d0c)) * 4)) {
        /* goto LAB_004516ad */ throw new Error("goto LAB_004516ad not supported");
      }
      sVar7 = sVar7 + 1;
    }
    cStack_10 = uVar5;
    uVar5 = CONCAT31((int3)(uVar4 >>> 8), cStack_10 + 1U);
  } while ((byte)(cStack_10 + 1U) < 0x31);
  heap.u32((__addr_DAT_00631d0d) + (heap.u32(0x00631d0c)) * 4) = (uVar4 >>> 8);
  sVar7 = 0;
  LAB_004516ad: uVar3 = (heap.u32(0x00631bac) - heap.u32(0x00631baa)) - 1;
  uVar6 = extraout_CX - uVar3;
  if (extraout_CX < uVar3) {
    uVar6 = 0;
  }
  uVar3 = sVar7 * 0x7a;
  if (uVar6 < (sVar7 * 0x7a)) {
    uVar3 = uVar6;
  }
  heap.u32((unaff_ESI + 0x36)) = uVar3;
  FUN_005e4198(heap);
  return;
} finally {
    heap.freeFrame(16);
  }
}
