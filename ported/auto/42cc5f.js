// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cc5f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e4198 } from "./5e4198.js";
export function FUN_0042cc5f(heap) {
  let uVar1 = 0;
  let extraout_DX = 0;
  let sVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  uVar1 = (((heap.u32(0x005f54dc) - heap.u32(0x005f54da)) - 1) & 0xffff);
  sVar2 = ((extraout_DX - uVar1) & 0xffff);
  if (extraout_DX < uVar1) {
    sVar2 = ((0) & 0xffff);
  }
  heap.setI16((unaff_ESI + 0x3e), (sVar2) & 0xffff);
  return (regs.eax = FUN_005e4198(heap));
}
