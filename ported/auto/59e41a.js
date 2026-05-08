// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/59e41a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../runtime/win32.js";
export function FUN_0059e41a(heap, param_1) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_PTR_LAB_00432204 = __sp + 12;
  const __addr_PTR_LAB_00432e90 = __sp + 16;
  try {
  let in_EAX = 0;
  let in_ECX = 0;
  let in_DX = 0;
  let uVar2 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let unaff_EDI = 0;
  let uVar6 = 0;
  puVar1 = heap.u32(0x00991f80);
  heap.setU32(0x0099a4ec, (in_DX + 7) >>> 0);
  uVar2 = heap.u32(0x0099a4ec);
  iVar4 = (uint) * (param_1 + 7) * 0x260;
  puVar3 = 0xffffffff;
  if ((heap.u32((__addr_DAT_00887422) + ((uint) * (param_1 + 7) * 0x130) * 4) & 1) != 0) {
    puVar3 = heap.u32((__addr_DAT_0088747e + iVar4));
    if (puVar3 != 0xffffffff) {
      puVar3 = __addr_DAT_00743b94 + (uint) * (__addr_DAT_0088747e + iVar4) * 0x100;
      heap.u8(0x991f78) = 2;
      heap.setU32(0x00991f80, (puVar3) >>> 0);
    }
  }
  heap.setU32(0x00651d24, (unaff_EDI * 0x58) >>> 0);
  if (0xd7 < heap.u32(0x00651d24)) {
    heap.setU32(0x00651d24, (heap.u32(0x00651d24) - 0xd8) >>> 0);
  }
  if (puVar3 != 0xffffffff) {
    for (heap.setU32(0x00651d24, (heap.u32(0x00651d24) + (uint)(heap.u32(puVar3 + (0x1e) * 4) >>> 3) * 0x10 + heap.u32(puVar3 + (0x1f) * 4)) >>> 0); 0xd7 < heap.u32(0x00651d24); heap.setU32(0x00651d24, (heap.u32(0x00651d24) - 0xd8) >>> 0)) {
    
    }
  }
  heap.setU32(0x0099a4e8, (in_EAX + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (in_ECX + 0x10) >>> 0);
  uVar6 = CONCAT22(heap, (heap.u32(0x00651d24) >>> 0x10), 0x18);
  uVar5 = 0x18;
  heap.setU32(0x00651d20, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(iVar4, 0x18, uVar6, uVar2);
  if (((heap.u32((heap.u32(0x00981ef8) + 0xe)) == 0) && ((heap.u32((__addr_DAT_00887422 + iVar4)) & 1) != 0)) && (heap.u32((__addr_DAT_0088747e + iVar4)) != 0xffff)) {
    puVar3 = __addr_DAT_00743b94 + (uint) * (__addr_DAT_0088747e + iVar4) * 0x100;
    for (iVar4 = 0; iVar4 < heap.u32(puVar3 + (0xb3) * 4); iVar4 = iVar4 + 2) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(puVar3, uVar5, uVar6, uVar2, in_ECX, iVar4, in_EAX);
    }
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  heap.u8(0x991f78) = 3;
  return;
} finally {
    heap.freeFrame(20);
  }
}
