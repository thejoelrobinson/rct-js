// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402e3d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetSystemInfo, cpuid_Version_info } from "../../runtime/win32.js";
export function FUN_00402e3d(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_2c = __sp + 0;
  try {
  let iVar1 = 0;
  let local_8 = 0;
  local_8 = 0;
  GetSystemInfo(heap, __addr_local_2c);
  if ((heap.u32((__addr_local_2c + 24)) != 0x182) && (heap.u32((__addr_local_2c + 24)) != 0x1e6)) {
    iVar1 = cpuid_Version_info(heap, 1);
    local_8 = heap.u32((iVar1 + 8));
  }
  return (local_8 & 0x800000) != 0;
} finally {
    heap.freeFrame(128);
  }
}
