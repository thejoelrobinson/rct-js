// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44470e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ram0x005f8539 } from "../../runtime/win32.js";
import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0044470e(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let pcVar5 = 0;
  iVar1 = ((heap.u32(0x0087d304)) >>> 0);
  LOCK();
  heap.setU32(0x0087d304, (0) >>> 0);
  UNLOCK();
  iVar2 = ((0) >>> 0);
  for (uVar3 = ((heap.u32(0x0087c398)) & 0xffff); uVar3 != 0xffff; uVar3 = (((heap.u32((0x00743b98) + (((uVar3) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
    iVar4 = ((((uVar3) >>> 0) * 0x100) >>> 0);
    if (heap.u32((0x00743bc2) + (iVar4) * 4) == 1) {
      iVar2 = ((iVar2 - heap.u32((0x00632f4c + heap.u32(((0x00743bc3) >>> 0) + (iVar4) * 4) * 2))) >>> 0);
    }
  }
  iVar2 = (((iVar2 - heap.i32((0x005f96a4 + ((heap.u32(0x0087c3d7)) >>> 0) * 4))) - heap.u32(0x0087c3b8) / 600) >>> 0);
  pcVar5 = ((0x00887420) >>> 0);
  do {
    if ((((heap.i8(pcVar5) | 0) != -1) && (heap.i8(pcVar5 + (0x21)) != 0)) && (heap.u16((pcVar5 + 0x132)) != 0xffff)) {
      iVar2 = ((iVar2 + heap.u32((pcVar5 + 0x132)) * -2) >>> 0);
    }
    pcVar5 = ((pcVar5 + 0x260) >>> 0);
  } while (pcVar5 < 0x008ad1c0);
  heap.setU32(0x0087d308, (iVar1 * 7 + (iVar2 >>> 2)) >>> 0);
  heap.setU32(0x0087d30c, (heap.u32(0x0087d30c) + heap.u32(0x0087d308)) >>> 0);
  heap.setU32(0x0087d310, (heap.u32(0x0087d310) + 1) >>> 0);
  (regs.eax = FUN_005e5301(heap));
  if ((ram0x005f8539 >>> 0x18 & 1) != 0) {
    (regs.eax = FUN_00426f56(heap, pcVar5));
  }
  return;
}
