// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/435a29.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00423677 } from "./423677.js";
import { FUN_00431510 } from "./431510.js";
export function FUN_00435a29(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let extraout_EDX = 0;
  let cVar3 = 0;
  let unaff_BX = 0;
  sVar1 = FUN_00431510(heap);
  cVar3 = unaff_BX;
  if (cVar3 != '\0') {
    heap.setU32(0x00628a36, (extraout_CX + 0x1f) >>> 0);
    heap.setU32(0x00628a34, (sVar1 + 0x1f) >>> 0);
    heap.setU32(0x00628a2c, (extraout_EDX) >>> 0);
    heap.setU32(0x00628a30, (sVar1) >>> 0);
    heap.setU32(0x00628a32, (extraout_CX) >>> 0);
    heap.setU32(0x00628a3a, (cVar3) >>> 0);
    if (cVar3 == '\x04') {
      heap.setU32(0x00628a38, ((heap.u32((extraout_EDX + 5)) & 0x1f) << 4) >>> 0);
      heap.setU32(0x00628a34, (sVar1 + 0x1f) >>> 0);
      heap.setU32(0x00628a36, (extraout_CX + 0x1f) >>> 0);
    } else {
      heap.setU32(0x00628a38, (unaff_BX) >>> 0);
      FUN_00423677(heap);
    }
    uVar2 = (heap.u32(heap.u32((0x00435ad8) + (heap.u32(0x00991f88)) * 4)))();
    return uVar2;
  }
  return 0x8000;
}
