// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4130c2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ExceptionList } from "../../runtime/ghidra-builtins.js";
import { FUN_00413156 } from "./413156.js";
export function FUN_004130c2(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_LAB_004130a0 = __sp + 0;
  const __addr_pvStack_1c = __sp + 4;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let puStack_18 = 0;
  let local_14 = 0;
  let iStack_10 = 0;
  iStack_10 = param_1;
  puStack_18 = __addr_LAB_004130a0;
  heap.setU32(__addr_pvStack_1c, (ExceptionList) >>> 0);
  ExceptionList = __addr_pvStack_1c;
  while (true) {
    iVar1 = heap.u32((param_1 + 8));
    iVar2 = heap.u32((param_1 + 0xc));
    if ((iVar2 == -1) || (iVar2 == param_2)) {
      break;
    }
    local_14 = heap.u32((iVar1 + iVar2 * 0xc));
    heap.setU32((param_1 + 0xc), (local_14) >>> 0);
    if (heap.u32((iVar1 + 4 + iVar2 * 0xc)) == 0) {
      FUN_00413156(heap, 0x101);
      (heap.u32(heap.u32((iVar1 + 8 + iVar2 * 0xc))))();
    }
  }
  ExceptionList = heap.u32(__addr_pvStack_1c);
  return;
} finally {
    heap.freeFrame(8);
  }
}
