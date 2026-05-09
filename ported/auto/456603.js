// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/456603.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00456603(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar5 = 0;
  if (((heap.u8((unaff_ESI + 0xc6)) & 8) != 0) && (0xb < heap.u8((unaff_ESI + 0xe2)))) {
    if ((heap.u8((unaff_ESI + 0x29)) & 0x18) == 0) {
      uVar3 = ((heap.u16((unaff_ESI + 0x26)) << 7 | heap.u16((unaff_ESI + 0x26)) >>> 9 | heap.u16((unaff_ESI + 0x24))) & 0xffff);
      pbVar5 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
      bVar1 = ((heap.u8(pbVar5)) & 0xff);
      while ((bVar1 & 0x3c) != 0) {
        pbVar5 = ((pbVar5 + 8) >>> 0);
        bVar1 = ((heap.u8(pbVar5)) & 0xff);
      }
      if (heap.u8((unaff_ESI + 0x28)) != heap.u8(pbVar5 + (2))) {
        return 0xffffffff;
      }
      if ((heap.u8((unaff_ESI + 0x29)) & 4) == 0) {
        if ((heap.u8(pbVar5 + (4)) & 0x1f) != 0) {
          return 0xffffffff;
        }
      } else {
        if ((heap.u8(pbVar5 + (4)) & 0x1f) != heap.u32((0x00630b41) + (heap.u8((unaff_ESI + 0x29)) & 3) * 4)) {
        return 0xffffffff;
      }
      }
    }
    uVar2 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    uVar2 = ((uVar2 & 3) >>> 0);
    if ((heap.u8(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = ((heap.i16((unaff_ESI + 0x24)) + heap.u32((0x00652478) + (uVar2 * 2) * 4)) & 0xffff);
      uVar3 = ((heap.i16((unaff_ESI + 0x26)) + heap.u32((0x0065247a) + (uVar2 * 2) * 4)) & 0xffff);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = ((uVar3 * 0x80 | uVar3 >>> 9 | uVar4) & 0xffff);
        pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar1 = ((heap.u8(pbVar5)) & 0xff);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = ((pbVar5 + 8) >>> 0);
          bVar1 = ((heap.u8(pbVar5)) & 0xff);
        }
        if ((heap.u8(pbVar5 + (5)) & 0xe0) == 0) {
          uVar3 = ((((heap.u8(pbVar5 + (2))) & 0xffff) - heap.u16((unaff_ESI + 0x28))) & 0xffff);
          if (((uVar3) << 16 >> 16) < 0) {
            uVar3 = ((-uVar3) & 0xffff);
          }
          if ((uVar3 < 5) && ((heap.u8(pbVar5 + (6)) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = ((uVar2 + 1 & 3) >>> 0);
    if ((heap.u8(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = ((heap.i16((unaff_ESI + 0x24)) + heap.u32((0x00652478) + (uVar2 * 2) * 4)) & 0xffff);
      uVar3 = ((heap.i16((unaff_ESI + 0x26)) + heap.u32((0x0065247a) + (uVar2 * 2) * 4)) & 0xffff);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = ((uVar3 * 0x80 | uVar3 >>> 9 | uVar4) & 0xffff);
        pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar1 = ((heap.u8(pbVar5)) & 0xff);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = ((pbVar5 + 8) >>> 0);
          bVar1 = ((heap.u8(pbVar5)) & 0xff);
        }
        if ((heap.u8(pbVar5 + (5)) & 0xe0) == 0) {
          uVar3 = ((((heap.u8(pbVar5 + (2))) & 0xffff) - heap.u16((unaff_ESI + 0x28))) & 0xffff);
          if (((uVar3) << 16 >> 16) < 0) {
            uVar3 = ((-uVar3) & 0xffff);
          }
          if ((uVar3 < 5) && ((heap.u8(pbVar5 + (6)) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = ((uVar2 + 1 & 3) >>> 0);
    if ((heap.u8(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = ((heap.i16((unaff_ESI + 0x24)) + heap.u32((0x00652478) + (uVar2 * 2) * 4)) & 0xffff);
      uVar3 = ((heap.i16((unaff_ESI + 0x26)) + heap.u32((0x0065247a) + (uVar2 * 2) * 4)) & 0xffff);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = ((uVar3 * 0x80 | uVar3 >>> 9 | uVar4) & 0xffff);
        pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar1 = ((heap.u8(pbVar5)) & 0xff);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = ((pbVar5 + 8) >>> 0);
          bVar1 = ((heap.u8(pbVar5)) & 0xff);
        }
        if ((heap.u8(pbVar5 + (5)) & 0xe0) == 0) {
          uVar3 = ((((heap.u8(pbVar5 + (2))) & 0xffff) - heap.u16((unaff_ESI + 0x28))) & 0xffff);
          if (((uVar3) << 16 >> 16) < 0) {
            uVar3 = ((-uVar3) & 0xffff);
          }
          if ((uVar3 < 5) && ((heap.u8(pbVar5 + (6)) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = ((uVar2 + 1 & 3) >>> 0);
    if ((heap.u8(0x00632f08) >>> uVar2 & 1) != 0) {
      uVar4 = ((heap.i16((unaff_ESI + 0x24)) + heap.u32((0x00652478) + (uVar2 * 2) * 4)) & 0xffff);
      uVar3 = ((heap.i16((unaff_ESI + 0x26)) + heap.u32((0x0065247a) + (uVar2 * 2) * 4)) & 0xffff);
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = ((uVar3 * 0x80 | uVar3 >>> 9 | uVar4) & 0xffff);
        pbVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar1 = ((heap.u8(pbVar5)) & 0xff);
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = ((pbVar5 + 8) >>> 0);
          bVar1 = ((heap.u8(pbVar5)) & 0xff);
        }
        if ((heap.u8(pbVar5 + (5)) & 0xe0) == 0) {
          uVar3 = ((((heap.u8(pbVar5 + (2))) & 0xffff) - heap.u16((unaff_ESI + 0x28))) & 0xffff);
          if (((uVar3) << 16 >> 16) < 0) {
            uVar3 = ((-uVar3) & 0xffff);
          }
          if ((uVar3 < 5) && ((heap.u8(pbVar5 + (6)) & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
  }
  return 0xffffffff;
}
