// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455bce.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00455a66 } from "./455a66.js";
import { FUN_00455ade } from "./455ade.js";
import { FUN_00455c5b } from "./455c5b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00455bce(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.eax = FUN_005e5fcb(heap));
  if (in_ZF) {
    (regs.eax = FUN_00455c5b(heap));
    heap.setU32((unaff_ESI + (0x57) * 4), (0xffffffff) & 0xffffffff);
  }
  heap.setU16((unaff_ESI + ((0x59) * 4)), (0) & 0xffff);
  (regs.eax = FUN_005e43de(heap));
  heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x00632d8c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x00632db0)) & 0xffffffff);
  heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x00632dbc)) & 0xffffffff);
  heap.setU32(unaff_ESI, (heap.u32(0x00632d98)) & 0xffffffff);
  heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x00632da4)) & 0xffffffff);
  heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
  (regs.eax = FUN_00455a66(heap));
  (regs.eax = 0x454e6d, regs.eax = FUN_005e412c(heap));
  (regs.eax = FUN_00455ade(heap));
  if (heap.u32((0x00743bbf) + (heap.u32((unaff_ESI + ((0xc) * 4))) * 0x100) * 4) == 9) {
    (regs.eax = callIndirect(heap, heap.u32(unaff_ESI + (1) * 4)));
  }
  return;
}
