// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb355.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004015f0 } from "./4015f0.js";
export function FUN_009bb355(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  return (regs.eax = FUN_004015f0(heap, ((in_AX) | 0), ((unaff_BX) | 0), ((in_CX) | 0), ((in_DX) | 0)));
}
