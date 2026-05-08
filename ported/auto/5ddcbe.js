// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddcbe.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042c711 } from "./42c711.js";
export function FUN_005ddcbe(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_005f5b78 = __sp + 4;
  const __addr_DAT_00887420 = __sp + 8;
  const __addr_DAT_005f5802 = __sp + 12;
  const __addr_DAT_0088747e = __sp + 16;
  const __addr_DAT_00887442 = __sp + 20;
  const __addr_DAT_00887444 = __sp + 24;
  const __addr_DAT_005f5806 = __sp + 28;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let unaff_ESI = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = heap.u32((unaff_ESI + 0x30));
  iVar4 = uVar3 * 0x260;
  if ((((heap.u32((__addr_DAT_00887422) + (uVar3 * 0x130) * 4) & 0x480) == 0) && ((heap.u32((__addr_DAT_005f5b78 + heap.u32((__addr_DAT_00887420) + (iVar4) * 4) * 8)) & 0x8000000) != 0)) && (heap.setU32((unaff_ESI + 0xd0), (heap.u32((unaff_ESI + 0xd0)) + 1) >>> 0), (heap.u32((__addr_DAT_00887422) + (uVar3 * 0x130) * 4) & 0x800) == 0)) {
    uVar1 = 0x2580;
    if (heap.u32((__addr_DAT_00887420) + (iVar4) * 4) == '\b') {
      uVar1 = 0x3c00;
    }
    if (uVar1 < heap.u32((unaff_ESI + 0xd0))) {
      heap.setU32(((__addr_DAT_00887422) + (uVar3 * 0x130) * 4), (heap.u32((__addr_DAT_00887422) + (uVar3 * 0x130) * 4) | 0x800) >>> 0);
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005ddcbe"); })();
      iVar2 = 0;
      while (heap.u32((unaff_ESI + 10)) != heap.u32((__addr_DAT_0088747e + iVar2 * 2 + iVar4))) {
        iVar2 = iVar2 + 1;
      }
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005ddcbe"); })();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005ddcbe"); })();
      unique0x00017200 = heap.u32((__addr_DAT_00887444) + (uVar3 * 0x98) * 4);
      heap.setU32(0x00971e90, (heap.u32((__addr_DAT_005f5806 + heap.u32((__addr_DAT_00887420) + (iVar4) * 4) * 8))) >>> 0);
      FUN_0042c711(heap, iVar4);
    }
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}
