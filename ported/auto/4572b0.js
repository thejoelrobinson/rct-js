// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4572b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00457259 } from "./457259.js";
export function FUN_004572b0(heap) {
  let in_AX = 0;
  let uVar1 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let bVar2 = 0;
  heap.setU32(0x00632f08, (0) >>> 0);
  bVar2 = in_AX < 0x20;
  FUN_00457259(heap);
  if (!bVar2) {
    heap.setU32(0x00632f08, (heap.u32(0x00632f08) | 1) >>> 0);
  }
  bVar2 = 0xffdf < extraout_CX;
  uVar1 = FUN_00457259(heap);
  if (!bVar2) {
    heap.setU32(0x00632f08, (heap.u32(0x00632f08) | 2) >>> 0);
  }
  bVar2 = 0xffdf < uVar1;
  FUN_00457259(heap);
  if (!bVar2) {
    heap.setU32(0x00632f08, (heap.u32(0x00632f08) | 4) >>> 0);
  }
  bVar2 = extraout_CX_00 < 0x20;
  FUN_00457259(heap);
  if (!bVar2) {
    heap.setU32(0x00632f08, (heap.u32(0x00632f08) | 8) >>> 0);
  }
  if (heap.u32(0x00632f08) == 0) {
    heap.setU32(0x00632f08, (0xf) >>> 0);
  }
  return;
}
