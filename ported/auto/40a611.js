// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a611.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { ClientToScreen, GetClientRect, LPPOINT } from "../runtime/win32.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_0040a611(heap, param_1, param_2) {
  const __sp = heap.allocFrame(128);
  const __addr_local_28 = __sp + 0;
  try {
  let iVar1 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if ((heap.u32(0x005ebf5c) != 0) && (heap.u32(0x005ebf60) != 0x0)) {
    if (heap.u32(0x005ebf54) == 0) {
      local_18 = heap.u32(param_2);
      local_14 = heap.u32(param_2 + (1) * 4);
      local_10 = heap.u32(param_2 + (2) * 4);
      local_c = heap.u32(param_2 + (3) * 4);
      GetClientRect(heap, heap.u32(0x005e916c), __addr_local_28);
      ClientToScreen(heap, heap.u32(0x005e916c), (LPPOINT) & heap.u32(__addr_local_28));
      heap.u32(param_2) = heap.u32(param_2) + heap.u32(__addr_local_28);
      heap.u32(param_2 + (1) * 4) = heap.u32(param_2 + (1) * 4) + heap.u32((__addr_local_28 + 4));
      heap.u32(param_2 + (2) * 4) = heap.u32(param_2 + (2) * 4) + heap.u32(__addr_local_28);
      heap.u32(param_2 + (3) * 4) = heap.u32(param_2 + (3) * 4) + heap.u32((__addr_local_28 + 4));
    }
    do {
      local_8 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf60)) + 0x14))))(heap.u32(0x005ebf60), param_2, heap.u32(0x005ebf5c), param_1, 0x1000000, 0);
      if ((local_8 == -0x7789fe3e) && (iVar1 = FUN_00408d5d(heap), iVar1 == 0)) {
        break;
      }
    } while (local_8 == -0x7789fe3e);
    if (heap.u32(0x005ebf54) == 0) {
      heap.u32(param_2) = local_18;
      heap.u32(param_2 + (1) * 4) = local_14;
      heap.u32(param_2 + (2) * 4) = local_10;
      heap.u32(param_2 + (3) * 4) = local_c;
    }
    if (local_8 == 0) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(128);
  }
}
