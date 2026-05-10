// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d22f8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfc49 } from "./5cfc49.js";
export function FUN_005d22f8(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let iVar1 = 0;
  let bVar2 = 0;
  heap.setU32(0x00652260, (0x80000000) >>> 0);
  bVar2 = ((heap.u8(0x00652288) == 0) & 0xff);
  if (heap.u8(0x00652288) == 1) {
    heap.setU32(0x00652470, (heap.u8(0x00652289)) >>> 0);
    (regs.eax = FUN_005cfc49(heap));
    if ((bVar2) || ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (heap.u32(0x00652289) * 0x260) * 4) * 8)) & 0x8000) != 0)) {
      /* goto LAB_005d2424 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d22f8/LAB_005d2424"); return 0;
    }
    iVar1 = ((((heap.u8(unaff_ESI + (4))) >>> 0) * 8) >>> 0);
    heap.setU8(0x00652294, (heap.u32((0x006545b0) + (iVar1) * 4)) & 0xff);
    heap.setU8(0x00652299, (heap.u32((0x006545b4) + (iVar1) * 4)) & 0xff);
    heap.setU8(0x0065229a, (heap.u32((0x006545b2) + (iVar1) * 4)) & 0xff);
  } else {
    if (heap.u8(0x00652288) != 2) {
      return;
    }
    heap.setU32(0x00652470, (heap.u8(0x00652289)) >>> 0);
    bVar2 = ((false) & 0xff);
    (regs.eax = FUN_005cfac0(heap));
    if (bVar2) {
      LAB_005d2424: if (((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (heap.u32(0x00652289) * 0x260) * 4) * 8)) & 0x8000) != 0) && (heap.u32((0x00887497) + (heap.u32(0x00652289) * 0x260) * 4) != 0)) {
        heap.setU8(0x00652294, (0xff) & 0xff);
        heap.setU8(0x00652288, (0) & 0xff);
        return;
      }
      heap.setU8(0x00652294, (heap.u32((0x005f598e) + (heap.u32(((0x00887420) >>> 0) + (heap.u32(0x00652289) * 0x260) * 4) * 4) * 4) + 16) & 0xff);
      heap.setU8(0x00652295, (0) & 0xff);
      heap.setU8(0x00652296, (0) & 0xff);
      heap.setU8(0x00652297, (0) & 0xff);
      heap.setU8(0x00652298, (0) & 0xff);
      heap.setU8(0x0065229a, (0) & 0xff);
      heap.setU8(0x00652299, (0) & 0xff);
      return;
    }
    iVar1 = ((((heap.u8(unaff_ESI + (4))) >>> 0) * 8) >>> 0);
    heap.setU8(0x00652294, (heap.u32((0x006545b1) + (iVar1) * 4)) & 0xff);
    heap.setU8(0x00652299, (heap.u32((0x006545b5) + (iVar1) * 4)) & 0xff);
    heap.setU8(0x0065229a, (heap.u32((0x006545b3) + (iVar1) * 4)) & 0xff);
  }
  heap.setU8(0x00652297, (0) & 0xff);
  if (((heap.u8(unaff_ESI) & 0x80) != 0) && ((heap.u8(0x00652288) == 2 || ((heap.u8(0x0065229a) != 6 && (heap.u8(0x0065229a) != 8)))))) {
    heap.setU8(0x00652297, (1) & 0xff);
  }
  heap.setU8(0x00652295, (heap.u8(0x0065229a)) & 0xff);
  heap.setU8(0x00652296, (heap.u8(0x00652299)) & 0xff);
  return;
}
