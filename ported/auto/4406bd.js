// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4406bd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { FUN_00440659 } from "./440659.js";
export function FUN_004406bd(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_005f5b78 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_00887442 = __sp + 8;
  const __addr_DAT_00887444 = __sp + 12;
  try {
  let in_AL = 0;
  let uVar1 = 0;
  let unaff_EBX = 0;
  let uVar2 = 0;
  FUN_00440659(heap);
  if (in_AL == 0) {
    heap.setU32(0x0062d2fa, (0) >>> 0);
    uVar2 = unaff_EBX & 0xff;
    uVar1 = 0x5bf;
    if ((heap.u32((__addr_DAT_005f5b78 + heap.u32((byte)(__addr_DAT_00887420) + (uVar2 * 0x260) * 4) * 8)) & 0x400000) != 0) {
      uVar1 = 0x5c0;
    }
    heap.setU32(0x0062d2de, (CONCAT22(heap.u32((__addr_DAT_00887442) + (uVar2 * 0x130) * 4), uVar1)) >>> 0);
    heap.setU32(0x0062d2e2, (heap.u32((__addr_DAT_00887444) + (uVar2 * 0x98) * 4)) >>> 0);
    heap.setU32(0x0062d2fc, (0xffff) >>> 0);
    heap.setU32(0x0062d2fe, (0) >>> 0);
    heap.setU32(0x0062d2ff, (0) >>> 0);
    return;
  }
  if (in_AL != 1) {
    if (2 < in_AL) {
      heap.setU32(0x0062d2fa, (1) >>> 0);
      heap.setU32(0x0062d2de, (((unaff_EBX & 0xff) + 0x5eb)) >>> 0);
      heap.setU32(0x0062d2e2, (0) >>> 0);
      heap.setU32(0x0062d2fc, (0xffff) >>> 0);
      heap.setU32(0x0062d2fe, (0) >>> 0);
      heap.setU32(0x0062d2ff, (1) >>> 0);
      return;
    }
    heap.setU32(0x0062d2fa, (1) >>> 0);
    heap.setU32(0x0062d2de, (CONCAT22(heap.u32((__addr_DAT_00887442) + ((unaff_EBX & 0xff) * 0x130) * 4), 0xffff)) >>> 0);
    heap.setU32(0x0062d2e2, (heap.u32((__addr_DAT_00887444) + ((unaff_EBX & 0xff) * 0x98) * 4)) >>> 0);
    heap.setU32(0x0062d2fc, (0xffff) >>> 0);
    heap.setU32(0x0062d2fe, (0) >>> 0);
    heap.setU32(0x0062d2ff, (1) >>> 0);
    return;
  }
  heap.setU32(0x0062d2fa, (0) >>> 0);
  heap.setU32(0x0062d2de, (CONCAT22(heap.u32((__addr_DAT_00887442) + ((unaff_EBX & 0xff) * 0x130) * 4), 0x5be)) >>> 0);
  heap.setU32(0x0062d2e2, (heap.u32((__addr_DAT_00887444) + ((unaff_EBX & 0xff) * 0x98) * 4)) >>> 0);
  heap.setU32(0x0062d2fc, (0xffff) >>> 0);
  heap.setU32(0x0062d2fe, (0) >>> 0);
  heap.setU32(0x0062d2ff, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(16);
  }
}
