// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f3a2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_0042f3a2(heap) {
  let in_EAX = regs.eax >>> 0;
  let iVar1 = 0;
  let in_EDX = regs.edx >>> 0;
  (regs.eax = FUN_0042f239(heap));
  iVar1 = (((regs.eax = FUN_004083e1(heap, 0x12))) >>> 0);
  if ((iVar1 | 0) != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    (regs.eax = FUN_00408342(heap, iVar1, 0x005f8d44, 0x5f));
    (regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)));
  }
  return 1;
}
