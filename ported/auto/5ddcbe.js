// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddcbe.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
export function FUN_005ddcbe(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = ((heap.u32((unaff_ESI + 0x30))) >>> 0);
  iVar4 = ((uVar3 * 0x260) >>> 0);
  if ((((heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 0x480) == 0) && ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (iVar4) * 4) * 8)) & 0x8000000) != 0)) && (heap.setI16((unaff_ESI + 0xd0), (heap.i16((unaff_ESI + 0xd0)) + 1) & 0xffff), (heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 0x800) == 0)) {
    uVar1 = ((0x2580) & 0xffff);
    if (heap.u32((0x00887420) + (iVar4) * 4) == 8) {
      uVar1 = ((0x3c00) & 0xffff);
    }
    if (uVar1 < heap.u16((unaff_ESI + 0xd0))) {
      heap.setU32(((0x00887422) + (uVar3 * 0x130) * 4), (heap.u32((0x00887422) + (uVar3 * 0x130) * 4) | 0x800) & 0xffffffff);
      heap.setU16((0x00971e86 + 0), (heap.i16((0x005f5802 + heap.u32(((0x00887420) >>> 0) + (iVar4) * 4) * 8)) + 6) & 0xffff);
      iVar2 = ((0) >>> 0);
      while (heap.i16((unaff_ESI + 10)) != heap.i16((0x0088747e + iVar2 * 2 + iVar4))) {
        iVar2 = ((iVar2 + 1) >>> 0);
      }
      heap.setU16((0x00971e86 + 2), (((iVar2) << 16 >> 16) + 1) & 0xffff);
      heap.setU16((0x00971e8a + 0), (heap.u32((0x00887442) + (uVar3 * 0x130) * 4)) & 0xffff);
      unique0x00017200 = ((heap.u32((0x00887444) + (uVar3 * 0x98) * 4)) >>> 0);
      heap.setU32(0x00971e90, (heap.u16((0x005f5806 + heap.u32(((0x00887420) >>> 0) + (iVar4) * 4) * 8))) >>> 0);
      (regs.eax = FUN_0042c711(heap, iVar4));
    }
  }
  return;
}
