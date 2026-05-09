// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420d9c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00433b76 } from "./433b76.js";
export function FUN_00420d9c(heap) {
  let bVar1 = 0;
  let bVar3 = 0;
  let in_CL = regs.ecx & 0xff;
  let bVar5 = 0;
  let bVar6 = 0;
  let in_DL = regs.edx & 0xff;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar9 = 0;
  let pbVar10 = 0;
  let uVar11 = 0;
  let cVar2 = 0;
  let cVar4 = 0;
  uVar9 = ((heap.u32(0x00991f74) + heap.i16((0x005f4686 + heap.u8(0x00991f88) * 4))) & 0xffff);
  if ((((heap.u32(0x00991f70) + heap.i16((0x005f4684 + heap.u8(0x00991f88) * 4))) & 0xffff) < 0x1000) && (uVar9 < 0x1000)) {
    uVar9 = ((uVar9 * 0x80 | uVar9 >>> 9 | heap.u32(0x00991f70) + heap.i16((0x005f4684 + heap.u8(0x00991f88) * 4))) & 0xffff);
    pbVar10 = ((heap.u32((0x00971ef4) + (((uVar9 >>> 5 | uVar9 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar1 = ((heap.u8(pbVar10)) & 0xff);
    while ((bVar1 & 0x3c) != 0) {
      pbVar10 = ((pbVar10 + 8) >>> 0);
      bVar1 = ((heap.u8(pbVar10)) & 0xff);
    }
    uVar9 = (((heap.u8(pbVar10 + (4)) & 0xf) << (in_CL & 0x1f)) & 0xffff);
    uVar7 = ((CONCAT11(heap.u8(pbVar10 + (2)) >>> 2, in_DL)) & 0xffff);
    uVar11 = ((heap.u8(pbVar10 + (4)) & 0x10 | ((uVar9 >>> 4 | uVar9) & 0xffff) & 0xf) >>> 0);
  } else {
    uVar11 = ((0) >>> 0);
    uVar7 = ((CONCAT11(1, in_DL)) & 0xffff);
  }
  cVar2 = ((((uVar7) << 24 >> 24)) & 0xff);
  bVar1 = ((cVar2 + heap.u32((0x005f46c4) + (unaff_EBX) * 4)) & 0xff);
  bVar5 = ((cVar2 + heap.u32((0x005f46e4) + (unaff_EBX) * 4)) & 0xff);
  cVar4 = (((((((uVar7) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
  bVar3 = ((cVar4 + heap.u32((0x005f46a4) + (uVar11) * 4)) & 0xff);
  bVar6 = ((cVar4 + heap.u32((0x005f4704) + (uVar11) * 4)) & 0xff);
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    if ((heap.u32(0x00991f8c) & 1) == 0) {
      return (regs.eax = FUN_00433b76(heap, uVar7));
    }
    heap.setU32(0x005f4724, (heap.u32(0x005f4770) + 5) >>> 0);
    uVar8 = ((((CONCAT11(bVar6, cVar2)) >>> 0)) >>> 0);
    uVar11 = ((uVar8) >>> 0);
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        uVar8 = ((((CONCAT11(bVar3, cVar2)) >>> 0)) >>> 0);
      }
      bVar3 = ((((uVar8 >>> 8) & 0xff)) & 0xff);
      uVar11 = ((uVar8) >>> 0);
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
        uVar8 = ((((CONCAT11(bVar3 + 1, ((uVar8) << 24 >> 24))) >>> 0)) >>> 0);
        uVar11 = ((uVar8) >>> 0);
      }
    }
    while (bVar3 = ((((uVar8 >>> 8) & 0xff)) & 0xff), bVar3 < bVar1 && (bVar3 < bVar5)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar8 = ((((bVar3 + 1) >>> 0) << 8) >>> 0);
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar11, unaff_EBX));
    }
  }
  return;
}
