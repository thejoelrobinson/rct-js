// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e39c6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e39ff } from "./5e39ff.js";
import { FUN_005e40c4 } from "./5e40c4.js";
export function FUN_005e39c6(heap) {
  let uVar1 = 0;
  uVar1 = ((heap.u32(0x009a1164)) >>> 0);
  if (heap.u8(0x0099c169) != 0) {
    heap.setU32(0x009a1618, (heap.u32(0x009a1618) + 1) >>> 0);
  }
  while (0x9a013b < uVar1 - 0x178) {
    (regs.eax = FUN_005e40c4(heap));
    (regs.eax = FUN_005e39ff(heap));
    (regs.eax = callIndirect(heap, heap.u32((uVar1 - 0x174))));
    uVar1 = ((uVar1 - 0x178) >>> 0);
  }
  return;
}
