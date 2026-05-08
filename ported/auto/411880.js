// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411880.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DeleteObject, GetModuleHandleA, GetObjectA, LoadImageA } from "../runtime/win32.js";
import { FUN_00411a34 } from "./411a34.js";
export function FUN_00411880(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(12);
  const __addr_local_70 = __sp + 0;
  const __addr_local_90 = __sp + 4;
  const __addr_local_88 = __sp + 8;
  try {
  let hInst = 0;
  let iVar1 = 0;
  let name = 0;
  let type = 0;
  let cy = 0;
  let fuLoad = 0;
  let local_8c = 0;
  let local_84 = 0;
  let local_80 = 0;
  let local_6c = 0;
  let local_68 = 0;
  let local_64 = 0;
  let local_8 = 0;
  fuLoad = 0x2000;
  type = 0;
  name = param_2;
  iVar1 = param_3;
  cy = param_4;
  hInst = GetModuleHandleA(heap, 0x0);
  local_8c = LoadImageA(heap, hInst, name, type, iVar1, cy, fuLoad);
  if (local_8c == 0x0) {
    local_8c = LoadImageA(heap, 0x0, param_2, 0, param_3, param_4, 0x2010);
  }
  if (local_8c == 0x0) {
    heap.setU32(__addr_local_90, (0) >>> 0);
  } else {
    GetObjectA(heap, local_8c, 0x18, __addr_local_88);
    _memset(__addr_local_70, 0, 0x6c);
    heap.setU32(__addr_local_70, (0x6c) >>> 0);
    local_6c = 7;
    local_8 = 0x40;
    local_64 = local_84;
    local_68 = local_80;
    iVar1 = (heap.u32(heap.u32((heap.u32(param_1) + 0x18))))(param_1, __addr_local_70, __addr_local_90, 0);
    if (iVar1 == 0) {
      FUN_00411a34(heap, heap.u32(__addr_local_90), local_8c, 0, 0, 0, 0);
      DeleteObject(heap, local_8c);
    } else {
      heap.setU32(__addr_local_90, (0) >>> 0);
    }
  }
  return heap.u32(__addr_local_90);
} finally {
    heap.freeFrame(12);
  }
}
