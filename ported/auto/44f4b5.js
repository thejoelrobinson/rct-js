// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f4b5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_0044a4e8 } from "./44a4e8.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_0044f4b5(heap) {
  let uVar1 = 0;
  let extraout_var = 0;
  let unaff_EBX = regs.ebx >>> 0;
  heap.setU32(0x00991efe, (0x3ca) >>> 0);
  uVar1 = (((regs.ebx = 0x1, regs.esi = 0x6, regs.eax = FUN_00426f56(heap), regs.edx = 0x4271bb, regs.eax)) >>> 0);
  if (CONCAT31((regs.eax = callIndirect(heap, int3, ((unaff_EBX) >>> 0) >>> 8)), 1) != -0x80000000) {
    (regs.esi = 0x6, regs.eax = FUN_0044a4e8(heap));
    (regs.eax = callIndirect(heap, heap.u32(0x0000000a), CONCAT22(extraout_var, heap.u32(0x00000036)), heap.u32(0x0000017a)));
    (regs.eax = FUN_005e3b2b(heap));
    uVar1 = (((regs.esi = 0x6, regs.eax = FUN_005e5bd8(heap))) >>> 0);
    return uVar1;
  }
  return uVar1;
}
