// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e7ef.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
export function FUN_0043e7ef(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar1 = 0;
  let iVar2 = 0;
  for (uVar1 = ((heap.u32(0x0087c398)) & 0xffff); uVar1 != 0xffff; uVar1 = (((heap.u32((0x00743b98) + (((uVar1) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
    iVar2 = ((((uVar1) >>> 0) * 0x100) >>> 0);
    if ((heap.u32((0x00743bbf) + (iVar2) * 4) == 6) && (((in_EDX) << 24 >> 24) == heap.u32((0x00743bfc) + (iVar2) * 4))) {
      (regs.eax = FUN_0043e792(heap));
      (regs.eax = FUN_0044142c(heap));
      heap.setU32(((0x00743bbf) + (iVar2) * 4), (0) & 0xffffffff);
      (regs.eax = FUN_00441452(heap));
    }
  }
  return 1;
}
