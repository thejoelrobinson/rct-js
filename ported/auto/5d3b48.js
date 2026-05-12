// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3b48.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433e1c } from "./433e1c.js";
import { FUN_004367cb } from "./4367cb.js";
export function FUN_005d3b48(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_switchD_005d3bb2 = __sp + 0;
  const __addr_uStack_2 = __sp + 4;
  try {
  let sVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let in_EDX = regs.edx >>> 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let pcVar10 = 0;
  let pbVar11 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let bVar14 = 0;
  let extraout_var = 0;
  let local_6 = 0;
  // HAND-FIX: DAT_00991f8c is a ushort. Save / restore via u16 so we
  // don't trash the adjacent u16 at 0x991f8e (tile-grid head slot 0).
  heap.setU32(__addr_uStack_2, (heap.u16(0x00991f8c)) >>> 0);
  heap.setU16(0x00991f8c, 0);
  uVar8 = ((unaff_EBX & 0xffff03ff) >>> 0);
  heap.setU32(0x005f96e0, (0x006284ac) >>> 0);
  (regs.eax = FUN_00431b6f(heap));
  pbVar11 = ((0x00887420 + (in_EDX & 0xff) * 0x260) >>> 0);
  uVar12 = ((0) >>> 0);
  uVar13 = ((extraout_var) >>> 0);
  for (pcVar10 = ((heap.u32((0x00652498) + (in_EDX >>> 8 & 0xff) * 4)) >>> 0); (heap.i8(pcVar10) | 0) != -1; pcVar10 = (((pcVar10 + 10) >>> 0)) >>> 0) {
    sVar1 = ((heap.i16((pcVar10 + 1))) & 0xffff);
    sVar2 = ((heap.i16((pcVar10 + 3))) & 0xffff);
    bVar6 = ((heap.i8(pcVar10 + (8))) & 0xff);
    bVar14 = ((((uVar8 >>> 8) & 0xff)) & 0xff);
    sVar3 = ((sVar1) & 0xffff);
    sVar4 = ((sVar2) & 0xffff);
    switch (heap.u32(((function(){ throw new Error("ghidra-decompile ERROR at FUN_005d3b48"); })()) + (bVar14) * 4)) {
      case 0x5d3bcc:
        sVar4 = ((-sVar1) & 0xffff);
        uVar7 = ((CONCAT11(((bVar6 << 1) & 0xff) >>> 4, bVar6 << 1) & 0x11ee) & 0xffff);
        bVar6 = ((((uVar7) & 0xff) | ((uVar7 >>> 8) & 0xff)) & 0xff);
        sVar3 = ((sVar2) & 0xffff);
        break;
      case 0x5d3be1:
        sVar4 = ((-sVar2) & 0xffff);
        uVar7 = ((CONCAT11(((bVar6 << 2) & 0xff) >>> 4, bVar6 << 2) & 0x33cc) & 0xffff);
        bVar6 = ((((uVar7) & 0xff) | ((uVar7 >>> 8) & 0xff)) & 0xff);
        sVar3 = ((-sVar1) & 0xffff);
        break;
      case 0x5d3bf8:
        uVar7 = ((CONCAT11(((bVar6 << 3) & 0xff) >>> 4, bVar6 << 3) & 0x7788) & 0xffff);
        bVar6 = ((((uVar7) & 0xff) | ((uVar7 >>> 8) & 0xff)) & 0xff);
        sVar3 = ((-sVar2) & 0xffff);
        sVar4 = ((sVar1) & 0xffff);
    }
    local_6 = ((((in_EAX) << 16 >> 16)) & 0xffff);
    uVar5 = ((sVar4 + ((uVar13) << 16 >> 16)) & 0xffff);
    heap.setU32(0x00656ae2, ((((((heap.i16((pcVar10 + 5)) + ((unaff_EDI) << 16 >> 16)) & 0xffff) >>> 2)) << 24 >> 24)) >>> 0);
    heap.setU32(0x00656ae3, ((((heap.i8(pcVar10 + (7)) + heap.u32((0x005f5d01) + (heap.u32(pbVar11) * 8) * 4)) & 0xff) >>> 2) + heap.u32(0x00656ae2)) >>> 0);
    uVar7 = ((uVar5 * 0x80 | uVar5 >>> 9 | sVar3 + local_6) & 0xffff);
    LOCK();
    heap.setU32(0x00656af0, (heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
    heap.setU32(((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4), (0x00656ae0) & 0xffffffff);
    UNLOCK();
    uVar7 = ((sVar3 + local_6 + 0x20 & 0xfe0) & 0xffff);
    LOCK();
    heap.setU32(0x00656af4, (heap.u32((0x00971ef4) + (((((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    heap.setU32(((0x00971ef4) + (((((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4), (0x00656ae8) & 0xffffffff);
    UNLOCK();
    uVar7 = ((uVar7 - 0x40 & 0xfe0) & 0xffff);
    LOCK();
    heap.setU32(0x00656af8, (heap.u32((0x00971ef4) + (((((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    heap.setU32(((0x00971ef4) + (((((uVar5 * 0x80 | uVar5 >>> 9 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4), (0x00656ae8) & 0xffffffff);
    UNLOCK();
    uVar7 = ((uVar7 + 0x20 & 0xfe0) & 0xffff);
    uVar9 = ((uVar5 + 0x20 & 0xfe0) & 0xffff);
    LOCK();
    heap.setU32(0x00656afc, (heap.u32((0x00971ef4) + (((((uVar9 << 7 | uVar7) & 0xffff) >>> 5 | (uVar9 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    heap.setU32(((0x00971ef4) + (((((uVar9 << 7 | uVar7) & 0xffff) >>> 5 | (uVar9 >>> 9) << 0xb) & 0xffff)) * 4), (0x00656ae8) & 0xffffffff);
    UNLOCK();
    uVar5 = ((uVar5 - 0x20 & 0xfe0) & 0xffff);
    LOCK();
    heap.setU32(0x00656b00, (heap.u32((0x00971ef4) + (((((uVar5 << 7 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    heap.setU32(((0x00971ef4) + (((((uVar5 << 7 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4), (0x00656ae8) & 0xffffffff);
    UNLOCK();
    heap.setU32(0x00656ae1, (bVar6 & 0xf | 0x80) >>> 0);
    heap.setU32(0x00656ae0, (bVar14 | 8) >>> 0);
    if ((in_EDX & 0x10000) != 0) {
      heap.setU32(0x00656ae0, (bVar14 | 0x88) >>> 0);
    }
    heap.setU32(0x00656ae5, (heap.i8(pcVar10)) >>> 0);
    heap.setU32(0x00656ae7, (((in_EDX) & 0xff)) >>> 0);
    heap.setU32(0x00656ae4, (((in_EDX >>> 8) & 0xff)) >>> 0);
    heap.setU32(0x00656ae6, (0) >>> 0);
    uVar7 = (((regs.eax = FUN_004367cb(heap), regs.edx = 0x10, regs.eax)) & 0xffff);
    uVar5 = ((extraout_CX << 7 | extraout_CX >>> 9 | uVar7) & 0xffff);
    heap.setU32(((0x00971ef4) + (((uVar5 >>> 5 | uVar5 << 0xb) & 0xffff)) * 4), (heap.u32(0x00656af0)) & 0xffffffff);
    uVar7 = ((uVar7 + 0x20 & 0xfe0) & 0xffff);
    heap.setU32(((0x00971ef4) + (((((extraout_CX << 7 | extraout_CX >>> 9 | uVar7) & 0xffff) >>> 5 | (extraout_CX >>> 9) << 0xb) & 0xffff)) * 4), (heap.u32(0x00656af4)) & 0xffffffff);
    uVar7 = ((uVar7 - 0x40 & 0xfe0) & 0xffff);
    heap.setU32(((0x00971ef4) + (((((extraout_CX << 7 | extraout_CX >>> 9 | uVar7) & 0xffff) >>> 5 | (extraout_CX >>> 9) << 0xb) & 0xffff)) * 4), (heap.u32(0x00656af8)) & 0xffffffff);
    uVar7 = ((uVar7 + 0x20 & 0xfe0) & 0xffff);
    uVar5 = ((extraout_CX + 0x20 & 0xfe0) & 0xffff);
    heap.setU32(((0x00971ef4) + (((((uVar5 << 7 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4), (heap.u32(0x00656afc)) & 0xffffffff);
    uVar5 = ((extraout_CX - 0x20 & 0xfe0) & 0xffff);
    heap.setU32(((0x00971ef4) + (((((uVar5 << 7 | uVar7) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4), (heap.u32(0x00656b00)) & 0xffffffff);
  }
  (regs.eax = FUN_00433bae(heap, unaff_EDI, pbVar11, pcVar10, __addr_uStack_2, uVar12, in_EDX, uVar13));
  (regs.eax = FUN_00433e1c(heap));
  heap.setU16(0x00991f8c, (heap.u32(__addr_uStack_2)) & 0xffff);
  return 1;
} finally {
    heap.freeFrame(8);
  }
}
