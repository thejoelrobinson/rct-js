// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d21fa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00426f56 } from "./426f56.js";
import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d21fa(heap) {
  let bVar1 = 0;
  if (((heap.u32(0x00652288) != '\0') && (heap.u32(0x00652288) != '\x04')) && (heap.u32(0x00652288) != '\x05')) {
    if (heap.u32(0x00652288) == '\x03') {
      FUN_005cfe66(heap);
      return;
    }
    if ((heap.u32(0x00652292) & 1) == 0) {
      if ((heap.u32(0x00652292) & 2) != 0) {
        heap.setU32(0x00652292, (heap.u32(0x00652292) & 0xfd) >>> 0);
        heap.setU32(0x00652470, (heap.u32(0x00652289)) >>> 0);
        bVar1 = false;
        if ((heap.u32(0x006522a2) & 4) == 0) {
          bVar1 = heap.u32(0x0065229e) < heap.u32((ushort)(0x0065247a) + (heap.u32(0x006522a2) * 2) * 4);
        }
        FUN_005cfac0(heap);
        if (!bVar1) {
          FUN_00426f56(heap);
          return;
        }
      }
    } else {
      FUN_005e5562(heap);
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
    }
  }
  return;
}
