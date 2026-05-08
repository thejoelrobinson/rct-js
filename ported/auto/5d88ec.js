// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d88ec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_004518fc } from "./4518fc.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005d88ec(heap) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_0088755c = __sp + 0;
  const __addr_DAT_00887422 = __sp + 4;
  const __addr_DAT_0088751d = __sp + 8;
  const __addr_DAT_0088755d = __sp + 12;
  const __addr_DAT_00887560 = __sp + 16;
  const __addr_DAT_00743bdf = __sp + 20;
  const __addr_DAT_0088747e = __sp + 24;
  const __addr_DAT_00887561 = __sp + 28;
  const __addr_DAT_00887563 = __sp + 32;
  const __addr_DAT_00743b94 = __sp + 36;
  try {
  let bVar2 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_EBX = 0;
  let iVar3 = 0;
  let unaff_EDI = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  uVar6 = CONCAT44(in_EDX, in_EAX);
  iVar3 = 0;
  do {
    if ((((heap.u32((unaff_ESI + 0x48)) & 0x100) == 0) || (heap.u32(unaff_ESI + (0xb5) * 4) == '\0')) || ((uVar4 = heap.u32(unaff_ESI + (0x30) * 4), iVar5 = uVar4 * 0x260, heap.u32((__addr_DAT_0088755c) + (iVar5) * 4) != '\x02' && (heap.u32((__addr_DAT_0088755c) + (iVar5) * 4) != '\x04')))) {
      pbVar1 = unaff_ESI + 0xb5;
      bVar2 = heap.u32(pbVar1);
      heap.u32(pbVar1) = heap.u32(pbVar1) - 0x14;
      if (0x13 < bVar2) {
        /* goto LAB_005d8994 */ throw new Error("goto LAB_005d8994 not supported");
      }
      heap.u32(unaff_ESI + (0xb5) * 4) = 0;
    } else {
      if ((heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) & 0x80) == 0) {
        heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (uVar4 * 0x130) * 4) | 0x80;
        FUN_004518fc(heap, (uVar6 >>> 0x20), unaff_EDI, unaff_EBX);
        heap.u32((__addr_DAT_0088751d) + (iVar5) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar5) * 4) | 0x1c;
        heap.u32((__addr_DAT_0088755d) + (iVar5) * 4) = 1;
        heap.u32((__addr_DAT_00887560) + (iVar5) * 4) = heap.u32((__addr_DAT_00743bdf) + (heap.u32((__addr_DAT_0088747e + heap.u32((byte)(__addr_DAT_00887561) + (iVar5) * 4) * 2 + iVar5)) * 0x100) * 4);
        heap.u32((__addr_DAT_00887563) + (iVar5) * 4) = heap.u32((__addr_DAT_0088755c) + (iVar5) * 4);
      }
      LAB_005d8994: uVar6 = FUN_005e53ca(heap);
      iVar3 = iVar3 + 1;
    }
    if (heap.u32((unaff_ESI + 0x3e)) == -1) {
      if (iVar3 == 0) {
        return uVar6;
      }
      return uVar6;
    }
    unaff_ESI = __addr_DAT_00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100;
  } while (true);
} finally {
    heap.freeFrame(40);
  }
}
