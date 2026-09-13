// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f03b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_0044f03b(heap) {
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar2 = 0;
  bVar2 = ((true) & 0xff);
  uVar1 = (((regs.ecx = 0x10, regs.eax = FUN_005e3b2b(heap))) >>> 0);
  if (!bVar2) {
    heap.setU32(((0x00631d0d) + (heap.u32(((0x005f5d05) & 0xff) + ((uVar1 & 0xff) * 8) * 4)) * 4), (((uVar1) << 24 >> 24)) & 0xffffffff);
    (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  }
  return uVar1;
}
