// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42094b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/ghidra-builtins.js";
export function FUN_0042094b(heap) {
  const __sp = heap.allocFrame(48);
  const __addr_DAT_005f4676 = __sp + 0;
  const __addr_DAT_005f4674 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_005f46a4 = __sp + 12;
  const __addr_DAT_005f4704 = __sp + 16;
  const __addr_DAT_005f46c4 = __sp + 20;
  const __addr_DAT_005f46e4 = __sp + 24;
  const __addr_PTR_LAB_00431bb8 = __sp + 28;
  const __addr_DAT_005f472e = __sp + 32;
  const __addr_DAT_005f475e = __sp + 36;
  const __addr_DAT_005f4746 = __sp + 40;
  const __addr_PTR_LAB_00432204 = __sp + 44;
  try {
  let bVar1 = 0;
  let bVar2 = 0;
  let in_CL = 0;
  let bVar3 = 0;
  let in_DL = 0;
  let bVar5 = 0;
  let uVar4 = 0;
  let unaff_EBX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let uVar10 = 0;
  uVar7 = heap.u32(0x00991f74) + heap.u32((__addr_DAT_005f4676 + heap.u32(0x00991f88) * 4));
  if (((heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4674 + heap.u32(0x00991f88) * 4))) < 0x1000) && (uVar7 < 0x1000)) {
    uVar7 = uVar7 * 0x80 | uVar7 >>> 9 | heap.u32(0x00991f70) + heap.u32((__addr_DAT_005f4674 + heap.u32(0x00991f88) * 4));
    pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((uVar7 >>> 5 | uVar7 << 0xb)) * 4);
    bVar5 = heap.u32(pbVar9);
    while ((bVar5 & 0x3c) != 0) {
      pbVar9 = pbVar9 + 8;
      bVar5 = heap.u32(pbVar9);
    }
    uVar7 = (heap.u32(pbVar9 + (4) * 4) & 0xf) << (in_CL & 0x1f);
    bVar5 = heap.u32(pbVar9 + (2) * 4) >>> 2;
    uVar10 = heap.u32(pbVar9 + (4) * 4) & 0x10 | (uVar7 >>> 4 | uVar7) & 0xf;
  } else {
    uVar10 = 0;
    bVar5 = 1;
  }
  bVar1 = in_DL + heap.u32((__addr_DAT_005f46a4) + (unaff_EBX) * 4);
  bVar3 = in_DL + heap.u32((__addr_DAT_005f4704) + (unaff_EBX) * 4);
  bVar2 = bVar5 + heap.u32((__addr_DAT_005f46c4) + (uVar10) * 4);
  bVar5 = bVar5 + heap.u32((__addr_DAT_005f46e4) + (uVar10) * 4);
  if ((bVar1 <= bVar2) && (bVar3 <= bVar5)) {
    return;
  }
  iVar8 = heap.u32(0x005f476c);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    iVar8 = heap.u32(0x005f4770);
  }
  heap.setU32(0x005f4724, (iVar8 + 5) >>> 0);
  uVar4 = CONCAT11(bVar5, in_DL);
  uVar10 = uVar4;
  if (bVar5 != bVar2) {
    if (bVar2 <= bVar5) {
      uVar4 = CONCAT11(bVar2, in_DL);
    }
    bVar5 = (byte)(uVar4 >>> 8);
    uVar10 = uVar4;
    if ((bVar5 != bVar1) && (bVar5 != bVar3)) {
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
      uVar4 = CONCAT11(bVar5 + 1, uVar4);
      uVar10 = uVar4;
    }
  }
  LAB_00420a5a: do {
    bVar5 = (byte)(uVar4 >>> 8);
    if ((bVar1 <= bVar5) || (bVar3 <= bVar5)) {
      if ((bVar1 <= bVar5) && (bVar3 <= bVar5)) {
        return;
      }
      (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))(uVar10, unaff_EBX);
      return;
    }
    while (bVar5 != heap.u32(0x00999fdc)) {
      if (bVar5 <= heap.u32(0x00999fdc)) {
        (heap.u32(heap.u32((__addr_PTR_LAB_00431bb8) + (heap.u32(0x00991f88)) * 4)))();
        uVar4 = (byte)(bVar5 + 1) << 8;
        /* goto LAB_00420a5a */ throw new Error("goto LAB_00420a5a not supported");
      }
      heap.u8(0x999fdc) = heap.u16(0x999fde);
      heap.u8(0x999fdd) = (byte)(heap.u16(0x999fde) >>> 8);
      heap.u16(0x999fde) = heap.u32(0x00999fe0);
      heap.u16(0x999fe0) = heap.u16(0x999fe2);
      heap.u16(0x999fe2) = heap.u32(0x00999fe4);
      heap.u16(0x999fe4) = heap.u16(0x999fe6);
      heap.u16(0x999fe6) = heap.u32(0x00999fe8);
      heap.u16(0x999fe8) = heap.u16(0x999fea);
      heap.u16(0x999fea) = heap.u32(0x00999fec);
      heap.u16(0x999fec) = heap.u16(0x999fee);
      heap.u16(0x999fee) = heap.u32(0x00999ff0);
      heap.u16(0x999ff0) = heap.u16(0x999ff2);
      heap.u16(0x999ff2) = heap.u32(0x00999ff4);
      heap.u16(0x999ff4) = heap.u16(0x999ff6);
      heap.u16(0x999ff6) = heap.u32(0x00999ff8);
      heap.u16(0x999ff8) = heap.u16(0x999ffa);
      heap.u16(0x999ffa) = heap.u32(0x00999ffc);
      heap.u16(0x999ffc) = heap.u16(0x999ffe);
      heap.u16(0x999ffe) = heap.u32(0x0099a000);
      heap.u16(0x99a000) = heap.u16(0x99a002);
      heap.u16(0x99a002) = heap.u32(0x0099a004);
      heap.u16(0x99a004) = heap.u16(0x99a006);
      heap.u16(0x99a006) = heap.u32(0x0099a008);
      heap.u16(0x99a008) = heap.u16(0x99a00a);
      heap.u16(0x99a00a) = heap.u32(0x0099a00c);
      heap.u16(0x99a00c) = heap.u16(0x99a00e);
      heap.u16(0x99a00e) = heap.u32(0x0099a010);
      heap.u16(0x99a010) = heap.u16(0x99a012);
      heap.u16(0x99a012) = heap.u32(0x0099a014);
      heap.u16(0x99a014) = heap.u16(0x99a016);
      heap.u16(0x99a016) = heap.u32(0x0099a018);
      heap.u16(0x99a018) = heap.u16(0x99a01a);
      heap.u16(0x99a01a) = uRam0099a01c;
    }
    uVar6 = heap.u8(0x999fdd);
    bVar2 = bVar5 + heap.u32((__addr_DAT_005f472e) + (uVar6 * 2) * 4);
    if ((bVar1 < bVar2) || (bVar3 < bVar2)) {
      iVar8 = uVar6 * 2;
      heap.u8(0x999fdd) = heap.u32((__addr_DAT_005f475e) + (uVar6) * 4);
      uVar6 = heap.u8(0x999fdd);
      bVar2 = (bVar2 - heap.u32((__addr_DAT_005f472e) + (iVar8) * 4)) + heap.u32((__addr_DAT_005f472e) + (uVar6 * 2) * 4);
    }
    heap.setU32(0x0099a4ec, ((byte)(bVar2 - heap.u32((__addr_DAT_005f472e) + (uVar6 * 2) * 4)) * 0x10 + heap.u32((__addr_DAT_005f4746 + uVar6 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
    heap.setU32(0x0099a4ec, ((uVar4 >>> 8) * 0x10 + heap.u32((__addr_DAT_005f4746 + heap.u8(0x999fdd) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0x1f) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00432204) + (heap.u32(0x00991f88)) * 4)))();
    uVar4 = (byte)(bVar5 + heap.u32((__addr_DAT_005f472e) + (heap.u8(0x999fdd) * 2) * 4)) << 8;
    heap.u8(0x999fdc) = heap.u16(0x999fde);
    heap.u8(0x999fdd) = (byte)(heap.u16(0x999fde) >>> 8);
    heap.u16(0x999fde) = heap.u32(0x00999fe0);
    heap.u16(0x999fe0) = heap.u16(0x999fe2);
    heap.u16(0x999fe2) = heap.u32(0x00999fe4);
    heap.u16(0x999fe4) = heap.u16(0x999fe6);
    heap.u16(0x999fe6) = heap.u32(0x00999fe8);
    heap.u16(0x999fe8) = heap.u16(0x999fea);
    heap.u16(0x999fea) = heap.u32(0x00999fec);
    heap.u16(0x999fec) = heap.u16(0x999fee);
    heap.u16(0x999fee) = heap.u32(0x00999ff0);
    heap.u16(0x999ff0) = heap.u16(0x999ff2);
    heap.u16(0x999ff2) = heap.u32(0x00999ff4);
    heap.u16(0x999ff4) = heap.u16(0x999ff6);
    heap.u16(0x999ff6) = heap.u32(0x00999ff8);
    heap.u16(0x999ff8) = heap.u16(0x999ffa);
    heap.u16(0x999ffa) = heap.u32(0x00999ffc);
    heap.u16(0x999ffc) = heap.u16(0x999ffe);
    heap.u16(0x999ffe) = heap.u32(0x0099a000);
    heap.u16(0x99a000) = heap.u16(0x99a002);
    heap.u16(0x99a002) = heap.u32(0x0099a004);
    heap.u16(0x99a004) = heap.u16(0x99a006);
    heap.u16(0x99a006) = heap.u32(0x0099a008);
    heap.u16(0x99a008) = heap.u16(0x99a00a);
    heap.u16(0x99a00a) = heap.u32(0x0099a00c);
    heap.u16(0x99a00c) = heap.u16(0x99a00e);
    heap.u16(0x99a00e) = heap.u32(0x0099a010);
    heap.u16(0x99a010) = heap.u16(0x99a012);
    heap.u16(0x99a012) = heap.u32(0x0099a014);
    heap.u16(0x99a014) = heap.u16(0x99a016);
    heap.u16(0x99a016) = heap.u32(0x0099a018);
    heap.u16(0x99a018) = heap.u16(0x99a01a);
    heap.u16(0x99a01a) = uRam0099a01c;
  } while (true);
} finally {
    heap.freeFrame(48);
  }
}
