// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f91e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408276 } from "./408276.js";
export function FUN_0042f91e(heap) {
  let uVar1 = 0;
  if (heap.u8(0x005f88ac) == 0) {
    (regs.eax = FUN_00408276(heap, heap.u32(0x005f88a4), 0x005f88b0, 0x400));
    heap.setU8(0x005f88ac, (0x400) & 0xff);
    heap.setU32(0x005f88a8, (0x005f88b0) >>> 0);
  }
  uVar1 = ((heap.u8(heap.u32(0x005f88a8))) & 0xff);
  heap.setU8(0x005f88ac, (heap.u8(0x005f88ac) + -1) & 0xff);
  heap.setU32(0x005f88a8, ((((heap.u32(0x005f88a8)) >>> 0) + 1)) >>> 0);
  return uVar1;
}
