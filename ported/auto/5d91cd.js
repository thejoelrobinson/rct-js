// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d91cd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d91cd(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_008874c4 = __sp + 4;
  const __addr_DAT_00887497 = __sp + 8;
  const __addr_DAT_008874ac = __sp + 12;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  heap.u32((__addr_DAT_00887422 + unaff_EDI)) = heap.u32((__addr_DAT_00887422 + unaff_EDI)) & 0xfffb;
  heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) & 0xffdf;
  heap.u32((__addr_DAT_00887422 + unaff_EDI)) = heap.u32((__addr_DAT_00887422 + unaff_EDI)) | 2;
  iVar2 = 0;
  uVar1 = 0;
  do {
    uVar1 = uVar1 + heap.u32((__addr_DAT_008874c4 + iVar2 * 2 + unaff_EDI));
    iVar2 = iVar2 + 1;
  } while (iVar2 < heap.u32((byte)(__addr_DAT_00887497) + (unaff_EDI) * 4));
  if (uVar1 == 0) {
    uVar1 = 1;
  }
  heap.u32((__addr_DAT_008874ac + unaff_EDI)) = heap.u32((__addr_DAT_008874ac + unaff_EDI)) / uVar1;
  FUN_005e5301(heap);
  return;
} finally {
    heap.freeFrame(16);
  }
}
