// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410d3d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetTickCount, _memset } from "../../runtime/win32.js";
import { FUN_004110f6 } from "./4110f6.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_00410d3d(heap, param_1) {
  const __sp = heap.allocFrame(96);
  const __addr_local_80 = __sp + 0;
  const __addr_DAT_005f0300 = __sp + 4;
  const __addr_local_5c = __sp + 8;
  try {
  let iVar1 = 0;
  let DVar2 = 0;
  let DVar3 = 0;
  let uVar4 = 0;
  let local_7c = 0;
  let local_78 = 0;
  let local_74 = 0;
  let local_70 = 0;
  let local_6c = 0;
  let local_60 = 0;
  if ((heap.u32(0x005ec158) == 0x0) || (heap.u32(0x005ec160) != 0)) {
    uVar4 = 0;
  } else {
    _memset(heap, __addr_local_80, 0, 0x7c);
    heap.setU32(__addr_local_80, (0x7c) >>> 0);
    local_7c = heap.u32(0x005e9048);
    local_78 = heap.u32(0x005e904c);
    local_74 = heap.u32(0x005e9050);
    local_70 = heap.u32(0x005e9054);
    local_6c = heap.u32((param_1 + 0x104));
    local_60 = 1;
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x50))))(heap.u32(0x005ec158), __addr_local_80);
    if (iVar1 == 0) {
      heap.setU32(0x005f0320, (local_6c) >>> 0);
      heap.setU32(0x005ec160, (1) >>> 0);
      heap.setU32(0x005ec164, (0) >>> 0);
      FUN_00413170(heap, __addr_DAT_005f0300, __addr_local_5c);
      DVar2 = GetTickCount(heap);
      do {
        DVar3 = GetTickCount(heap);
      } while (DVar3 < DVar2 + 300);
      FUN_004110f6(heap, 0);
      uVar4 = 1;
    } else {
      uVar4 = 0;
    }
  }
  return uVar4;
} finally {
    heap.freeFrame(96);
  }
}
