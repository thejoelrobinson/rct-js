// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e7ef.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
export function FUN_0043e7ef(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00743b98 = __sp + 0;
  const __addr_DAT_00743bbf = __sp + 4;
  const __addr_DAT_00743bfc = __sp + 8;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  let uVar1 = 0;
  let iVar2 = 0;
  for (uVar1 = heap.u32(0x0087c398); uVar1 != 0xffff; uVar1 = heap.u32((__addr_DAT_00743b98) + (uVar1 * 0x80) * 4)) {
    iVar2 = uVar1 * 0x100;
    if ((heap.u32((__addr_DAT_00743bbf) + (iVar2) * 4) == '\x06') && (in_EDX == heap.u32((__addr_DAT_00743bfc) + (iVar2) * 4))) {
      FUN_0043e792(heap);
      FUN_0044142c(heap);
      heap.u32((__addr_DAT_00743bbf) + (iVar2) * 4) = 0;
      FUN_00441452(heap);
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(12);
  }
}
