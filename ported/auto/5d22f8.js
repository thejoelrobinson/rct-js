// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d22f8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfc49 } from "./5cfc49.js";
export function FUN_005d22f8(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  heap.setU32(0x00652260, (0x80000000) >>> 0);
  bVar2 = heap.u32(0x00652288) == '\0';
  if (heap.u32(0x00652288) == '\x01') {
    heap.setU32(0x00652470, (heap.u32(0x00652289)) >>> 0);
    FUN_005cfc49(heap);
    if ((bVar2) || ((heap.u32((0x005f5b78 + heap.u32((uint)(byte)(0x00887420) + (heap.u32(0x00652289) * 0x260) * 4) * 8)) & 0x8000) != 0)) {
      /* goto LAB_005d2424 */ throw new Error("goto LAB_005d2424 not supported");
    }
    iVar1 = heap.u32(unaff_ESI + (4) * 4) * 8;
    heap.setU32(0x00652294, (heap.u32((0x006545b0) + (iVar1) * 4)) >>> 0);
    heap.setU32(0x00652299, (heap.u32((0x006545b4) + (iVar1) * 4)) >>> 0);
    heap.setU32(0x0065229a, (heap.u32((0x006545b2) + (iVar1) * 4)) >>> 0);
  } else {
    if (heap.u32(0x00652288) != '\x02') {
      return;
    }
    heap.setU32(0x00652470, (heap.u32(0x00652289)) >>> 0);
    bVar2 = false;
    FUN_005cfac0(heap);
    if (bVar2) {
      LAB_005d2424: if (((heap.u32((0x005f5b78 + heap.u32((uint)(byte)(0x00887420) + (heap.u32(0x00652289) * 0x260) * 4) * 8)) & 0x8000) != 0) && (heap.u32((0x00887497) + (heap.u32(0x00652289) * 0x260) * 4) != '\0')) {
        heap.setU32(0x00652294, (0xff) >>> 0);
        heap.setU32(0x00652288, (0) >>> 0);
        return;
      }
      heap.setU32(0x00652294, (heap.u32((0x005f598e) + (heap.u32((uint)(byte)(0x00887420) + (heap.u32(0x00652289) * 0x260) * 4) * 4) * 4) + '\x10') >>> 0);
      heap.setU32(0x00652295, (0) >>> 0);
      heap.setU32(0x00652296, (0) >>> 0);
      heap.setU32(0x00652297, (0) >>> 0);
      heap.setU32(0x00652298, (0) >>> 0);
      heap.setU32(0x0065229a, (0) >>> 0);
      heap.setU32(0x00652299, (0) >>> 0);
      return;
    }
    iVar1 = heap.u32(unaff_ESI + (4) * 4) * 8;
    heap.setU32(0x00652294, (heap.u32((0x006545b1) + (iVar1) * 4)) >>> 0);
    heap.setU32(0x00652299, (heap.u32((0x006545b5) + (iVar1) * 4)) >>> 0);
    heap.setU32(0x0065229a, (heap.u32((0x006545b3) + (iVar1) * 4)) >>> 0);
  }
  heap.setU32(0x00652297, (0) >>> 0);
  if (((heap.u32(unaff_ESI) & 0x80) != 0) && ((heap.u32(0x00652288) == '\x02' || ((heap.u32(0x0065229a) != '\x06' && (heap.u32(0x0065229a) != '\b')))))) {
    heap.setU32(0x00652297, (1) >>> 0);
  }
  heap.setU32(0x00652295, (heap.u32(0x0065229a)) >>> 0);
  heap.setU32(0x00652296, (heap.u32(0x00652299)) >>> 0);
  return;
}
