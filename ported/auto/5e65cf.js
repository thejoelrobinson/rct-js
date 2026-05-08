// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e65cf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005e65cf(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_00887441 = __sp + 0;
  const __addr_DAT_00887442 = __sp + 4;
  const __addr_DAT_00887444 = __sp + 8;
  const __addr_DAT_00887497 = __sp + 12;
  const __addr_DAT_005f5806 = __sp + 16;
  const __addr_DAT_00887420 = __sp + 20;
  const __addr_DAT_0088744a = __sp + 24;
  const __addr_DAT_006e1ecc = __sp + 28;
  const __addr_DAT_0099fc3c = __sp + 32;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let extraout_ECX = 0;
  let unaff_BL = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let unaff_ESI = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  if ((heap.u32(0x0099a500) & 1) != 0) {
    return in_EAX;
  }
  uVar9 = FUN_00431510(heap);
  pbVar10 = (uVar9 >>> 0x20);
  uVar3 = uVar9;
  if (unaff_BL == '\x03') {
    if ((heap.u32(pbVar10) & 0x3c) == 4) {
      return uVar3;
    }
    uVar4 = heap.u32(pbVar10 + (7) * 4);
    iVar5 = uVar4 * 0x260;
    if (heap.u32((__addr_DAT_00887441) + (iVar5) * 4) == '\0') {
      heap.setU32(0x005f54f0, (0x4c1) >>> 0);
      if ((heap.u32(pbVar10) & 0x3c) == 0x10) {
        heap.setU32(0x005f54f2, (0x56b) >>> 0);
        if (heap.u32(pbVar10 + (4) * 4) != 0) {
          heap.setU32(0x005f54f2, (0x56d) >>> 0);
        }
      } else {
        bVar1 = heap.u32(pbVar10 + (4) * 4);
        if (((bVar1 != 2) && (bVar1 != 3)) && (bVar1 != 1)) {
          heap.setU32(0x005f54f2, (heap.u32((__addr_DAT_00887442) + (uVar4 * 0x130) * 4)) >>> 0);
          heap.setU32(0x005f54f4, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar4 * 0x98) * 4)) >>> 0);
          heap.setU32(0x005f54f6, ((undefined2)(heap.u32((__addr_DAT_00887444) + (uVar4 * 0x98) * 4) >>> 0x10)) >>> 0);
          return uVar3;
        }
        heap.setU32(0x005f54f2, (0x569) >>> 0);
      }
      if (1 < heap.u32((byte)(__addr_DAT_00887497) + (iVar5) * 4)) {
        heap.setU32(0x005f54f2, (heap.u32(0x005f54f2) + 1) >>> 0);
      }
      heap.setU32(0x005f54f4, (heap.u32((__addr_DAT_00887442) + (uVar4 * 0x130) * 4)) >>> 0);
      heap.setU32(0x005f54f6, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar4 * 0x98) * 4)) >>> 0);
      heap.setU32(0x005f54f8, ((undefined2)(heap.u32((__addr_DAT_00887444) + (uVar4 * 0x98) * 4) >>> 0x10)) >>> 0);
      heap.setU32(0x005f54fa, (heap.u32((__addr_DAT_005f5806 + heap.u32((byte)(__addr_DAT_00887420) + (iVar5) * 4) * 8)) + 2) >>> 0);
      uVar6 = (heap.u32((pbVar10 + 5)) & 0x70) >>> 4;
      uVar7 = uVar6;
      do {
        if (heap.u32((__addr_DAT_0088744a) + (uVar4 * 0x130 + uVar6) * 4) == -1) {
          uVar7 = uVar7 - 1;
        }
        uVar6 = uVar6 - 1;
      } while (-1 < uVar6);
      heap.setU32(0x005f54fc, (uVar7 + 1) >>> 0);
      return uVar3;
    }
  } else {
    if (unaff_BL == '\x02') {
    if (heap.u32(pbVar10) != 0) {
      return uVar3;
    }
    uVar4 = heap.u32(pbVar10 + (0x30) * 4);
    if (heap.u32((__addr_DAT_00887441) + (uVar4 * 0x260) * 4) == '\0') {
      heap.setU32(0x005f54f0, (0x4c1) >>> 0);
      heap.setU32(0x005f54f2, (heap.u32((__addr_DAT_00887442) + (uVar4 * 0x130) * 4)) >>> 0);
      heap.setU32(0x005f54f4, (heap.u32((undefined2)(__addr_DAT_00887444) + (uVar4 * 0x98) * 4)) >>> 0);
      heap.setU32(0x005f54f6, ((undefined2)(heap.u32((__addr_DAT_00887444) + (uVar4 * 0x98) * 4) >>> 0x10)) >>> 0);
      return uVar3;
    }
  } else {
    bVar8 = (heap.u32(0x00991f30) & 0x48) == 0x48;
    if (!bVar8) {
      uVar3 = extraout_ECX;
      uVar2 = FUN_005e3b2b(heap);
      uVar9 = CONCAT44(pbVar10, uVar2);
      if (bVar8) {
        uVar3 = FUN_005e3b2b(heap, unaff_ESI, pbVar10, uVar3);
        uVar9 = CONCAT44(pbVar10, uVar3);
        if (bVar8) {
          return uVar3;
        }
      }
    }
    uVar4 = (uVar9 >>> 0x20);
    uVar3 = uVar9;
    if (unaff_BL == '\x05') {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, (heap.u32((__addr_DAT_006e1ecc + heap.u32((uVar4 + 4)) * 8))) >>> 0);
      return uVar3;
    }
    if (unaff_BL == '\x06') {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, ((heap.u32((uVar4 + 4)) >>> 4) + 0x4d1) >>> 0);
      return uVar3;
    }
    if (unaff_BL == '\a') {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, ((heap.u32((uVar4 + 5)) & 0xf) + 0x632) >>> 0);
      return uVar3;
    }
    if (unaff_BL == '\t') {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, (heap.u32((__addr_DAT_0099fc3c + (uVar4 >>> 8 & 0xff) * 2))) >>> 0);
      return uVar3;
    }
    if (unaff_BL == '\n') {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, ((heap.u32((uVar4 + 4)) & 0x3ff) + 0x7de) >>> 0);
      return uVar3;
    }
  }
  }
  return uVar3;
} finally {
    heap.freeFrame(36);
  }
}
