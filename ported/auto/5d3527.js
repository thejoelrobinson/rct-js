// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3527.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00424db7 } from "./424db7.js";
import { FUN_0044e607 } from "./44e607.js";
import { FUN_005e0c2f } from "./5e0c2f.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e6bcd } from "./5e6bcd.js";
export function FUN_005d3527(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_00651d90 = __sp + 4;
  const __addr_DAT_00651fa4 = __sp + 8;
  try {
  let iVar1 = 0;
  FUN_0044e607(heap);
  iVar1 = heap.u32(0x00652289) * 0x260;
  if (heap.u32((__addr_DAT_00887420) + (iVar1) * 4) != '\x14') {
    FUN_005e3f31(heap);
    heap.u32((iVar1 + 0x1c)) = __addr_DAT_00651d90;
    heap.u32((iVar1 + 0xc)) = heap.u32((iVar1 + 0xc)) | 0xdffef84;
    heap.u32((iVar1 + 0xc)) = heap.u32((iVar1 + 0xc)) | 0x60001041;
    heap.u32((iVar1 + 0xc)) = heap.u32((iVar1 + 0xc)) | 0x82000000;
    FUN_005e412c(heap);
    heap.u32((iVar1 + 0x30)) = heap.u32(0x00652289);
    FUN_005e6bcd(heap);
    FUN_005e0c2f(heap);
    FUN_00424db7(heap);
    heap.setU32(0x006522a4, (8) >>> 0);
    heap.setU32(0x006522a5, (0x12) >>> 0);
    if (heap.u32((__addr_DAT_00887420) + (heap.u32(0x00652289) * 0x260) * 4) == '*') {
      heap.setU32(0x006522a5, (0x1e) >>> 0);
    }
    return;
  }
  FUN_005e3f31(heap);
  heap.u32((iVar1 + 0x1c)) = __addr_DAT_00651fa4;
  heap.u32((iVar1 + 0xc)) = heap.u32((iVar1 + 0xc)) | 0xf000004;
  heap.u32((iVar1 + 0xc)) = heap.u32((iVar1 + 0xc)) | 0x600001c0;
  FUN_005e412c(heap);
  heap.u32((iVar1 + 0x30)) = heap.u32(0x00652289);
  FUN_005e6bcd(heap);
  FUN_005e0c2f(heap);
  FUN_00424db7(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
