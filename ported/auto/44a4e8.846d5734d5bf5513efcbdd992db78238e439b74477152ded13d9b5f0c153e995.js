// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a4e8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0044b9db } from "./44b9db.js";
import { FUN_0044ba3c } from "./44ba3c.js";
import { FUN_0044c464 } from "./44c464.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044a4e8(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.eax = FUN_005e5fcb(heap));
  if (in_ZF) {
    (regs.eax = FUN_0044b9db(heap));
    heap.setU32((unaff_ESI + (0x57) * 4), (0xffffffff) & 0xffffffff);
  }
  heap.setU16((unaff_ESI + ((0x59) * 4)), (0) & 0xffff);
  heap.setU16((unaff_ESI + ((9) * 4)), (0x100) & 0xffff);
  heap.setU16((((unaff_ESI) | 0) + 0x26), (0xc6) & 0xffff);
  (regs.eax = FUN_005e43de(heap));
  heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x00631bcc)) & 0xffffffff);
  heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x00631c2c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x00631c4c)) & 0xffffffff);
  heap.setU32(unaff_ESI, (heap.u32(0x00631bec)) & 0xffffffff);
  heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x00631c0c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
  (regs.eax = FUN_0044ba3c(heap));
  (regs.eax = 0x44bb27, regs.eax = FUN_005e412c(heap));
  heap.setU16((((unaff_ESI) | 0) + 0x15a), (0) & 0xffff);
  return (regs.eax = FUN_0044c464(heap));
}
