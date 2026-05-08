// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/439135.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00439288 } from "./439288.js";
import { FUN_00439822 } from "./439822.js";
export function FUN_00439135(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00743b98 = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = 0;
  uVar2 = heap.u32(0x0087c398);
  while (uVar2 != 0xffff) {
    uVar2 = heap.u32((__addr_DAT_00743b98) + (uVar2 * 0x80) * 4);
    if ((uVar1 & 0x7f) == (heap.u32(0x0088741c) & 0x7f)) {
      FUN_00439288(heap);
    }
    FUN_00439822(heap);
    uVar1 = uVar1 + 1;
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
