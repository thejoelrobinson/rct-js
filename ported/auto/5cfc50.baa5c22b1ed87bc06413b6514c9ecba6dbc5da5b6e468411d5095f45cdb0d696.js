// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfc50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005cfc50(heap) {
  let pbVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar5 = 0;
  let uVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar6 = 0;
  let sVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar10 = 0;
  let iVar11 = 0;
  heap.setU32(0x00652470, (heap.u8(unaff_ESI + (7))) >>> 0);
  uVar9 = ((heap.u16((unaff_ESI + 5)) & 0xf) >>> 0);
  puVar2 = ((heap.u32((0x00652498) + (heap.u8(unaff_ESI + (4))) * 4)) >>> 0);
  iVar11 = ((((heap.u8(unaff_ESI + (4))) >>> 0) * 10) >>> 0);
  sVar7 = ((((in_EAX) << 16 >> 16)) & 0xffff);
  uVar5 = ((((((in_EAX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  switch (heap.u8(unaff_ESI) & 3) {
    case 0:
      uVar4 = ((CONCAT22(uVar5, sVar7 - heap.i16((puVar2 + uVar9 * 10 + 1)))) >>> 0);
      uVar6 = ((in_CX - heap.i16((puVar2 + uVar9 * 10 + 3))) & 0xffff);
      break;
    case 1:
      uVar4 = ((CONCAT22(uVar5, sVar7 - heap.i16((puVar2 + uVar9 * 10 + 3)))) >>> 0);
      uVar6 = ((in_CX + heap.i16((puVar2 + uVar9 * 10 + 1))) & 0xffff);
      break;
    case 2:
      uVar4 = ((CONCAT22(uVar5, sVar7 + heap.i16((puVar2 + uVar9 * 10 + 1)))) >>> 0);
      uVar6 = ((in_CX + heap.i16((puVar2 + uVar9 * 10 + 3))) & 0xffff);
      break;
    case 3:
      uVar4 = ((CONCAT22(uVar5, sVar7 + heap.i16((puVar2 + uVar9 * 10 + 3)))) >>> 0);
      uVar6 = ((in_CX - heap.i16((puVar2 + uVar9 * 10 + 1))) & 0xffff);
  }
  sVar7 = (((((heap.u8(unaff_ESI + (2))) & 0xffff) * 4 - heap.i16((puVar2 + uVar9 * 10 + 5))) + heap.i16((0x00653ef9 + iVar11))) & 0xffff);
  uVar3 = ((CONCAT11(heap.u32((0x00653ef7) + (iVar11) * 4), heap.u32((0x00653ef7) + (iVar11) * 4)) & 0x4ff) & 0xffff);
  uVar9 = ((CONCAT11((((uVar3 >>> 8)) << 24 >> 24), ((uVar3) << 24 >> 24) + heap.u8(unaff_ESI)) & 0xffffff03) >>> 0);
  heap.setU32(0x00652471, (((uVar9) & 0xff) | ((uVar9 >>> 8) & 0xff)) >>> 0);
  bVar8 = ((heap.u32(0x00652471) ^ 2) & 0xff);
  if ((bVar8 & 4) == 0) {
    uVar4 = ((CONCAT22((((((uVar4) >>> 0) >>> 0x10)) << 16 >> 16), ((uVar4) << 16 >> 16) + heap.u32((0x00652478) + (((bVar8) >>> 0) * 2) * 4))) >>> 0);
    uVar6 = ((uVar6 + heap.u32((0x0065247a) + (((bVar8) >>> 0) * 2) * 4)) & 0xffff);
  }
  uVar3 = ((((uVar4) & 0xffff)) & 0xffff);
  uVar6 = ((uVar6 << 7 | uVar6 >>> 9 | uVar3) & 0xffff);
  pbVar10 = ((heap.u32((0x00971ef4) + (((uVar6 >>> 5 | uVar6 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((heap.u8(pbVar10) & 0x3c) == 8) && (heap.u8(pbVar10 + (7)) == heap.u8(unaff_ESI + (7)))) && ((heap.u32(heap.u32((0x00652498) + (heap.u8(pbVar10 + (4))) * 4) + ((heap.u16((pbVar10 + 5)) & 0xf) * 10 + 10) * 4) | 0) == -1)) {
      iVar11 = ((((heap.u8(pbVar10 + (4))) >>> 0) * 10) >>> 0);
      uVar6 = ((CONCAT11(heap.u32((0x00653ef8) + (iVar11) * 4), heap.u32((0x00653ef8) + (iVar11) * 4)) & 0x4ff) & 0xffff);
      uVar9 = ((CONCAT11((((uVar6 >>> 8)) << 24 >> 24), ((uVar6) << 24 >> 24) + heap.u8(pbVar10)) & 0xffffff03) >>> 0);
      if ((((((uVar9) & 0xff) | ((uVar9 >>> 8) & 0xff)) & 0xff) == heap.u32(0x00652471)) && (((((heap.u8(pbVar10 + (2))) & 0xffff) * 4 + (heap.i16((0x00653efb + iVar11)) - heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar10 + (4))) * 4) + (heap.u8(pbVar10 + (5)) & 0xf) * 10 + 5)))) & 0xffff) == sVar7)) {
        switch (heap.u8(pbVar10) & 3) {
          case 0:
            sVar7 = ((uVar3 - heap.i16((0x00653efd + ((heap.u8(pbVar10 + (4))) >>> 0) * 10))) & 0xffff);
            break;
          case 1:
            sVar7 = ((uVar3 - heap.i16((0x00653eff + ((heap.u8(pbVar10 + (4))) >>> 0) * 10))) & 0xffff);
            break;
          case 2:
            sVar7 = ((uVar3 + heap.i16((0x00653efd + ((heap.u8(pbVar10 + (4))) >>> 0) * 10))) & 0xffff);
            break;
          case 3:
            sVar7 = ((uVar3 + heap.i16((0x00653eff + ((heap.u8(pbVar10 + (4))) >>> 0) * 10))) & 0xffff);
        }
        return CONCAT24(((heap.u8(pbVar10 + (2))) & 0xffff) * 4 + (heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar10 + (4))) * 4) + 5)) - heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar10 + (4))) * 4) + (heap.u16((pbVar10 + 5)) & 0xf) * 10 + 5))), CONCAT22(sVar7, uVar3));
      }
    }
    pbVar1 = ((pbVar10 + 1) >>> 0);
    pbVar10 = ((pbVar10 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return CONCAT24(sVar7, uVar4);
    }
  } while (true);
}
