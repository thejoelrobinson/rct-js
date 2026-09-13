// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f923.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00405b58 } from "./405b58.js";
import { FUN_0040f2f4 } from "./40f2f4.js";
import { FUN_00413c90 } from "./413c90.js";
export function FUN_0040f923(heap) {
  let uVar1 = 0;
  let local_8 = 0;
  heap.setU32(0x005e916c, ((regs.eax = FUN_00405b58(heap))) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    if (0 < heap.u32(0x005f12b4)) {
      (regs.eax = FUN_00413c90(heap, 0x005ec100, 0x005ec0ec, 799));
    }
    for (local_8 = ((0) >>> 0); local_8 < 0x100; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
      heap.setU32(((0x005ef6a8) + (local_8 * 4) * 4), (((local_8) & 0xff)) & 0xffffffff);
      heap.setU32(((0x005ef6a9) + (local_8 * 4) * 4), (heap.u32((0x005ef6a8) + (local_8 * 4) * 4)) & 0xffffffff);
      heap.setU32(((0x005ef6aa) + (local_8 * 4) * 4), (heap.u32((0x005ef6a9) + (local_8 * 4) * 4)) & 0xffffffff);
      heap.setU32(((0x005ef6ab) + (local_8 * 4) * 4), (0) & 0xffffffff);
    }
    heap.setU32(0x005ec0d8, ((regs.eax = FUN_0040f2f4(heap, 0x005ef6a8, 0x100, 0x005efaa8))) >>> 0);
    if (heap.u32(0x005ec0d8) == 0) {
      uVar1 = ((0) >>> 0);
    } else {
      heap.setU32(0x005ebe50, (0x0041069d) >>> 0);
      heap.setU32(0x005ebe54, (0x0040fb35) >>> 0);
      heap.setU32(0x005ebe58, (0x0040fb47) >>> 0);
      heap.setU32(0x005ebe5c, (0x0040fb7c) >>> 0);
      heap.setU32(0x005ebe60, (0x0040fbbe) >>> 0);
      heap.setU32(0x005ebe70, (0x0040fd6c) >>> 0);
      heap.setU32(0x005ebe68, (0x0040fd4f) >>> 0);
      heap.setU32(0x005ebe6c, (0x0040fbdd) >>> 0);
      heap.setU32(0x005ebe64, (0x0040fbd2) >>> 0);
      heap.setU32(0x005ebe74, (0x0040fd77) >>> 0);
      heap.setU32(0x005ebe78, (0x0040fd82) >>> 0);
      heap.setU32(0x005ebe7c, (0x0040fe8d) >>> 0);
      heap.setU32(0x005ebe80, (0x0040ff69) >>> 0);
      heap.setU32(0x005ebe84, (0x0040ff74) >>> 0);
      heap.setU32(0x005ebe88, (0x0040ff7f) >>> 0);
      heap.setU32(0x005ebe8c, (0x0040ff8a) >>> 0);
      heap.setU32(0x005ebe90, (0x00410063) >>> 0);
      heap.setU32(0x005ebe94, (0x004100f9) >>> 0);
      heap.setU32(0x005ebe98, (0x0041023e) >>> 0);
      heap.setU32(0x005ebe9c, (0x00410250) >>> 0);
      heap.setU32(0x005ebea0, (0x00410390) >>> 0);
      heap.setU32(0x005ebea4, (0x0041041a) >>> 0);
      heap.setU32(0x005ebea8, (0x0041051e) >>> 0);
      heap.setU32(0x005ebeac, (0x0041058e) >>> 0);
      heap.setU32(0x005ebeb0, (0x00410606) >>> 0);
      heap.setU32(0x005ebeb4, (0x00410618) >>> 0);
      heap.setU32(0x005ebeb8, (0x0041068b) >>> 0);
      heap.setU32(0x005e91cc, (0x004103a2) >>> 0);
      uVar1 = ((1) >>> 0);
    }
  }
  return uVar1;
}
