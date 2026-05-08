// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d1ef6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005cfc49 } from "./5cfc49.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d22f8 } from "./5d22f8.js";
export function FUN_005d1ef6(heap) {
  let uVar1 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let uVar2 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  if (heap.u32(0x00652288) == '\x03') {
    FUN_005d21fa(heap);
    uVar1 = heap.u32(0x00652291);
    uVar3 = heap.u32(0x00652290);
    bVar4 = false;
    FUN_005cfe66(heap);
    if (bVar4) {
      heap.setU32(0x00652288, (0) >>> 0);
      FUN_005d13e2(heap);
      return;
    }
    uVar5 = FUN_005cfc50(heap);
    heap.setU32(0x0065228e, ((undefined2)(uVar5 >>> 0x20)) >>> 0);
    uVar2 = extraout_ECX_00;
    heap.setU32(0x00652290, (uVar3) >>> 0);
    if (bVar4) {
      heap.setU32(0x00652288, (2) >>> 0);
      heap.setU32(0x0065228a, (uVar5) >>> 0);
      heap.setU32(0x0065228c, (extraout_ECX_00) >>> 0);
      heap.setU32(0x00652290, (uVar1) >>> 0);
      heap.setU32(0x00652291, (heap.u32((unaff_EDI + 4))) >>> 0);
      heap.setU32(0x00652292, (0) >>> 0);
      heap.setU32(0x00652293, (0) >>> 0);
      FUN_005d22f8(heap);
      FUN_005d13e2(heap);
      return;
    }
    LAB_005d1f86: heap.setU32(0x0065228e, ((undefined2)(uVar5 >>> 0x20)) >>> 0);
    heap.setU32(0x0065228a, ((undefined2)(uVar5 >>> 0x10)) >>> 0);
    heap.setU32(0x0065228c, ((undefined2)(uVar2 >>> 0x10)) >>> 0);
    heap.setU32(0x00652291, (heap.u32((unaff_EDI + 4))) >>> 0);
    heap.setU32(0x00652292, (0) >>> 0);
    heap.setU32(0x00652293, (0) >>> 0);
    FUN_005d13e2(heap);
    return;
  }
  uVar3 = heap.u32(0x00652288) == '\0';
  if (heap.u32(0x00652288) == '\x01') {
    FUN_005d21fa(heap);
    heap.setU32(0x00652470, (heap.u32(0x00652289)) >>> 0);
    uVar5 = FUN_005cfc49(heap);
    if (!uVar3) {
      heap.setU32(0x00652288, ('\x03') >>> 0);
      uVar2 = extraout_ECX;
      unaff_EDI = unaff_ESI;
      heap.setU32(0x00652290, (0) >>> 0);
      /* goto LAB_005d1f86 */ throw new Error("goto LAB_005d1f86 not supported");
    }
  }
  return;
}
