// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409af7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
export function FUN_00409af7(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_local_1c = __sp + 0;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if (((heap.u32(0x005ebf54) != 0) && (heap.u32(0x005ebf40) != 0x0)) && (param_1 != 0)) {
    local_8 = heap.u32(param_2 + (2) * 4) - heap.u32(param_2);
    local_c = heap.u32(param_2 + (3) * 4) - heap.u32(param_2 + (1) * 4);
    if ((0 < local_8) && (0 < local_c)) {
      if (0x40 < local_8) {
        local_8 = 0x40;
        heap.u32(param_2 + (2) * 4) = heap.u32(param_2) + 0x40;
      }
      if (0x40 < local_c) {
        local_c = 0x40;
        heap.u32(param_2 + (3) * 4) = heap.u32(param_2 + (1) * 4) + 0x40;
      }
      local_18 = 0;
      heap.setU32(__addr_local_1c, (0) >>> 0);
      local_14 = local_8;
      local_10 = local_c;
      do {
        iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x14))))(heap.u32(0x005ebf40), __addr_local_1c, heap.u32((param_1 + 0x80)), param_2, 0x1000000, 0);
        if ((iVar1 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(heap), iVar2 == 0)) {
          break;
        }
      } while (iVar1 == -0x7789fe3e);
      heap.setU32(0x005f138c, (local_8) >>> 0);
      heap.setU32(0x005f12a4, (local_c) >>> 0);
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
