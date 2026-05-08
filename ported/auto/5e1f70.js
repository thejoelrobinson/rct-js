// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1f70.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetNextWindow } from "../../runtime/win32.js";
import { FUN_0042d60a } from "./42d60a.js";
import { FUN_0042d637 } from "./42d637.js";
export function FUN_005e1f70(heap) {
  let pHVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  if (heap.u32(0x0099c16b) == 1) {
    uVar2 = FUN_0042d60a(heap);
    pHVar1 = (uVar2 & 0xffff);
    uVar2 = FUN_0042d60a(heap);
    heap.setU32(0x0099fdf4, (pHVar1) >>> 0);
    heap.setU32(0x0099fdf8, (uVar2 & 0xffff) >>> 0);
    GetNextWindow(heap, heap.u32(0x0099fdf4), heap.u32(0x0099fdf8));
    return;
  }
  if (heap.u32(0x0099c16b) < 2) {
    heap.setU32(0x0099fdf4, (heap.u32(0x005f1a10)) >>> 0);
    heap.setU32(0x0099fdf8, (heap.u32(0x005f1a14)) >>> 0);
    return;
  }
  uVar3 = FUN_0042d637(heap);
  heap.setU32(0x0099fdf8, (FUN_0042d637(heap)) >>> 0);
  heap.setU32(0x0099fdf4, (uVar3) >>> 0);
  return;
}
