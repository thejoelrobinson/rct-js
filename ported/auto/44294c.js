// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44294c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_0042de29 } from "./42de29.js";
import { FUN_0043424f } from "./43424f.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0044294c(heap) {
  let sVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let bVar2 = 0;
  LAB_004429a6: {
  bVar2 = ((heap.u32(0x0099a4f6) < 0x8000) & 0xff);
  if (heap.u32(0x0099a4f6) == 0x8000) {
    (regs.eax = FUN_005e68e2(heap));
    if (bVar2) {
      break LAB_004429a6;
    }
    sVar1 = (((regs.eax = FUN_0043424f(heap))) & 0xffff);
    if (sVar1 == -0x8000) {
      break LAB_004429a6;
    }
    (regs.eax = FUN_00423677(heap));
  }
  (regs.eax = FUN_0042de29(heap));
  }
  return 1;
}
