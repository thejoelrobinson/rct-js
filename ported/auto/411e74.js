// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411e74.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetPixel, SetPixel } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00411e74(heap, param_1, param_2) {
  const __sp = heap.allocFrame(96);
  const __addr_local_78 = __sp + 0;
  const __addr_local_70 = __sp + 8;
  const __addr_local_74 = __sp + 4;
  const __addr_local_4c = __sp + 44;
  const __addr_local_1c = __sp + 92;
  try {
  let iVar1 = 0;
  let local_80 = 0;
  let local_7c = 0;
  local_7c = ((0xffffffff) >>> 0);
  if (param_2 != 0xffffffff) {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x44)), param_1, __addr_local_78))) >>> 0);
    if (iVar1 == 0) {
      local_80 = ((GetPixel(heap, heap.u32(__addr_local_78), 0, 0)) >>> 0);
      SetPixel(heap, heap.u32(__addr_local_78), 0, 0, param_2);
      (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x68)), param_1, heap.u32(__addr_local_78)));
    }
  }
  heap.setU32((__addr_local_70 + (0) * 4), (0x6c) & 0xffffffff);
  while (true) {
    heap.setU32(__addr_local_74, ((regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 100)), param_1, 0, __addr_local_70, 0, 0))) >>> 0);
    if (heap.u32(__addr_local_74) != -0x7789fde4) {
      break;
    }
    heap.setU32(__addr_local_74, (0x8876021c) >>> 0);
  }
  if (heap.u32(__addr_local_74) == 0) {
    local_7c = ((heap.u32(heap.u32(__addr_local_4c)) & (1 << (heap.u32(__addr_local_1c) & 0x1f)) - 1) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x80)), param_1, 0));
  }
  if (param_2 != 0xffffffff) {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x44)), param_1, __addr_local_78))) >>> 0);
    if (iVar1 == 0) {
      SetPixel(heap, heap.u32(__addr_local_78), 0, 0, local_80);
      (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x68)), param_1, heap.u32(__addr_local_78)));
    }
  }
  return local_7c;
} finally {
    heap.freeFrame(96);
  }
}
