// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433bae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00433bae(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_006284ec = __sp + 0;
  const __addr_DAT_0062892c = __sp + 4;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  let iVar11 = 0;
  let uVar12 = 0;
  iVar9 = heap.u32(0x005f96e8);
  heap.setU32(0x005f96e8, (heap.u32(0x005f96e8) + 0x30) >>> 0);
  heap.setU32(0x005f96e4, (iVar9) >>> 0);
  heap.setU32((iVar9 + 0x20), (0) >>> 0);
  uVar12 = heap.u32(0x006288ec);
  if (heap.u32(0x006288ec) != 0xffffffff) {
    do {
      iVar10 = heap.u32((__addr_DAT_006284ec) + (uVar12) * 4);
      if (iVar10 != 0) {
        heap.setU32((iVar9 + 0x20), (iVar10) >>> 0);
        do {
          iVar9 = iVar10;
          iVar10 = heap.u32((iVar9 + 0x20));
        } while (heap.u32((iVar9 + 0x20)) != 0);
      }
      uVar12 = uVar12 + 1;
      iVar10 = heap.u32(0x005f96e4);
    } while (uVar12 <= heap.u32(0x006288f0));
    do {
      iVar9 = iVar10;
      iVar10 = heap.u32((iVar9 + 0x20));
      uVar12 = heap.u32(0x006288ec);
      if (iVar10 == 0) {
        /* goto LAB_00433d04 */ throw new Error("goto LAB_00433d04 not supported");
      }
      uVar8 = heap.u32(0x006288ec);
    } while (heap.u32((iVar10 + 0x14)) < uVar8);
    heap.setU32(0x006288f4, (iVar9) >>> 0);
    while (iVar9 = heap.u32((iVar9 + 0x20)), iVar10 = heap.u32(0x006288f4), iVar9 != 0) {
      uVar1 = heap.u32((iVar9 + 0x14));
      uVar6 = 0;
      if ((uVar8 + 1) < uVar1) {
        heap.setU32((iVar9 + 0x17), (0x80) >>> 0);
        iVar10 = heap.u32(0x006288f4);
        break;
      }
      if (uVar1 == (uVar8 + 1)) {
        uVar6 = 3;
      }
      if (uVar1 == uVar8) {
        uVar6 = 3;
      }
      heap.setU32((iVar9 + 0x17), (uVar6) >>> 0);
    }
    while (iVar9 = iVar10, iVar10 = heap.u32((iVar9 + 0x20)), uVar12 = heap.u32(0x006288ec), iVar10 != 0 && (bVar7 = heap.u32((iVar10 + 0x17)) & 0x81, -1 < bVar7)) {
      if (bVar7 != 0) {
        heap.setU32((iVar10 + 0x17), (heap.u32((iVar10 + 0x17)) & 0xfe) >>> 0);
        uVar8 = heap.u32((iVar10 + 4));
        uVar1 = heap.u32((iVar10 + 6));
        uVar4 = heap.u32((iVar10 + 8));
        uVar2 = heap.u32((iVar10 + 0xc));
        uVar3 = heap.u32((iVar10 + 0xe));
        heap.setU32(0x006288f8, (iVar9) >>> 0);
        while (iVar11 = iVar10, iVar9 = heap.u32((iVar11 + 0x20)), iVar10 = heap.u32(0x006288f8), iVar9 != 0 && (bVar7 = heap.u32((iVar9 + 0x17)) & 0x82, iVar10 = heap.u32(0x006288f8), -1 < bVar7)) {
          iVar10 = iVar9;
          if ((bVar7 != 0) && (heap.u32((__addr_DAT_0062892c) + (CONCAT22((heap.u32(0x00991f88) >>> 0x10), (((((heap.u32(0x00991f88) << 1 | (uVar8 < heap.u32((iVar9 + 0xc)))) << 1 | (uVar1 < heap.u32((iVar9 + 0xe)))) << 1 | (uVar4 < heap.u32((iVar9 + 10)))) << 1 | (uVar2 < heap.u32((iVar9 + 4)))) << 1 | (uVar3 < heap.u32((iVar9 + 6)))) << 1 | ((uVar4 >>> 0x10) < heap.u32((iVar9 + 8))))) * 4) != '\0')) {
            heap.setU32((iVar11 + 0x20), (heap.u32((iVar9 + 0x20))) >>> 0);
            LOCK();
            iVar10 = heap.u32((heap.u32(0x006288f8) + 0x20));
            heap.setU32((heap.u32(0x006288f8) + 0x20), (iVar9) >>> 0);
            UNLOCK();
            heap.setU32((iVar9 + 0x20), (iVar10) >>> 0);
            iVar10 = iVar11;
          }
        }
      }
    }
    LAB_00433d04: uVar5 = uVar12;
    uVar12 = uVar5 + 1;
    iVar9 = heap.u32(0x005f96e4);
    if (uVar12 < heap.u32(0x006288f0)) {
      do {
        iVar10 = iVar9;
        iVar9 = heap.u32((iVar10 + 0x20));
        if (iVar9 == 0) {
          /* goto LAB_00433d04 */ throw new Error("goto LAB_00433d04 not supported");
        }
      } while (heap.u32((iVar9 + 0x14)) < uVar12);
      uVar8 = uVar5 + 2;
      heap.setU32(0x006288f4, (iVar10) >>> 0);
      while (iVar10 = heap.u32((iVar10 + 0x20)), iVar9 = heap.u32(0x006288f4), iVar10 != 0) {
        uVar1 = heap.u32((iVar10 + 0x14));
        bVar7 = 0;
        if (uVar8 < uVar1) {
          heap.setU32((iVar10 + 0x17), (0x80) >>> 0);
          iVar9 = heap.u32(0x006288f4);
          break;
        }
        if (uVar1 == uVar8) {
          bVar7 = 3;
        }
        if (uVar1 == uVar12) {
          bVar7 = bVar7 | 1;
        }
        heap.setU32((iVar10 + 0x17), (bVar7) >>> 0);
      }
      while (iVar10 = iVar9, iVar9 = heap.u32((iVar10 + 0x20)), iVar9 != 0 && (bVar7 = heap.u32((iVar9 + 0x17)) & 0x81, -1 < bVar7)) {
        if (bVar7 != 0) {
          heap.setU32((iVar9 + 0x17), (heap.u32((iVar9 + 0x17)) & 0xfe) >>> 0);
          uVar8 = heap.u32((iVar9 + 4));
          uVar1 = heap.u32((iVar9 + 6));
          uVar4 = heap.u32((iVar9 + 8));
          uVar2 = heap.u32((iVar9 + 0xc));
          uVar3 = heap.u32((iVar9 + 0xe));
          heap.setU32(0x006288f8, (iVar10) >>> 0);
          while (iVar11 = iVar9, iVar10 = heap.u32((iVar11 + 0x20)), iVar9 = heap.u32(0x006288f8), iVar10 != 0 && (bVar7 = heap.u32((iVar10 + 0x17)) & 0x82, iVar9 = heap.u32(0x006288f8), -1 < bVar7)) {
            iVar9 = iVar10;
            if ((bVar7 != 0) && (heap.u32((__addr_DAT_0062892c) + (CONCAT22((heap.u32(0x00991f88) >>> 0x10), (((((heap.u32(0x00991f88) << 1 | (uVar8 < heap.u32((iVar10 + 0xc)))) << 1 | (uVar1 < heap.u32((iVar10 + 0xe)))) << 1 | (uVar4 < heap.u32((iVar10 + 10)))) << 1 | (uVar2 < heap.u32((iVar10 + 4)))) << 1 | (uVar3 < heap.u32((iVar10 + 6)))) << 1 | ((uVar4 >>> 0x10) < heap.u32((iVar10 + 8))))) * 4) != '\0')) {
              heap.setU32((iVar11 + 0x20), (heap.u32((iVar10 + 0x20))) >>> 0);
              LOCK();
              iVar9 = heap.u32((heap.u32(0x006288f8) + 0x20));
              heap.setU32((heap.u32(0x006288f8) + 0x20), (iVar10) >>> 0);
              UNLOCK();
              heap.setU32((iVar10 + 0x20), (iVar9) >>> 0);
              iVar9 = iVar11;
            }
          }
        }
      }
      /* goto LAB_00433d04 */ throw new Error("goto LAB_00433d04 not supported");
    }
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
