// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f77c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_0042f6df } from "./42f6df.js";
export function FUN_0042f77c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f8cb5 = __sp + 0;
  try {
  let in_AL = 0;
  if (heap.u32(0x005f88ae) == '\0') {
    heap.setU32(0x005f8cb4, (in_AL) >>> 0);
    heap.setU32(0x005f88ae, (1) >>> 0);
    return;
  }
  if (heap.u32(0x005f88ae) == '\x01') {
    if (in_AL != heap.u32(0x005f8cb4)) {
      heap.setU32(0x005f8cb5, (in_AL) >>> 0);
      heap.setU32(0x005f8cb0, (__addr_DAT_005f8cb5) >>> 0);
      heap.setU32(0x005f8d34, (2) >>> 0);
      heap.setU32(0x005f88ae, (3) >>> 0);
      return;
    }
    heap.setU32(0x005f8d34, (2) >>> 0);
    heap.setU32(0x005f88ae, (2) >>> 0);
    return;
  }
  if (heap.u32(0x005f88ae) == '\x02') {
    if ((in_AL == heap.u32(0x005f8cb4)) && (heap.u32(0x005f8d34) < 0x7d)) {
      heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) + 1) >>> 0);
      return;
    }
    FUN_0042f6df(heap);
    LOCK();
    UNLOCK();
    heap.setU32(0x005f8cb4, (in_AL) >>> 0);
    FUN_0042f6df(heap);
    heap.setU32(0x005f88ae, (1) >>> 0);
    return;
  }
  if (0x7c < heap.u32(0x005f8d34)) {
    FUN_0042f6df(heap);
    do {
      FUN_0042f6df(heap);
      heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) - 1) >>> 0);
    } while (heap.u32(0x005f8d34) != 0);
    heap.setU32(0x005f8cb4, (in_AL) >>> 0);
    heap.setU32(0x005f88ae, (1) >>> 0);
    return;
  }
  if (in_AL != heap.u32(heap.u32(0x005f8cb0))) {
    heap.setU32((heap.u32(0x005f8cb0) + (1) * 4), (in_AL) >>> 0);
    heap.setU32(0x005f8cb0, (heap.u32(0x005f8cb0) + 1) >>> 0);
    heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) + 1) >>> 0);
    return;
  }
  heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) - 1) >>> 0);
  FUN_0042f6df(heap);
  do {
    FUN_0042f6df(heap);
    heap.setU32(0x005f8d34, (heap.u32(0x005f8d34) + -1) >>> 0);
  } while (heap.u32(0x005f8d34) != '\0');
  heap.setU32(0x005f8cb4, (in_AL) >>> 0);
  heap.setU32(0x005f88ae, (2) >>> 0);
  heap.setU32(0x005f8d34, (2) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
