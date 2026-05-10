// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43f325.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e0e07 } from "./5e0e07.js";
export function FUN_0043f325(heap) {
  let in_AL = regs.eax & 0xff;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let extraout_var = 0;
  let uVar1 = 0;
  uVar1 = ((((((((in_AL) & 0xffff) * (CONCAT11(0x76, in_AL) >>> 8)) & 0xffff) >>> 8) >>> 0)) >>> 0);
  (regs.esi = 0x30, regs.eax = FUN_005e0e07(heap));
  if ((((-1 < (unaff_EBP | 0)) || (heap.u8(0x0099c169) != 0)) || ((heap.u32(0x0088741c) & 8) == 0)) && (2 < ((uVar1) & 0xffff))) {
    (regs.esi = 0x30, regs.eax = FUN_005e0e07(heap, in_EDX, extraout_var, uVar1));
  }
  return;
}
