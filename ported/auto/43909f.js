// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43909f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0043909f(heap) {
  let uVar1 = 0;
  let pcVar2 = 0;
  uVar1 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
  if (uVar1 < 0x42) {
    pcVar2 = ((0x00887420) >>> 0);
    do {
      if ((heap.i8(pcVar2) | 0) != -1) {
        return (regs.eax = FUN_00426f56(heap));
      }
      pcVar2 = ((pcVar2 + 0x260) >>> 0);
    } while (pcVar2 < 0x008ad1c0);
  }
  return;
}
