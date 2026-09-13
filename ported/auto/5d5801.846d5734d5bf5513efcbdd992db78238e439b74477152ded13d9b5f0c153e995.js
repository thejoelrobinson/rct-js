// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5801.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d5801(heap) {
  let uVar1 = 0;
  if (((heap.u8(0x00652288) != 6) && (heap.u8(0x00652288) != 7)) && (heap.u8(0x00652288) != 8)) {
    return;
  }
  heap.setU8(0x00652293, (heap.u8(0x00652293) + -1) & 0xff);
  if (heap.u8(0x00652293) < 0) {
    heap.setU8(0x00652293, (5) & 0xff);
    heap.setU8(0x00652292, (heap.u8(0x00652292) ^ 1) & 0xff);
    heap.setU32(0x0099a4de, (heap.u8(0x0065228a) & 0xffe0) >>> 0);
    heap.setU32(0x0099a4e0, (heap.u8(0x0065228c) & 0xffe0) >>> 0);
    heap.setU32(0x0099a4e2, (heap.u8(0x0065228e) + 0xf) >>> 0);
    heap.setU32(0x0099a4e4, (4) >>> 0);
    uVar1 = ((heap.u8(0x0065228c) & 0x1f) & 0xffff);
    if ((((heap.u8(0x0065228a) & 0x1f) != 0 || uVar1 != 0) && (heap.setU32(0x0099a4e4, (6) >>> 0), (uVar1 & heap.u8(0x0065228a) & 0x1f) == 0)) && (heap.setU32(0x0099a4e4, (5) >>> 0), uVar1 == 0)) {
      heap.setU32(0x0099a4e4, (7) >>> 0);
    }
    heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
    if ((heap.u8(0x00652292) & 1) != 0) {
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 4) >>> 0);
    }
    (regs.eax = FUN_005e5562(heap));
  }
  return;
}
