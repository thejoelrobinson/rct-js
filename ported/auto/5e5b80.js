// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5b80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005e5b80(heap) {
  let in_CX = 0;
  let uVar1 = 0;
  let extraout_CX = 0;
  let in_DX = 0;
  puVar2 = 0x009a013c;
  uVar1 = in_CX & 0xff7f;
  if ((in_CX >>> 7 & 1) == 0) {
    for (; puVar2 < heap.u32(0x009a1164); puVar2 = puVar2 + 0x178) {
      if ((uVar1 == heap.u32(puVar2 + (0x174) * 4)) && (in_DX == heap.u32((puVar2 + 0x30)))) {
        FUN_005e5bd8(heap);
        return;
      }
    }
  } else {
    while (puVar2 < heap.u32(0x009a1164)) {
      if (uVar1 == heap.u32(puVar2 + (0x174) * 4)) {
        FUN_005e5bd8(heap);
        puVar2 = 0x009a013c;
        uVar1 = extraout_CX;
      } else {
        puVar2 = puVar2 + 0x178;
      }
    }
  }
  return;
}
