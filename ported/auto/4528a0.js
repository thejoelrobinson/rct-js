// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4528a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004528d6 } from "./4528d6.js";
import { FUN_00453ed8 } from "./453ed8.js";
import { FUN_00453f0a } from "./453f0a.js";
import { FUN_00454300 } from "./454300.js";
export function FUN_004528a0(heap) {
  heap.setU8(0x006326bc, (heap.u8(0x006326bc) + 1) & 0xff);
  if (heap.u8(0x006326bc) == 1) {
    (regs.eax = FUN_00453f0a(heap));
    (regs.eax = FUN_004528d6(heap));
    (regs.eax = FUN_00453ed8(heap));
    (regs.eax = FUN_00454300(heap));
  }
  return;
}
