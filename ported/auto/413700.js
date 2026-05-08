// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413700.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, SUB41 } from "../runtime/win32.js";
import { FUN_00416d00 } from "./416d00.js";
import { FUN_00416f60 } from "./416f60.js";
export function FUN_00413700(heap, param_1) {
  const __sp = heap.allocFrame(8);
  const __addr_param_1 = __sp + 0;
  const __addr_local_8 = __sp + 4;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar1 = heap.u32(__addr_param_1);
  if (heap.u32(0x005f0270) == 0) {
    if ((0x60 < heap.u32(__addr_param_1)) && (heap.u32(__addr_param_1) < 0x7b)) {
      return heap.u32(__addr_param_1) - 0x20;
    }
  } else {
    if (heap.u32(__addr_param_1) < 0x100) {
      if (heap.u32(0x005ee754) < 2) {
        uVar2 = heap.u32(heap.u32(0x005ee548) + (heap.u32(__addr_param_1) * 2) * 4) & 2;
      } else {
        uVar2 = FUN_00416f60(heap, heap.u32(__addr_param_1), 2);
      }
      if (uVar2 == 0) {
        return uVar1;
      }
    }
    uVar2 = heap.u32(__addr_param_1);
    if ((heap.u32(heap.u32(0x005ee548) + ((uVar1 >>> 8 & 0xffU) * 2 + 1) * 4) & 0x80) == 0) {
      (heap.u32(__addr_param_1) & 0xffff) = uVar1;
      uVar3 = 1;
    } else {
      (heap.u32(__addr_param_1) & 0xffff) = CONCAT11(heap, uVar1, (uVar1 >>> 8));
      (((heap.u32(__addr_param_1)) >>> 24) & 0xff) = SUB41(heap, uVar2, 3);
      (heap.u32(__addr_param_1) & 0xffffffff) = heap.u32(__addr_param_1);
      uVar3 = 2;
    }
    iVar4 = FUN_00416d00(heap, heap.u32(0x005f0270), 0x200, __addr_param_1, uVar3, __addr_local_8, 3, 0, 1);
    if (iVar4 == 0) {
      return uVar1;
    }
    if (iVar4 == 1) {
      return heap.u32(__addr_local_8 + (0) * 4) & 0xff;
    }
    heap.setU32(__addr_param_1, ((heap.u32(__addr_local_8 + (0) * 4) >>> 8 & 0xff) << 8 | heap.u32(__addr_local_8 + (0) * 4) & 0xff) >>> 0);
  }
  return heap.u32(__addr_param_1);
} finally {
    heap.freeFrame(8);
  }
}
