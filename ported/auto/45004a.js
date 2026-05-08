// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45004a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_0045004a(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let uVar1 = 0;
  let uVar2 = 0;
  uVar2 = in_EDX & 0xff;
  if ((heap.u32((0x005f5b78 + heap.u32((uint)(byte)(0x00887420) + (uVar2 * 0x260) * 4) * 8)) & 0x20000) == 0) {
    uVar1 = 0;
    do {
      if (heap.u32((0x0088744a) + (uVar2 * 0x130 + uVar1) * 4) != -1) {
        if (heap.u32((0x00887462) + (uVar2 * 0x130 + uVar1) * 4) == -1) {
          heap.setU32(0x00991efc, (0x4af) >>> 0);
          return CONCAT44(heap, in_EDX, in_EAX);
        }
        if (heap.u32((0x0088746a) + (uVar2 * 0x130 + uVar1) * 4) == -1) {
          heap.setU32(0x00991efc, (0x4b0) >>> 0);
          return CONCAT44(heap, in_EDX, in_EAX);
        }
      }
      uVar1 = uVar1 + 1;
    } while (uVar1 < 4);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}
