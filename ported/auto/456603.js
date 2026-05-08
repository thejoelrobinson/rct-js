// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/456603.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005df40c } from "./5df40c.js";
export function FUN_00456603(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_00630b41 = __sp + 4;
  const __addr_DAT_00652478 = __sp + 8;
  const __addr_DAT_0065247a = __sp + 12;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = 0;
  if (((heap.u32((unaff_ESI + 0xc6)) & 8) != 0) && (0xb < heap.u32((unaff_ESI + 0xe2)))) {
    if ((heap.u32((unaff_ESI + 0x29)) & 0x18) == 0) {
      uVar3 = heap.u32((unaff_ESI + 0x26)) << 7 | heap.u32((unaff_ESI + 0x26)) >>> 9 | heap.u32((unaff_ESI + 0x24));
      pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar3 >>> 5 | uVar3 << 0xb)) * 4);
      bVar1 = heap.u32(pbVar5);
      while ((bVar1 & 0x3c) != 0) {
        pbVar5 = pbVar5 + 8;
        bVar1 = heap.u32(pbVar5);
      }
      if (heap.u32((unaff_ESI + 0x28)) != heap.u32(pbVar5 + (2) * 4)) {
        return 0xffffffff;
      }
      if ((heap.u32((unaff_ESI + 0x29)) & 4) == 0) {
        if ((heap.u32(pbVar5 + (4) * 4) & 0x1f) != 0) {
          return 0xffffffff;
        }
      } else {
        if ((heap.u32(pbVar5 + (4) * 4) & 0x1f) != heap.u32((__addr_DAT_00630b41) + (heap.u32((unaff_ESI + 0x29)) & 3) * 4)) {
        return 0xffffffff;
      }
      }
    }
    uVar2 = FUN_005df40c(heap);
    uVar2 = uVar2 & 3;
    if ((heap.u32(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = heap.u32((unaff_ESI + 0x24)) + heap.u32((__addr_DAT_00652478) + (uVar2 * 2) * 4);
      uVar3 = heap.u32((unaff_ESI + 0x26)) + heap.u32((__addr_DAT_0065247a) + (uVar2 * 2) * 4);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >>> 9 | uVar4;
        pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar1 = heap.u32(pbVar5);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = heap.u32(pbVar5);
        }
        if ((heap.u32(pbVar5 + (5) * 4) & 0xe0) == 0) {
          uVar3 = heap.u32(pbVar5 + (2) * 4) - (ushort) * (unaff_ESI + 0x28);
          if (uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((heap.u32(pbVar5 + (6) * 4) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = uVar2 + 1 & 3;
    if ((heap.u32(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = heap.u32((unaff_ESI + 0x24)) + heap.u32((__addr_DAT_00652478) + (uVar2 * 2) * 4);
      uVar3 = heap.u32((unaff_ESI + 0x26)) + heap.u32((__addr_DAT_0065247a) + (uVar2 * 2) * 4);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >>> 9 | uVar4;
        pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar1 = heap.u32(pbVar5);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = heap.u32(pbVar5);
        }
        if ((heap.u32(pbVar5 + (5) * 4) & 0xe0) == 0) {
          uVar3 = heap.u32(pbVar5 + (2) * 4) - (ushort) * (unaff_ESI + 0x28);
          if (uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((heap.u32(pbVar5 + (6) * 4) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = uVar2 + 1 & 3;
    if ((heap.u32(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = heap.u32((unaff_ESI + 0x24)) + heap.u32((__addr_DAT_00652478) + (uVar2 * 2) * 4);
      uVar3 = heap.u32((unaff_ESI + 0x26)) + heap.u32((__addr_DAT_0065247a) + (uVar2 * 2) * 4);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >>> 9 | uVar4;
        pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar1 = heap.u32(pbVar5);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = heap.u32(pbVar5);
        }
        if ((heap.u32(pbVar5 + (5) * 4) & 0xe0) == 0) {
          uVar3 = heap.u32(pbVar5 + (2) * 4) - (ushort) * (unaff_ESI + 0x28);
          if (uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((heap.u32(pbVar5 + (6) * 4) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = uVar2 + 1 & 3;
    if ((heap.u32(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = heap.u32((unaff_ESI + 0x24)) + heap.u32((__addr_DAT_00652478) + (uVar2 * 2) * 4);
      uVar3 = heap.u32((unaff_ESI + 0x26)) + heap.u32((__addr_DAT_0065247a) + (uVar2 * 2) * 4);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >>> 9 | uVar4;
        pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
        bVar1 = heap.u32(pbVar5);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = heap.u32(pbVar5);
        }
        if ((heap.u32(pbVar5 + (5) * 4) & 0xe0) == 0) {
          uVar3 = heap.u32(pbVar5 + (2) * 4) - (ushort) * (unaff_ESI + 0x28);
          if (uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((heap.u32(pbVar5 + (6) * 4) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
  }
  return 0xffffffff;
} finally {
    heap.freeFrame(16);
  }
}
