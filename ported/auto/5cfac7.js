// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfac7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005cfac7(heap) {
  let pbVar1 = 0;
  let puVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar5 = 0;
  let sVar6 = 0;
  let uVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar10 = 0;
  let iVar11 = 0;
  heap.setU32(0x00652470, (heap.u8(unaff_ESI + (7))) >>> 0);
  uVar9 = ((heap.u16((unaff_ESI + 5)) & 0xf) >>> 0);
  puVar2 = ((heap.u32((0x00652498) + (heap.u8(unaff_ESI + (4))) * 4)) >>> 0);
  iVar11 = ((((heap.u8(unaff_ESI + (4))) >>> 0) * 10) >>> 0);
  sVar6 = ((((in_EAX) << 16 >> 16)) & 0xffff);
  uVar4 = ((((((in_EAX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  switch (heap.u8(unaff_ESI) & 3) {
    case 0:
      uVar3 = ((CONCAT22(uVar4, (sVar6 + heap.i16((0x00653efd + iVar11))) - heap.i16((puVar2 + uVar9 * 10 + 1)))) >>> 0);
      uVar5 = (((in_CX + heap.i16((0x00653eff + iVar11))) - heap.i16((puVar2 + uVar9 * 10 + 3))) & 0xffff);
      break;
    case 1:
      uVar3 = ((CONCAT22(uVar4, (sVar6 + heap.i16((0x00653eff + iVar11))) - heap.i16((puVar2 + uVar9 * 10 + 3)))) >>> 0);
      uVar5 = (((in_CX - heap.i16((0x00653efd + iVar11))) + heap.i16((puVar2 + uVar9 * 10 + 1))) & 0xffff);
      break;
    case 2:
      uVar3 = ((CONCAT22(uVar4, (sVar6 - heap.i16((0x00653efd + iVar11))) + heap.i16((puVar2 + uVar9 * 10 + 1)))) >>> 0);
      uVar5 = (((in_CX - heap.i16((0x00653eff + iVar11))) + heap.i16((puVar2 + uVar9 * 10 + 3))) & 0xffff);
      break;
    case 3:
      uVar3 = ((CONCAT22(uVar4, (sVar6 - heap.i16((0x00653eff + iVar11))) + heap.i16((puVar2 + uVar9 * 10 + 3)))) >>> 0);
      uVar5 = (((in_CX + heap.i16((0x00653efd + iVar11))) - heap.i16((puVar2 + uVar9 * 10 + 1))) & 0xffff);
  }
  sVar6 = (((((heap.u8(unaff_ESI + (2))) & 0xffff) * 4 - heap.i16((puVar2 + uVar9 * 10 + 5))) + heap.i16((0x00653efb + iVar11))) & 0xffff);
  uVar7 = ((CONCAT11(heap.u32((0x00653ef8) + (iVar11) * 4), heap.u32((0x00653ef8) + (iVar11) * 4)) & 0x4ff) & 0xffff);
  uVar9 = ((CONCAT11((((uVar7 >>> 8)) << 24 >> 24), ((uVar7) << 24 >> 24) + heap.u8(unaff_ESI)) & 0xffffff03) >>> 0);
  bVar8 = ((((uVar9 >>> 8) & 0xff)) & 0xff);
  heap.setU32(0x00652471, (((uVar9) & 0xff) | bVar8) >>> 0);
  if (bVar8 == 0) {
    uVar3 = ((CONCAT22((((((uVar3) >>> 0) >>> 0x10)) << 16 >> 16), ((uVar3) << 16 >> 16) + heap.u32((0x00652478) + (((heap.u32(0x00652471)) >>> 0) * 2) * 4))) >>> 0);
    uVar5 = ((uVar5 + heap.u32((0x0065247a) + (((heap.u32(0x00652471)) >>> 0) * 2) * 4)) & 0xffff);
  }
  uVar5 = ((uVar5 << 7 | uVar5 >>> 9 | ((uVar3) & 0xffff)) & 0xffff);
  pbVar10 = ((heap.u32((0x00971ef4) + (((uVar5 >>> 5 | uVar5 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((heap.u8(pbVar10) & 0x3c) == 8) && (heap.u8(pbVar10 + (7)) == heap.u8(unaff_ESI + (7)))) && ((heap.u8(pbVar10 + (5)) & 0xf) == 0)) {
      iVar11 = ((((heap.u8(pbVar10 + (4))) >>> 0) * 10) >>> 0);
      uVar5 = ((CONCAT11(heap.u32((0x00653ef7) + (iVar11) * 4), heap.u32((0x00653ef7) + (iVar11) * 4)) & 0x4ff) & 0xffff);
      uVar9 = ((CONCAT11((((uVar5 >>> 8)) << 24 >> 24), ((uVar5) << 24 >> 24) + heap.u8(pbVar10)) & 0xffffff03) >>> 0);
      if ((((((uVar9) & 0xff) | ((uVar9 >>> 8) & 0xff)) & 0xff) == heap.u32(0x00652471)) && (((((heap.u8(pbVar10 + (2))) & 0xffff) * 4 + (heap.i16((0x00653ef9 + iVar11)) - heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar10 + (4))) * 4) + 5)))) & 0xffff) == sVar6)) {
        return CONCAT24(((heap.u8(pbVar10 + (2))) & 0xffff) << 2, uVar3);
      }
    }
    pbVar1 = ((pbVar10 + 1) >>> 0);
    pbVar10 = ((pbVar10 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return CONCAT24(sVar6, uVar3);
    }
  } while (true);
}
