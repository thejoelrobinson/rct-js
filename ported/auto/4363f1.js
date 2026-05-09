// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4363f1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_004363f1(heap) {
  let sVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let in_EDX = regs.edx >>> 0;
  if ((heap.u32(0x0099a020) & 1) != 0) {
    do {
      do {
        sVar1 = (((regs.eax = FUN_005e5562(heap))) & 0xffff);
      } while ((((extraout_CX + 0x20)) << 16 >> 16) <= heap.u32(0x0099a028));
    } while ((((sVar1 + 0x20)) << 16 >> 16) <= heap.u32(0x0099a024));
  }
  return 1;
}
