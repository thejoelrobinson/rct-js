// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d678.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042db0f } from "./42db0f.js";
export function FUN_0042d678(heap) {
  let uVar1 = 0;
  uVar1 = ((heap.u32(0x0087c39a)) & 0xffff);
  while (uVar1 != 0xffff) {
    uVar1 = ((heap.u32((0x00743b98) + (((uVar1) >>> 0) * 0x80) * 4)) & 0xffff);
    (regs.eax = FUN_0042db0f(heap));
  }
  return;
}
