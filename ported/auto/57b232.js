// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/57b232.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0057b232(heap, param_1) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00887497 = __sp + 0;
  const __addr_DAT_00887498 = __sp + 4;
  const __addr_DAT_00887422 = __sp + 8;
  const __addr_DAT_0088747e = __sp + 12;
  const __addr_DAT_00743b94 = __sp + 16;
  const __addr_PTR_LAB_00432204 = __sp + 20;
  const __addr_PTR_LAB_00432e90 = __sp + 24;
  try {
  let puVar1 = 0;
  let in_AL = 0;
  let in_CL = 0;
  let in_DX = 0;
  let iVar2 = 0;
  let unaff_ESI = 0;
  puVar1 = heap.u32(0x00991f80);
  iVar2 = heap.u32((param_1 + 7)) * 0x260;
  if ((heap.u32((__addr_DAT_00887497) + (iVar2) * 4) == '\0') || (unaff_ESI < heap.u32((__addr_DAT_00887498) + (iVar2) * 4))) {
    heap.setU32(0x00651d10, (0xffffffff) >>> 0);
    if ((heap.u32((__addr_DAT_00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) {
      heap.setU32(0x00651d10, (heap.u32((__addr_DAT_0088747e + unaff_ESI * 2 + iVar2))) >>> 0);
      if (heap.u32(0x00651d10) != 0xffffffff) {
        heap.setU32(0x00651d10, (__addr_DAT_00743b94 + heap.u32((__addr_DAT_0088747e + unaff_ESI * 2 + iVar2)) * 0x100) >>> 0);
        (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0057b232"); })();
        heap.setU32(0x00991f80, (heap.u32(0x00651d10)) >>> 0);
      }
    }
    heap.setU32(0x0099a4e8, (in_AL + -10) >>> 0);
    heap.setU32(0x0099a4ea, (in_CL + -10) >>> 0);
    heap.setU32(0x0099a4ec, (in_DX + 3) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(0x14, 0x14, in_DX + 3);
    if ((heap.u32(0x00651d10) != 0xffffffff) && (heap.u32(heap.u32(0x00651d10) + (0xb3) * 4) != '\0')) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))();
    }
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0057b232"); })();
  return;
} finally {
    heap.freeFrame(28);
  }
}
