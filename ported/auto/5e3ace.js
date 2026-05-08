// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3ace.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e3874 } from "./5e3874.js";
export function FUN_005e3ace(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_009a013c = __sp + 0;
  const __addr_stack0x00000000 = __sp + 4;
  try {
  let puVar1 = 0;
  let in_EAX = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let sVar2 = 0;
  let unaff_EBX = 0;
  let unaff_EBP = 0;
  let puVar3 = 0;
  let unaff_EDI = 0;
  let uVar5 = 0;
  let puVar4 = 0;
  puVar1 = heap.u32(0x009a1164);
  LAB_005e3ad4: do {
    do {
      do {
        puVar4 = puVar1;
        puVar3 = puVar4 + -0x178;
        if (puVar3 < __addr_DAT_009a013c) {
          return;
        }
        puVar1 = puVar3;
      } while ((in_EAX < heap.u32((puVar4 + -0x158))) || ((heap.u32((puVar4 + -0x158)) + heap.u32((puVar4 + -0x154))) <= in_EAX));
    } while ((unaff_EBX < heap.u32((puVar4 + -0x156))) || (sVar2 = heap.u32((puVar4 + -0x156)) + heap.u32((puVar4 + -0x152)), uVar5 = CONCAT24(sVar2, in_EAX), sVar2 <= unaff_EBX));
    if ((heap.u32((puVar4 + -0x146)) & 0x20) != 0) {
      uVar5 = FUN_005e3874(heap, unaff_EDI);
      in_EAX = uVar5;
      in_ECX = extraout_ECX;
      if ((uVar5 >>> 0x20) == -1) {
        /* goto LAB_005e3ad4 */ throw new Error("goto LAB_005e3ad4 not supported");
      }
    }
    in_EAX = uVar5;
    (heap.u32(heap.u32((puVar4 + -0x174))))(unaff_EDI, puVar3, unaff_EBP, __addr_stack0x00000000, unaff_EBX, (uVar5 >>> 0x20), in_ECX);
    puVar1 = heap.u32(0x009a1164);
    if (puVar3 != 0x0) {
      return;
    }
  } while (true);
} finally {
    heap.freeFrame(8);
  }
}
