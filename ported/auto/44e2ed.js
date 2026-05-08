// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e2ed.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005ddbe1 } from "./5ddbe1.js";
import { FUN_005e6aae } from "./5e6aae.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_0044e2ed(heap) {
  let uVar1 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let bVar2 = 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 5 & 1) == 0) {
    bVar2 = (heap.u32((heap.u32((unaff_ESI + 0x1c)) + 0x56)) + 1 + heap.u32((unaff_ESI + 0x22))) == 0;
    FUN_005e6aae(heap);
    if (!bVar2) {
      uVar1 = heap.u32((unaff_ESI + 0x30));
      FUN_005ddbe1(heap);
      if ((heap.u32((0x005f6be7) + (heap.u32((uint)(byte)(0x00887421) + (uVar1 * 0x260) * 4) * 4) * 4) & 1) != 0) {
        heap.u32((unaff_EDI + 0xe)) = 1;
        heap.u32((unaff_EDI + 8)) = heap.u32((unaff_EDI + 8)) << 1;
        heap.u32((unaff_EDI + 10)) = heap.u32((unaff_EDI + 10)) << 1;
        heap.u32((unaff_EDI + 4)) = heap.u32((unaff_EDI + 4)) << 1;
        heap.u32((unaff_EDI + 6)) = heap.u32((unaff_EDI + 6)) << 1;
      }
      FUN_009b438b(heap);
    }
  }
  return;
}
