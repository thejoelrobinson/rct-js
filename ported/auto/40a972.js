// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a972.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
import { FUN_0040a73d } from "./40a73d.js";
export function FUN_0040a972(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(8);
  const __addr_local_18 = __sp + 0;
  const __addr_local_20 = __sp + 4;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let local_1c = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if (heap.u32(0x005ebf54) == 0) {
    heap.setU32(__addr_local_18, (param_2) >>> 0);
    local_10 = (heap.u32(param_1 + (2) * 4) - heap.u32(param_1)) + param_2;
    local_14 = param_3;
    local_c = (heap.u32(param_1 + (3) * 4) - heap.u32(param_1 + (1) * 4)) + param_3;
    uVar1 = FUN_0040a73d(heap, param_1, __addr_local_18, param_4);
  } else {
    if ((heap.u32(0x005ebf60) != 0x0) && (heap.u32(0x005ebf5c) != 0x0)) {
      heap.setU32(__addr_local_20, (param_4) >>> 0);
      local_1c = param_4;
      (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf5c)) + 0x74))))(heap.u32(0x005ebf5c), 8, __addr_local_20);
      do {
        local_8 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf60)) + 0x1c))))(heap.u32(0x005ebf60), param_2, param_3, heap.u32(0x005ebf5c), param_1, 0x11);
        if ((local_8 == -0x7789fe3e) && (iVar2 = FUN_00408d5d(heap), iVar2 == 0)) {
          break;
        }
      } while (local_8 == -0x7789fe3e);
      if (local_8 == 0) {
        return 1;
      }
    }
    uVar1 = 0;
  }
  return uVar1;
} finally {
    heap.freeFrame(8);
  }
}
