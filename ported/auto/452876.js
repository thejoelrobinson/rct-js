// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/452876.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004528d6 } from "./4528d6.js";
import { FUN_00453ed8 } from "./453ed8.js";
import { FUN_00453f0a } from "./453f0a.js";
import { FUN_00454300 } from "./454300.js";
import { FUN_0045432a } from "./45432a.js";
export function FUN_00452876(heap) {
  heap.setU32(0x006326bd, (heap.u32(0x006326bd) ^ 1) >>> 0);
  if ((heap.u32(0x006326bd) & 1) == 0) {
    FUN_00453f0a(heap);
    FUN_004528d6(heap);
    FUN_00453ed8(heap);
    FUN_00454300(heap);
    FUN_0045432a(heap);
  }
  return;
}
