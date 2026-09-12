// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e2fa0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_005e2fa0(heap) {
  (regs.ecx = 0x5, regs.eax = FUN_005e5b80(heap));
  heap.setU32(0x00991f52, (0) >>> 0);
  heap.setU32(0x00991f49, (0xff) >>> 0);
  return;
}
