// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f6df.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408342 } from "./408342.js";
export function FUN_0042f6df(heap) {
  let in_AL = regs.eax & 0xff;
  let iVar1 = 0;
  if (heap.u8(0x005f88ac) == 0x400) {
    iVar1 = (((regs.eax = FUN_00408342(heap, heap.u32(0x005f88a4), 0x005f88b0, 0x400))) >>> 0);
    if (iVar1 != 0x400) {
      heap.setU8(0x005f88af, (1) & 0xff);
    }
    heap.setU32(0x005f88a8, (0x005f88b0) >>> 0);
    heap.setU8(0x005f88ac, (0) & 0xff);
  }
  heap.setU32(heap.u32(0x005f88a8), (in_AL) & 0xffffffff);
  heap.setU8((0x005f8d36 + 0), (heap.i8(0x005f8d36) + in_AL) & 0xff);
  heap.setU8(0x005f8d36, (heap.u8(0x005f8d36) << 3 | (((((heap.u8(0x005f8d36)) >>> 8) & 0xffffffff) >>> 0x15) >>> 0)) & 0xff);
  heap.setU32(0x005f88a8, (heap.u32(0x005f88a8) + 1) >>> 0);
  heap.setU8(0x005f88ac, (heap.u8(0x005f88ac) + 1) & 0xff);
  return;
}
