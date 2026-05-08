// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb6af.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00458230 } from "./458230.js";
import { FUN_005df472 } from "./5df472.js";
import { FUN_009b3000 } from "./9b3000.js";
import { FUN_009bb4b4 } from "./9bb4b4.js";
import { FUN_009bb52c } from "./9bb52c.js";
import { FUN_009bb717 } from "./9bb717.js";
import { FUN_009bb9f5 } from "./9bb9f5.js";
export function FUN_009bb6af(heap) {
  let cVar1 = 0;
  FUN_009b3000(heap);
  FUN_00458230(heap);
  FUN_009bb52c(heap);
  cVar1 = FUN_009bb4b4(heap);
  if (cVar1 == '\0') {
    FUN_005df472(heap);
    return;
  }
  heap.setU32(0x005e9184, (0) >>> 0);
  if ((heap.u32(0x005e9178) == 0) && (0x3f < heap.u32(0x005f15c4))) {
    FUN_009bb9f5(heap);
    FUN_009bb717(heap);
    return;
  }
  FUN_005df472(heap);
  return;
}
