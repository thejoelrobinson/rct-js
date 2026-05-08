// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a182.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408d5d } from "./408d5d.js";
import { FUN_00409c1f } from "./409c1f.js";
export function FUN_0040a182(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(4);
  const __addr_local_18 = __sp + 0;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if (heap.u32(0x005ebf54) == 0) {
    heap.setU32(__addr_local_18, (param_4) >>> 0);
    local_10 = (heap.u32(param_2 + (2) * 4) - heap.u32(param_2)) + param_4;
    local_14 = param_5;
    local_c = (heap.u32(param_2 + (3) * 4) - heap.u32(param_2 + (1) * 4)) + param_5;
    uVar1 = FUN_00409c1f(heap, param_1, param_2, param_3, __addr_local_18);
  } else {
    if ((((param_1 != 0) && (param_3 != 0)) && (heap.u32((param_3 + 0x80)) != 0)) && (heap.u32((param_1 + 0x80)) != 0)) {
      do {
        local_8 = (heap.u32(heap.u32((heap.u32(heap.u32((param_3 + 0x80))) + 0x1c))))(heap.u32((param_3 + 0x80)), param_4, param_5, heap.u32((param_1 + 0x80)), param_2, 0x10);
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
    heap.freeFrame(4);
  }
}
