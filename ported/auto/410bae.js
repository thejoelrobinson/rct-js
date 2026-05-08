// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410bae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { FUN_00410a33 } from "./410a33.js";
import { FUN_00410b34 } from "./410b34.js";
export function FUN_00410bae(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_local_80 = __sp + 0;
  try {
  let iVar1 = 0;
  let local_7c = 0;
  let local_78 = 0;
  let local_74 = 0;
  let local_70 = 0;
  if (heap.u32(0x005ec158) != 0x0) {
    FUN_00410b34(heap);
    _memset(heap, __addr_local_80, 0, 0x7c);
    heap.setU32(__addr_local_80, (0x7c) >>> 0);
    local_7c = heap.u32(0x005e9048);
    local_78 = heap.u32(0x005e904c);
    local_74 = heap.u32(0x005e9050);
    local_70 = heap.u32(0x005e9054);
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x38))))(heap.u32(0x005ec158), __addr_local_80, 5000, FUN_00410a33, 0, 1);
    if ((iVar1 == 0) || (iVar1 == -0x7788ff24)) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(4);
  }
}
