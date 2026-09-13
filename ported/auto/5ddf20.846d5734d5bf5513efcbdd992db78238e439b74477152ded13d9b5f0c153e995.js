// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddf20.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005dde9c } from "./5dde9c.js";
export function FUN_005ddf20(heap) {
  let uVar1 = 0;
  heap.setU32(0x006e1eaa, (0) >>> 0);
  heap.setU32(0x006e1ec3, (2) >>> 0);
  heap.setU32(0x006e1ec4, (0x18) >>> 0);
  heap.setU32(0x006e1ec5, (6) >>> 0);
  (regs.eax = FUN_005dde9c(heap));
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x006e1eab) + (uVar1) * 4), (heap.u16(heap.u32((0x006e2758) + (uVar1) * 4))) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0xc);
  return;
}
