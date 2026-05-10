// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e117d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e117d(heap) {
  let uVar1 = 0;
  let in_AX = regs.eax & 0xffff;
  let uVar2 = 0;
  let sVar3 = 0;
  let in_DX = regs.edx & 0xffff;
  let sVar4 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar5 = 0;
  let puVar6 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let sVar7 = 0;
  let sVar8 = 0;
  if (((in_AX) << 16 >> 16) < 0) {
    in_AX = ((0) & 0xffff);
  }
  if (((unaff_BX) << 16 >> 16) < 0) {
    unaff_BX = ((0) & 0xffff);
  }
  if (heap.u32(0x00971ed6) < in_DX) {
    in_DX = ((heap.u32(0x00971ed6)) & 0xffff);
  }
  if (heap.u32(0x00971ed8) < unaff_BP) {
    unaff_BP = ((heap.u32(0x00971ed8)) & 0xffff);
  }
  if ((((in_AX) << 16 >> 16) < in_DX) && (((unaff_BX) << 16 >> 16) < unaff_BP)) {
    uVar2 = ((in_AX >>> (heap.u8(0x00971eee) & 0x1f)) & 0xffff);
    uVar5 = ((unaff_BX >>> (heap.u8(0x00971eef) & 0x1f)) & 0xffff);
    sVar7 = ((((((unaff_BP - 1) & 0xffff) >>> (heap.u8(0x00971eef) & 0x1f)) - uVar5) + 1) & 0xffff);
    sVar3 = ((heap.i16(0x00971ee6)) & 0xffff);
    puVar6 = ((0x0099ad63 + ((uVar5 * sVar3 + uVar2) & 0xffff)) >>> 0);
    sVar4 = ((((((in_DX - 1) & 0xffff) >>> (heap.u8(0x00971eee) & 0x1f)) - uVar2) + 1) & 0xffff);
    uVar1 = ((heap.u32(0x00971ee6) >>> 0x10) >>> 0);
    sVar8 = ((sVar4) & 0xffff);
    do {
      do {
        heap.setU32(puVar6, (0xff) & 0xffffffff);
        puVar6 = ((puVar6 + 1) >>> 0);
        sVar8 = ((sVar8 + -1) & 0xffff);
      } while (sVar8 != 0);
      puVar6 = ((puVar6 + CONCAT22(((uVar1) << 16 >> 16), sVar3 - sVar4)) >>> 0);
      sVar7 = ((sVar7 + -1) & 0xffff);
      sVar8 = ((sVar4) & 0xffff);
    } while (sVar7 != 0);
  }
  return;
}
