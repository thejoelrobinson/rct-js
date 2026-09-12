// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40857b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCurrentDirectoryA, GetLogicalDriveStringsA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413700 } from "./413700.js";
export function FUN_0040857b(heap, param_1, param_2) {
  const __sp = heap.allocFrame(284);
  const __addr_local_120 = __sp + 0;
  const __addr_local_8 = __sp + 280;
  try {
  let uVar1 = 0;
  let local_124 = 0;
  GetCurrentDirectoryA(heap, 0x117, __addr_local_120);
  uVar1 = (((regs.eax = FUN_00413700(heap, ((heap.u32(__addr_local_120 + (0) * 4)) | 0)))) & 0xff);
  heap.setU32(param_2, (uVar1) & 0xffffffff);
  GetLogicalDriveStringsA(heap, 0x117, __addr_local_120);
  heap.setU32(__addr_local_8, (0) >>> 0);
  for (local_124 = ((0) >>> 0); local_124 < 8; local_124 = (((local_124 + 1) >>> 0)) >>> 0) {
    uVar1 = (((regs.eax = FUN_00413700(heap, ((heap.u32(__addr_local_120 + (heap.u32(__addr_local_8)) * 4)) | 0)))) & 0xff);
    heap.setU8((local_124 + param_1), (uVar1) & 0xff);
    if (heap.u32(__addr_local_120 + (heap.u32(__addr_local_8)) * 4) != 0) {
      for (; heap.u32(__addr_local_120 + (heap.u32(__addr_local_8)) * 4) != 0; heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 1) >>> 0)) {
      
      }
      heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 1) >>> 0);
    }
  }
  heap.setU8((param_1 + 8), (0) & 0xff);
  return;
} finally {
    heap.freeFrame(284);
  }
}
