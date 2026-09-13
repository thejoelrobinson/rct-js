// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453ed8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040d575 } from "./40d575.js";
export function FUN_00453ed8(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar1 = 0;
  let uVar2 = 0;
  if ((heap.u32(0x006323f8) & 1) != 0) {
    pcVar1 = ((0x006325f0) >>> 0);
    uVar2 = ((0) >>> 0);
    do {
      if ((heap.i8(pcVar1) | 0) != -1) {
        (regs.eax = FUN_0040d575(heap, uVar2));
        heap.setU32(pcVar1, (-1) & 0xffffffff);
      }
      pcVar1 = ((pcVar1 + 8) >>> 0);
      uVar2 = ((uVar2 + 1) >>> 0);
    } while (uVar2 < 2);
  }
  return 1;
}
