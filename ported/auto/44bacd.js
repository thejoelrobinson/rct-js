// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44bacd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e429d } from "./5e429d.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_0044bacd(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.i32((unaff_ESI + 8)) == 0) && ((heap.i16((0x00887448 + heap.u32((unaff_ESI + 0x30)) * 0x260)) | 0) != -1)) {
    (regs.eax = FUN_005e429d(heap));
    heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) | 4) & 0xffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return;
}
