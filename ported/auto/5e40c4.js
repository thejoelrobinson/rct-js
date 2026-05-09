// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e40c4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e4198 } from "./5e4198.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e40c4(heap) {
  let iVar1 = 0;
  let extraout_CX = 0;
  let extraout_DX = 0;
  let iVar2 = 0;
  let sVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar4 = 0;
  iVar1 = ((0) >>> 0);
  iVar2 = ((0) >>> 0);
  for (pcVar4 = ((heap.u32((unaff_ESI + 0x1c))) >>> 0); heap.i8(pcVar4) != 21; pcVar4 = (((pcVar4 + 0x10) >>> 0)) >>> 0) {
    if (heap.i8(pcVar4) == 17) {
      (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4)), pcVar4, iVar2, iVar1));
      sVar3 = ((0) & 0xffff);
      if (((heap.u32((pcVar4 + 10)) & 1) != 0) && (extraout_CX != heap.i16((iVar2 + 0x38 + unaff_ESI)))) {
        sVar3 = ((1) & 0xffff);
        heap.setI16((iVar2 + 0x38 + unaff_ESI), (extraout_CX) & 0xffff);
      }
      if (((heap.u32((pcVar4 + 10)) & 2) != 0) && (extraout_DX != heap.i16((iVar2 + 0x40 + unaff_ESI)))) {
        sVar3 = ((sVar3 + 1) & 0xffff);
        heap.setI16((iVar2 + 0x40 + unaff_ESI), (extraout_DX) & 0xffff);
      }
      if (sVar3 != 0) {
        (regs.eax = FUN_005e4198(heap));
        iVar1 = (((regs.eax = FUN_005e43de(heap))) >>> 0);
      }
      iVar1 = ((iVar1 + 1) >>> 0);
      iVar2 = ((iVar2 + 0x12) >>> 0);
    }
  }
  return;
}
