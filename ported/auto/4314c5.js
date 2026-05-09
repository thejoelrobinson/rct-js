// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4314c5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004429db } from "./4429db.js";
export function FUN_004314c5(heap) {
  heap.setU8(0x0099c163, (heap.u32(0x008d7ea4)) & 0xff);
  heap.setU8(0x0099c167, (0x30) & 0xff);
  return (regs.eax = FUN_004429db(heap));
}
