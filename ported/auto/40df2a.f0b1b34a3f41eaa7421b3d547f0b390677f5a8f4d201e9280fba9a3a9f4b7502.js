// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40df2a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { midiOutGetDevCapsA, midiOutGetNumDevs } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413c10 } from "./413c10.js";
export function FUN_0040df2a(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_44 = __sp + 0;
  const __addr_local_10 = __sp + 52;
  const __addr_local_c = __sp + 56;
  const __addr_local_8 = __sp + 60;
  try {
  let iVar1 = 0;
  heap.setU32(__addr_local_c, (midiOutGetNumDevs(heap)) >>> 0);
  heap.setU32(__addr_local_8, (0) >>> 0);
  for (heap.setU32(__addr_local_10, (0xffffffff) >>> 0); heap.u32(__addr_local_10) != heap.u32(__addr_local_c); heap.setU32(__addr_local_10, (heap.u32(__addr_local_10) + 1) >>> 0)) {
    midiOutGetDevCapsA(heap, heap.u32(__addr_local_10), __addr_local_44, 0x34);
    if (((((heap.u32(__addr_local_44)) >>> 320) & 0xffffffff) & 0xffff) == 2) {
      iVar1 = (((regs.eax = FUN_00413c10(heap, heap.u8((__addr_local_44 + 16)), 0x005ec070))) >>> 0);
      if (iVar1 == 0) {
        if (heap.u32(__addr_local_8) == 0) {
          heap.setU32(__addr_local_8, (1) >>> 0);
        }
      } else {
        heap.setU32(__addr_local_8, (3) >>> 0);
      }
    } else {
      if ((((((heap.u32(__addr_local_44)) >>> 320) & 0xffffffff) & 0xffff) == 4) && (heap.u32(__addr_local_8) != 3)) {
      heap.setU32(__addr_local_8, (2) >>> 0);
    }
    }
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(128);
  }
}
