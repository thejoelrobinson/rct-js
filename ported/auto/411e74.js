// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411e74.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetPixel, SetPixel } from "../runtime/win32.js";
export function FUN_00411e74(heap, param_1, param_2) {
  const __sp = heap.allocFrame(16);
  const __addr_local_78 = __sp + 0;
  const __addr_local_70 = __sp + 4;
  try {
  let iVar1 = 0;
  let local_80 = 0;
  let local_7c = 0;
  let local_74 = 0;
  let local_1c = 0;
  local_7c = 0xffffffff;
  if (param_2 != 0xffffffff) {
    iVar1 = (heap.u32(heap.u32((heap.u32(param_1) + 0x44))))(param_1, __addr_local_78);
    if (iVar1 == 0) {
      local_80 = GetPixel(heap, heap.u32(__addr_local_78), 0, 0);
      SetPixel(heap, heap.u32(__addr_local_78), 0, 0, param_2);
      (heap.u32(heap.u32((heap.u32(param_1) + 0x68))))(param_1, heap.u32(__addr_local_78));
    }
  }
  heap.u32(__addr_local_70 + (0) * 4) = 0x6c;
  while (true) {
    local_74 = (heap.u32(heap.u32((heap.u32(param_1) + 100))))(param_1, 0, __addr_local_70, 0, 0);
    if (local_74 != -0x7789fde4) {
      break;
    }
    local_74 = 0x8876021c;
  }
  if (local_74 == 0) {
    local_7c = heap.u32(local_4c) & (1 << (local_1c & 0x1f)) - 1U;
    (heap.u32(heap.u32((heap.u32(param_1) + 0x80))))(param_1, 0);
  }
  if (param_2 != 0xffffffff) {
    iVar1 = (heap.u32(heap.u32((heap.u32(param_1) + 0x44))))(param_1, __addr_local_78);
    if (iVar1 == 0) {
      SetPixel(heap, heap.u32(__addr_local_78), 0, 0, local_80);
      (heap.u32(heap.u32((heap.u32(param_1) + 0x68))))(param_1, heap.u32(__addr_local_78));
    }
  }
  return local_7c;
} finally {
    heap.freeFrame(16);
  }
}
