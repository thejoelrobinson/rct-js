// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a3da.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004090e3 } from "./4090e3.js";
export function FUN_0040a3da(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_local_8 = __sp + 0;
  const __addr_local_74 = __sp + 4;
  try {
  let iVar1 = 0;
  let bVar2 = 0;
  let local_70 = 0;
  let local_b = 0;
  if (heap.u32(0x005ebf54) != 0) {
    if ((heap.u32(0x005f0950) < 2) || (heap.u32(0x005ebf4c) != 0)) {
      heap.setU32(0x005ebf4c, (1) >>> 0);
    } else {
      iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x38))))(heap.u32(0x005ebf30), __addr_local_8);
      if (iVar1 == 0) {
        heap.setU32(__addr_local_74, (0x6c) >>> 0);
        local_70 = 1;
        iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 0x58))))(heap.u32(__addr_local_8), __addr_local_74);
        if (iVar1 == 0) {
          bVar2 = (local_b & 2) == 0;
          if (bVar2) {
            FUN_004090e3(heap);
          }
          heap.setU32(0x005ebf50, (bVar2) >>> 0);
          heap.setU32(0x005ebf4c, (1) >>> 0);
        }
      }
    }
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
