// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5496.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e117d } from "./5e117d.js";
export function FUN_005e5496(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a121c = __sp + 0;
  try {
  let sVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let iVar5 = 0;
  let in_EAX = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let piVar6 = 0;
  sVar1 = heap.u32((unaff_ESI + 0x16));
  sVar2 = heap.u32((unaff_ESI + 0x18));
  if (sVar1 != -0x8000) {
    sVar3 = heap.u32((unaff_ESI + 0x1a));
    sVar4 = heap.u32((unaff_ESI + 0x1c));
    for (piVar6 = __addr_DAT_009a121c; iVar5 = heap.u32(piVar6), iVar5 != 0; piVar6 = piVar6 + 1) {
      if ((((heap.u32((iVar5 + 0x10)) == '\0') && (heap.u32((iVar5 + 8)) < sVar3)) && (heap.u32((iVar5 + 10)) < sVar4)) && ((sVar1 < (heap.u32((iVar5 + 8)) + heap.u32((iVar5 + 0xc))) && (sVar2 < (heap.u32((iVar5 + 10)) + heap.u32((iVar5 + 0xe))))))) {
        FUN_005e117d(heap, in_ECX);
      }
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
