// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43725f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_0043725f(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_006e1ecc = __sp + 4;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  bVar1 = heap.u32(unaff_ESI) & 0x3c;
  if (bVar1 == 0) {
    heap.setU32(0x00991efc, (0x3b7) >>> 0);
  } else {
    if (bVar1 == 8) {
    heap.u16(0x971e86) = heap.u32((byte)(__addr_DAT_00887420) + (heap.u32(unaff_ESI + (7) * 4) * 0x260) * 4) + 0x101;
    heap.setU32(0x00991efc, (0x5a4) >>> 0);
  } else {
    if (bVar1 == 0xc) {
    heap.u16(0x971e86) = heap.u32((__addr_DAT_006e1ecc + heap.u32(unaff_ESI + (4) * 4) * 8));
    heap.setU32(0x00991efc, (0x5a4) >>> 0);
  } else {
    if (bVar1 == 4) {
    heap.setU32(0x00991efc, (0x4db) >>> 0);
  } else {
    if (bVar1 == 0x10) {
    bVar1 = heap.u32(unaff_ESI + (4) * 4);
    if (bVar1 == 0) {
      heap.setU32(0x00991efc, (0x3b8) >>> 0);
    } else {
      if (bVar1 == 1) {
      heap.setU32(0x00991efc, (0x3b9) >>> 0);
    } else {
      if (bVar1 == 2) {
      heap.setU32(0x00991efc, (0x3ba) >>> 0);
    } else {
      heap.setU32(0x00991efc, (0x38a) >>> 0);
    }
    }
    }
  } else {
    if (bVar1 == 0x18) {
    heap.u16(0x971e86) = (heap.u32((unaff_ESI + 4)) & 0x3ff) + 0x7de;
    heap.setU32(0x00991efc, (0x5a4) >>> 0);
  } else {
    heap.setU32(0x00991efc, (0x38a) >>> 0);
  }
  }
  }
  }
  }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
