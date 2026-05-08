// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/53e318.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_0053e318(heap, param_1) {
  const __sp = heap.allocFrame(48);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00651b70 = __sp + 12;
  const __addr_DAT_00651b80 = __sp + 16;
  const __addr_DAT_00887426 = __sp + 20;
  const __addr_DAT_00651b94 = __sp + 24;
  const __addr_DAT_00651b96 = __sp + 28;
  const __addr_DAT_00651b92 = __sp + 32;
  const __addr_DAT_00651b90 = __sp + 36;
  const __addr_PTR_LAB_00432204 = __sp + 40;
  const __addr_PTR_LAB_00432e90 = __sp + 44;
  try {
  let in_EAX = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let unaff_EDI = 0;
  puVar1 = heap.u32(0x00991f80);
  heap.setU32(0x0099a4ec, (in_EDX + 7) >>> 0);
  uVar2 = heap.u32(0x0099a4ec);
  uVar6 = heap.u32((param_1 + 7));
  iVar7 = uVar6 * 0x260;
  puVar3 = 0xffffffff;
  if ((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 1) != 0) {
    puVar3 = heap.u32((__addr_DAT_0088747e + iVar7));
    if (puVar3 != 0xffffffff) {
      puVar3 = __addr_DAT_00743b94 + heap.u32((__addr_DAT_0088747e + iVar7)) * 0x100;
      heap.u8(0x991f78) = 2;
      heap.setU32(0x00991f80, (puVar3) >>> 0);
    }
  }
  heap.setU32(0x00651bb0, (heap.u32((__addr_DAT_00651b70 + unaff_EDI * 4))) >>> 0);
  if ((puVar3 != 0xffffffff) && (iVar4 = heap.u32(puVar3 + (0x1f) * 4), iVar4 != 0)) {
    if ((unaff_EDI & 2) != 0) {
      iVar4 = -iVar4;
    }
    if (iVar4 < 0) {
      iVar4 = iVar4 + 0x48;
    }
    heap.setU32(0x00651bb0, (heap.u32((__addr_DAT_00651b80 + unaff_EDI * 4)) + (iVar4 + -1) * 2) >>> 0);
  }
  uVar5 = heap.u32((__addr_DAT_00887426 + iVar7 + 1)) << 0x18 | heap.u32((__addr_DAT_00887426 + uVar6 * 0x130)) << 0x11 | heap.u32(0x00651bb0);
  heap.setU32(0x0099a4e8, (heap.u32((__addr_DAT_00651b94 + unaff_EDI * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u32((__addr_DAT_00651b96 + unaff_EDI * 8))) >>> 0);
  uVar8 = CONCAT22(((heap.u32((__addr_DAT_00887426 + uVar6 * 0x130)) << 0x11) >>> 0x10), heap.u32((__addr_DAT_00651b92 + unaff_EDI * 8)));
  uVar6 = heap.u32((__addr_DAT_00651b90 + unaff_EDI * 8));
  heap.setU32(0x00651bb4, (unaff_EDI) >>> 0);
  if ((unaff_EDI & 2) == 0) {
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(iVar7, uVar8, uVar6, uVar2);
  }
  if ((heap.u32(0x00651bb4) & 2) == 0) {
    (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(iVar7, uVar8, uVar6, uVar2, in_ECX);
  } else {
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
  }
  if ((heap.u32(0x00651bb4) & 2) != 0) {
    (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(iVar7, uVar8, uVar6, uVar2, in_ECX, uVar5);
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.u8(0x991f78) = 3;
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(48);
  }
}
