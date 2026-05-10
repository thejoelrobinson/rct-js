// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3457.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005d3457(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_uStack_4 = __sp + 0;
  const __addr_puStack_18 = __sp + 4;
  try {
  let bVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_CF = regs.cf | 0;
  let bVar5 = 0;
  let in_ZF = regs.zf | 0;
  heap.setU32(__addr_uStack_4, (in_EDX) >>> 0);
  uVar3 = (((regs.ecx = 0x8d, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0xd, regs.eax)) >>> 0);
  heap.setU32(__addr_puStack_18, (__addr_uStack_4) >>> 0);
  if (((!in_ZF) && (in_CF = ((0) & 0xff), heap.u8(0x00652288) != 0)) && (in_CF = ((heap.u8(0x00652289) < ((heap.u8(unaff_ESI + (7))) & 0xff)) & 0xff), heap.u8(0x00652289) == heap.u8(unaff_ESI + (7)))) {
    (regs.eax = FUN_005d21fa(heap));
  }
  while (true) {
    heap.setU32(__addr_puStack_18, (unaff_ESI) >>> 0);
    uVar4 = (((regs.eax = FUN_005cfc50(heap))) >>> 0);
    puVar2 = ((heap.u32(__addr_puStack_18)) >>> 0);
    if (in_CF) {
      break;
    }
    in_CF = ((0xfffffff3 < __addr_puStack_18) & 0xff);
    uVar3 = ((uVar4) >>> 0);
    in_ECX = ((extraout_ECX) >>> 0);
  }
  if ((heap.u32((0x006559d8) + (((((heap.u8(heap.u32(__addr_puStack_18) + (4))) & 0xff)) >>> 0) * 0x10) * 4) & 0x10) != 0) {
    bVar1 = ((heap.u8(heap.u32(__addr_puStack_18) + (7))) & 0xff);
    bVar5 = (((((in_ECX) & 0xffff) >>> 4 & 1) != 0) & 0xff);
    heap.setU16((0x0088750a + ((bVar1) >>> 0) * 0x260), (CONCAT11((((((in_ECX) & 0xffff) >>> 5)) << 24 >> 24), (((((uVar3) & 0xffff) >>> 5)) << 24 >> 24))) & 0xffff);
    heap.setU32(((0x0088750e) + (((bVar1) >>> 0) * 0x260) * 4), (heap.u8(heap.u32(__addr_puStack_18) + (2))) & 0xffffffff);
    while (true) {
      heap.setU32(__addr_puStack_18, (puVar2) >>> 0);
      uVar4 = (((regs.eax = FUN_005cfac7(heap))) >>> 0);
      if (bVar5) {
        break;
      }
      bVar5 = ((0xfffffff3 < __addr_puStack_18) & 0xff);
      uVar3 = ((uVar4) >>> 0);
      in_ECX = ((extraout_ECX_00) >>> 0);
    }
    if ((heap.u32((0x006559d8) + (((((heap.u8(heap.u32(__addr_puStack_18) + (4))) & 0xff)) >>> 0) * 0x10) * 4) & 0x10) != 0) {
      bVar1 = ((heap.u8(heap.u32(__addr_puStack_18) + (7))) & 0xff);
      heap.setU16((0x0088750c + ((bVar1) >>> 0) * 0x260), (CONCAT11((((in_ECX >>> 5)) << 24 >> 24), (((uVar3 >>> 5)) << 24 >> 24))) & 0xffff);
      heap.setU32(((0x0088750f) + (((bVar1) >>> 0) * 0x260) * 4), (heap.u8(heap.u32(__addr_puStack_18) + (2))) & 0xffffffff);
      return CONCAT44(heap.u32(__addr_uStack_4), uVar3);
    }
  }
  return CONCAT44(heap.u32(__addr_uStack_4), uVar3);
} finally {
    heap.freeFrame(8);
  }
}
