// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/443f36.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00443f36(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0087c81c = __sp + 0;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  iVar3 = 0x348;
  do {
    iVar2 = iVar3 + -4;
    LOCK();
    uVar1 = heap.u32((__addr_DAT_0087c81c + iVar3));
    heap.setU32((__addr_DAT_0087c81c + iVar3), (0) >>> 0);
    UNLOCK();
    heap.setU32((iVar3 + 0x87c854), (uVar1) >>> 0);
    iVar3 = iVar2;
  } while (iVar2 != 0);
  FUN_005e5301(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
