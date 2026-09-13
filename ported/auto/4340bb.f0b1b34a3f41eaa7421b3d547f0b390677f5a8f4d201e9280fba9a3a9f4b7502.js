// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4340bb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_004340bb(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  iVar3 = ((heap.i32((unaff_ESI + 8))) >>> 0);
  if ((iVar3 != 0) && (heap.i8((iVar3 + 0x10)) != 2)) {
    heap.setI8((iVar3 + 0x10), (heap.i8((iVar3 + 0x10)) + 1) & 0xff);
    uVar1 = ((heap.u16((iVar3 + 0xc))) & 0xffff);
    uVar2 = ((heap.u16((iVar3 + 0xe))) & 0xffff);
    heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) << 1) & 0xffff);
    heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) << 1) & 0xffff);
    heap.setI16((unaff_ESI + 0x170), (heap.i16((unaff_ESI + 0x170)) - (uVar1 >>> 1)) & 0xffff);
    heap.setI16((unaff_ESI + 0x172), (heap.i16((unaff_ESI + 0x172)) - (uVar2 >>> 1)) & 0xffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return;
}
