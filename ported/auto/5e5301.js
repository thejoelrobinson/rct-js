// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5301.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e117d } from "./5e117d.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e5301(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_uStack_6 = __sp + 0;
  try {
  let in_EAX = regs.eax >>> 0;
  let uVar1 = 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar2 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uStack_4 = 0;
  let uStack_2 = 0;
  uStack_4 = ((((unaff_ESI) & 0xffff)) & 0xffff);
  uStack_2 = ((((((unaff_ESI) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  if (((in_EAX) << 24 >> 24) < 0) {
    uVar1 = ((in_EAX & 0xffffff7f) >>> 0);
    heap.setU32(__addr_uStack_6, (uStack_4) >>> 0);
    uStack_4 = ((uStack_2) & 0xffff);
    uStack_2 = ((((in_EAX) << 16 >> 16)) & 0xffff);
    for (puVar2 = ((0x009a013c) >>> 0); puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
      if (((((uVar1) << 24 >> 24) == heap.u8(puVar2 + (0x174))) && (((unaff_EBX) << 16 >> 16) == heap.i16((puVar2 + 0x30)))) && ((heap.i16((heap.i32((puVar2 + 0x1c)) + ((((uVar1 >>> 8) & 0xffff) * 0x10) >>> 0) + 2)) | 0) != -2)) {
        (regs.eax = FUN_005e117d(heap, unaff_EDI, puVar2, unaff_EBP, __addr_uStack_6, unaff_EBX, in_EDX, in_ECX));
      }
    }
    return CONCAT22((((uVar1 >>> 0x10)) << 16 >> 16), uStack_2);
  }
  if ((in_EAX & 0x40) != 0) {
    uVar1 = ((in_EAX & 0xffffffbf) >>> 0);
    for (puVar2 = ((0x009a013c) >>> 0); puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
      if (((uVar1) << 24 >> 24) == heap.u8(puVar2 + (0x174))) {
        heap.setU32(__addr_uStack_6, (0x5e) >>> 0);
        uVar1 = (((regs.eax = FUN_005e43de(heap))) >>> 0);
      }
    }
    return uVar1;
  }
  for (puVar2 = ((0x009a013c) >>> 0); puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
    if ((((in_EAX) << 24 >> 24) == heap.u8(puVar2 + (0x174))) && (((unaff_EBX) << 16 >> 16) == heap.i16((puVar2 + 0x30)))) {
      heap.setU32(__addr_uStack_6, (0x5e) >>> 0);
      in_EAX = (((regs.eax = FUN_005e43de(heap))) >>> 0);
    }
  }
  return in_EAX;
} finally {
    heap.freeFrame(4);
  }
}
