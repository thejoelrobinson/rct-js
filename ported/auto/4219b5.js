// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4219b5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004219b5(heap) {
  let bVar1 = 0;
  let bVar3 = 0;
  let in_CL = regs.ecx & 0xff;
  let bVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar8 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let pbVar12 = 0;
  let uVar13 = 0;
  let cVar2 = 0;
  let cVar4 = 0;
  let uVar9 = 0;
  uVar10 = ((heap.u32(0x00991f74) + heap.i16((0x005f4686 + heap.u8(0x00991f88) * 4))) & 0xffff);
  uVar9 = ((((((in_EDX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  if ((((heap.u32(0x00991f70) + heap.i16((0x005f4684 + heap.u8(0x00991f88) * 4))) & 0xffff) < 0x1000) && (uVar10 < 0x1000)) {
    uVar10 = ((uVar10 * 0x80 | uVar10 >>> 9 | heap.u32(0x00991f70) + heap.i16((0x005f4684 + heap.u8(0x00991f88) * 4))) & 0xffff);
    pbVar12 = ((heap.u32((0x00971ef4) + (((uVar10 >>> 5 | uVar10 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar1 = ((heap.u8(pbVar12)) & 0xff);
    while ((bVar1 & 0x3c) != 0) {
      pbVar12 = ((pbVar12 + 8) >>> 0);
      bVar1 = ((heap.u8(pbVar12)) & 0xff);
    }
    uVar13 = ((CONCAT22(uVar9, CONCAT11(heap.u8(pbVar12 + (5)), ((in_EDX) << 24 >> 24))) & 0xffff1fff) >>> 0);
    if (((uVar13) << 24 >> 24) == (((uVar13 >>> 8)) << 24 >> 24)) {
      return;
    }
    uVar10 = (((heap.u8(pbVar12 + (4)) & 0xf) << (in_CL & 0x1f)) & 0xffff);
    uVar7 = ((CONCAT22((((uVar13 >>> 0x10)) << 16 >> 16), CONCAT11(heap.u8(pbVar12 + (2)) >>> 2, ((uVar13) << 24 >> 24)))) >>> 0);
    uVar13 = ((heap.u8(pbVar12 + (4)) & 0x10 | ((uVar10 >>> 4 | uVar10) & 0xffff) & 0xf) >>> 0);
  } else {
    uVar13 = ((0) >>> 0);
    uVar7 = ((CONCAT22(uVar9, CONCAT11(1, ((in_EDX) << 24 >> 24)))) >>> 0);
  }
  cVar2 = ((((uVar7) << 24 >> 24)) & 0xff);
  bVar1 = ((cVar2 + heap.u32((0x005f46c4) + (unaff_EBX) * 4)) & 0xff);
  bVar5 = ((cVar2 + heap.u32((0x005f46e4) + (unaff_EBX) * 4)) & 0xff);
  cVar4 = (((((((uVar7) >>> 0) >>> 8)) << 24 >> 24)) & 0xff);
  bVar3 = ((cVar4 + heap.u32((0x005f46a4) + (uVar13) * 4)) & 0xff);
  bVar6 = ((cVar4 + heap.u32((0x005f4704) + (uVar13) * 4)) & 0xff);
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    iVar11 = ((heap.u32(0x005f4774)) >>> 0);
    if ((heap.u32(0x00991f8c) & 1) != 0) {
      iVar11 = ((heap.u32(0x005f4770)) >>> 0);
    }
    heap.setU32(0x005f4724, (iVar11 + 5) >>> 0);
    uVar9 = ((((((uVar7) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
    iVar8 = ((CONCAT22(uVar9, CONCAT11(bVar6, cVar2))) >>> 0);
    iVar11 = ((iVar8) >>> 0);
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        iVar8 = ((CONCAT22(uVar9, CONCAT11(bVar3, cVar2))) >>> 0);
      }
      bVar3 = ((((((iVar8) >>> 0) >>> 8) & 0xff)) & 0xff);
      iVar11 = ((iVar8) >>> 0);
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
        iVar8 = ((CONCAT22((((((iVar8) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(bVar3 + 1, ((iVar8) << 24 >> 24)))) >>> 0);
        iVar11 = ((iVar8) >>> 0);
      }
    }
    while (bVar3 = ((((((iVar8) >>> 0) >>> 8) & 0xff)) & 0xff), bVar3 < bVar1 && (bVar3 < bVar5)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      iVar8 = ((((bVar3 + 1) >>> 0) << 8) >>> 0);
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), iVar11, unaff_EBX));
    }
  }
  return;
}
