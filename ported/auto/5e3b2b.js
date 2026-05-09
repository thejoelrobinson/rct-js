// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3b2b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e3b2b(heap) {
  let bVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let puVar2 = 0;
  puVar2 = ((0x009a013c) >>> 0);
  bVar1 = ((((in_CX) & 0xff) & 0x7f) & 0xff);
  if ((in_CX >>> 7 & 1) == 0) {
    for (; (puVar2 < heap.u32(0x009a1164) && ((bVar1 != heap.u8(puVar2 + (0x174)) || (in_DX != heap.i16((puVar2 + 0x30)))))); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
    
    }
  } else {
    for (; (puVar2 < heap.u32(0x009a1164) && (bVar1 != heap.u8(puVar2 + (0x174)))); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
    
    }
  }
  return;
}
