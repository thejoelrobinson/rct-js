// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43054e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040473c } from "./40473c.js";
import { FUN_004274a9 } from "./4274a9.js";
import { FUN_00428ec0 } from "./428ec0.js";
import { FUN_004292b0 } from "./4292b0.js";
import { FUN_0042934f } from "./42934f.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c6f3 } from "./42c6f3.js";
import { FUN_0042f199 } from "./42f199.js";
import { FUN_0042fd81 } from "./42fd81.js";
import { FUN_004311e7 } from "./4311e7.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_004448fb } from "./4448fb.js";
import { FUN_00444b4a } from "./444b4a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0043054e(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0099c16c = __sp + 0;
  const __addr_DAT_005f8fb3 = __sp + 4;
  const __addr_DAT_0099aa88 = __sp + 8;
  try {
  let cVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let pcVar4 = 0;
  let pcVar5 = 0;
  let in_AX = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let pcVar8 = 0;
  let pcVar9 = 0;
  let pcVar10 = 0;
  let bVar11 = 0;
  uVar6 = FUN_0040473c(heap);
  heap.setU32(0x005f8534, (uVar6 ^ heap.u32(0x006e3b88)) >>> 0);
  heap.setU32(0x005f8538, (heap.u32(0x006e3b8c)) >>> 0);
  FUN_005d3b30(heap);
  pcVar8 = __addr_DAT_0099c16c + in_AX * 0x10;
  pcVar4 = __addr_DAT_005f8fb3;
  pcVar5 = __addr_DAT_0099aa88;
  do {
    pcVar10 = pcVar5;
    pcVar9 = pcVar4;
    cVar1 = heap.u32(pcVar9);
    heap.setU32(pcVar10, (cVar1) >>> 0);
    pcVar4 = pcVar9 + 1;
    pcVar5 = pcVar10 + 1;
  } while (cVar1 != '*');
  do {
    cVar1 = heap.u32(pcVar8);
    heap.setU32(pcVar10, (cVar1) >>> 0);
    pcVar8 = pcVar8 + 1;
    pcVar10 = pcVar10 + 1;
    bVar11 = false;
  } while (cVar1 != '\0');
  FUN_0042fd81(heap);
  if ((!bVar11) && (in_AX == heap.u32(0x008dbed2))) {
    FUN_00436558(heap);
    FUN_00444b4a(heap);
    heap.setU32(0x0099a500, (heap.u32(0x0099a500) & 0xfffe) >>> 0);
    FUN_005e0d60(heap);
    FUN_004298a0(heap);
    FUN_005e68e2(heap);
    iVar3 = heap.u32((pcVar9 + 9));
    heap.setU32((pcVar9 + (0x16f) * 4), (-1) >>> 0);
    heap.setU32((pcVar9 + (0x170) * 4), (-1) >>> 0);
    heap.setU32((pcVar9 + 0x171), (heap.u32(0x008ad1c2)) >>> 0);
    heap.setU32((pcVar9 + 0x173), (heap.u32(0x008ad1c4)) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_0043054e"); })();
    bVar7 = heap.u32(0x008ad1c6) - heap.u32((iVar3 + 0x10));
    heap.setU32((iVar3 + 0x10), (heap.u32(0x008ad1c6)) >>> 0);
    if (bVar7 != 0) {
      if (bVar7 < '\0') {
        heap.setU32((iVar3 + 0xc), (heap.u32((iVar3 + 0xc)) >>> (-bVar7 & 0x1f)) >>> 0);
        heap.setU32((iVar3 + 0xe), (heap.u32((iVar3 + 0xe)) >>> (-bVar7 & 0x1f)) >>> 0);
      } else {
        heap.setU32((iVar3 + 0xc), (heap.u32((iVar3 + 0xc)) << (bVar7 & 0x1f)) >>> 0);
        heap.setU32((iVar3 + 0xe), (heap.u32((iVar3 + 0xe)) << (bVar7 & 0x1f)) >>> 0);
      }
    }
    uVar2 = heap.u32((iVar3 + 0xe));
    heap.setU32((pcVar9 + 0x171), (heap.u32((pcVar9 + 0x171)) - (heap.u32((iVar3 + 0xc)) >>> 1)) >>> 0);
    heap.setU32((pcVar9 + 0x173), (heap.u32((pcVar9 + 0x173)) - (uVar2 >>> 1)) >>> 0);
    FUN_005e43de(heap);
    FUN_005e16f7(heap);
    FUN_004448fb(heap);
    FUN_005ddf20(heap);
    FUN_0042f199(heap);
    heap.setU32(0x006e3b88, (heap.u32(0x005f8534)) >>> 0);
    heap.setU32(0x006e3b8c, (heap.u32(0x005f8538)) >>> 0);
    FUN_004311e7(heap);
    FUN_0042c6f3(heap);
    if (heap.u32(0x0087d0d0) != '\0') {
      FUN_004274a9(heap);
    }
    heap.setU32(0x0087cc88, (FUN_00428ec0(heap)) >>> 0);
    heap.setU32(0x0087d514, (FUN_004292b0(heap)) >>> 0);
    heap.setU32(0x0087d724, (FUN_0042934f(heap)) >>> 0);
    FUN_005e6028(heap);
    heap.setU32(0x0099a4fe, (0) >>> 0);
    heap.setU32(0x0099a4f4, (62000) >>> 0);
    return;
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}
