// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40871f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetOpenFileNameA, GetSaveFileNameA, LPOPENFILENAMEA } from "../runtime/win32.js";
import { FUN_0040ba8c } from "./40ba8c.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_0040871f(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_005f0f20 = __sp + 0;
  const __addr_local_267 = __sp + 4;
  const __addr_local_153 = __sp + 8;
  const __addr_local_268 = __sp + 12;
  const __addr_local_154 = __sp + 16;
  const __addr_local_50 = __sp + 20;
  try {
  let uVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let local_26c = 0;
  let local_158 = 0;
  let local_4c = 0;
  let local_44 = 0;
  let local_30 = 0;
  let local_20 = 0;
  let local_1c = 0;
  local_164 = __addr_DAT_005f0f20;
  heap.setU32(__addr_local_268, (heap.u32(0x005ebf24)) >>> 0);
  puVar4 = __addr_local_267;
  for (iVar3 = 0x40; iVar3 != 0; iVar3 = iVar3 + -1) {
    heap.u32(puVar4) = 0;
    puVar4 = puVar4 + 1;
  }
  heap.u32(puVar4) = 0;
  heap.u32((puVar4 + 2)) = 0;
  heap.setU32(__addr_local_154, (heap.u32(0x005ebf28)) >>> 0);
  puVar4 = __addr_local_153;
  for (iVar3 = 0x40; iVar3 != 0; iVar3 = iVar3 + -1) {
    heap.u32(puVar4) = 0;
    puVar4 = puVar4 + 1;
  }
  heap.u32(puVar4) = 0;
  heap.u32((puVar4 + 2)) = 0;
  local_158 = 0x2e;
  local_15c = _strrchr(param_3, 0x2e);
  local_158 = 0x5c;
  local_160 = _strrchr(param_3, 0x5c);
  if (local_15c == 0x0) {
    if (local_160 != 0x0) {
      FUN_00413170(heap, __addr_local_268, param_3);
    }
  } else {
    if (local_160 == 0x0) {
    FUN_00413170(heap, __addr_local_154, param_3);
  } else {
    FUN_00413170(heap, __addr_local_154, local_160 + 1);
    heap.u32(local_160 + (1) * 4) = '\0';
    FUN_00413170(heap, __addr_local_268, param_3);
  }
  }
  FUN_00413170(heap, param_3, __addr_local_154);
  _memset(__addr_local_50, 0, 0x4c);
  heap.setU32(__addr_local_50, (0x4c) >>> 0);
  local_4c = heap.u32(0x005e916c);
  local_34 = param_3;
  local_24 = __addr_local_268;
  local_20 = param_2;
  local_30 = 0x104;
  FUN_00413170(heap, local_164, param_5);
  sVar2 = _strlen(local_164);
  local_164 = local_164 + sVar2 + 1;
  FUN_00413170(heap, local_164, param_4);
  sVar2 = _strlen(local_164);
  local_164 = local_164 + sVar2 + 1;
  heap.u32(local_164) = '\0';
  uVar1 = heap.u32(0x005e9150);
  local_44 = __addr_DAT_005f0f20;
  if ((heap.u32(0x005ebe3c) == 2) && (heap.u32(0x005ebf54) == 1)) {
    FUN_0040ba8c(heap, 0);
    heap.setU32(0x005e9150, (1) >>> 0);
  }
  if (param_1 == 1) {
    local_1c = 0xa1804;
    local_26c = GetOpenFileNameA(heap, (LPOPENFILENAMEA) & heap.u32(__addr_local_50));
  } else {
    if (param_1 == 2) {
    local_1c = 0x82806;
    local_26c = GetSaveFileNameA(heap, (LPOPENFILENAMEA) & heap.u32(__addr_local_50));
  }
  }
  if ((heap.u32(0x005ebe3c) == 2) && (heap.u32(0x005ebf54) == 1)) {
    FUN_0040ba8c(heap, 1);
  }
  heap.setU32(0x005e9150, (uVar1) >>> 0);
  return local_26c;
} finally {
    heap.freeFrame(24);
  }
}
