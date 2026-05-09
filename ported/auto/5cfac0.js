// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfac0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005cfac0(heap) {
  let pbVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar2 = 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar3 = 0;
  let pbVar4 = 0;
  let iVar5 = 0;
  heap.setU32(0x00652471, (((unaff_EBX) & 0xff)) >>> 0);
  if ((unaff_EBX & 4) == 0) {
    in_EAX = ((CONCAT22((((((in_EAX) >>> 0) >>> 0x10)) << 16 >> 16), ((in_EAX) << 16 >> 16) + heap.u32((0x00652478) + (unaff_EBX * 2) * 4))) >>> 0);
    in_CX = ((in_CX + heap.u32((0x0065247a) + (unaff_EBX * 2) * 4)) & 0xffff);
  }
  uVar2 = ((in_CX << 7 | in_CX >>> 9 | ((in_EAX) & 0xffff)) & 0xffff);
  pbVar4 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((heap.u8(pbVar4) & 0x3c) == 8) && (heap.u8(pbVar4 + (7)) == heap.u32(0x00652470))) && ((heap.u8(pbVar4 + (5)) & 0xf) == 0)) {
      iVar5 = ((((heap.u8(pbVar4 + (4))) >>> 0) * 10) >>> 0);
      uVar2 = ((CONCAT11(heap.u32((0x00653ef7) + (iVar5) * 4), heap.u32((0x00653ef7) + (iVar5) * 4)) & 0x4ff) & 0xffff);
      uVar3 = ((CONCAT11((((uVar2 >>> 8)) << 24 >> 24), ((uVar2) << 24 >> 24) + heap.u8(pbVar4)) & 0xffffff03) >>> 0);
      if ((((((uVar3) & 0xff) | ((uVar3 >>> 8) & 0xff)) & 0xff) == ((unaff_EBX) & 0xff)) && (((((heap.u8(pbVar4 + (2))) & 0xffff) * 4 + (heap.i16((0x00653ef9 + iVar5)) - heap.i16((heap.u32((0x00652498) + (heap.u8(pbVar4 + (4))) * 4) + 5)))) & 0xffff) == in_DX)) {
        return CONCAT24(((heap.u8(pbVar4 + (2))) & 0xffff) << 2, in_EAX);
      }
    }
    pbVar1 = ((pbVar4 + 1) >>> 0);
    pbVar4 = ((pbVar4 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return CONCAT24(in_DX, in_EAX);
    }
  } while (true);
}
