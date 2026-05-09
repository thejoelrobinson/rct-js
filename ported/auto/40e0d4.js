// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e0d4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00405b58 } from "./405b58.js";
import { FUN_0040f2f4 } from "./40f2f4.js";
import { FUN_00413c90 } from "./413c90.js";
export function FUN_0040e0d4(heap) {
  let uVar1 = 0;
  let local_8 = 0;
  heap.setU32(0x005e916c, ((regs.eax = FUN_00405b58(heap))) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    if (0 < heap.u32(0x005f12b4)) {
      (regs.eax = FUN_00413c90(heap, 0x005ec0a0, 0x005ec090, 0x2cf));
    }
    for (local_8 = ((0) >>> 0); local_8 < 0x100; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
      heap.setU32(((0x005eee98) + (local_8 * 4) * 4), (((local_8) & 0xff)) & 0xffffffff);
      heap.setU32(((0x005eee99) + (local_8 * 4) * 4), (heap.u32((0x005eee98) + (local_8 * 4) * 4)) & 0xffffffff);
      heap.setU32(((0x005eee9a) + (local_8 * 4) * 4), (heap.u32((0x005eee99) + (local_8 * 4) * 4)) & 0xffffffff);
      heap.setU32(((0x005eee9b) + (local_8 * 4) * 4), (0) & 0xffffffff);
    }
    heap.setU32(0x005ec07c, ((regs.eax = FUN_0040f2f4(heap, 0x005eee98, 0x100, 0x005ef2a0))) >>> 0);
    if (heap.u32(0x005ec07c) == 0) {
      uVar1 = ((0) >>> 0);
    } else {
      heap.setU32(0x005ebe50, (0x0040f14c) >>> 0);
      heap.setU32(0x005ebe54, (0x0040e2e6) >>> 0);
      heap.setU32(0x005ebe58, (0x0040e2f8) >>> 0);
      heap.setU32(0x005ebe5c, (0x0040e32d) >>> 0);
      heap.setU32(0x005ebe60, (0x0040e36f) >>> 0);
      heap.setU32(0x005ebe70, (0x0040e51d) >>> 0);
      heap.setU32(0x005ebe68, (0x0040e500) >>> 0);
      heap.setU32(0x005ebe6c, (0x0040e38e) >>> 0);
      heap.setU32(0x005ebe64, (0x0040e383) >>> 0);
      heap.setU32(0x005ebe74, (0x0040e528) >>> 0);
      heap.setU32(0x005ebe78, (0x0040e533) >>> 0);
      heap.setU32(0x005ebe7c, (0x0040e63e) >>> 0);
      heap.setU32(0x005ebe80, (0x0040e71a) >>> 0);
      heap.setU32(0x005ebe84, (0x0040e725) >>> 0);
      heap.setU32(0x005ebe88, (0x0040e730) >>> 0);
      heap.setU32(0x005ebe8c, (0x0040e73b) >>> 0);
      heap.setU32(0x005ebe90, (0x0040ea49) >>> 0);
      heap.setU32(0x005ebe94, (0x0040eb48) >>> 0);
      heap.setU32(0x005ebe98, (0x0040ecca) >>> 0);
      heap.setU32(0x005ebe9c, (0x0040ecdc) >>> 0);
      heap.setU32(0x005ebea0, (0x0040ee0a) >>> 0);
      heap.setU32(0x005ebea4, (0x0040ee94) >>> 0);
      heap.setU32(0x005ebea8, (0x0040ef6e) >>> 0);
      heap.setU32(0x005ebeac, (0x0040efca) >>> 0);
      heap.setU32(0x005ebeb0, (0x0040f068) >>> 0);
      heap.setU32(0x005ebeb4, (0x0040f07a) >>> 0);
      heap.setU32(0x005ebeb8, (0x0040f13a) >>> 0);
      heap.setU32(0x005e91cc, (0x0040ee1c) >>> 0);
      uVar1 = ((1) >>> 0);
    }
  }
  return uVar1;
}
