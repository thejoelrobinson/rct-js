// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f98e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042f999 } from "./42f999.js";
export function FUN_0042f98e(heap) {
  let uVar1 = 0;
  let extraout_ECX = 0;
  let unaff_ESI = regs.esi >>> 0;
  do {
    uVar1 = (((regs.eax = FUN_0042f999(heap))) & 0xff);
    heap.setU32(unaff_ESI, (uVar1) & 0xffffffff);
    unaff_ESI = ((unaff_ESI + 1) >>> 0);
  } while (extraout_ECX != 1);
  return;
}
