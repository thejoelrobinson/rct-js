// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44470e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0044470e(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  iVar1 = heap.u32(0x0087d304);
  LOCK(heap);
  heap.setU32(0x0087d304, (0) >>> 0);
  UNLOCK(heap);
  iVar2 = 0;
  for (uVar3 = heap.u32(0x0087c398); uVar3 != 0xffff; uVar3 = heap.u32((0x00743b98) + (uVar3 * 0x80) * 4)) {
    iVar4 = uVar3 * 0x100;
    if (heap.u32((0x00743bc2) + (iVar4) * 4) == '\x01') {
      iVar2 = iVar2 - (uint) * (0x00632f4c + heap.u32((uint)(byte)(0x00743bc3) + (iVar4) * 4) * 2);
    }
  }
  iVar2 = (iVar2 - heap.u32((0x005f96a4 + heap.u32(0x0087c3d7) * 4))) - heap.u32(0x0087c3b8) / 600;
  pcVar5 = 0x00887420;
  do {
    if (((heap.u32(pcVar5) != -1) && (heap.u32(pcVar5 + (0x21) * 4) != '\0')) && (heap.u32((pcVar5 + 0x132)) != 0xffff)) {
      iVar2 = iVar2 + (uint) * (pcVar5 + 0x132) * -2;
    }
    pcVar5 = pcVar5 + 0x260;
  } while (pcVar5 < 0x008ad1c0);
  heap.setU32(0x0087d308, (iVar1 * 7 + (iVar2 >>> 2)) >>> 0);
  heap.setU32(0x0087d30c, (heap.u32(0x0087d30c) + heap.u32(0x0087d308)) >>> 0);
  heap.setU32(0x0087d310, (heap.u32(0x0087d310) + 1) >>> 0);
  FUN_005e5301(heap);
  if ((ram0x005f8539 >>> 0x18 & 1) != 0) {
    FUN_00426f56(heap, pcVar5);
  }
  return;
}
