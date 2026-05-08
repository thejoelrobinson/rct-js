// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/555a50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_00555a50(heap, param_1) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00887426 = __sp + 12;
  const __addr_DAT_00651c24 = __sp + 16;
  const __addr_DAT_00651c26 = __sp + 20;
  const __addr_DAT_00651c22 = __sp + 24;
  const __addr_DAT_00651c20 = __sp + 28;
  const __addr_PTR_LAB_00432204 = __sp + 32;
  const __addr_PTR_LAB_00432e90 = __sp + 36;
  const __addr_DAT_00743bbf = __sp + 40;
  try {
  let uVar1 = 0;
  let puVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let in_EDX = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let puVar8 = 0;
  let uVar9 = 0;
  let unaff_EDI = 0;
  let extraout_var = 0;
  puVar2 = heap.u32(0x00991f80);
  heap.setU32(0x0099a4ec, (in_EDX + 7) >>> 0);
  uVar4 = heap.u32(0x0099a4ec);
  uVar7 = heap.u32((param_1 + 7));
  puVar8 = (uVar7 * 0x260);
  puVar5 = 0xffffffff;
  if ((heap.u32((__addr_DAT_00887422) + (uVar7 * 0x130) * 4) & 1) != 0) {
    puVar5 = heap.u32((__addr_DAT_0088747e + puVar8));
    if (puVar5 != 0xffffffff) {
      puVar5 = __addr_DAT_00743b94 + heap.u32((__addr_DAT_0088747e + puVar8)) * 0x100;
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00555a50"); })();
      heap.setU32(0x00991f80, (puVar5) >>> 0);
    }
  }
  heap.setU32(0x00651c40, (unaff_EDI * 8 + 0xa0008d7a) >>> 0);
  if (puVar5 != 0xffffffff) {
    heap.setU32(0x00651c40, (heap.u32(0x00651c40) + (heap.u32(puVar5 + (0x1f) * 4) & 7)) >>> 0);
  }
  uVar6 = heap.u32((__addr_DAT_00887426 + (puVar8 + 1))) << 0x18 | heap.u32((__addr_DAT_00887426 + uVar7 * 0x130)) << 0x11 | heap.u32(0x00651c40);
  heap.setU32(0x0099a4e8, (heap.u32((__addr_DAT_00651c24 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u32((__addr_DAT_00651c26 + unaff_EDI * 8))) >>> 0);
  uVar9 = CONCAT22(((heap.u32((__addr_DAT_00887426 + uVar7 * 0x130)) << 0x11) >>> 0x10), heap.u32((__addr_DAT_00651c22 + unaff_EDI * 8)));
  uVar7 = heap.u32((__addr_DAT_00651c20 + unaff_EDI * 8));
  heap.setU32(0x00651c44, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(puVar8, uVar9, uVar7, uVar4);
  uVar3 = extraout_var;
  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar8, uVar9, uVar7, uVar4, extraout_var);
  if ((heap.u32((heap.u32(0x00981ef8) + 0xe)) < 2) && ((heap.u32((__addr_DAT_00887422 + puVar8)) & 1) != 0)) {
    uVar1 = heap.u32((__addr_DAT_0088747e + puVar8));
    puVar8 = uVar1;
    if (uVar1 != 0xffff) {
      puVar8 = __addr_DAT_00743b94 + uVar1 * 0x100;
      uVar6 = 0;
      do {
        if ((heap.u32((puVar8 + uVar6 * 2 + 0x52)) != -1) && (heap.u32((__addr_DAT_00743bbf) + (heap.u32((puVar8 + uVar6 * 2 + 0x52)) * 0x100) * 4) == '\x03')) {
          (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))();
        }
        uVar6 = uVar6 + 2;
      } while (uVar6 < 0x20);
    }
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar8, uVar9, uVar7, uVar4, uVar3, uVar6);
  heap.setU32(0x00991f80, (puVar2) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00555a50"); })();
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(44);
  }
}
