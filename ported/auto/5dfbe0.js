// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dfbe0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5b80 } from "./5e5b80.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005dfbe0(heap) {
  let puVar1 = 0;
  let puVar2 = 0;
  (regs.ecx = 0x6, regs.eax = FUN_005e5b80(heap));
  puVar2 = ((heap.u32(0x009a1164)) >>> 0);
  do {
    if (puVar2 + -0x178 < 0x009a013c) {
      return;
    }
    puVar1 = (((puVar2 + -0x146)) >>> 0);
    puVar2 = ((puVar2 + -0x178) >>> 0);
  } while ((heap.u16(puVar1) & 3) != 0);
  return (regs.eax = FUN_005e5bd8(heap));
}
