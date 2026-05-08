// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4292b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_004292b0(heap) {
  let in_EDX = 0;
  let local_1c = 0;
  local_1c = 0;
  pbVar1 = 0x00887420;
  do {
    if ((heap.u32(pbVar1) != 0xff) && (heap.u32((pbVar1 + 0xf6)) != 0xffff)) {
      local_1c = local_1c + ((uint)(ushort)(heap.u32((pbVar1 + 0xd4)) + heap.u32((pbVar1 + 0xd6)) + heap.u32((pbVar1 + 0xd8)) + heap.u32((pbVar1 + 0xda)) + heap.u32((pbVar1 + 0xdc)) + heap.u32((pbVar1 + 0xde)) + heap.u32((pbVar1 + 0xe0)) + heap.u32((pbVar1 + 0xe2)) + heap.u32((pbVar1 + 0xe4)) + heap.u32((pbVar1 + 0xe6))) + heap.u32((uint)(byte)(0x005f5d07) + ((uint) * pbVar1 * 8) * 4) * 4) * (uint) * (pbVar1 + 0xf6);
    }
    pbVar1 = pbVar1 + 0x260;
  } while (pbVar1 < 0x008ad1c0);
  return CONCAT44(heap, in_EDX, local_1c + heap.u32(0x0087c81c) * 0x1e);
}
