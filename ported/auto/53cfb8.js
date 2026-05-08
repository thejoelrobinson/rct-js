// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/53cfb8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../runtime/ghidra-builtins.js";
export function FUN_0053cfb8(heap, param_1) {
  const __sp = heap.allocFrame(48);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00651b30 = __sp + 12;
  const __addr_DAT_00887426 = __sp + 16;
  const __addr_DAT_00651b44 = __sp + 20;
  const __addr_DAT_00651b46 = __sp + 24;
  const __addr_DAT_00651b42 = __sp + 28;
  const __addr_DAT_00651b40 = __sp + 32;
  const __addr_PTR_LAB_00432204 = __sp + 36;
  const __addr_PTR_LAB_00432e90 = __sp + 40;
  const __addr_DAT_00743c47 = __sp + 44;
  try {
  let uVar1 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let in_EDX = 0;
  let uVar4 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar10 = 0;
  let unaff_EDI = 0;
  let extraout_var = 0;
  puVar2 = heap.u32(0x00991f80);
  heap.setU32(0x0099a4ec, (in_EDX + 7) >>> 0);
  uVar4 = heap.u32(0x0099a4ec);
  uVar8 = heap.u32((param_1 + 7));
  puVar9 = (uVar8 * 0x260);
  puVar5 = 0xffffffff;
  if ((heap.u32((__addr_DAT_00887422) + (uVar8 * 0x130) * 4) & 1) != 0) {
    puVar5 = heap.u32((__addr_DAT_0088747e + puVar9));
    if (puVar5 != 0xffffffff) {
      puVar5 = __addr_DAT_00743b94 + heap.u32((__addr_DAT_0088747e + puVar9)) * 0x100;
      heap.u8(0x991f78) = 2;
      heap.setU32(0x00991f80, (puVar5) >>> 0);
    }
  }
  heap.setU32(0x00651b60, (heap.u32((__addr_DAT_00651b30 + unaff_EDI * 4))) >>> 0);
  if ((puVar5 != 0xffffffff) && (iVar6 = heap.u32(puVar5 + (0x1f) * 4), iVar6 != 0)) {
    if ((unaff_EDI & 2) != 0) {
      iVar6 = -iVar6;
    }
    if (iVar6 < 0) {
      iVar6 = 9 - iVar6;
    }
    heap.setU32(0x00651b60, (heap.u32(0x00651b60) + iVar6 * 0x12) >>> 0);
  }
  uVar7 = heap.u32((__addr_DAT_00887426 + (puVar9 + 1))) << 0x18 | heap.u32((__addr_DAT_00887426 + uVar8 * 0x130)) << 0x11 | heap.u32(0x00651b60);
  heap.setU32(0x0099a4e8, (heap.u32((__addr_DAT_00651b44 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u32((__addr_DAT_00651b46 + unaff_EDI * 8))) >>> 0);
  uVar10 = CONCAT22(((heap.u32((__addr_DAT_00887426 + uVar8 * 0x130)) << 0x11) >>> 0x10), heap.u32((__addr_DAT_00651b42 + unaff_EDI * 8)));
  uVar8 = heap.u32((__addr_DAT_00651b40 + unaff_EDI * 8));
  heap.setU32(0x00651b64, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4);
  uVar3 = extraout_var;
  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, extraout_var);
  if ((heap.u32((heap.u32(0x00981ef8) + 0xe)) < 2) && ((heap.u32((__addr_DAT_00887422 + puVar9)) & 1) != 0)) {
    uVar1 = heap.u32((__addr_DAT_0088747e + puVar9));
    puVar9 = uVar1;
    if ((uVar1 != 0xffff) && (puVar9 = __addr_DAT_00743b94 + uVar1 * 0x100, heap.u32((__addr_DAT_00743c47) + (uVar1 * 0x100) * 4) != '\0')) {
      uVar7 = heap.u32(0x00651b60);
      (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, heap.u32(0x00651b60));
      if (2 < heap.u32(puVar9 + (0xb3) * 4)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
        if (4 < heap.u32(puVar9 + (0xb3) * 4)) {
          (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
          if (6 < heap.u32(puVar9 + (0xb3) * 4)) {
            (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
            if (8 < heap.u32(puVar9 + (0xb3) * 4)) {
              (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
              if (10 < heap.u32(puVar9 + (0xb3) * 4)) {
                (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
                if (0xc < heap.u32(puVar9 + (0xb3) * 4)) {
                  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
                  if (0xe < heap.u32(puVar9 + (0xb3) * 4)) {
                    (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar9, uVar10, uVar8, uVar4, uVar3, uVar7);
  heap.setU32(0x00991f80, (puVar2) >>> 0);
  heap.u8(0x991f78) = 3;
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(48);
  }
}
