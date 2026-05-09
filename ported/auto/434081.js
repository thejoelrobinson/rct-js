// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434081.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_00434081(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  iVar2 = ((heap.i32((unaff_ESI + 8))) >>> 0);
  if ((iVar2 != 0) && (heap.i8((iVar2 + 0x10)) != 0)) {
    heap.setI8((iVar2 + 0x10), (heap.i8((iVar2 + 0x10)) + -1) & 0xff);
    heap.setI16((iVar2 + 0xc), (heap.i16((iVar2 + 0xc)) >>> 1) & 0xffff);
    heap.setI16((iVar2 + 0xe), (heap.i16((iVar2 + 0xe)) >>> 1) & 0xffff);
    uVar1 = ((heap.u16((iVar2 + 0xe))) & 0xffff);
    heap.setI16((unaff_ESI + 0x170), (heap.i16((unaff_ESI + 0x170)) + (heap.u16((iVar2 + 0xc)) >>> 1)) & 0xffff);
    heap.setI16((unaff_ESI + 0x172), (heap.i16((unaff_ESI + 0x172)) + (uVar1 >>> 1)) & 0xffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return;
}
