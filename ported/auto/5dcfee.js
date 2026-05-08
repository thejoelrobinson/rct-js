// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dcfee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44, SBORROW2 } from "../runtime/win32.js";
export function FUN_005dcfee(heap) {
  const __sp = heap.allocFrame(52);
  const __addr_DAT_006567f4 = __sp + 0;
  const __addr_DAT_006567f5 = __sp + 4;
  const __addr_DAT_006567f6 = __sp + 8;
  const __addr_DAT_006567f7 = __sp + 12;
  const __addr_DAT_0065e7bc = __sp + 16;
  const __addr_DAT_00991f8e = __sp + 20;
  const __addr_DAT_00743b94 = __sp + 24;
  const __addr_DAT_00743bc4 = __sp + 28;
  const __addr_DAT_00743ba2 = __sp + 32;
  const __addr_DAT_00743ba4 = __sp + 36;
  const __addr_DAT_00743bd8 = __sp + 40;
  const __addr_DAT_00743b96 = __sp + 44;
  const __addr_DAT_0065e7dc = __sp + 48;
  try {
  let sVar1 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  uVar4 = (uint)(heap.u32((unaff_ESI + 0x36)) >>> 2);
  sVar1 = in_EAX;
  sVar5 = ((uint) * (unaff_ESI + 0x44) * 0x1e >>> 9);
  if (((((sVar1 - sVar5) < (heap.u32((ushort)(byte)(__addr_DAT_006567f4) + (uVar4 * 4) * 4) + heap.u32((unaff_ESI + 0x38)))) || ((in_CX - sVar5) < (heap.u32((ushort)(byte)(__addr_DAT_006567f5) + (uVar4 * 4) * 4) + heap.u32((unaff_ESI + 0x3a))))) || ((heap.u32((ushort)(byte)(__addr_DAT_006567f6) + (uVar4 * 4) * 4) + heap.u32((unaff_ESI + 0x38))) < (sVar1 + sVar5))) || ((heap.u32((ushort)(byte)(__addr_DAT_006567f7) + (uVar4 * 4) * 4) + heap.u32((unaff_ESI + 0x3a))) < (in_CX + sVar5))) {
    return CONCAT44(heap, in_EDX, in_EAX);
  }
  uVar4 = (uint)(ushort)((ushort)((in_EAX & 0xfe0) << 2) | in_CX >>> 5 & 0x7f);
  piVar6 = __addr_DAT_0065e7bc;
  do {
    uVar3 = heap.u32((__addr_DAT_00991f8e) + (uVar4 & 0x3fff) * 4);
    while (uVar3 != 0xffff) {
      uVar7 = uVar3;
      iVar8 = uVar7 * 0x100;
      if (((__addr_DAT_00743b94 + iVar8 != unaff_ESI) && (heap.u32((__addr_DAT_00743b94) + (iVar8) * 4) == '\0')) && (heap.u32(unaff_ESI + (0x30) * 4) == heap.u32((__addr_DAT_00743bc4) + (iVar8) * 4))) {
        uVar3 = sVar1 - heap.u32((__addr_DAT_00743ba2) + (uVar7 * 0x80) * 4);
        if (!SBORROW2(heap, sVar1, heap.u32((__addr_DAT_00743ba2) + (uVar7 * 0x80) * 4))) {
          if (uVar3 < 0) {
            uVar3 = -uVar3;
          }
          uVar2 = in_CX - heap.u32((__addr_DAT_00743ba4) + (uVar7 * 0x80) * 4);
          if (!SBORROW2(heap, in_CX, heap.u32((__addr_DAT_00743ba4) + (uVar7 * 0x80) * 4))) {
            if (uVar2 < 0) {
              uVar2 = -uVar2;
            }
            if (uVar3 <= uVar2) {
              uVar3 = uVar2;
            }
            if (uVar3 < (ushort)((uint)((ushort)(heap.u32((unaff_ESI + 0x44)) + heap.u32((__addr_DAT_00743bd8 + iVar8))) >>> 1) * 0x1e >>> 8)) {
              return CONCAT44(heap, in_EDX, in_EAX);
            }
          }
        }
      }
      uVar3 = heap.u32((__addr_DAT_00743b96) + (uVar7 * 0x80) * 4);
    }
    uVar4 = (uVar4 & 0x3fff) + heap.u32(piVar6);
    piVar6 = piVar6 + 1;
    if (__addr_DAT_0065e7dc < piVar6) {
      return CONCAT44(heap, in_EDX, in_EAX);
    }
  } while (true);
} finally {
    heap.freeFrame(52);
  }
}
