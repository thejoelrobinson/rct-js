// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458f0f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00458f0f(heap) {
  let cVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let pcVar2 = 0;
  let unaff_EDI = regs.edi >>> 0;
  pcVar2 = ((heap.u32((0x006432ac) + (in_EAX & 7) * 4)) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(unaff_EDI, (cVar1) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
  } while (cVar1 != 0);
  return;
}
