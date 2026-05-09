// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5ce2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_005e5ce2(heap) {
  let uVar1 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let puVar2 = 0;
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xfffffff9) >>> 0);
  if (((unaff_BX) << 16 >> 16) < 0) {
    heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 2) >>> 0);
  }
  heap.setU32(0x009a15bd, ((regs.ecx = 0x6, regs.eax = FUN_005e5b80(heap))) >>> 0);
  heap.setU32(0x009a15c4, ((unaff_BX & 0x7fff) * 10 + 0xb) >>> 0);
  heap.setU32(0x009a15c0, (unaff_BP + 3) >>> 0);
  heap.setU32(0x009a1244, (unaff_BX & 0x7fff) >>> 0);
  (regs.ecx = 0x206, regs.edx = 0x5e5e0d, regs.ebx = 0xc0004, regs.ebp = 0x5e5e00, regs.eax = FUN_005e3f31(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x009a15bc) & 0xffffffff);
  if ((heap.u32(0x009a15bd) & 0x80) != 0) {
    heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) | 0x10) & 0xffff);
  }
  puVar2 = ((0x009a1248) >>> 0);
  uVar1 = ((heap.u32(0x009a1244)) & 0xffff);
  do {
    heap.setU32(puVar2, (0) & 0xffffffff);
    puVar2 = ((puVar2 + ((1) * 2)) >>> 0);
    uVar1 = ((uVar1 - 1) & 0xffff);
  } while (uVar1 != 0);
  heap.setU32(0x009a1246, (0xffff) >>> 0);
  heap.setU32(0x009a13d8, (0) >>> 0);
  heap.setU32(0x009a13dc, (0) >>> 0);
  heap.setU8(0x00991f36, (5) & 0xff);
  return;
}
