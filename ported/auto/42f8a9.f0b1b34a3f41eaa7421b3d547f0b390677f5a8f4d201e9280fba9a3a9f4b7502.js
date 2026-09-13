// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f8a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042f6df } from "./42f6df.js";
export function FUN_0042f8a9(heap) {
  if (heap.u8(0x005f88ae) != 0) {
    if (heap.u8(0x005f88ae) != 1) {
      if (heap.u8(0x005f88ae) != 2) {
        (regs.eax = 0xfe, regs.eax = FUN_0042f6df(heap));
        do {
          (regs.eax = 0xfe, regs.eax = FUN_0042f6df(heap));
          heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + -1) & 0xff);
        } while (heap.u8(0x005f8d34) != 0);
        heap.setU8(0x005f88ae, (0) & 0xff);
        return;
      }
      (regs.eax = 0xfe, regs.eax = FUN_0042f6df(heap));
      (regs.eax = 0xfe, regs.eax = FUN_0042f6df(heap));
      heap.setU8(0x005f88ae, (0) & 0xff);
      return;
    }
    (regs.eax = 0xfe, regs.eax = FUN_0042f6df(heap));
    (regs.eax = 0xfe, regs.eax = FUN_0042f6df(heap));
    heap.setU8(0x005f88ae, (heap.u8(0x005f88ae) + -1) & 0xff);
  }
  return;
}
