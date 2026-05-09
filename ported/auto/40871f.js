// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40871f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetOpenFileNameA, GetSaveFileNameA, _memset, _strlen, _strrchr } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040ba8c } from "./40ba8c.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_0040871f(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(600);
  const __addr_local_267 = __sp + 9;
  const __addr_local_153 = __sp + 285;
  const __addr_local_268 = __sp + 8;
  const __addr_local_154 = __sp + 284;
  const __addr_local_50 = __sp + 544;
  const __addr_local_164 = __sp + 268;
  const __addr_local_160 = __sp + 272;
  const __addr_local_15c = __sp + 276;
  const __addr_local_158 = __sp + 280;
  const __addr_local_4c = __sp + 548;
  const __addr_local_44 = __sp + 556;
  const __addr_local_34 = __sp + 572;
  const __addr_local_30 = __sp + 576;
  const __addr_local_24 = __sp + 588;
  const __addr_local_20 = __sp + 592;
  const __addr_local_1c = __sp + 596;
  try {
  let uVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let puVar4 = 0;
  let local_26c = 0;
  heap.setU32(__addr_local_164, (0x005f0f20) >>> 0);
  heap.setU32(__addr_local_268, (heap.u32(0x005ebf24)) >>> 0);
  puVar4 = ((__addr_local_267) >>> 0);
  for (iVar3 = ((0x40) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar4, (0) & 0xffffffff);
    puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
  }
  heap.setU16(puVar4, (0) & 0xffff);
  heap.setU8((((puVar4) >>> 0) + 2), (0) & 0xff);
  heap.setU32(__addr_local_154, (heap.u32(0x005ebf28)) >>> 0);
  puVar4 = ((__addr_local_153) >>> 0);
  for (iVar3 = ((0x40) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar4, (0) & 0xffffffff);
    puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
  }
  heap.setU16(puVar4, (0) & 0xffff);
  heap.setU8((((puVar4) >>> 0) + 2), (0) & 0xff);
  heap.setU32(__addr_local_158, (0x2e) >>> 0);
  heap.setU32(__addr_local_15c, (_strrchr(heap, param_3, 0x2e)) >>> 0);
  heap.setU32(__addr_local_158, (0x5c) >>> 0);
  heap.setU32(__addr_local_160, (_strrchr(heap, param_3, 0x5c)) >>> 0);
  if (heap.u32(__addr_local_15c) == 0x0) {
    if (heap.u32(__addr_local_160) != 0x0) {
      (regs.eax = FUN_00413170(heap, __addr_local_268, param_3));
    }
  } else {
    if (heap.u32(__addr_local_160) == 0x0) {
    (regs.eax = FUN_00413170(heap, __addr_local_154, param_3));
  } else {
    (regs.eax = FUN_00413170(heap, __addr_local_154, heap.u32(__addr_local_160) + 1));
    heap.setI8((heap.u32(__addr_local_160) + (1)), (0) & 0xff);
    (regs.eax = FUN_00413170(heap, __addr_local_268, param_3));
  }
  }
  (regs.eax = FUN_00413170(heap, param_3, __addr_local_154));
  _memset(heap, __addr_local_50, 0, 0x4c);
  heap.setU32(__addr_local_50, (0x4c) >>> 0);
  heap.setU32(__addr_local_4c, (heap.u32(0x005e916c)) >>> 0);
  heap.setU32(__addr_local_34, (param_3) >>> 0);
  heap.setU32(__addr_local_24, (__addr_local_268) >>> 0);
  heap.setU32(__addr_local_20, (param_2) >>> 0);
  heap.setU32(__addr_local_30, (0x104) >>> 0);
  (regs.eax = FUN_00413170(heap, heap.u32(__addr_local_164), param_5));
  sVar2 = ((_strlen(heap, heap.u32(__addr_local_164))) >>> 0);
  heap.setU32(__addr_local_164, (heap.u32(__addr_local_164) + sVar2 + 1) >>> 0);
  (regs.eax = FUN_00413170(heap, heap.u32(__addr_local_164), param_4));
  sVar2 = ((_strlen(heap, heap.u32(__addr_local_164))) >>> 0);
  heap.setU32(__addr_local_164, (heap.u32(__addr_local_164) + sVar2 + 1) >>> 0);
  heap.setU32(heap.u32(__addr_local_164), (0) & 0xffffffff);
  uVar1 = ((heap.u32(0x005e9150)) >>> 0);
  heap.setU32(__addr_local_44, (0x005f0f20) >>> 0);
  if ((heap.u32(0x005ebe3c) == 2) && (heap.u32(0x005ebf54) == 1)) {
    (regs.eax = FUN_0040ba8c(heap, 0));
    heap.setU32(0x005e9150, (1) >>> 0);
  }
  if (param_1 == 1) {
    heap.setU32(__addr_local_1c, (0xa1804) >>> 0);
    local_26c = ((GetOpenFileNameA(heap, ((__addr_local_50) >>> 0))) >>> 0);
  } else {
    if (param_1 == 2) {
    heap.setU32(__addr_local_1c, (0x82806) >>> 0);
    local_26c = ((GetSaveFileNameA(heap, ((__addr_local_50) >>> 0))) >>> 0);
  }
  }
  if ((heap.u32(0x005ebe3c) == 2) && (heap.u32(0x005ebf54) == 1)) {
    (regs.eax = FUN_0040ba8c(heap, 1));
  }
  heap.setU32(0x005e9150, (uVar1) >>> 0);
  return local_26c;
} finally {
    heap.freeFrame(600);
  }
}
