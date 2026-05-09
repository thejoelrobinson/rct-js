// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1653.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e1210 } from "./5e1210.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e1653(heap) {
  let puVar1 = 0;
  let puVar2 = 0;
  if (heap.u8(0x00971ef0) != 0) {
    (regs.eax = FUN_005e1210(heap));
    for (puVar1 = ((0x009a013c) >>> 0); puVar1 < heap.u32(0x009a1164); puVar1 = (((puVar1 + 0x178) >>> 0)) >>> 0) {
      if (heap.i32((puVar1 + 8)) != 0) {
        (regs.eax = FUN_005e16f7(heap));
      }
    }
    heap.setU32(0x0099fe00, (heap.u32(0x0099fe00) + heap.u8(0x00999f98)) >>> 0);
    puVar1 = ((heap.u32(0x009a1164)) >>> 0);
    if (999 < heap.u32(0x0099fe00)) {
      heap.setU32(0x0099fe00, (0) >>> 0);
      puVar2 = ((heap.u32(0x009a1164)) >>> 0);
      while (puVar1 = ((heap.u32(0x009a1164)) >>> 0), 0x9a013b < puVar2 + -0x178) {
        (regs.eax = callIndirect(heap, heap.u32((puVar2 + -0x174))));
        puVar2 = ((puVar2 + -0x178) >>> 0);
      }
    }
    while (puVar2 = ((puVar1) >>> 0), puVar1 = ((puVar2 + -0x178) >>> 0), 0x9a013b < puVar1) {
      if (((heap.u16((puVar2 + -0x146)) & 0x600) != 0) && (heap.setI16((puVar2 + -0x146), (heap.i16((puVar2 + -0x146)) + -0x200) & 0xffff), (heap.u16((puVar2 + -0x146)) & 0x600) == 0)) {
        (regs.eax = FUN_005e43de(heap));
      }
    }
  }
  return;
}
