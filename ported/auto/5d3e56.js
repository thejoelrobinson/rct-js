// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3e56.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_0042635e } from "./42635e.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d1dd4 } from "./5d1dd4.js";
import { FUN_005d1ef6 } from "./5d1ef6.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d3329 } from "./5d3329.js";
import { FUN_005d3527 } from "./5d3527.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005d41a6 } from "./5d41a6.js";
import { FUN_005d5003 } from "./5d5003.js";
import { FUN_005dd134 } from "./5dd134.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e680e } from "./5e680e.js";
export function FUN_005d3e56(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_00887441 = __sp + 4;
  const __addr_DAT_00887420 = __sp + 8;
  const __addr_DAT_005f5b78 = __sp + 12;
  const __addr_DAT_00887442 = __sp + 16;
  const __addr_DAT_00887444 = __sp + 20;
  try {
  let bVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar9 = 0;
  let uVar8 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let unaff_EDI = 0;
  let bVar12 = 0;
  let uVar13 = 0;
  uVar10 = heap.u32(in_EDX + (7) * 4);
  iVar11 = uVar10 * 0x260;
  if (((heap.u32((__addr_DAT_00887422) + (uVar10 * 0x130) * 4) & 0x80) == 0) && (heap.u32((__addr_DAT_00887441) + (iVar11) * 4) == '\0')) {
    FUN_005dd134(heap);
    uVar10 = FUN_0042635e(heap);
    bVar12 = (heap.u32(in_EDX) & 0x3c) == 0x10;
    if (bVar12) {
      bVar1 = heap.u32(in_EDX + (4) * 4);
      if ((bVar1 != 0) && (bVar1 != 1)) {
        return uVar10;
      }
      bVar7 = (heap.u32(in_EDX + (5) * 4) & 0x70) >>> 4;
      uVar9 = 0;
      uVar6 = bVar7 == 0;
      bVar2 = heap.u32(in_EDX + (7) * 4);
      uVar10 = bVar2;
      FUN_005e3b2b(heap);
      if ((!uVar6) || ((FUN_005d41a6(heap), !uVar9 && (FUN_005e3b2b(heap), !uVar6)))) {
        FUN_005d21fa(heap);
        if ((heap.u32(0x00652288) == '\x05') && (((heap.u32(0x00991f30) >>> 3 & 1) != 0 && (heap.u32(0x00991f5a) == '\r')))) {
          heap.setU32(0x00991f5c, (0x1d) >>> 0);
          heap.setU32(0x006522e1, (0) >>> 0);
          if (bVar1 != 0) {
            heap.setU32(0x006522e1, (1) >>> 0);
            heap.setU32(0x00991f5c, (0x1e) >>> 0);
          }
        } else {
          FUN_005e680e(heap);
          cVar3 = heap.u32(0x00652288);
          heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
          LOCK(heap);
          heap.setU32(0x00652288, ('\x05') >>> 0);
          UNLOCK(heap);
          if (cVar3 != '\x05') {
            heap.setU32(0x006522a3, (cVar3) >>> 0);
          }
          heap.setU32(0x006522e1, (bVar1) >>> 0);
          heap.setU32(0x006522e2, (bVar2) >>> 0);
          heap.setU32(0x006522e3, (bVar7) >>> 0);
          FUN_005d13e2(heap);
          heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffd) >>> 0);
        }
        uVar10 = FUN_005e5301(heap);
        return uVar10;
      }
    } else {
      uVar4 = FUN_005e3b2b(heap);
      if ((bVar12) || (heap.u32(in_EDX + (7) * 4) != heap.u32((iVar11 + 0x30)))) {
        uVar4 = FUN_005d3b30(heap);
        heap.setU32(0x00652289, (heap.u32(extraout_EDX + (7) * 4)) >>> 0);
        FUN_005d3527(heap);
        in_EDX = extraout_EDX;
        uVar5 = extraout_CX_00;
      } else {
        heap.u32((iVar11 + 0x30)) = heap.u32(in_EDX + (7) * 4);
        FUN_005d21fa(heap);
        uVar5 = extraout_CX;
      }
      if (heap.u32((__addr_DAT_00887420) + (heap.u32(in_EDX + (7) * 4) * 0x260) * 4) == 0x14) {
        heap.setU32(0x00652289, (heap.u32(in_EDX + (7) * 4)) >>> 0);
        heap.setU32(0x00652288, (6) >>> 0);
        heap.setU32(0x0065228e, (heap.u32(in_EDX + (2) * 4) << 2) >>> 0);
        heap.setU32(0x00652292, (0) >>> 0);
        heap.setU32(0x00652293, (0) >>> 0);
        heap.setU32(0x0065228a, (uVar4) >>> 0);
        heap.setU32(0x0065228c, (uVar5) >>> 0);
        uVar10 = FUN_005d5003(heap);
        return uVar10;
      }
      if ((heap.u32((__addr_DAT_005f5b78 + heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32(in_EDX + (7) * 4) * 0x260) * 4) * 8)) & 0x100) != 0) {
        FUN_005d3329(heap);
      }
      uVar8 = CONCAT11(heap, heap.u32(in_EDX), heap.u32(in_EDX + (4) * 4)) & 0xffff03ff;
      bVar12 = false;
      uVar13 = FUN_005cfe66(heap);
      uVar4 = (undefined2)(uVar13 >>> 0x20);
      uVar10 = uVar13;
      if (!bVar12) {
        heap.setU32(0x00652289, (heap.u32((unaff_EDI + 7))) >>> 0);
        heap.setU32(0x00652288, ('\x03') >>> 0);
        uVar5 = uVar13;
        uVar9 = (undefined1)(uVar8 >>> 8);
        uVar6 = uVar8;
        heap.setU32(0x00652292, (0) >>> 0);
        heap.setU32(0x00652293, (0) >>> 0);
        heap.setU32(0x0065228a, (uVar5) >>> 0);
        heap.setU32(0x0065228c, (extraout_CX_01) >>> 0);
        heap.setU32(0x0065228e, (uVar4) >>> 0);
        heap.setU32(0x00652290, (uVar9) >>> 0);
        heap.setU32(0x00652291, (uVar6) >>> 0);
        if (((heap.u32((__addr_DAT_005f5b78 + heap.u32((uint)(byte)(__addr_DAT_00887420) + (heap.u32(0x00652289) * 0x260) * 4) * 8)) & 0x8000) == 0) && (FUN_005d1dd4(heap), heap.u32(0x00652288) != '\x01')) {
          heap.setU32(0x00652288, ('\x03') >>> 0);
          heap.setU32(0x00652292, (0) >>> 0);
          heap.setU32(0x00652293, (0) >>> 0);
          heap.setU32(0x0065228a, (uVar5) >>> 0);
          heap.setU32(0x0065228c, (extraout_CX_01) >>> 0);
          heap.setU32(0x0065228e, (uVar4) >>> 0);
          heap.setU32(0x00652290, (uVar9) >>> 0);
          heap.setU32(0x00652291, (uVar6) >>> 0);
          FUN_005d1ef6(heap);
          if (heap.u32(0x00652288) != '\x02') {
            heap.setU32(0x00652288, ('\x03') >>> 0);
            heap.setU32(0x00652292, (0) >>> 0);
            heap.setU32(0x00652293, (0) >>> 0);
            heap.setU32(0x0065228a, (uVar5) >>> 0);
            heap.setU32(0x0065228c, (extraout_CX_01) >>> 0);
            heap.setU32(0x0065228e, (uVar4) >>> 0);
            heap.setU32(0x00652290, (uVar9) >>> 0);
            heap.setU32(0x00652291, (uVar6) >>> 0);
          }
        }
        uVar10 = FUN_005d13e2(heap);
        return uVar10;
      }
    }
  } else {
    heap.u16(0x971e8c) = heap.u32((__addr_DAT_00887442) + (uVar10 * 0x130) * 4);
    heap.setU32(0x00971e8e, (heap.u32((__addr_DAT_00887444) + (uVar10 * 0x98) * 4)) >>> 0);
    uVar10 = FUN_00427108(heap);
  }
  return uVar10;
} finally {
    heap.freeFrame(24);
  }
}
