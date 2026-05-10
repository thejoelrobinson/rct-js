// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44b9db.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0044ba3c } from "./44ba3c.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_0044b9db(heap) {
  let in_AX = regs.eax & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  (regs.ecx = 0xb, regs.edx = 0x44bb27, regs.ebx = 0xc60100, regs.eax = FUN_005e3c3c(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x00630f60) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32(0x00631c2c)) & 0xffffffff);
  heap.setU16((unaff_ESI + 0x30), (in_AX) & 0xffff);
  heap.setU16((unaff_ESI + 0x164), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x166), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x16a), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x16c), (0) & 0xffff);
  return (regs.eax = FUN_0044ba3c(heap));
}
