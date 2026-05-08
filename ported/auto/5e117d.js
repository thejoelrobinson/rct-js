// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e117d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
export function FUN_005e117d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099ad63 = __sp + 0;
  try {
  let uVar1 = 0;
  let in_AX = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let in_DX = 0;
  let sVar4 = 0;
  let unaff_BX = 0;
  let uVar5 = 0;
  let unaff_BP = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  if (in_AX < 0) {
    in_AX = 0;
  }
  if (unaff_BX < 0) {
    unaff_BX = 0;
  }
  if (heap.u32(0x00971ed6) < in_DX) {
    in_DX = heap.u32(0x00971ed6);
  }
  if (heap.u32(0x00971ed8) < unaff_BP) {
    unaff_BP = heap.u32(0x00971ed8);
  }
  if ((in_AX < in_DX) && (unaff_BX < unaff_BP)) {
    uVar2 = in_AX >>> (heap.u32(0x00971eee) & 0x1f);
    uVar5 = unaff_BX >>> (heap.u32(0x00971eef) & 0x1f);
    sVar7 = (((unaff_BP - 1U) >>> (heap.u32(0x00971eef) & 0x1f)) - uVar5) + 1;
    sVar3 = heap.u32(0x00971ee6);
    puVar6 = __addr_DAT_0099ad63 + (uVar5 * sVar3 + uVar2);
    sVar4 = (((in_DX - 1U) >>> (heap.u32(0x00971eee) & 0x1f)) - uVar2) + 1;
    uVar1 = heap.u32(0x00971ee6) >>> 0x10;
    sVar8 = sVar4;
    do {
      do {
        heap.u32(puVar6) = 0xff;
        puVar6 = puVar6 + 1;
        sVar8 = sVar8 + -1;
      } while (sVar8 != 0);
      puVar6 = puVar6 + CONCAT22(uVar1, sVar3 - sVar4);
      sVar7 = sVar7 + -1;
      sVar8 = sVar4;
    } while (sVar7 != 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
