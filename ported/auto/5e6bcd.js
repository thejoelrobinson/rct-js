// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6bcd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e6bcd(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0xffffffe0 = __sp + 0;
  try {
  let psVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar8 = 0;
  let puVar9 = 0;
  let puVar10 = 0;
  let uVar7 = 0;
  sVar2 = ((heap.i16((unaff_ESI + 0x20))) & 0xffff);
  sVar3 = ((heap.i16((unaff_ESI + 0x22))) & 0xffff);
  sVar4 = ((heap.i16((unaff_ESI + 0x24))) & 0xffff);
  sVar5 = ((heap.i16((unaff_ESI + 0x26))) & 0xffff);
  puVar8 = ((0x009a013c) >>> 0);
  while (puVar8 < heap.u32(0x009a1164)) {
    puVar9 = ((puVar8) >>> 0);
    if ((((puVar8 != unaff_ESI) && ((heap.u16((puVar8 + 0x32)) & 3) == 0)) && (heap.i16((puVar8 + 0x20)) < (((sVar4 + sVar2)) << 16 >> 16))) && (((sVar2 < (((heap.i16((puVar8 + 0x20)) + heap.i16((puVar8 + 0x24)))) << 16 >> 16) && (heap.i16((puVar8 + 0x22)) < (((sVar5 + sVar3)) << 16 >> 16))) && ((uVar6 = ((heap.i16((puVar8 + 0x22)) + heap.i16((puVar8 + 0x26))) & 0xffff), uVar7 = ((((uVar6) >>> 0)) >>> 0), sVar3 < ((uVar6) << 16 >> 16) && (puVar10 = ((__addr_stack0xffffffe0) >>> 0), (regs.eax = FUN_005e43de(heap, puVar8, unaff_ESI, uVar7, __addr_stack0xffffffe0)), (((extraout_CX + 0xd)) << 16 >> 16) < heap.u32(0x00971ed6))))))) {
      heap.setI16((puVar8 + 0x20), (heap.i16((puVar8 + 0x20)) + ((extraout_CX + 3) - heap.i16((puVar8 + 0x20)))) & 0xffff);
      (regs.eax = FUN_005e43de(heap, puVar9, unaff_ESI, uVar7, puVar10));
      if (heap.i32((puVar8 + 8)) != 0) {
        psVar1 = (((heap.i32((puVar8 + 8)) + 4)) >>> 0);
        heap.setU32(psVar1, (heap.i16(psVar1) + extraout_CX_00) & 0xffffffff);
      }
    }
    puVar8 = ((puVar9 + 0x178) >>> 0);
  }
  return 1;
} finally {
    heap.freeFrame(4);
  }
}
