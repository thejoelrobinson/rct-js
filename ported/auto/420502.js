// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420502.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/ghidra-builtins.js";
export function FUN_00420502(heap) {
  const __sp = heap.allocFrame(48);
  const __addr_DAT_005f4666 = __sp + 0;
  const __addr_DAT_005f4664 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_005f46e4 = __sp + 12;
  const __addr_DAT_005f4704 = __sp + 16;
  const __addr_DAT_005f46c4 = __sp + 20;
  const __addr_DAT_005f46a4 = __sp + 24;
  const __addr_PTR_LAB_00431bb8 = __sp + 28;
  const __addr_DAT_005f472e = __sp + 32;
  const __addr_DAT_005f475e = __sp + 36;
  const __addr_DAT_005f4746 = __sp + 40;
  const __addr_PTR_LAB_00432204 = __sp + 44;
  try {
  let iVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let in_CL = 0;
  let bVar4 = 0;
  let in_DL = 0;
  let bVar6 = 0;
  let uVar5 = 0;
  let unaff_EBX = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar10 = 0;
  uVar8 = heap.u32(0x00991f74) + heap.u32((__addr_DAT_005f4666 + heap.u32(0x00991f88) * 4));
  if (((heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4664 + heap.u32(0x00991f88) * 4))) < 0x1000) && (uVar8 < 0x1000)) {
    uVar8 = uVar8 * 0x80 | uVar8 >>> 9 | heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4664 + heap.u32(0x00991f88) * 4));
    pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((uVar8 >>> 5 | uVar8 << 0xb)) * 4);
    bVar6 = heap.u32(pbVar9);
    while ((bVar6 & 0x3c) != 0) {
      pbVar9 = pbVar9 + 8;
      bVar6 = heap.u32(pbVar9);
    }
    uVar8 = (heap.u32(pbVar9 + (4) * 4) & 0xf) << (in_CL & 0x1f);
    bVar6 = heap.u32(pbVar9 + (2) * 4) >>> 2;
    uVar10 = heap.u32(pbVar9 + (4) * 4) & 0x10 | (uVar8 >>> 4 | uVar8) & 0xf;
  } else {
    uVar10 = 0;
    bVar6 = 1;
  }
  bVar2 = in_DL + heap.u32((__addr_DAT_005f46e4) + (unaff_EBX) * 4);
  bVar4 = in_DL + heap.u32((__addr_DAT_005f4704) + (unaff_EBX) * 4);
  bVar3 = bVar6 + heap.u32((__addr_DAT_005f46c4) + (uVar10) * 4);
  bVar6 = bVar6 + heap.u32((__addr_DAT_005f46a4) + (uVar10) * 4);
  if ((bVar2 <= bVar3) && (bVar4 <= bVar6)) {
    return;
  }
  heap.setU32(0x005f4724, (heap.u32(0x005f476c)) >>> 0);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    heap.setU32(0x005f4724, (heap.u32(0x005f4770)) >>> 0);
  }
  uVar5 = CONCAT11(bVar6, in_DL);
  uVar10 = uVar5;
  if (bVar6 != bVar3) {
    if (bVar3 <= bVar6) {
      uVar5 = CONCAT11(bVar3, in_DL);
    }
    bVar6 = (byte)(uVar5 >>> 8);
    uVar10 = uVar5;
    if ((bVar6 != bVar2) && (bVar6 != bVar4)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar5 = CONCAT11(bVar6 + 1, uVar5);
      uVar10 = uVar5;
    }
  }
  LAB_0042060e: do {
    bVar6 = (byte)(uVar5 >>> 8);
    if ((bVar2 <= bVar6) || (bVar4 <= bVar6)) {
      if ((bVar2 <= bVar6) && (bVar4 <= bVar6)) {
        return;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(uVar10, unaff_EBX);
      return;
    }
    while (bVar6 != heap.u32(0x00999f9a)) {
      if (bVar6 <= heap.u32(0x00999f9a)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
        uVar5 = (byte)(bVar6 + 1) << 8;
        /* goto LAB_0042060e */ throw new Error("goto LAB_0042060e not supported");
      }
      heap.u8(0x999f9a) = heap.u16(0x999f9c);
      heap.u8(0x999f9b) = (byte)(heap.u16(0x999f9c) >>> 8);
      heap.u16(0x999f9c) = heap.u32(0x00999f9e);
      heap.u16(0x999f9e) = heap.u16(0x999fa0);
      heap.u16(0x999fa0) = heap.u32(0x00999fa2);
      heap.u16(0x999fa2) = heap.u16(0x999fa4);
      heap.u16(0x999fa4) = heap.u32(0x00999fa6);
      heap.u16(0x999fa6) = heap.u16(0x999fa8);
      heap.u16(0x999fa8) = heap.u32(0x00999faa);
      heap.u16(0x999faa) = heap.u16(0x999fac);
      heap.u16(0x999fac) = heap.u32(0x00999fae);
      heap.u16(0x999fae) = heap.u16(0x999fb0);
      heap.u16(0x999fb0) = heap.u32(0x00999fb2);
      heap.u16(0x999fb2) = heap.u16(0x999fb4);
      heap.u16(0x999fb4) = heap.u32(0x00999fb6);
      heap.u16(0x999fb6) = heap.u16(0x999fb8);
      heap.u16(0x999fb8) = heap.u32(0x00999fba);
      heap.u16(0x999fba) = heap.u16(0x999fbc);
      heap.u16(0x999fbc) = heap.u32(0x00999fbe);
      heap.u16(0x999fbe) = heap.u16(0x999fc0);
      heap.u16(0x999fc0) = heap.u32(0x00999fc2);
      heap.u16(0x999fc2) = heap.u16(0x999fc4);
      heap.u16(0x999fc4) = heap.u32(0x00999fc6);
      heap.u16(0x999fc6) = heap.u16(0x999fc8);
      heap.u16(0x999fc8) = heap.u32(0x00999fca);
      heap.u16(0x999fca) = heap.u16(0x999fcc);
      heap.u16(0x999fcc) = heap.u32(0x00999fce);
      heap.u16(0x999fce) = heap.u16(0x999fd0);
      heap.u16(0x999fd0) = heap.u32(0x00999fd2);
      heap.u16(0x999fd2) = heap.u16(0x999fd4);
      heap.u16(0x999fd4) = heap.u32(0x00999fd6);
      heap.u16(0x999fd6) = heap.u16(0x999fd8);
      heap.u16(0x999fd8) = uRam00999fda;
    }
    uVar7 = heap.u8(0x999f9b);
    bVar3 = bVar6 + heap.u32((__addr_DAT_005f472e) + (uVar7 * 2) * 4);
    if ((bVar2 < bVar3) || (bVar4 < bVar3)) {
      iVar1 = uVar7 * 2;
      heap.u8(0x999f9b) = heap.u32((__addr_DAT_005f475e) + (uVar7) * 4);
      uVar7 = heap.u8(0x999f9b);
      bVar3 = (bVar3 - heap.u32((__addr_DAT_005f472e) + (iVar1) * 4)) + heap.u32((__addr_DAT_005f472e) + (uVar7 * 2) * 4);
    }
    heap.setU32(0x0099a4ec, ((byte)(bVar3 - heap.u32((__addr_DAT_005f472e) + (uVar7 * 2) * 4)) * 0x10 + heap.u32((__addr_DAT_005f4746 + uVar7 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
    heap.setU32(0x0099a4ec, ((uVar5 >>> 8) * 0x10 + heap.u32((__addr_DAT_005f4746 + heap.u8(0x999f9b) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0x1f) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
    uVar5 = (byte)(bVar6 + heap.u32((__addr_DAT_005f472e) + (heap.u8(0x999f9b) * 2) * 4)) << 8;
    heap.u8(0x999f9a) = heap.u16(0x999f9c);
    heap.u8(0x999f9b) = (byte)(heap.u16(0x999f9c) >>> 8);
    heap.u16(0x999f9c) = heap.u32(0x00999f9e);
    heap.u16(0x999f9e) = heap.u16(0x999fa0);
    heap.u16(0x999fa0) = heap.u32(0x00999fa2);
    heap.u16(0x999fa2) = heap.u16(0x999fa4);
    heap.u16(0x999fa4) = heap.u32(0x00999fa6);
    heap.u16(0x999fa6) = heap.u16(0x999fa8);
    heap.u16(0x999fa8) = heap.u32(0x00999faa);
    heap.u16(0x999faa) = heap.u16(0x999fac);
    heap.u16(0x999fac) = heap.u32(0x00999fae);
    heap.u16(0x999fae) = heap.u16(0x999fb0);
    heap.u16(0x999fb0) = heap.u32(0x00999fb2);
    heap.u16(0x999fb2) = heap.u16(0x999fb4);
    heap.u16(0x999fb4) = heap.u32(0x00999fb6);
    heap.u16(0x999fb6) = heap.u16(0x999fb8);
    heap.u16(0x999fb8) = heap.u32(0x00999fba);
    heap.u16(0x999fba) = heap.u16(0x999fbc);
    heap.u16(0x999fbc) = heap.u32(0x00999fbe);
    heap.u16(0x999fbe) = heap.u16(0x999fc0);
    heap.u16(0x999fc0) = heap.u32(0x00999fc2);
    heap.u16(0x999fc2) = heap.u16(0x999fc4);
    heap.u16(0x999fc4) = heap.u32(0x00999fc6);
    heap.u16(0x999fc6) = heap.u16(0x999fc8);
    heap.u16(0x999fc8) = heap.u32(0x00999fca);
    heap.u16(0x999fca) = heap.u16(0x999fcc);
    heap.u16(0x999fcc) = heap.u32(0x00999fce);
    heap.u16(0x999fce) = heap.u16(0x999fd0);
    heap.u16(0x999fd0) = heap.u32(0x00999fd2);
    heap.u16(0x999fd2) = heap.u16(0x999fd4);
    heap.u16(0x999fd4) = heap.u32(0x00999fd6);
    heap.u16(0x999fd6) = heap.u16(0x999fd8);
    heap.u16(0x999fd8) = uRam00999fda;
  } while (true);
} finally {
    heap.freeFrame(48);
  }
}
