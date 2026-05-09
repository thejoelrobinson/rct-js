// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4448fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
export function FUN_004448fb(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar1 = 0;
  pcVar1 = ((0x00743b94) >>> 0);
  do {
    if ((heap.i8(pcVar1) | 0) != -1) {
      (regs.eax = FUN_00444927(heap));
    }
    pcVar1 = ((pcVar1 + 0x100) >>> 0);
  } while (pcVar1 < 0x0087c394);
  return 1;
}
