// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4311e7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_004311e7(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_0087ccd0 = __sp + 0;
  const __addr_DAT_0087c3dc = __sp + 4;
  const __addr_DAT_0087c3fc = __sp + 8;
  const __addr_DAT_0087c41c = __sp + 12;
  const __addr_DAT_005f5594 = __sp + 16;
  const __addr_DAT_0087cba5 = __sp + 20;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  for (piVar4 = __addr_DAT_0087ccd0; heap.u32(piVar4) != -2; piVar4 = (piVar4 + 5)) {
  
  }
  uVar8 = FUN_005df40c(heap);
  for (piVar4 = (piVar4 + 5); piVar3 = (uVar8 >>> 0x20), heap.u32(piVar4) != -3; piVar4 = (piVar4 + 10)) {
    bVar7 = (uVar8 & 1) != 0;
    if (!bVar7) {
      iVar1 = heap.u32(piVar4);
      piVar5 = __addr_DAT_0087ccd0;
      do {
        if (iVar1 == heap.u32(piVar5)) {
          piVar3 = piVar5;
        }
        if (heap.u32((piVar4 + 5)) == heap.u32(piVar5)) {
          unaff_EBP = piVar5;
        }
        iVar2 = heap.u32(piVar5);
        piVar5 = (piVar5 + 5);
      } while (iVar2 != -2);
      heap.u32(piVar3) = heap.u32((piVar4 + 5));
      heap.u32(unaff_EBP) = iVar1;
      LOCK();
      iVar1 = heap.u32(unaff_EBP + (1) * 4);
      heap.u32((unaff_EBP + 1)) = heap.u32(piVar3 + (1) * 4);
      UNLOCK();
      heap.u32((piVar3 + 1)) = iVar1;
    }
    uVar8 = CONCAT44(piVar3, uVar8 >>> 1 | bVar7 << 0x1f);
  }
  uVar6 = 0;
  do {
    heap.u32((__addr_DAT_0087c3dc) + (uVar6) * 4) = 0;
    heap.u32((__addr_DAT_0087c3fc + uVar6 * 4)) = 0;
    uVar6 = uVar6 + 1;
  } while (uVar6 < 8);
  heap.setU32(0x0087d7a2, (0) >>> 0);
  uVar6 = 0;
  do {
    heap.u32((__addr_DAT_0087c41c) + (uVar6) * 4) = heap.u32((__addr_DAT_005f5594) + (uVar6) * 4);
    uVar6 = uVar6 + 1;
  } while (uVar6 < 0x100);
  uVar6 = 0;
  do {
    heap.u32((__addr_DAT_0087cba5 + uVar6 * 4 + 3)) = 0;
    uVar6 = uVar6 + 1;
  } while (uVar6 < 0x38);
  for (piVar4 = __addr_DAT_0087ccd0; heap.u32(piVar4) != -1; piVar4 = (piVar4 + 5)) {
    func_0x00430934();
  }
  heap.setU32(0x0087cccc, (0xffffffff) >>> 0);
  heap.setU32(0x0087cccb, (0) >>> 0);
  heap.setU32(0x0087d0bc, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(24);
  }
}
