// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5003.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005d5003(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.eax = FUN_005e3b2b(heap));
  if (!in_ZF) {
    uVar1 = ((heap.u32((unaff_ESI + 0x14)) & 0xfffffe3f) >>> 0);
    if (heap.u8(0x00652288) == 6) {
      uVar1 = ((uVar1 | 0x40) >>> 0);
    }
    if (heap.u8(0x00652288) == NaN) {
      uVar1 = ((uVar1 | 0x80) >>> 0);
    }
    if (heap.u8(0x00652288) == 8) {
      uVar1 = ((uVar1 | 0x100) >>> 0);
    }
    heap.setU32((unaff_ESI + 0x14), (uVar1) & 0xffffffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return 1;
}
