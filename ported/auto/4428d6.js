// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4428d6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00440fe3 } from "./440fe3.js";
export function FUN_004428d6(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((1 < heap.u32(0x0087d7a0)) && (heap.setI8((unaff_ESI + 0xf4), (heap.i8((unaff_ESI + 0xf4)) + 1) & 0xff), (heap.i8((unaff_ESI + 0xf4)) | 0) == -2)) {
    heap.setU8((unaff_ESI + 0xf4), (0xdc) & 0xff);
    (regs.eax = FUN_00440fe3(heap));
    pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
    bVar2 = ((heap.u8(pbVar1)) & 0xff);
    heap.setU32(pbVar1, (heap.u8(pbVar1) - 0x1e) & 0xffffffff);
    if (bVar2 < 0x1e) {
      heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
    }
  }
  return;
}
