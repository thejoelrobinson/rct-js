// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6bcd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e6bcd(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_009a013c = __sp + 0;
  const __addr_stack0xffffffe0 = __sp + 4;
  try {
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_EAX = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let in_EDX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  sVar2 = heap.u32((unaff_ESI + 0x20));
  sVar3 = heap.u32((unaff_ESI + 0x22));
  sVar4 = heap.u32((unaff_ESI + 0x24));
  sVar5 = heap.u32((unaff_ESI + 0x26));
  puVar8 = __addr_DAT_009a013c;
  while (puVar8 < heap.u32(0x009a1164)) {
    puVar9 = puVar8;
    if ((((puVar8 != unaff_ESI) && ((heap.u32((puVar8 + 0x32)) & 3) == 0)) && (heap.u32((puVar8 + 0x20)) < (sVar4 + sVar2))) && (((sVar2 < (heap.u32((puVar8 + 0x20)) + heap.u32((puVar8 + 0x24))) && (heap.u32((puVar8 + 0x22)) < (sVar5 + sVar3))) && ((uVar6 = heap.u32((puVar8 + 0x22)) + heap.u32((puVar8 + 0x26)), uVar7 = uVar6, sVar3 < uVar6 && (puVar10 = __addr_stack0xffffffe0, FUN_005e43de(heap, puVar8, unaff_ESI, uVar7, __addr_stack0xffffffe0), (extraout_CX + 0xd) < heap.u32(0x00971ed6))))))) {
      heap.u32((puVar8 + 0x20)) = heap.u32((puVar8 + 0x20)) + ((extraout_CX + 3) - heap.u32((puVar8 + 0x20)));
      FUN_005e43de(heap, puVar9, unaff_ESI, uVar7, puVar10);
      if (heap.u32((puVar8 + 8)) != 0) {
        psVar1 = (heap.u32((puVar8 + 8)) + 4);
        heap.u32(psVar1) = heap.u32(psVar1) + extraout_CX_00;
      }
    }
    puVar8 = puVar9 + 0x178;
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
