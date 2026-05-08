// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/452fce.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407c42 } from "./407c42.js";
export function FUN_00452fce(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_PTR_LAB_0045304c = __sp + 4;
  const __addr_DAT_00632608 = __sp + 8;
  try {
  let in_AX = 0;
  let bVar1 = 0;
  let in_CX = 0;
  let uVar2 = 0;
  let in_DX = 0;
  let unaff_EBX = 0;
  let iVar4 = 0;
  let unaff_BP = 0;
  if ((heap.u32(0x006326bd) & 1) != 0) {
    heap.setU32(0x00632405, (0) >>> 0);
    if (unaff_EBX == 0x8001) {
      pbVar3 = heap.u32((__addr_DAT_00971ef4) + ((((in_DX & 0xffe0) << 7 | in_DX >>> 9 | in_CX & 0xffe0) >>> 5 | (in_DX >>> 9) << 0xb)) * 4);
      bVar1 = heap.u32(pbVar3);
      while ((bVar1 & 0x3c) != 0) {
        pbVar3 = pbVar3 + 8;
        bVar1 = heap.u32(pbVar3);
      }
      if (unaff_BP < (heap.u32(pbVar3 + (2) * 4) * 4 + -5)) {
        heap.setU32(0x00632405, (10) >>> 0);
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_0045304c) + (heap.u32(0x00991f88)) * 4)))();
      return;
    }
    psVar5 = __addr_DAT_00632608;
    bVar1 = 0;
    do {
      if (heap.u32(psVar5) == -1) {
        heap.u32(psVar5) = in_AX;
        psVar5 = psVar5 + 1;
        if (unaff_EBX == 0x8000) {
          iVar4 = 0;
        } else {
          uVar2 = heap.u32(0x00971ed6);
          if (uVar2 < 0x40) {
            uVar2 = 0x40;
          }
          iVar4 = (unaff_EBX << 0x10) / uVar2 + -0x8000 >>> 4;
        }
        if (heap.u32(0x005f8d59) == '\0') {
          iVar4 = 0;
        }
        FUN_004077b3(heap);
        FUN_00407c42(heap, psVar5, 0, 0, iVar4, 0);
        return;
      }
      psVar5 = psVar5 + 0xb;
      bVar1 = bVar1 + 1;
    } while (bVar1 < heap.u32(0x005f8d5e));
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}
