// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44106c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0044106c(heap) {
  let in_EAX = regs.eax >>> 0;
  let cVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  cVar1 = ((20) & 0xff);
  if ((((heap.u32((0x005f5b78 + in_EAX * 8)) & 0x800000) != 0) || (cVar1 = ((21) & 0xff), (heap.u32((0x005f5b78 + in_EAX * 8)) & 0x1000000) != 0)) || (cVar1 = ((22) & 0xff), (heap.u32((0x005f5b78 + in_EAX * 8)) & 0x2000000) != 0)) {
    uVar2 = ((0) >>> 0);
    do {
      while (true) {
        if ((heap.i8((unaff_ESI + 0xb0 + uVar2 * 4)) | 0) == -1) {
          return;
        }
        uVar3 = ((uVar2) >>> 0);
        if (cVar1 != heap.i8((unaff_ESI + 0xb0 + uVar2 * 4))) {
          break;
        }
        for (; uVar3 < 4; uVar3 = (((uVar3 + 1) >>> 0)) >>> 0) {
          heap.setU32((unaff_ESI + 0xb0 + uVar3 * 4), (heap.u32((unaff_ESI + 0xb4 + uVar3 * 4))) & 0xffffffff);
        }
        heap.setU8((unaff_ESI + 0xb0 + uVar3 * 4), (0xff) & 0xff);
        heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 1) & 0xff);
      }
      uVar2 = ((uVar2 + 1) >>> 0);
    } while (uVar2 < 5);
  }
  return;
}
