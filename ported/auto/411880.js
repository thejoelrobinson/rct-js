// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411880.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteObject, GetModuleHandleA, GetObjectA, LoadImageA, _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00411a34 } from "./411a34.js";
export function FUN_00411880(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(144);
  const __addr_local_70 = __sp + 36;
  const __addr_local_90 = __sp + 4;
  const __addr_local_88 = __sp + 12;
  const __addr_local_8c = __sp + 8;
  const __addr_local_84 = __sp + 16;
  const __addr_local_80 = __sp + 20;
  const __addr_local_6c = __sp + 40;
  const __addr_local_68 = __sp + 44;
  const __addr_local_64 = __sp + 48;
  const __addr_local_8 = __sp + 140;
  try {
  let hInst = 0;
  let iVar1 = 0;
  let name = 0;
  let type = 0;
  let cy = 0;
  let fuLoad = 0;
  fuLoad = ((0x2000) >>> 0);
  type = ((0) >>> 0);
  name = ((param_2) >>> 0);
  iVar1 = ((param_3) >>> 0);
  cy = ((param_4) >>> 0);
  hInst = ((GetModuleHandleA(heap, ((0x0) >>> 0))) >>> 0);
  heap.setU32(__addr_local_8c, (LoadImageA(heap, hInst, name, type, iVar1, cy, fuLoad)) >>> 0);
  if (heap.u32(__addr_local_8c) == 0x0) {
    heap.setU32(__addr_local_8c, (LoadImageA(heap, ((0x0) >>> 0), param_2, 0, param_3, param_4, 0x2010)) >>> 0);
  }
  if (heap.u32(__addr_local_8c) == 0x0) {
    heap.setU32(__addr_local_90, (0) >>> 0);
  } else {
    GetObjectA(heap, heap.u32(__addr_local_8c), 0x18, __addr_local_88);
    _memset(heap, __addr_local_70, 0, 0x6c);
    heap.setU32(__addr_local_70, (0x6c) >>> 0);
    heap.setU32(__addr_local_6c, (7) >>> 0);
    heap.setU32(__addr_local_8, (0x40) >>> 0);
    heap.setU32(__addr_local_64, (heap.u32(__addr_local_84)) >>> 0);
    heap.setU32(__addr_local_68, (heap.u32(__addr_local_80)) >>> 0);
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x18)), param_1, __addr_local_70, __addr_local_90, 0))) >>> 0);
    if (iVar1 == 0) {
      (regs.eax = FUN_00411a34(heap, heap.u32(__addr_local_90), heap.u32(__addr_local_8c), 0, 0, 0, 0));
      DeleteObject(heap, heap.u32(__addr_local_8c));
    } else {
      heap.setU32(__addr_local_90, (0) >>> 0);
    }
  }
  return heap.u32(__addr_local_90);
} finally {
    heap.freeFrame(144);
  }
}
