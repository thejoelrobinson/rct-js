// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413c10.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00417016 } from "./417016.js";
export function FUN_00413c10(heap, param_1, param_2) {
  let pcVar1 = 0;
  let pcVar2 = 0;
  let cVar3 = 0;
  let pcVar4 = 0;
  let pcVar5 = 0;
  if (heap.u32(param_2) == 0) {
    return param_1;
  }
  if (heap.u32(param_2 + (1) * 4) == 0) {
    pcVar4 = (((regs.eax = FUN_00417016(heap))) >>> 0);
    return pcVar4;
  }
  do {
    cVar3 = ((heap.u32(param_1)) & 0xff);
    do {
      while (param_1 = ((param_1 + 1) >>> 0), cVar3 != heap.u32(param_2)) {
        if (cVar3 == 0) {
          return 0x0;
        }
        cVar3 = ((heap.u32(param_1)) & 0xff);
      }
      cVar3 = ((heap.u32(param_1)) & 0xff);
      pcVar5 = ((param_1 + 1) >>> 0);
      pcVar4 = ((param_2) >>> 0);
    } while (cVar3 != heap.u32(param_2 + (1) * 4));
    do {
      if (heap.i8(pcVar4 + (2)) == 0) {
        LAB_00413c83: return param_1 + -1;
      }
      if (heap.i8(pcVar5) != heap.i8(pcVar4 + (2))) {
        break;
      }
      pcVar1 = ((pcVar4 + 3) >>> 0);
      if (heap.i8(pcVar1) == 0) {
        /* goto LAB_00413c83 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00413c10/LAB_00413c83"); return 0;
      }
      pcVar2 = ((pcVar5 + 1) >>> 0);
      pcVar4 = ((pcVar4 + 2) >>> 0);
      pcVar5 = ((pcVar5 + 2) >>> 0);
    } while (heap.i8(pcVar1) == heap.i8(pcVar2));
  } while (true);
}
