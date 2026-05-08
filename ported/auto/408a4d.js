// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408a4d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetProcAddress, LoadLibraryA } from "../../runtime/win32.js";
import { FUN_00408a26 } from "./408a26.js";
import { FUN_00408b0b } from "./408b0b.js";
export function FUN_00408a4d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ebf30 = __sp + 0;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32(0x005ebf2c) == 0x0) {
    heap.setU32(0x005ebf2c, (LoadLibraryA(heap, 0x005ebf68)) >>> 0);
    if (heap.u32(0x005ebf2c) == 0x0) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005f0d60, (GetProcAddress(heap, heap.u32(0x005ebf2c), 0x005ebf74)) >>> 0);
      heap.setU32(0x005f0958, (GetProcAddress(heap, heap.u32(0x005ebf2c), 0x005ebf8c)) >>> 0);
      heap.setU32(0x005f0eec, (GetProcAddress(heap, heap.u32(0x005ebf2c), 0x005ebfa4)) >>> 0);
      iVar2 = FUN_00408a26(heap, 0, __addr_DAT_005ebf30, 0);
      if (iVar2 == 0) {
        uVar1 = 1;
      } else {
        FUN_00408b0b(heap);
        uVar1 = 0;
      }
    }
  } else {
    uVar1 = 1;
  }
  return uVar1;
} finally {
    heap.freeFrame(4);
  }
}
