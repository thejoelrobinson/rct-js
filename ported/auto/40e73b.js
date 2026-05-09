// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e73b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040e814 } from "./40e814.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040e73b(heap, param_1, param_2) {
  let iVar1 = 0;
  let piVar2 = 0;
  let iVar3 = 0;
  let local_10 = 0;
  iVar1 = (((regs.eax = FUN_004133c0(heap, 0xa8))) >>> 0);
  if (iVar1 != 0) {
    piVar2 = (((regs.eax = FUN_004133c0(heap, 8))) >>> 0);
    if (piVar2 != 0x0) {
      heap.setU32(piVar2, (iVar1) & 0xffffffff);
      heap.setI32((piVar2 + (1) * 4), (0) & 0xffffffff);
      iVar3 = (((regs.eax = FUN_0040e814(heap, iVar1, ((param_1) >>> 0), ((param_2) >>> 0)))) >>> 0);
      if (iVar3 != 0) {
        local_10 = ((((heap.u32(0x005ec074)) >>> 0)) >>> 0);
        if (heap.u32(0x005ec074) == 0x0) {
          heap.setU32(0x005ec074, (piVar2) >>> 0);
          return iVar1;
        }
        for (; heap.i32((local_10 + 4)) != 0; local_10 = (((heap.i32((local_10 + 4))) >>> 0)) >>> 0) {
        
        }
        heap.setU32((local_10 + 4), (piVar2) & 0xffffffff);
        return iVar1;
      }
      (regs.eax = FUN_00413470(heap, piVar2));
    }
    (regs.eax = FUN_00413470(heap, iVar1));
  }
  return 0;
}
