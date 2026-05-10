// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433e1c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_00433e1c(heap) {
  // diagnostic — wiped on regen
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_00433e1c");
  let iVar1 = 0;
  let iVar2 = 0;
  iVar1 = ((heap.u32(0x005f96e4)) >>> 0);
  while (iVar1 = ((heap.i32((iVar1 + 0x20))) >>> 0), iVar2 = ((iVar1) >>> 0), iVar1 != 0) {
    for (; (regs.eax = FUN_009b438b(heap)), heap.i32((iVar2 + 0x1c)) != 0; iVar2 = (((heap.i32((iVar2 + 0x1c))) >>> 0)) >>> 0) {
    
    }
    for (iVar2 = ((heap.i32((iVar2 + 0x18))) >>> 0); iVar2 != 0; iVar2 = (((heap.i32((iVar2 + 8))) >>> 0)) >>> 0) {
      (regs.eax = FUN_009b438b(heap));
    }
  }
  return;
}
