// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406b44.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0041102c } from "./41102c.js";
import { FUN_00411041 } from "./411041.js";
export function FUN_00406b44(heap) {
  let uVar1 = 0;
  if (heap.u32(0x005ebedc) == 0) {
    if ((heap.u32(0x005ec1c0) == 0) || (heap.setU32(0x005ec1c0, (0) >>> 0), heap.u32(0x005ec148) < 1)) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005ebedc, (1) >>> 0);
      FUN_0041102c(heap);
      heap.setU32(0x005ebee0, (FUN_00411041(heap)) >>> 0);
      uVar1 = 1;
    }
  } else {
    if ((heap.u32(0x005ec148) == 0) || (heap.u32(0x005ec1c4) != 0)) {
    uVar1 = 0;
  } else {
    uVar1 = 1;
  }
  }
  return uVar1;
}
