// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408d5d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004119a0 } from "./4119a0.js";
export function FUN_00408d5d(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  let local_10 = 0;
  let local_8 = 0;
  local_8 = ((heap.u32(0x005ebf48)) >>> 0);
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x6c)), heap.u32(0x005ebf34)))) >>> 0);
  if (iVar1 == 0) {
    if (heap.u32(0x005ebf54) == 0) {
      for (local_10 = ((0) >>> 0); local_10 < heap.u32(0x005f0950); local_10 = (((local_10 + 1) >>> 0)) >>> 0) {
        iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((heap.u32(0x005ebf38) + local_10 * 4))) + 0x6c)), heap.u32((heap.u32(0x005ebf38) + local_10 * 4))))) >>> 0);
        if (iVar1 != 0) {
          return 0;
        }
      }
    } else {
      iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x6c)), heap.u32(0x005ebf40)))) >>> 0);
      if (iVar1 != 0) {
        return 0;
      }
      (regs.eax = FUN_004119a0(heap, heap.u32(0x005ebf40), 0x005ebfb8));
    }
    for (; local_8 != 0; local_8 = (((heap.i32((local_8 + 8))) >>> 0)) >>> 0) {
      iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((local_8 + 4))) + 0x6c)), heap.u32((local_8 + 4))))) >>> 0);
      if (iVar1 != 0) {
        return 0;
      }
    }
    uVar2 = ((1) >>> 0);
  } else {
    uVar2 = ((0) >>> 0);
  }
  return uVar2;
}
