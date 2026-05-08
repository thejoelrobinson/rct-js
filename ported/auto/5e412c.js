// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e412c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e4198 } from "./5e4198.js";
export function FUN_005e412c(heap) {
  let in_EAX = 0;
  let iVar2 = 0;
  let extraout_CX = 0;
  let extraout_DX = 0;
  let in_EDX = 0;
  let iVar3 = 0;
  let unaff_ESI = 0;
  iVar2 = 0;
  iVar3 = 0;
  for (pcVar4 = heap.u32((unaff_ESI + 0x1c)); heap.u32(pcVar4) != '\x15'; pcVar4 = pcVar4 + 0x10) {
    if (heap.u32(pcVar4) == '\x11') {
      heap.u32((iVar3 + 0x34 + unaff_ESI)) = 0;
      (heap.u32(heap.u32((unaff_ESI + 4))))(pcVar4, iVar3, iVar2);
      heap.u32((iVar3 + 0x36 + unaff_ESI)) = 0;
      heap.u32((iVar3 + 0x38 + unaff_ESI)) = extraout_CX;
      heap.u32((iVar3 + 0x3e + unaff_ESI)) = 0;
      heap.u32((iVar3 + 0x40 + unaff_ESI)) = extraout_DX;
      if ((heap.u32((pcVar4 + 10)) & 1) != 0) {
        puVar1 = (iVar3 + 0x34 + unaff_ESI);
        heap.u32(puVar1) = heap.u32(puVar1) | 1;
      }
      if ((heap.u32((pcVar4 + 10)) & 2) != 0) {
        puVar1 = (iVar3 + 0x34 + unaff_ESI);
        heap.u32(puVar1) = heap.u32(puVar1) | 0x10;
      }
      iVar2 = FUN_005e4198(heap);
      iVar2 = iVar2 + 1;
      iVar3 = iVar3 + 0x12;
    }
  }
  return CONCAT44(in_EDX, in_EAX);
}
