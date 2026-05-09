// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/427377.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042756b } from "./42756b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
import { FUN_005e687d } from "./5e687d.js";
export function FUN_00427377(heap) {
  let puVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar2 = 0;
  bVar2 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar2) {
    (regs.eax = FUN_0042756b(heap));
    heap.setU32((unaff_ESI + (0x57) * 4), (0xffffffff) & 0xffffffff);
  }
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.i8((unaff_ESI + ((0x5d) * 4))) == heap.u8(0x00991f5a))) && (heap.i16((unaff_ESI + ((0xc) * 4))) == heap.u8(0x00991f58))) {
    (regs.eax = FUN_005e687d(heap));
  }
  LOCK();
  puVar1 = ((heap.u32(unaff_ESI + (2) * 4)) >>> 0);
  heap.setU32((unaff_ESI + (2) * 4), (0) & 0xffffffff);
  UNLOCK();
  if (puVar1 != 0x0) {
    heap.setU32(puVar1, (0) & 0xffffffff);
  }
  heap.setU16((unaff_ESI + ((0x59) * 4)), (2) & 0xffff);
  (regs.eax = FUN_005e43de(heap));
  heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x005f508c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x005f50e0)) & 0xffffffff);
  heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x005f50fc)) & 0xffffffff);
  heap.setU32(unaff_ESI, (heap.u32(0x005f50a8)) & 0xffffffff);
  heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x005f50c4)) & 0xffffffff);
  heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
  return (regs.eax = 0x427ede, regs.ecx = 0x1b, regs.eax = FUN_005e412c(heap));
}
