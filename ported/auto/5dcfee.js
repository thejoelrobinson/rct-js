// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dcfee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44, SBORROW2 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005dcfee(heap) {
  let sVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let piVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  uVar4 = ((((heap.u16((unaff_ESI + 0x36)) >>> 2) >>> 0)) >>> 0);
  sVar1 = ((((in_EAX) << 16 >> 16)) & 0xffff);
  sVar5 = (((((heap.u32((unaff_ESI + 0x44)) * 0x1e >>> 9)) << 16 >> 16)) & 0xffff);
  if (((((((sVar1 - sVar5)) << 16 >> 16) < (((heap.u32(((0x006567f4) & 0xffff) + (uVar4 * 4) * 4) + heap.i16((unaff_ESI + 0x38)))) << 16 >> 16)) || ((((in_CX - sVar5)) << 16 >> 16) < (((heap.u32(((0x006567f5) & 0xffff) + (uVar4 * 4) * 4) + heap.i16((unaff_ESI + 0x3a)))) << 16 >> 16))) || ((((heap.u32(((0x006567f6) & 0xffff) + (uVar4 * 4) * 4) + heap.i16((unaff_ESI + 0x38)))) << 16 >> 16) < (((sVar1 + sVar5)) << 16 >> 16))) || ((((heap.u32(((0x006567f7) & 0xffff) + (uVar4 * 4) * 4) + heap.i16((unaff_ESI + 0x3a)))) << 16 >> 16) < (((in_CX + sVar5)) << 16 >> 16))) {
    return 1;
  }
  uVar4 = (((((((in_EAX & 0xfe0) << 2) & 0xffff) | in_CX >>> 5 & 0x7f) >>> 0)) >>> 0);
  piVar6 = ((0x0065e7bc) >>> 0);
  do {
    uVar3 = ((heap.u32((0x00991f8e) + (uVar4 & 0x3fff) * 4)) & 0xffff);
    while (uVar3 != 0xffff) {
      uVar7 = ((((uVar3) >>> 0)) >>> 0);
      iVar8 = ((uVar7 * 0x100) >>> 0);
      if (((0x00743b94 + iVar8 != unaff_ESI) && (heap.u32((0x00743b94) + (iVar8) * 4) == 0)) && (heap.i8(unaff_ESI + (0x30)) == heap.u32((0x00743bc4) + (iVar8) * 4))) {
        uVar3 = ((sVar1 - heap.u32((0x00743ba2) + (uVar7 * 0x80) * 4)) & 0xffff);
        if (!SBORROW2(sVar1, heap.u32((0x00743ba2) + (uVar7 * 0x80) * 4))) {
          if (((uVar3) << 16 >> 16) < 0) {
            uVar3 = ((-uVar3) & 0xffff);
          }
          uVar2 = ((in_CX - heap.u32((0x00743ba4) + (uVar7 * 0x80) * 4)) & 0xffff);
          if (!SBORROW2(in_CX, heap.u32((0x00743ba4) + (uVar7 * 0x80) * 4))) {
            if (((uVar2) << 16 >> 16) < 0) {
              uVar2 = ((-uVar2) & 0xffff);
            }
            if (uVar3 <= uVar2) {
              uVar3 = ((uVar2) & 0xffff);
            }
            if (uVar3 < ((((((heap.i16((unaff_ESI + 0x44)) + heap.i16((0x00743bd8 + iVar8))) & 0xffff) >>> 1) >>> 0) * 0x1e >>> 8) & 0xffff)) {
              return 1;
            }
          }
        }
      }
      uVar3 = ((heap.u32((0x00743b96) + (uVar7 * 0x80) * 4)) & 0xffff);
    }
    uVar4 = (((uVar4 & 0x3fff) + heap.i32(piVar6)) >>> 0);
    piVar6 = ((piVar6 + ((1) * 4)) >>> 0);
    if (0x0065e7dc < piVar6) {
      return 1;
    }
  } while (true);
}
