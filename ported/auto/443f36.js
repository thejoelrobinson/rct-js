// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/443f36.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00443f36(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  iVar3 = 0x348;
  do {
    iVar2 = iVar3 + -4;
    LOCK(heap);
    uVar1 = heap.u32((0x0087c81c + iVar3));
    heap.u32((0x0087c81c + iVar3)) = 0;
    UNLOCK(heap);
    heap.u32((iVar3 + 0x87c854)) = uVar1;
    iVar3 = iVar2;
  } while (iVar2 != 0);
  FUN_005e5301(heap);
  return;
}
