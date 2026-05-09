// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416cd0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00418810 } from "./418810.js";
export function FUN_00416cd0(heap, param_1, param_2) {
  let cVar1 = 0;
  let uVar2 = 0;
  let pcVar3 = 0;
  if (param_2 != 0) {
    uVar2 = ((0xffffffff) >>> 0);
    pcVar3 = ((param_1) >>> 0);
    do {
      if (uVar2 == 0) {
        break;
      }
      uVar2 = ((uVar2 - 1) >>> 0);
      cVar1 = ((heap.i8(pcVar3)) & 0xff);
      pcVar3 = ((pcVar3 + 1) >>> 0);
    } while (cVar1 != 0);
    (regs.eax = FUN_00418810(heap, param_1 + param_2, param_1, ~uVar2));
  }
  return;
}
