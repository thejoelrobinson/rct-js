// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440072.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043fe80 } from "./43fe80.js";
import { FUN_0043fecb } from "./43fecb.js";
import { FUN_004400eb } from "./4400eb.js";
import { FUN_00455a66 } from "./455a66.js";
import { FUN_00455ade } from "./455ade.js";
import { FUN_00455c5b } from "./455c5b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00440072(heap) {
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((heap.i8((in_EDX + 0x2e)) == 1) & 0xff);
  if (!bVar1) {
    (regs.eax = FUN_005e5fcb(heap));
    if (bVar1) {
      (regs.eax = FUN_004400eb(heap));
      heap.setU32((unaff_ESI + (0x57) * 4), (0xffffffff) & 0xffffffff);
    }
    heap.setU16((unaff_ESI + ((0x59) * 4)), (0) & 0xffff);
    (regs.eax = FUN_005e43de(heap));
    heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x00629138)) & 0xffffffff);
    heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x00629180)) & 0xffffffff);
    heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x00629198)) & 0xffffffff);
    heap.setU32(unaff_ESI, (heap.u32(0x00629150)) & 0xffffffff);
    heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x00629168)) & 0xffffffff);
    heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
    (regs.eax = FUN_0043fe80(heap));
    (regs.eax = FUN_005e412c(heap));
    return (regs.eax = FUN_0043fecb(heap));
  }
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
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
  (regs.eax = FUN_005e412c(heap));
  (regs.eax = FUN_00455ade(heap));
  if (heap.u32((0x00743bbf) + (heap.u32((unaff_ESI + ((0xc) * 4))) * 0x100) * 4) == 9) {
    (regs.eax = callIndirect(heap, heap.u32(unaff_ESI + (1) * 4)));
  }
  return;
}
