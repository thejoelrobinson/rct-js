// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e680e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e687d } from "./5e687d.js";
export function FUN_005e680e(heap) {
  let in_AL = regs.eax & 0xff;
  let uVar1 = 0;
  let in_DX = regs.edx & 0xffff;
  let extraout_DX = 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32(0x00991f30) >>> 3 & 1) != 0) {
    if (((heap.i8((unaff_ESI + 0x174)) == heap.u8(0x00991f5a)) && (heap.i16((unaff_ESI + 0x30)) == heap.u8(0x00991f58))) && (in_DX == heap.u8(0x00991f5c))) {
      uVar1 = (((regs.eax = FUN_005e687d(heap))) & 0xffff);
      return uVar1;
    }
    in_AL = (((regs.eax = FUN_005e687d(heap))) & 0xff);
    in_DX = ((extraout_DX) & 0xffff);
  }
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffffbf | 8) >>> 0);
  heap.setU8(0x00991f5b, (in_AL) & 0xff);
  heap.setU8(0x00991f5c, (in_DX) & 0xff);
  heap.setU8(0x00991f5a, (heap.u8((unaff_ESI + 0x174))) & 0xff);
  heap.setU8(0x00991f58, (heap.u16((unaff_ESI + 0x30))) & 0xff);
  return heap.u16((unaff_ESI + 0x30));
}
