// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429502.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00429502(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0087d738 = __sp + 0;
  const __addr_DAT_0087d73a = __sp + 4;
  const __addr_PTR_LAB_00429544 = __sp + 8;
  try {
  let bVar2 = 0;
  let uVar3 = 0;
  if ((heap.u32(0x0087c3bc) & 1) == 0) {
    uVar3 = 0;
    do {
      if (heap.u32((__addr_DAT_0087d738) + (uVar3 * 2) * 4) != 0) {
        psVar1 = __addr_DAT_0087d738 + uVar3 * 2;
        heap.u32(psVar1) = heap.u32(psVar1) + -1;
        if (heap.u32(psVar1) == 0) {
          FUN_005e5301(heap);
        }
      }
      uVar3 = uVar3 + 1;
    } while (uVar3 < 4);
    return;
  }
  do {
    bVar2 = FUN_005df40c(heap);
    bVar2 = (byte)((bVar2 * (CONCAT11(7, bVar2) >>> 8)) >>> 8);
    uVar3 = 0;
    while (heap.u32((__addr_DAT_0087d738) + (uVar3 * 2) * 4) == 0 || (bVar2 != heap.u32((__addr_DAT_0087d73a) + (uVar3 * 2) * 4))) {
      uVar3 = uVar3 + 1;
      if (3 < uVar3) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00429544) + (bVar2) * 4)))();
        return;
      }
    }
  } while (true);
} finally {
    heap.freeFrame(12);
  }
}
