// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4054e3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CoCreateInstance, CoInitialize, MultiByteToWideChar } from "../../runtime/win32.js";
export function FUN_004054e3(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(280);
  const __addr_DAT_005e78b0 = __sp + 0;
  const __addr_DAT_005e7c70 = __sp + 4;
  const __addr_local_8 = __sp + 8;
  const __addr_DAT_005e7ca0 = __sp + 12;
  const __addr_local_10 = __sp + 16;
  const __addr_local_218 = __sp + 20;
  try {
  let uVar1 = 0;
  let local_c = 0;
  CoInitialize(heap, 0x0);
  local_c = CoCreateInstance(heap, __addr_DAT_005e78b0, 0x0, 1, __addr_DAT_005e7c70, __addr_local_8);
  if (local_c < 0) {
    uVar1 = 0;
  } else {
    local_c = (heap.u32(heap.u32(heap.u32(heap.u32(__addr_local_8)))))(heap.u32(__addr_local_8), __addr_DAT_005e7ca0, __addr_local_10);
    if (local_c < 0) {
      (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 8))))(heap.u32(__addr_local_8));
      uVar1 = 0;
    } else {
      local_c = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 0x50))))(heap.u32(__addr_local_8), param_1);
      if (local_c < 0) {
        (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_10)) + 8))))(heap.u32(__addr_local_10));
        (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 8))))(heap.u32(__addr_local_8));
        uVar1 = 0;
      } else {
        local_c = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 0x1c))))(heap.u32(__addr_local_8), param_3);
        if (local_c < 0) {
          (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_10)) + 8))))(heap.u32(__addr_local_10));
          (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 8))))(heap.u32(__addr_local_8));
          uVar1 = 0;
        } else {
          MultiByteToWideChar(heap, 0, 0, param_2, -1, __addr_local_218, 0x104);
          local_c = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_10)) + 0x18))))(heap.u32(__addr_local_10), __addr_local_218, 1);
          if (local_c < 0) {
            (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_10)) + 8))))(heap.u32(__addr_local_10));
            (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 8))))(heap.u32(__addr_local_8));
            uVar1 = 0;
          } else {
            (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_8)) + 8))))(heap.u32(__addr_local_8));
            (heap.u32(heap.u32((heap.u32(heap.u32(__addr_local_10)) + 8))))(heap.u32(__addr_local_10));
            uVar1 = 1;
          }
        }
      }
    }
  }
  return uVar1;
} finally {
    heap.freeFrame(280);
  }
}
