// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a503.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_0040a503(heap) {
  let iVar1 = 0;
  if (((heap.u32(0x005ebf54) == 0) && (heap.u32(0x005ebf34) != 0x0)) && (heap.u32(0x005ebf3c) != 0)) {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x7c)), heap.u32(0x005ebf34), heap.u32(0x005ebf3c)))) >>> 0);
    if (iVar1 == -0x7789fe3e) {
      iVar1 = (((regs.eax = FUN_00408d5d(heap))) >>> 0);
      if (iVar1 != 0) {
        (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x7c)), heap.u32(0x005ebf34), heap.u32(0x005ebf3c)));
      }
    }
  }
  return;
}
