// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40df2a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00413c10 } from "./413c10.js";
export function FUN_0040df2a(heap) {
  const __sp = heap.allocFrame(132);
  const __addr_local_44 = __sp + 0;
  const __addr_PTR_LAB_005ec070 = __sp + 128;
  try {
  let iVar1 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_c = midiOutGetNumDevs();
  local_8 = 0;
  for (local_10 = 0xffffffff; local_10 != local_c; local_10 = local_10 + 1) {
    midiOutGetDevCapsA(local_10, __addr_local_44, 0x34);
    if (((((heap.u32(__addr_local_44)) >>> 320) & 0xffffffff) & 0xffff) == 2) {
      iVar1 = FUN_00413c10(heap, heap.u8((__addr_local_44 + 16)), __addr_PTR_LAB_005ec070);
      if (iVar1 == 0) {
        if (local_8 == 0) {
          local_8 = 1;
        }
      } else {
        local_8 = 3;
      }
    } else {
      if ((((((heap.u32(__addr_local_44)) >>> 320) & 0xffffffff) & 0xffff) == 4) && (local_8 != 3)) {
      local_8 = 2;
    }
    }
  }
  return local_8;
} finally {
    heap.freeFrame(132);
  }
}
