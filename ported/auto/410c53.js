// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410c53.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0041107f } from "./41107f.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_00410c53(heap, param_1, param_2) {
  const __sp = heap.allocFrame(124);
  const __addr_local_80 = __sp + 0;
  const __addr_local_5c = __sp + 36;
  const __addr_local_7c = __sp + 4;
  const __addr_local_78 = __sp + 8;
  const __addr_local_74 = __sp + 12;
  const __addr_local_70 = __sp + 16;
  const __addr_local_6c = __sp + 20;
  const __addr_local_68 = __sp + 24;
  const __addr_local_60 = __sp + 32;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  if ((heap.u32(0x005ec158) == 0x0) || (heap.u32(0x005ec160) != 0)) {
    uVar2 = ((0) >>> 0);
  } else {
    _memset(heap, __addr_local_80, 0, 0x7c);
    heap.setU32(__addr_local_80, (0x7c) >>> 0);
    heap.setU32(__addr_local_68, (param_2) >>> 0);
    heap.setU32(__addr_local_60, (2) >>> 0);
    heap.setU32(__addr_local_7c, (heap.u32(0x005e9048)) >>> 0);
    heap.setU32(__addr_local_78, (heap.u32(0x005e904c)) >>> 0);
    heap.setU32(__addr_local_74, (heap.u32(0x005e9050)) >>> 0);
    heap.setU32(__addr_local_70, (heap.u32(0x005e9054)) >>> 0);
    (regs.eax = FUN_00413170(heap, __addr_local_5c, param_1));
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x50)), heap.u32(0x005ec158), __addr_local_80))) >>> 0);
    if (iVar1 == 0) {
      heap.setU32(0x005f0320, (heap.u32(__addr_local_6c)) >>> 0);
      heap.setU32(0x005ec160, (1) >>> 0);
      heap.setU32(0x005ec164, (1) >>> 0);
      (regs.eax = FUN_00413170(heap, 0x005f0300, param_1));
      (regs.eax = FUN_0041107f(heap));
      uVar2 = ((1) >>> 0);
    } else {
      uVar2 = ((0) >>> 0);
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(124);
  }
}
