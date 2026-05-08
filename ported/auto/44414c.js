// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44414c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_0045a94c } from "./45a94c.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044414c(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_00630774 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_00630880 = __sp + 8;
  const __addr_DAT_005f5b78 = __sp + 12;
  const __addr_DAT_006308a8 = __sp + 16;
  const __addr_DAT_00887516 = __sp + 20;
  const __addr_DAT_00630881 = __sp + 24;
  const __addr_DAT_00887444 = __sp + 28;
  const __addr_DAT_0063087f = __sp + 32;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  let uVar7 = 0;
  let bVar8 = 0;
  bVar8 = true;
  uVar3 = FUN_005e5fcb(heap);
  if (!bVar8) {
    if (uVar3 == heap.u32((unaff_ESI + 0x15a))) {
      return;
    }
    uVar3 = FUN_005e5bd8(heap);
  }
  FUN_005e3c3c(heap);
  heap.u32((unaff_ESI + 0x1c)) = __addr_DAT_00630774;
  heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x734;
  heap.u32((unaff_ESI + 0x18)) = heap.u32((unaff_ESI + 0x18)) | 0x300;
  FUN_005e412c(heap);
  heap.u32((unaff_ESI + 0x15a)) = uVar3;
  heap.setU32(0x0063078e, (CONCAT22((uVar3 >>> 0x10), uVar3 + 0x982)) >>> 0);
  heap.u32((unaff_ESI + 0x15c)) = 2;
  heap.u32((unaff_ESI + 0x15e)) = 0xffff;
  heap.setU32(0x00630880, (0xffff) >>> 0);
  pbVar5 = __addr_DAT_00887420;
  bVar1 = 0;
  pbVar4 = __addr_DAT_00630880;
  do {
    if ((heap.u32(pbVar5) != 0xff) && ((heap.u32((__addr_DAT_005f5b78 + heap.u32(pbVar5) * 8)) & 0x3820000) == 0)) {
      heap.u32(pbVar4) = bVar1;
      pbVar4 = pbVar4 + 1;
    }
    pbVar5 = pbVar5 + 0x260;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0xff);
  heap.u32(pbVar4) = 0xff;
  pbVar5 = extraout_ECX;
  for (; __addr_DAT_006308a8 < pbVar4; pbVar4 = pbVar4 + -1) {
    pbVar6 = __addr_DAT_00630880;
    uVar2 = 0xffff;
    do {
      if (heap.u32((__addr_DAT_00887516) + (heap.u32(pbVar6) * 0x130) * 4) <= uVar2) {
        uVar2 = heap.u32((__addr_DAT_00887516) + (heap.u32(pbVar6) * 0x130) * 4);
        pbVar5 = pbVar6;
      }
      pbVar6 = pbVar6 + 1;
    } while (pbVar6 < pbVar4);
    do {
      heap.u32(pbVar5) = heap.u32(pbVar5 + (1) * 4);
      pbVar5 = pbVar5 + 1;
    } while (pbVar5 < pbVar4);
  }
  pbVar4 = __addr_DAT_00630881;
  do {
    if (heap.u32(pbVar4) == 0xff) {
      return;
    }
    heap.setU32(0x00971e86, (heap.u32((__addr_DAT_00887444) + (heap.u32(pbVar4) * 0x98) * 4)) >>> 0);
    FUN_00458bcf(heap);
    pbVar5 = pbVar4;
    while (pbVar6 = pbVar5 + -1, __addr_DAT_0063087f < pbVar6) {
      uVar7 = 0;
      heap.setU32(0x00971e86, (heap.u32((__addr_DAT_00887444) + (heap.u32(pbVar6) * 0x98) * 4)) >>> 0);
      FUN_00458bcf(heap);
      FUN_0045a94c(heap);
      if (!uVar7) {
        break;
      }
      LOCK();
      bVar1 = heap.u32(pbVar5);
      heap.u32(pbVar5) = heap.u32(pbVar6);
      UNLOCK();
      heap.u32(pbVar6) = bVar1;
      pbVar5 = pbVar6;
    }
    pbVar4 = pbVar4 + 1;
  } while (true);
} finally {
    heap.freeFrame(36);
  }
}
