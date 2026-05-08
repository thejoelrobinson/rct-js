// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40bb01.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
export function FUN_0040bb01(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_local_70 = __sp + 0;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let local_60 = 0;
  let local_4c = 0;
  if ((heap.u32(0x005ebf64) == 0) && (heap.u32(0x005ebf34) != 0x0)) {
    _memset(__addr_local_70, 0, 0x6c);
    heap.u32(__addr_local_70 + (0) * 4) = 0x6c;
    do {
      iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf34)) + 100))))(heap.u32(0x005ebf34), 0, __addr_local_70, 1, 0);
      if ((iVar1 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(heap), iVar2 == 0)) {
        break;
      }
    } while (iVar1 == -0x7789fe3e);
    if (iVar1 == 0) {
      heap.u32(param_1) = local_4c;
      heap.u32(param_2) = local_60;
      heap.setU32(0x005ebf64, (1) >>> 0);
      uVar3 = 1;
    } else {
      uVar3 = 0;
    }
  } else {
    uVar3 = 0;
  }
  return uVar3;
} finally {
    heap.freeFrame(4);
  }
}
