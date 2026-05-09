// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/454520.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004575af } from "./4575af.js";
export function FUN_00454520(heap) {
  let uVar1 = 0;
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x008d7e2a) + (uVar1) * 4), (0) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x74);
  do {
    heap.setU32(((0x008d7e2a) + (uVar1) * 4), (1) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x78);
  return (regs.eax = FUN_004575af(heap));
}
