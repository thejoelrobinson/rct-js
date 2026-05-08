// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d8b51.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d8b51(heap) {
  const __sp = heap.allocFrame(124);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_008874a8 = __sp + 4;
  const __addr_DAT_008874ac = __sp + 8;
  const __addr_DAT_008874b0 = __sp + 12;
  const __addr_DAT_008874b1 = __sp + 16;
  const __addr_DAT_008874cc = __sp + 20;
  const __addr_DAT_008874ce = __sp + 24;
  const __addr_DAT_008874d0 = __sp + 28;
  const __addr_DAT_008874d2 = __sp + 32;
  const __addr_DAT_008874d4 = __sp + 36;
  const __addr_DAT_008874d8 = __sp + 40;
  const __addr_DAT_008874dc = __sp + 44;
  const __addr_DAT_008874ef = __sp + 48;
  const __addr_DAT_008874de = __sp + 52;
  const __addr_DAT_008874e0 = __sp + 56;
  const __addr_DAT_008874e2 = __sp + 60;
  const __addr_DAT_008874e4 = __sp + 64;
  const __addr_DAT_008874e5 = __sp + 68;
  const __addr_DAT_008874e8 = __sp + 72;
  const __addr_DAT_008874ec = __sp + 76;
  const __addr_DAT_008874ee = __sp + 80;
  const __addr_DAT_008874e7 = __sp + 84;
  const __addr_DAT_008874a5 = __sp + 88;
  const __addr_DAT_008874b4 = __sp + 92;
  const __addr_DAT_008874c4 = __sp + 96;
  const __addr_DAT_008874b8 = __sp + 100;
  const __addr_DAT_008874c6 = __sp + 104;
  const __addr_DAT_008874bc = __sp + 108;
  const __addr_DAT_008874c8 = __sp + 112;
  const __addr_DAT_008874c0 = __sp + 116;
  const __addr_DAT_008874ca = __sp + 120;
  try {
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  heap.u32((__addr_DAT_00887422 + unaff_EDI)) = heap.u32((__addr_DAT_00887422 + unaff_EDI)) | 4;
  heap.u32((__addr_DAT_00887422 + unaff_EDI)) = heap.u32((__addr_DAT_00887422 + unaff_EDI)) & 0xfff7;
  heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) | 0x20;
  heap.u32((__addr_DAT_008874a8 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874ac + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874b0) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874b1) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874cc + unaff_EDI)) = 100;
  heap.u32((__addr_DAT_008874ce + unaff_EDI)) = 100;
  heap.u32((__addr_DAT_008874d0 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874d2 + unaff_EDI)) = 100;
  heap.u32((__addr_DAT_008874d4 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874d8 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874dc + unaff_EDI)) = 0xffff;
  heap.u32((__addr_DAT_008874ef) + (unaff_EDI) * 4) = 0xff;
  heap.u32((__addr_DAT_008874de + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874e0 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874e2 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874e4) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874e5) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874e8 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874ec + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874ee) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874e7) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874a5) + (unaff_EDI) * 4) = 0;
  heap.u32((__addr_DAT_008874b4 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874c4 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874b8 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874c6 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874bc + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874c8 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874c0 + unaff_EDI)) = 0;
  heap.u32((__addr_DAT_008874ca + unaff_EDI)) = 0;
  FUN_005e5301(heap);
  return;
} finally {
    heap.freeFrame(124);
  }
}
