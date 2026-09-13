// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458407.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458b05 } from "./458b05.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009ba943 } from "./9ba943.js";
export function FUN_00458407(heap) {
  (regs.eax = FUN_00458bcf(heap));
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  (regs.esi = 0x99a888, regs.edi = 0x990000, regs.eax = FUN_00458b05(heap));
  return (regs.eax = FUN_009ba943(heap));
}
