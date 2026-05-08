// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3457.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005d3457(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_uStack_4 = __sp + 0;
  const __addr_puStack_18 = __sp + 4;
  const __addr_DAT_006559d8 = __sp + 8;
  const __addr_DAT_0088750a = __sp + 12;
  const __addr_DAT_0088750e = __sp + 16;
  const __addr_DAT_0088750c = __sp + 20;
  const __addr_DAT_0088750f = __sp + 24;
  try {
  let bVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let in_CF = 0;
  let bVar5 = 0;
  let in_ZF = 0;
  heap.setU32(__addr_uStack_4, (in_EDX) >>> 0);
  uVar3 = FUN_005e3b2b(heap);
  heap.setU32(__addr_puStack_18, (__addr_uStack_4) >>> 0);
  if (((!in_ZF) && (in_CF = 0, heap.u32(0x00652288) != '\0')) && (in_CF = heap.u32(0x00652289) < heap.u32(unaff_ESI + (7) * 4), heap.u32(0x00652289) == heap.u32(unaff_ESI + (7) * 4))) {
    FUN_005d21fa(heap);
  }
  while (true) {
    heap.setU32(__addr_puStack_18, (unaff_ESI) >>> 0);
    uVar4 = FUN_005cfc50(heap);
    puVar2 = heap.u32(__addr_puStack_18);
    if (in_CF) {
      break;
    }
    in_CF = 0xfffffff3 < __addr_puStack_18;
    uVar3 = uVar4;
    in_ECX = extraout_ECX;
  }
  if ((heap.u32((__addr_DAT_006559d8) + (heap.u32(heap.u32(__addr_puStack_18) + (4) * 4) * 0x10) * 4) & 0x10) != 0) {
    bVar1 = heap.u32(heap.u32(__addr_puStack_18) + (7) * 4);
    bVar5 = (in_ECX >>> 4 & 1) != 0;
    heap.setU32((__addr_DAT_0088750a + bVar1 * 0x260), (CONCAT11((in_ECX >>> 5), (uVar3 >>> 5))) >>> 0);
    heap.setU32(((__addr_DAT_0088750e) + (bVar1 * 0x260) * 4), (heap.u32(heap.u32(__addr_puStack_18) + (2) * 4)) >>> 0);
    while (true) {
      heap.setU32(__addr_puStack_18, (puVar2) >>> 0);
      uVar4 = FUN_005cfac7(heap);
      if (bVar5) {
        break;
      }
      bVar5 = 0xfffffff3 < __addr_puStack_18;
      uVar3 = uVar4;
      in_ECX = extraout_ECX_00;
    }
    if ((heap.u32((__addr_DAT_006559d8) + (heap.u32(heap.u32(__addr_puStack_18) + (4) * 4) * 0x10) * 4) & 0x10) != 0) {
      bVar1 = heap.u32(heap.u32(__addr_puStack_18) + (7) * 4);
      heap.setU32((__addr_DAT_0088750c + bVar1 * 0x260), (CONCAT11((in_ECX >>> 5), (uVar3 >>> 5))) >>> 0);
      heap.setU32(((__addr_DAT_0088750f) + (bVar1 * 0x260) * 4), (heap.u32(heap.u32(__addr_puStack_18) + (2) * 4)) >>> 0);
      return CONCAT44(heap.u32(__addr_uStack_4), uVar3);
    }
  }
  return CONCAT44(heap.u32(__addr_uStack_4), uVar3);
} finally {
    heap.freeFrame(28);
  }
}
