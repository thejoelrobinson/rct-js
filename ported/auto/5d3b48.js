// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3b48.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433e1c } from "./433e1c.js";
import { FUN_004367cb } from "./4367cb.js";
export function FUN_005d3b48(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_006284ac = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_PTR_DAT_00652498 = __sp + 8;
  const __addr_switchD_005d3bb2 = __sp + 12;
  const __addr_DAT_005f5d01 = __sp + 16;
  const __addr_DAT_00971ef4 = __sp + 20;
  const __addr_DAT_00656ae0 = __sp + 24;
  const __addr_DAT_00656ae8 = __sp + 28;
  const __addr_uStack_2 = __sp + 32;
  try {
  let sVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let in_EAX = 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let in_EDX = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let unaff_EBX = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let pcVar10 = 0;
  let pbVar11 = 0;
  let unaff_EDI = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let bVar14 = 0;
  let extraout_var = 0;
  let local_6 = 0;
  heap.setU32(__addr_uStack_2, (heap.u32(0x00991f8c)) >>> 0);
  heap.setU32(0x00991f8c, (0) >>> 0);
  uVar8 = unaff_EBX & 0xffff03ff;
  heap.setU32(0x005f96e0, (__addr_DAT_006284ac) >>> 0);
  FUN_00431b6f(heap);
  pbVar11 = __addr_DAT_00887420 + (in_EDX & 0xff) * 0x260;
  uVar12 = 0;
  uVar13 = extraout_var;
  for (pcVar10 = heap.u32((__addr_PTR_DAT_00652498) + (in_EDX >>> 8 & 0xff) * 4); heap.u32(pcVar10) != -1; pcVar10 = pcVar10 + 10) {
    sVar1 = heap.u32((pcVar10 + 1));
    sVar2 = heap.u32((pcVar10 + 3));
    bVar6 = heap.u32(pcVar10 + (8) * 4);
    bVar14 = (uVar8 >>> 8);
    sVar3 = sVar1;
    sVar4 = sVar2;
    switch (heap.u32(((function(){ throw new Error("ghidra-decompile ERROR at FUN_005d3b48"); })()) + (bVar14) * 4)) {
      case 0x5d3bcc:
        sVar4 = -sVar1;
        uVar7 = CONCAT11((bVar6 << 1) >>> 4, bVar6 << 1) & 0x11ee;
        bVar6 = uVar7 | (uVar7 >>> 8);
        sVar3 = sVar2;
        break;
      case 0x5d3be1:
        sVar4 = -sVar2;
        uVar7 = CONCAT11((bVar6 << 2) >>> 4, bVar6 << 2) & 0x33cc;
        bVar6 = uVar7 | (uVar7 >>> 8);
        sVar3 = -sVar1;
        break;
      case 0x5d3bf8:
        uVar7 = CONCAT11((bVar6 << 3) >>> 4, bVar6 << 3) & 0x7788;
        bVar6 = uVar7 | (uVar7 >>> 8);
        sVar3 = -sVar2;
        sVar4 = sVar1;
    }
    local_6 = in_EAX;
    uVar5 = sVar4 + uVar13;
    heap.setU32(0x00656ae2, (((heap.u32((pcVar10 + 5)) + unaff_EDI) >>> 2)) >>> 0);
    heap.setU32(0x00656ae3, (((heap.u32(pcVar10 + (7) * 4) + heap.u32((__addr_DAT_005f5d01) + (heap.u32(pbVar11) * 8) * 4)) >>> 2) + heap.u32(0x00656ae2)) >>> 0);
    uVar7 = uVar5 * 0x80 | uVar5 >>> 9 | sVar3 + local_6;
    LOCK();
    heap.setU32(0x00656af0, (heap.u32((__addr_DAT_00971ef4) + ((uVar7 >>> 5 | uVar7 << 0xb)) * 4)) >>> 0);
    heap.setU32(((__addr_DAT_00971ef4) + ((uVar7 >>> 5 | uVar7 << 0xb)) * 4), (__addr_DAT_00656ae0) >>> 0);
    UNLOCK();
    uVar7 = sVar3 + local_6 + 0x20 & 0xfe0;
    LOCK();
    heap.setU32(0x00656af4, (heap.u32((__addr_DAT_00971ef4) + (((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4)) >>> 0);
    heap.setU32(((__addr_DAT_00971ef4) + (((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4), (__addr_DAT_00656ae8) >>> 0);
    UNLOCK();
    uVar7 = uVar7 - 0x40 & 0xfe0;
    LOCK();
    heap.setU32(0x00656af8, (heap.u32((__addr_DAT_00971ef4) + (((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4)) >>> 0);
    heap.setU32(((__addr_DAT_00971ef4) + (((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4), (__addr_DAT_00656ae8) >>> 0);
    UNLOCK();
    uVar7 = uVar7 + 0x20 & 0xfe0;
    uVar9 = uVar5 + 0x20 & 0xfe0;
    LOCK();
    heap.setU32(0x00656afc, (heap.u32((__addr_DAT_00971ef4) + (((uVar9 << 7 | uVar7) >>> 5 | (uVar9 >>> 9) << 0xb)) * 4)) >>> 0);
    heap.setU32(((__addr_DAT_00971ef4) + (((uVar9 << 7 | uVar7) >>> 5 | (uVar9 >>> 9) << 0xb)) * 4), (__addr_DAT_00656ae8) >>> 0);
    UNLOCK();
    uVar5 = uVar5 - 0x20 & 0xfe0;
    LOCK();
    heap.setU32(0x00656b00, (heap.u32((__addr_DAT_00971ef4) + (((uVar5 << 7 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4)) >>> 0);
    heap.setU32(((__addr_DAT_00971ef4) + (((uVar5 << 7 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4), (__addr_DAT_00656ae8) >>> 0);
    UNLOCK();
    heap.setU32(0x00656ae1, (bVar6 & 0xf | 0x80) >>> 0);
    heap.setU32(0x00656ae0, (bVar14 | 8) >>> 0);
    if ((in_EDX & 0x10000) != 0) {
      heap.setU32(0x00656ae0, (bVar14 | 0x88) >>> 0);
    }
    heap.setU32(0x00656ae5, (heap.u32(pcVar10)) >>> 0);
    heap.setU32(0x00656ae7, (in_EDX) >>> 0);
    heap.setU32(0x00656ae4, ((in_EDX >>> 8)) >>> 0);
    heap.setU32(0x00656ae6, (0) >>> 0);
    uVar7 = FUN_004367cb(heap);
    uVar5 = extraout_CX << 7 | extraout_CX >>> 9 | uVar7;
    heap.setU32(((__addr_DAT_00971ef4) + ((uVar5 >>> 5 | uVar5 << 0xb)) * 4), (heap.u32(0x00656af0)) >>> 0);
    uVar7 = uVar7 + 0x20 & 0xfe0;
    heap.setU32(((__addr_DAT_00971ef4) + (((extraout_CX << 7 | extraout_CX >>> 9 | uVar7) >>> 5 | (extraout_CX >>> 9) << 0xb)) * 4), (heap.u32(0x00656af4)) >>> 0);
    uVar7 = uVar7 - 0x40 & 0xfe0;
    heap.setU32(((__addr_DAT_00971ef4) + (((extraout_CX << 7 | extraout_CX >>> 9 | uVar7) >>> 5 | (extraout_CX >>> 9) << 0xb)) * 4), (heap.u32(0x00656af8)) >>> 0);
    uVar7 = uVar7 + 0x20 & 0xfe0;
    uVar5 = extraout_CX + 0x20 & 0xfe0;
    heap.setU32(((__addr_DAT_00971ef4) + (((uVar5 << 7 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4), (heap.u32(0x00656afc)) >>> 0);
    uVar5 = extraout_CX - 0x20 & 0xfe0;
    heap.setU32(((__addr_DAT_00971ef4) + (((uVar5 << 7 | uVar7) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4), (heap.u32(0x00656b00)) >>> 0);
  }
  FUN_00433bae(heap, unaff_EDI, pbVar11, pcVar10, __addr_uStack_2, uVar12, in_EDX, uVar13);
  FUN_00433e1c(heap);
  heap.setU32(0x00991f8c, (heap.u32(__addr_uStack_2)) >>> 0);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(36);
  }
}
