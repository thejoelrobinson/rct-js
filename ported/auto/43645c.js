// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43645c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00436558 } from "./436558.js";
import { FUN_00436d2d } from "./436d2d.js";
import { FUN_0045aaf8 } from "./45aaf8.js";
import { FUN_0045abea } from "./45abea.js";
import { FUN_005e06cc } from "./5e06cc.js";
export function FUN_0043645c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_006e3b90 = __sp + 0;
  try {
  let iVar1 = 0;
  FUN_0045aaf8(heap);
  heap.setU32(0x008ae938, (0) >>> 0);
  heap.setU32(0x00743b90, (0) >>> 0);
  puVar2 = __addr_DAT_006e3b90;
  iVar1 = 0x4000;
  do {
    heap.u32(puVar2) = 0;
    heap.u32((puVar2 + 1)) = 0x80;
    heap.u32((puVar2 + 2)) = 4;
    heap.u32((puVar2 + 3)) = 0;
    heap.u32((puVar2 + 1)) = 0;
    heap.u32((puVar2 + 5)) = 0;
    heap.u32((puVar2 + 6)) = 1;
    heap.u32((puVar2 + 7)) = 0;
    puVar2 = puVar2 + 2;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  heap.setU32(0x008d4228, (0) >>> 0);
  FUN_00436558(heap);
  FUN_00436d2d(heap);
  FUN_005e06cc(heap);
  FUN_0045abea(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
