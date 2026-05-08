// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/557966.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00557966(heap, param_1) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_PTR_LAB_00557a38 = __sp + 12;
  try {
  let in_AL = 0;
  let in_CL = 0;
  let in_DX = 0;
  let unaff_EDI = 0;
  puVar1 = heap.u32(0x00991f80);
  heap.setU32(0x0099a4ec, (in_DX + 2) >>> 0);
  puVar2 = 0xffffffff;
  if ((heap.u32((__addr_DAT_00887422) + ((uint) * (param_1 + 7) * 0x130) * 4) & 1) != 0) {
    puVar2 = heap.u32((__addr_DAT_0088747e + (uint) * (param_1 + 7) * 0x260));
    if (puVar2 != 0xffffffff) {
      puVar2 = __addr_DAT_00743b94 + (uint) * (__addr_DAT_0088747e + (uint) * (param_1 + 7) * 0x260) * 0x100;
      heap.u8(0x991f78) = 2;
      heap.setU32(0x00991f80, (puVar2) >>> 0);
    }
  }
  heap.setU32(0x00651c50, (unaff_EDI + -0x5fff7062) >>> 0);
  if (puVar2 != 0xffffffff) {
    if (heap.u32(puVar2 + (0xb5) * 4) < 0x40) {
      heap.setU32(0x00651c50, (heap.u32(0x00651c50) + heap.u32(puVar2 + (0x1f) * 4) * 4) >>> 0);
    } else {
      heap.setU32(0x00651c50, (heap.u32(0x00651c50) + (uint)(heap.u32(puVar2 + (0xb5) * 4) >>> 6) * 4) >>> 0);
    }
  }
  heap.setU32(0x0099a4e8, (in_AL) >>> 0);
  heap.setU32(0x0099a4ea, (in_CL) >>> 0);
  heap.setU32(0x00651c54, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00557a38) + (unaff_EDI) * 4)))(puVar1);
  return;
} finally {
    heap.freeFrame(16);
  }
}
