// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44153e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042cbb0 } from "./42cbb0.js";
import { FUN_0044151b } from "./44151b.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_004575af } from "./4575af.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_0044153e(heap) {
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = FUN_0044151b(heap));
  (regs.eax = FUN_005e53ca(heap));
  (regs.eax = FUN_005e5b80(heap));
  (regs.eax = FUN_005e5301(heap));
  if (heap.i8((unaff_ESI + 0x2e)) == 1) {
    heap.setU32(((0x008d7e2a) + (heap.u8((unaff_ESI + 0xc5))) * 4), (0) & 0xffffffff);
    (regs.eax = FUN_004575af(heap));
  }
  (regs.eax = FUN_0042cbb0(heap));
  return (regs.eax = FUN_00444d1f(heap));
}
