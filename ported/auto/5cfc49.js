// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfc49.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005cfc49(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar4 = 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar5 = 0;
  let pbVar6 = 0;
  let iVar7 = 0;
  heap.setU32(0x00652471, (((unaff_EBX) & 0xff)) >>> 0);
  uVar5 = ((unaff_EBX ^ 2) >>> 0);
  if ((uVar5 & 4) == 0) {
    in_EAX = ((CONCAT22((((((in_EAX) >>> 0) >>> 0x10)) << 16 >> 16), ((in_EAX) << 16 >> 16) + heap.u32((0x00652478) + (uVar5 * 2) * 4))) >>> 0);
    in_CX = ((in_CX + heap.u32((0x0065247a) + (uVar5 * 2) * 4)) & 0xffff);
  }
  uVar2 = ((((in_EAX) & 0xffff)) & 0xffff);
  uVar4 = ((in_CX << 7 | in_CX >>> 9 | uVar2) & 0xffff);
  pbVar6 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((heap.u8(pbVar6) & 0x3c) == 8) && (heap.u8(pbVar6 + (7)) == heap.u32(0x00652470))) && ((heap.u32(heap.u32((0x00652498) + (heap.u8(pbVar6 + (4))) * 4) + ((heap.u16((pbVar6 + 5)) & 0xf) * 10 + 10) * 4) | 0) == -1)) {
      iVar7 = ((((heap.u8(pbVar6 + (4))) >>> 0) * 10) >>> 0);
      uVar4 = ((CONCAT11(heap.u32((0x00653ef8) + (iVar7) * 4), heap.u32((0x00653ef8) + (iVar7) * 4)) & 0x4ff) & 0xffff);
      uVar5 = ((CONCAT11((((uVar4 >>> 8)) << 24 >> 24), ((uVar4) << 24 >> 24) + heap.u8(pbVar6)) & 0xffffff03) >>> 0);
      if ((((((uVar5) & 0xff) | ((uVar5 >>> 8) & 0xff)) & 0xff) == ((unaff_EBX) & 0xff)) && (((((heap.u8(pbVar6 + (2))) & 0xffff) * 4 + (heap.i16((0x00653efb + iVar7)) - heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar6 + (4))) * 4) + (heap.u8(pbVar6 + (5)) & 0xf) * 10 + 5)))) & 0xffff) == in_DX)) {
        switch (heap.u8(pbVar6) & 3) {
          case 0:
            sVar3 = ((uVar2 - heap.i16((0x00653efd + ((heap.u8(pbVar6 + (4))) >>> 0) * 10))) & 0xffff);
            break;
          case 1:
            sVar3 = ((uVar2 - heap.i16((0x00653eff + ((heap.u8(pbVar6 + (4))) >>> 0) * 10))) & 0xffff);
            break;
          case 2:
            sVar3 = ((uVar2 + heap.i16((0x00653efd + ((heap.u8(pbVar6 + (4))) >>> 0) * 10))) & 0xffff);
            break;
          case 3:
            sVar3 = ((uVar2 + heap.i16((0x00653eff + ((heap.u8(pbVar6 + (4))) >>> 0) * 10))) & 0xffff);
        }
        return CONCAT24(((heap.u8(pbVar6 + (2))) & 0xffff) * 4 + (heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar6 + (4))) * 4) + 5)) - heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar6 + (4))) * 4) + (heap.u16((pbVar6 + 5)) & 0xf) * 10 + 5))), CONCAT22(sVar3, uVar2));
      }
    }
    pbVar1 = ((pbVar6 + 1) >>> 0);
    pbVar6 = ((pbVar6 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return CONCAT24(in_DX, in_EAX);
    }
  } while (true);
}
