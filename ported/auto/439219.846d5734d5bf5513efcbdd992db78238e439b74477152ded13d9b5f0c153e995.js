// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/439219.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
export function FUN_00439219(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar4 = 0;
  heap.setI8((unaff_ESI + 0xc4), (heap.i8((unaff_ESI + 0xc4)) + 1) & 0xff);
  if ((heap.u8((unaff_ESI + 10)) & 0xf) != (heap.u8((unaff_ESI + 0xc4)) & 0xf)) {
    return;
  }
  uVar2 = ((heap.u16((unaff_ESI + 0x26)) << 7 | heap.u16((unaff_ESI + 0x26)) >>> 9 | heap.u16((unaff_ESI + 0x24))) & 0xffff);
  bVar3 = ((0) & 0xff);
  pbVar4 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
  if ((heap.u8((unaff_ESI + 0x29)) & 0x18) == 0) {
    bVar3 = ((4) & 0xff);
  }
  while ((heap.u8(pbVar4) & 0x3c) != bVar3 || (heap.u8((unaff_ESI + 0x28)) != heap.u8(pbVar4 + (2)))) {
    pbVar1 = ((pbVar4 + 1) >>> 0);
    pbVar4 = ((pbVar4 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      (regs.eax = FUN_0044142c(heap));
      heap.setU8((unaff_ESI + 0x2b), (0) & 0xff);
      return (regs.eax = FUN_00441452(heap));
    }
  }
  return;
}
