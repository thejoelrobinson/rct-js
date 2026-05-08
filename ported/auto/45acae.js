// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45acae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0045ac19 } from "./45ac19.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_0045acae(heap) {
  if (heap.u32(0x008d7eac) != 0) {
    if (heap.u32(0x008d7eac) == 0x3c0) {
      heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
    }
    heap.setU32(0x008d7eac, (heap.u32(0x008d7eac) + -1) >>> 0);
    return;
  }
  if ((heap.u32(0x0088741c) & 0x7f) == 0) {
    if (heap.u32(0x008d7eb0) != heap.u32(0x008d7eb1)) {
      if (heap.u32(0x008d7eb1) < heap.u32(0x008d7eb0)) {
        heap.setU32(0x008d7eb0, (heap.u32(0x008d7eb0) - 1) >>> 0);
      } else {
        heap.setU32(0x008d7eb0, (heap.u32(0x008d7eb0) + 1) >>> 0);
      }
      heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
      return;
    }
    if (heap.u32(0x008d7eb4) != heap.u32(0x008d7eb5)) {
      if (heap.u32(0x008d7eb5) < heap.u32(0x008d7eb4)) {
        heap.setU32(0x008d7eb4, (heap.u32(0x008d7eb4) - 1) >>> 0);
      } else {
        heap.setU32(0x008d7eb4, (heap.u32(0x008d7eb4) + 1) >>> 0);
      }
      FUN_005e6028(heap);
      return;
    }
    if (heap.u32(0x008d7eb2) != heap.u32(0x008d7eb3)) {
      heap.setU32(0x008d7eb2, (heap.u32(0x008d7eb3)) >>> 0);
    }
    if (heap.u32(0x008d7eb6) != heap.u32(0x008d7eb7)) {
      if (heap.u32(0x008d7eb7) == 3) {
        heap.setU32(0x008d7eb6, (heap.u32(0x008d7eb7)) >>> 0);
      } else {
        if (heap.u32(0x008d7eb7) < heap.u32(0x008d7eb6)) {
        heap.setU32(0x008d7eb6, (heap.u32(0x008d7eb6) - 1) >>> 0);
      } else {
        heap.setU32(0x008d7eb6, (heap.u32(0x008d7eb6) + 1) >>> 0);
      }
      }
      return;
    }
    heap.setU32(0x008d7eae, (heap.u32(0x008d7eaf)) >>> 0);
    FUN_0045ac19(heap);
    heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 8) >>> 0);
  }
  return;
}
