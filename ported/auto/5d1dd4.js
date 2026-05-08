// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d1dd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d22f8 } from "./5d22f8.js";
export function FUN_005d1dd4(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_DX = 0;
  let extraout_DX_00 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let bVar3 = 0;
  if (heap.u32(0x00652288) == '\x03') {
    FUN_005d21fa(heap);
    uVar1 = heap.u32(0x00652291);
    bVar3 = false;
    FUN_005cfe66(heap);
    if (bVar3) {
      heap.setU32(0x00652288, (0) >>> 0);
      FUN_005d13e2(heap);
      return;
    }
    uVar2 = FUN_005cfac7(heap);
    heap.setU32(0x0065228c, (extraout_CX_00) >>> 0);
    heap.setU32(0x0065228e, (extraout_DX_00) >>> 0);
    if (bVar3) {
      heap.setU32(0x00652288, (1) >>> 0);
      heap.setU32(0x00652290, (uVar1) >>> 0);
      heap.setU32(0x00652291, (heap.u32(unaff_EDI + (4) * 4)) >>> 0);
      heap.setU32(0x00652292, (0) >>> 0);
      heap.setU32(0x00652293, (0) >>> 0);
      heap.setU32(0x0065228a, (uVar2) >>> 0);
      FUN_005d22f8(heap);
      FUN_005d13e2(heap);
      return;
    }
    LAB_005d1e67: heap.setU32(0x00652290, (heap.u32(unaff_EDI) & 3) >>> 0);
    heap.setU32(0x00652291, (heap.u32(unaff_EDI + (4) * 4)) >>> 0);
    heap.setU32(0x00652292, (0) >>> 0);
    heap.setU32(0x00652293, (0) >>> 0);
    heap.setU32(0x0065228a, (uVar2) >>> 0);
    FUN_005d13e2(heap);
    return;
  }
  if (heap.u32(0x00652288) == '\x02') {
    FUN_005d21fa(heap);
    heap.setU32(0x00652470, (heap.u32(0x00652289)) >>> 0);
    bVar3 = false;
    uVar2 = FUN_005cfac0(heap);
    if (!bVar3) {
      heap.setU32(0x00652288, ('\x03') >>> 0);
      heap.setU32(0x0065228c, (extraout_CX) >>> 0);
      heap.setU32(0x0065228e, (extraout_DX) >>> 0);
      unaff_EDI = unaff_ESI;
      /* goto LAB_005d1e67 */ throw new Error("goto LAB_005d1e67 not supported");
    }
  }
  return;
}
