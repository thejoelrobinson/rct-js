// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e2ed.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005ddbe1 } from "./5ddbe1.js";
import { FUN_005e6aae } from "./5e6aae.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_0044e2ed(heap) {
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar2 = 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 5 & 1) == 0) {
    bVar2 = (((((heap.i16((heap.i32((unaff_ESI + 0x1c)) + 0x56)) + 1 + heap.i16((unaff_ESI + 0x22)))) << 16 >> 16) == 0) & 0xff);
    (regs.eax = FUN_005e6aae(heap));
    if (!bVar2) {
      uVar1 = ((heap.u16((unaff_ESI + 0x30))) & 0xffff);
      (regs.eax = FUN_005ddbe1(heap));
      if ((heap.u32((0x005f6be7) + (heap.u32(((0x00887421) >>> 0) + (((uVar1) >>> 0) * 0x260) * 4) * 4) * 4) & 1) != 0) {
        heap.setU16((unaff_EDI + 0xe), (1) & 0xffff);
        heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
        heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
        heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
        heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
      }
      (regs.eax = FUN_009b438b(heap));
    }
  }
  return;
}
