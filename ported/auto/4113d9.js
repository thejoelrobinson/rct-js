// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4113d9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00410e47 } from "./410e47.js";
import { FUN_00410eee } from "./410eee.js";
import { FUN_00410f7e } from "./410f7e.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_004113d9(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(12);
  const __addr_local_8 = __sp + 0;
  const __addr_param_2 = __sp + 4;
  const __addr_local_18 = __sp + 8;
  heap.setU32(__addr_param_2, (param_2) >>> 0);
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  if (((heap.u32(0x005ec160) != 0) && (heap.u32(0x005ec15c) != 0)) && (heap.u32(0x005ec158) != 0x0)) {
    local_14 = 0x200;
    local_10 = 1;
    do {
      local_c = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x54))))(heap.u32(0x005ec158), __addr_local_8, __addr_local_18, 1, param_1, __addr_param_2);
      if (local_c == 0) {
        uVar1 = heap.u32(param_1);
        if (uVar1 < 0x32) {
          if (uVar1 == 0x31) {
            heap.setU32(0x005ec1c4, (1) >>> 0);
          } else {
            if (uVar1 == 3) {
            heap.setU32(0x005ec1c0, (FUN_00410e47(heap, heap.u32(param_1 + (2) * 4), param_1 + 3, param_1 + 0x10)) >>> 0);
          } else {
            if (uVar1 != 5) {
              /* goto LAB_00411516 */ throw new Error("goto LAB_00411516 not supported");
            }
            FUN_00410eee(heap, heap.u32(param_1 + (1) * 4));
            heap.setU32(0x005ec1c0, (1) >>> 0);
          }
          }
        } else {
          if (uVar1 == 0x1000) {
          iVar2 = FUN_00410f7e(heap, heap.u32(param_1 + (1) * 4));
          if (iVar2 != 0) {
            FUN_00413170(heap, iVar2 + 4, param_1 + 2);
            FUN_00413170(heap, iVar2 + 0x38, param_1 + 0xf);
            heap.setU32(0x005ec1c0, (1) >>> 0);
          }
        } else {
          LAB_00411516: local_10 = 0;
        }
        }
      }
    } while ((local_10 != 0) && (local_c == 0));
    if (local_c == 0) {
      if (param_3 == 0x0) {
        return heap.u32(__addr_param_2);
      }
      uVar3 = FUN_00410f7e(heap, heap.u32(__addr_local_8));
      heap.u32(param_3) = uVar3;
      return heap.u32(__addr_param_2);
    }
  }
  return 0;
} finally {
    heap.freeFrame(12);
  }
}
