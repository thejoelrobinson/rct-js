// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412bbd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GlobalAlloc, GlobalFree } from "../runtime/win32.js";
import { FUN_00411fd0 } from "./411fd0.js";
import { FUN_00412224 } from "./412224.js";
import { FUN_004122a3 } from "./4122a3.js";
export function FUN_00412bbd(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(32);
  const __addr_local_34 = __sp + 0;
  const __addr_local_38 = __sp + 4;
  const __addr_local_30 = __sp + 8;
  const __addr_local_1c = __sp + 28;
  try {
  let pvVar1 = 0;
  let local_18 = 0;
  let local_8 = 0;
  heap.u32(param_5) = 0;
  heap.u32(param_4) = 0;
  heap.u32(param_2) = 0;
  local_8 = FUN_00411fd0(heap, param_1, __addr_local_34, param_4, __addr_local_30);
  if ((local_8 == 0) && (local_8 = FUN_00412224(heap, __addr_local_34, __addr_local_1c, __addr_local_30), local_8 == 0)) {
    pvVar1 = GlobalAlloc(heap, 0, local_18);
    heap.u32(param_5) = pvVar1;
    if (heap.u32(param_5) == 0) {
      local_8 = 0xe000;
    } else {
      local_8 = FUN_004122a3(heap, heap.u32(__addr_local_34), local_18, heap.u32(param_5), __addr_local_1c, __addr_local_38);
      if (local_8 == 0) {
        heap.u32(param_2) = heap.u32(__addr_local_38);
        /* goto LAB_00412cd9 */ throw new Error("goto LAB_00412cd9 not supported");
      }
    }
  }
  if (heap.u32(param_5) != 0) {
    GlobalFree(heap, heap.u32(param_5));
    heap.u32(param_5) = 0;
  }
  if (heap.u32(param_4) != 0) {
    GlobalFree(heap, heap.u32(param_4));
    heap.u32(param_4) = 0;
  }
  LAB_00412cd9: if (heap.u32(__addr_local_34) != 0x0) {
    mmioClose(heap.u32(__addr_local_34), 0);
  }
  return local_8;
} finally {
    heap.freeFrame(32);
  }
}
