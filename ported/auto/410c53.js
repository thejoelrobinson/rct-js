// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410c53.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { FUN_0041107f } from "./41107f.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_00410c53(heap, param_1, param_2) {
  const __sp = heap.allocFrame(96);
  const __addr_local_80 = __sp + 0;
  const __addr_DAT_005f0300 = __sp + 4;
  const __addr_local_5c = __sp + 8;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let local_7c = 0;
  let local_78 = 0;
  let local_74 = 0;
  let local_70 = 0;
  let local_6c = 0;
  let local_68 = 0;
  let local_60 = 0;
  if ((heap.u32(0x005ec158) == 0x0) || (heap.u32(0x005ec160) != 0)) {
    uVar2 = 0;
  } else {
    _memset(heap, __addr_local_80, 0, 0x7c);
    heap.setU32(__addr_local_80, (0x7c) >>> 0);
    local_68 = param_2;
    local_60 = 2;
    local_7c = heap.u32(0x005e9048);
    local_78 = heap.u32(0x005e904c);
    local_74 = heap.u32(0x005e9050);
    local_70 = heap.u32(0x005e9054);
    FUN_00413170(heap, __addr_local_5c, param_1);
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x50))))(heap.u32(0x005ec158), __addr_local_80);
    if (iVar1 == 0) {
      heap.setU32(0x005f0320, (local_6c) >>> 0);
      heap.setU32(0x005ec160, (1) >>> 0);
      heap.setU32(0x005ec164, (1) >>> 0);
      FUN_00413170(heap, __addr_DAT_005f0300, param_1);
      FUN_0041107f(heap);
      uVar2 = 1;
    } else {
      uVar2 = 0;
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(96);
  }
}
