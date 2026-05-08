// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d8b51.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d8b51(heap) {
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  heap.u32((0x00887422 + unaff_EDI)) = heap.u32((0x00887422 + unaff_EDI)) | 4;
  heap.u32((0x00887422 + unaff_EDI)) = heap.u32((0x00887422 + unaff_EDI)) & 0xfff7;
  heap.u32((unaff_ESI + 0x48)) = heap.u32((unaff_ESI + 0x48)) | 0x20;
  heap.u32((0x008874a8 + unaff_EDI)) = 0;
  heap.u32((0x008874ac + unaff_EDI)) = 0;
  heap.u32((0x008874b0) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874b1) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874cc + unaff_EDI)) = 100;
  heap.u32((0x008874ce + unaff_EDI)) = 100;
  heap.u32((0x008874d0 + unaff_EDI)) = 0;
  heap.u32((0x008874d2 + unaff_EDI)) = 100;
  heap.u32((0x008874d4 + unaff_EDI)) = 0;
  heap.u32((0x008874d8 + unaff_EDI)) = 0;
  heap.u32((0x008874dc + unaff_EDI)) = 0xffff;
  heap.u32((0x008874ef) + (unaff_EDI) * 4) = 0xff;
  heap.u32((0x008874de + unaff_EDI)) = 0;
  heap.u32((0x008874e0 + unaff_EDI)) = 0;
  heap.u32((0x008874e2 + unaff_EDI)) = 0;
  heap.u32((0x008874e4) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874e5) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874e8 + unaff_EDI)) = 0;
  heap.u32((0x008874ec + unaff_EDI)) = 0;
  heap.u32((0x008874ee) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874e7) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874a5) + (unaff_EDI) * 4) = 0;
  heap.u32((0x008874b4 + unaff_EDI)) = 0;
  heap.u32((0x008874c4 + unaff_EDI)) = 0;
  heap.u32((0x008874b8 + unaff_EDI)) = 0;
  heap.u32((0x008874c6 + unaff_EDI)) = 0;
  heap.u32((0x008874bc + unaff_EDI)) = 0;
  heap.u32((0x008874c8 + unaff_EDI)) = 0;
  heap.u32((0x008874c0 + unaff_EDI)) = 0;
  heap.u32((0x008874ca + unaff_EDI)) = 0;
  FUN_005e5301(heap);
  return;
}
