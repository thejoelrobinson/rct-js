// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4585a6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009b30f1 } from "./9b30f1.js";
import { FUN_009ba943 } from "./9ba943.js";
export function FUN_004585a6(heap) {
  let in_DX = regs.edx & 0xffff;
  (regs.eax = FUN_00458bcf(heap));
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  (regs.eax = FUN_00458a7c(heap, 0x0099a888));
  (regs.eax = FUN_009ba943(heap, in_DX));
  (regs.eax = FUN_009b30f1(heap));
  if (heap.u8(0x0099ac8a) != 0) {
    (regs.eax = FUN_009b30f1(heap));
  }
  return;
}
