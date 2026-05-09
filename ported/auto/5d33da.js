// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d33da.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005d33da(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_uStack_4 = __sp + 0;
  const __addr_puStack_18 = __sp + 4;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let bVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_CF = regs.cf | 0;
  let bVar4 = 0;
  let in_ZF = regs.zf | 0;
  LAB_005d3452: {
  heap.setU32(__addr_uStack_4, (in_EDX) >>> 0);
  uVar1 = (((regs.ecx = 0x8d, regs.eax = FUN_005e3b2b(heap))) >>> 0);
  heap.setU32(__addr_puStack_18, (__addr_uStack_4) >>> 0);
  if (((!in_ZF) && (in_CF = ((0) & 0xff), heap.u8(0x00652288) != 0)) && (in_CF = ((heap.u8(0x00652289) < ((heap.u8(unaff_ESI + (7))) & 0xff)) & 0xff), heap.u8(0x00652289) == heap.u8(unaff_ESI + (7)))) {
    (regs.eax = FUN_005d21fa(heap));
  }
  while (true) {
    heap.setU32(__addr_puStack_18, (unaff_ESI) >>> 0);
    uVar2 = (((regs.eax = FUN_005cfc50(heap))) >>> 0);
    if (in_CF) {
      break;
    }
    in_CF = ((0xfffffff3 < __addr_puStack_18) & 0xff);
    uVar1 = ((uVar2) >>> 0);
  }
  bVar3 = ((0) & 0xff);
  do {
    if ((heap.u32((0x006559d8) + (((((heap.u8(heap.u32(__addr_puStack_18) + (4))) & 0xff)) >>> 0) * 0x10) * 4) & 0x10) == 0) {
      if (bVar3 != 0) {
        if (bVar3 < 2) {
          break LAB_005d3452;
        }
        bVar3 = ((0) & 0xff);
      }
    } else {
      bVar3 = ((bVar3 + 1) & 0xff);
    }
    bVar4 = ((false) & 0xff);
    uVar1 = (((regs.eax = FUN_005cfac7(heap))) >>> 0);
  } while (!bVar4);
  if ((bVar3 == 0) || (1 < bVar3)) {
    return CONCAT44(heap.u32(__addr_uStack_4), uVar1);
  }
  }
  return CONCAT44(heap.u32(__addr_uStack_4), uVar1);
} finally {
    heap.freeFrame(8);
  }
}
