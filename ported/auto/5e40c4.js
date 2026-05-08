// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e40c4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e4198 } from "./5e4198.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e40c4(heap) {
  let iVar1 = 0;
  let extraout_CX = 0;
  let extraout_DX = 0;
  let iVar2 = 0;
  let sVar3 = 0;
  let unaff_ESI = 0;
  iVar1 = 0;
  iVar2 = 0;
  for (pcVar4 = heap.u32((unaff_ESI + 0x1c)); heap.u32(pcVar4) != '\x15'; pcVar4 = pcVar4 + 0x10) {
    if (heap.u32(pcVar4) == '\x11') {
      (heap.u32(heap.u32((unaff_ESI + 4))))(pcVar4, iVar2, iVar1);
      sVar3 = 0;
      if (((heap.u32((pcVar4 + 10)) & 1) != 0) && (extraout_CX != heap.u32((iVar2 + 0x38 + unaff_ESI)))) {
        sVar3 = 1;
        heap.u32((iVar2 + 0x38 + unaff_ESI)) = extraout_CX;
      }
      if (((heap.u32((pcVar4 + 10)) & 2) != 0) && (extraout_DX != heap.u32((iVar2 + 0x40 + unaff_ESI)))) {
        sVar3 = sVar3 + 1;
        heap.u32((iVar2 + 0x40 + unaff_ESI)) = extraout_DX;
      }
      if (sVar3 != 0) {
        FUN_005e4198(heap);
        iVar1 = FUN_005e43de(heap);
      }
      iVar1 = iVar1 + 1;
      iVar2 = iVar2 + 0x12;
    }
  }
  return;
}
