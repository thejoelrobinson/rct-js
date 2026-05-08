// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d33da.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005d33da(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_uStack_4 = __sp + 0;
  const __addr_puStack_18 = __sp + 4;
  const __addr_DAT_006559d8 = __sp + 8;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let bVar3 = 0;
  let in_CF = 0;
  let bVar4 = 0;
  let in_ZF = 0;
  heap.setU32(__addr_uStack_4, (in_EDX) >>> 0);
  uVar1 = FUN_005e3b2b(heap);
  heap.setU32(__addr_puStack_18, (__addr_uStack_4) >>> 0);
  if (((!in_ZF) && (in_CF = 0, heap.u32(0x00652288) != '\0')) && (in_CF = heap.u32(0x00652289) < heap.u32(unaff_ESI + (7) * 4), heap.u32(0x00652289) == heap.u32(unaff_ESI + (7) * 4))) {
    FUN_005d21fa(heap);
  }
  while (true) {
    heap.setU32(__addr_puStack_18, (unaff_ESI) >>> 0);
    uVar2 = FUN_005cfc50(heap);
    if (in_CF) {
      break;
    }
    in_CF = 0xfffffff3 < __addr_puStack_18;
    uVar1 = uVar2;
  }
  bVar3 = 0;
  do {
    if ((heap.u32((__addr_DAT_006559d8) + (heap.u32(heap.u32(__addr_puStack_18) + (4) * 4) * 0x10) * 4) & 0x10) == 0) {
      if (bVar3 != 0) {
        if (bVar3 < 2) {
          /* goto LAB_005d3452 */ throw new Error("goto LAB_005d3452 not supported");
        }
        bVar3 = 0;
      }
    } else {
      bVar3 = bVar3 + 1;
    }
    bVar4 = false;
    uVar1 = FUN_005cfac7(heap);
  } while (!bVar4);
  if ((bVar3 == 0) || (1 < bVar3)) {
    return CONCAT44(heap.u32(__addr_uStack_4), uVar1);
  }
  LAB_005d3452: return CONCAT44(heap.u32(__addr_uStack_4), uVar1);
} finally {
    heap.freeFrame(12);
  }
}
