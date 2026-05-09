// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d91cd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d91cd(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  heap.setU16((((0x00887422) >>> 0) + unaff_EDI), (heap.u16((((0x00887422) >>> 0) + unaff_EDI)) & 0xfffb) & 0xffff);
  heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xffdf) & 0xffff);
  heap.setU16((((0x00887422) >>> 0) + unaff_EDI), (heap.u16((((0x00887422) >>> 0) + unaff_EDI)) | 2) & 0xffff);
  iVar2 = ((0) >>> 0);
  uVar1 = ((0) >>> 0);
  do {
    uVar1 = ((uVar1 + heap.u16((0x008874c4 + iVar2 * 2 + unaff_EDI))) >>> 0);
    iVar2 = ((iVar2 + 1) >>> 0);
  } while (((iVar2) & 0xff) < heap.u32(((0x00887497) & 0xff) + (unaff_EDI) * 4));
  if (uVar1 == 0) {
    uVar1 = ((1) >>> 0);
  }
  heap.setU32((0x008874ac + unaff_EDI), (heap.u32((0x008874ac + unaff_EDI)) / uVar1) & 0xffffffff);
  return (regs.eax = FUN_005e5301(heap));
}
