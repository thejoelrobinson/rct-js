// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45004a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
export function FUN_0045004a(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_005f5b78 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_0088744a = __sp + 8;
  const __addr_DAT_00887462 = __sp + 12;
  const __addr_DAT_0088746a = __sp + 16;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  let uVar1 = 0;
  let uVar2 = 0;
  uVar2 = in_EDX & 0xff;
  if ((heap.u32((__addr_DAT_005f5b78 + heap.u32((byte)(__addr_DAT_00887420) + (uVar2 * 0x260) * 4) * 8)) & 0x20000) == 0) {
    uVar1 = 0;
    do {
      if (heap.u32((__addr_DAT_0088744a) + (uVar2 * 0x130 + uVar1) * 4) != -1) {
        if (heap.u32((__addr_DAT_00887462) + (uVar2 * 0x130 + uVar1) * 4) == -1) {
          heap.setU32(0x00991efc, (0x4af) >>> 0);
          return CONCAT44(in_EDX, in_EAX);
        }
        if (heap.u32((__addr_DAT_0088746a) + (uVar2 * 0x130 + uVar1) * 4) == -1) {
          heap.setU32(0x00991efc, (0x4b0) >>> 0);
          return CONCAT44(in_EDX, in_EAX);
        }
      }
      uVar1 = uVar1 + 1;
    } while (uVar1 < 4);
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(20);
  }
}
