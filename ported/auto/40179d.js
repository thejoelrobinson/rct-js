// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40179d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GdiFlush } from "../../runtime/win32.js";
import { FUN_004018ec } from "./4018ec.js";
import { FUN_00401f79 } from "./401f79.js";
import { FUN_0040264b } from "./40264b.js";
import { FUN_00402ada } from "./402ada.js";
import { FUN_00402b77 } from "./402b77.js";
import { FUN_00403a92 } from "./403a92.js";
export function FUN_0040179d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f2420 = __sp + 0;
  try {
  let iVar1 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_8 = 0;
  heap.setU32(0x005f1fe0, (0) >>> 0);
  heap.setU32(0x005f1fe4, (heap.u32(0x005e9158)) >>> 0);
  heap.setU32(0x005f2404, (0) >>> 0);
  if (heap.u32(0x005e914c) != 0) {
    FUN_00402ada(heap);
  }
  iVar1 = FUN_00403a92(heap);
  if ((iVar1 == 0) && (heap.u32(0x005e9150) == 0)) {
    if (((heap.u32(0x005e9148) != 0) && (2 < heap.u32(0x005e910c))) && (heap.u32(0x005e910c) < 8)) {
      local_8 = FUN_00401f79(heap);
    }
  } else {
    if ((2 < heap.u32(0x005e910c)) && (heap.u32(0x005e910c) < 8)) {
    local_8 = FUN_0040264b(heap);
  }
  }
  if (local_8 == 0) {
    FUN_004018ec(heap);
  }
  heap.setU32(0x005e9154, (0) >>> 0);
  heap.setU32(0x005e9158, (0) >>> 0);
  for (local_c = 0; local_c < 0xa00; local_c = local_c + 1) {
    heap.u32((__addr_DAT_005f2420) + (local_c) * 4) = 0;
  }
  if (heap.u32(0x005e914c) != 0) {
    FUN_00402b77(heap);
  }
  GdiFlush(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
