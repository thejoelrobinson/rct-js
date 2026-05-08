// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/579dec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
export function FUN_00579dec(heap, param_1) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  const __addr_DAT_00743b94 = __sp + 8;
  const __addr_DAT_00743bb3 = __sp + 12;
  const __addr_DAT_00743bb4 = __sp + 16;
  const __addr_PTR_LAB_00432204 = __sp + 20;
  const __addr_PTR_LAB_00432e90 = __sp + 24;
  const __addr_PTR_LAB_00579fd4 = __sp + 28;
  try {
  let in_AL = 0;
  let uVar1 = 0;
  let in_ECX = 0;
  let in_DX = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let unaff_EDI = 0;
  let uVar6 = 0;
  heap.setU32(0x0099a4ec, (in_DX + 3) >>> 0);
  uVar2 = heap.u32(0x0099a4ec);
  iVar4 = heap.u32((param_1 + 7)) * 0x260;
  heap.setU32(0x00651c60, (0xffffffff) >>> 0);
  heap.setU32(0x00651c68, (0) >>> 0);
  heap.setU32(0x00651c6c, (0) >>> 0);
  if ((heap.u32((__addr_DAT_00887422) + (heap.u32((param_1 + 7)) * 0x130) * 4) & 1) != 0) {
    heap.setU32(0x00651c60, (heap.u32((__addr_DAT_0088747e + iVar4))) >>> 0);
    if (heap.u32(0x00651c60) != 0xffffffff) {
      iVar3 = heap.u32((__addr_DAT_0088747e + iVar4)) * 0x100;
      heap.setU32(0x00651c60, (__addr_DAT_00743b94 + iVar3) >>> 0);
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00579dec"); })();
      heap.setU32(0x00651c68, (heap.u32((__addr_DAT_00743bb3) + (iVar3) * 4)) >>> 0);
      heap.setU32(0x00651c6c, (heap.u32((__addr_DAT_00743bb4) + (iVar3) * 4)) >>> 0);
      heap.setU32(0x00991f80, (heap.u32(0x00651c60)) >>> 0);
    }
  }
  heap.setU32(0x0099a4e8, (in_AL + 0x10) >>> 0);
  heap.setU32(0x0099a4ea, (in_ECX + 0x10) >>> 0);
  uVar6 = 0x18;
  uVar5 = 0x18;
  uVar1 = CONCAT11(0x5a, in_AL);
  heap.setU32(0x00651c64, (unaff_EDI) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))(iVar4, 0x18, 0x18, uVar2);
  (heap.u32(heap.u32((__addr_PTR_LAB_00432e90) + (heap.u32(0x00991f88)) * 4)))(iVar4, uVar5, uVar6, uVar2, in_ECX, uVar1);
  heap.setU32(0x00651c70, (heap.u32(0x00651c64) * 0x10 + heap.u32(0x00651c6c) + -0x5fffb8f0) >>> 0);
  if ((heap.u32(0x00651c60) != 0xffffffff) && (0x3f < heap.u32(heap.u32(0x00651c60) + (0xb5) * 4))) {
    heap.setU32(0x00651c70, ((heap.u32(heap.u32(0x00651c60) + (0xb5) * 4) - 0x40 >>> 6) + heap.u32(0x00651c64) * 3 + -0x5fffb8b0) >>> 0);
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_00579fd4) + (heap.u32(0x00651c64)) * 4)))(uVar5, uVar6, uVar2, in_ECX, uVar1);
  return;
} finally {
    heap.freeFrame(32);
  }
}
