// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43642b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_0043642b(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let iVar1 = 0;
  if ((heap.u32(0x0099a020) & 2) != 0) {
    for (iVar1 = ((0) >>> 0); (heap.i16((0x0099a02c + iVar1)) | 0) != -1; iVar1 = (((iVar1 + 1) >>> 0)) >>> 0) {
      (regs.eax = FUN_005e5562(heap));
    }
  }
  return 1;
}
