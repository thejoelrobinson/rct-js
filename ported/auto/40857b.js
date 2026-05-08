// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40857b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCurrentDirectoryA, GetLogicalDriveStringsA } from "../../runtime/win32.js";
import { FUN_00413700 } from "./413700.js";
export function FUN_0040857b(heap, param_1, param_2) {
  const __sp = heap.allocFrame(280);
  const __addr_local_120 = __sp + 0;
  try {
  let uVar1 = 0;
  let local_124 = 0;
  let local_8 = 0;
  GetCurrentDirectoryA(heap, 0x117, __addr_local_120);
  uVar1 = FUN_00413700(heap, heap.u32(__addr_local_120 + (0) * 4));
  heap.u32(param_2) = uVar1;
  GetLogicalDriveStringsA(heap, 0x117, __addr_local_120);
  local_8 = 0;
  for (local_124 = 0; local_124 < 8; local_124 = local_124 + 1) {
    uVar1 = FUN_00413700(heap, heap.u32(__addr_local_120 + (local_8) * 4));
    heap.u32((local_124 + param_1)) = uVar1;
    if (heap.u32(__addr_local_120 + (local_8) * 4) != '\0') {
      for (; heap.u32(__addr_local_120 + (local_8) * 4) != '\0'; local_8 = local_8 + 1) {
      
      }
      local_8 = local_8 + 1;
    }
  }
  heap.u32((param_1 + 8)) = 0;
  return;
} finally {
    heap.freeFrame(280);
  }
}
