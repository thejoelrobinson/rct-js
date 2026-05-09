// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44ba99.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0044ba99(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar7 = 0;
  iVar1 = ((heap.i32((unaff_ESI + 0x1c))) >>> 0);
  iVar7 = ((iVar1 + 0x40) >>> 0);
  sVar6 = ((heap.i16((iVar1 + 0x42))) & 0xffff);
  sVar4 = ((heap.i16((iVar1 + 0x44)) - sVar6) & 0xffff);
  uVar3 = ((heap.u32((unaff_ESI + 0x10)) >>> 4) >>> 0);
  sVar5 = ((8) & 0xffff);
  do {
    uVar2 = ((uVar3 & 1) >>> 0);
    uVar3 = ((uVar3 >>> 1) >>> 0);
    if (uVar2 == 0) {
      heap.setI16((iVar7 + 2), (sVar6) & 0xffff);
      sVar6 = ((sVar6 + sVar4) & 0xffff);
      heap.setI16((iVar7 + 4), (sVar6) & 0xffff);
      sVar6 = ((sVar6 + 1) & 0xffff);
    }
    iVar7 = ((iVar7 + 0x10) >>> 0);
    sVar5 = ((sVar5 + -1) & 0xffff);
  } while (sVar5 != 0);
  return;
}
