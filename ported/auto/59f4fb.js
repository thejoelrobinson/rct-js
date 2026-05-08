// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/59f4fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_0059f4fb(heap, param_1) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00743bb3 = __sp + 12;
  const __addr_DAT_00651d5c = __sp + 16;
  const __addr_DAT_00651d5e = __sp + 20;
  const __addr_PTR_LAB_00432204 = __sp + 24;
  const __addr_DAT_00651d62 = __sp + 28;
  const __addr_DAT_00651d60 = __sp + 32;
  const __addr_PTR_LAB_00432e90 = __sp + 36;
  try {
  let puVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let unaff_EBX = 0;
  let iVar3 = 0;
  let unaff_EDI = 0;
  puVar1 = heap.u32(0x00991f80);
  heap.setU32(0x00651d54, (0) >>> 0);
  heap.setU32(0x0099a4ec, (in_EDX + 3) >>> 0);
  if (((heap.u32((__addr_DAT_00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) && (heap.u32((__addr_DAT_0088747e + heap.u32((param_1 + 7)) * 0x260)) != 0xffff)) {
    iVar3 = heap.u32((__addr_DAT_0088747e + heap.u32((param_1 + 7)) * 0x260)) * 0x100;
    heap.setU32(0x00991f80, (__addr_DAT_00743b94 + iVar3) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0059f4fb"); })();
    heap.setU32(0x00651d54, (heap.u32((__addr_DAT_00743bb3) + (iVar3) * 4)) >>> 0);
  }
  heap.setU32(0x0099a4e8, (heap.u32((__addr_DAT_00651d5c + unaff_EBX * 8))) >>> 0);
  heap.setU32(0x0099a4ea, (heap.u32((__addr_DAT_00651d5e + unaff_EBX * 8))) >>> 0);
  uVar2 = CONCAT22((in_EAX >>> 0x10), CONCAT11(0x7f, in_EAX));
  heap.setU32(0x00651d50, (unaff_EBX) >>> 0);
  heap.setU32(0x00651d58, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(heap.u32((__addr_DAT_00651d62 + unaff_EBX * 8)), heap.u32((__addr_DAT_00651d60 + unaff_EBX * 8)), heap.u32(0x0099a4ec));
  if ((heap.u32(0x00651d58) == 0) && (-1 < (heap.u32(0x00651d54) - 1))) {
    uVar2 = (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))();
  }
  if ((heap.u32(0x00651d58) == 1) && (-1 < (heap.u32(0x00651d54) - 1))) {
    uVar2 = (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))();
  }
  if ((heap.u32(0x00651d58) == 2) && (-1 < (heap.u32(0x00651d54) - 1))) {
    uVar2 = (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))();
  }
  if ((heap.u32(0x00651d58) == 3) && (-1 < (heap.u32(0x00651d54) - 1))) {
    uVar2 = (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))();
  }
  heap.setU32(0x00991f80, (puVar1) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0059f4fb"); })();
  return CONCAT44(in_EDX, uVar2);
} finally {
    heap.freeFrame(40);
  }
}
