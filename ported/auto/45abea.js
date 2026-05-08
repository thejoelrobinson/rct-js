// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45abea.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0045ac19 } from "./45ac19.js";
import { FUN_0045ac6f } from "./45ac6f.js";
export function FUN_0045abea(heap) {
  let in_AL = 0;
  let extraout_CL = 0;
  let extraout_CH = 0;
  let unaff_BL = 0;
  let unaff_BH = 0;
  heap.setU32(0x008d7eaa, (in_AL) >>> 0);
  heap.setU32(0x008d7eae, (FUN_0045ac6f(heap)) >>> 0);
  heap.setU32(0x008d7eb0, (unaff_BL) >>> 0);
  heap.setU32(0x008d7eb2, (unaff_BH) >>> 0);
  heap.setU32(0x008d7eb4, (extraout_CL) >>> 0);
  heap.setU32(0x008d7eb6, (extraout_CH) >>> 0);
  FUN_0045ac19(heap);
  return;
}
