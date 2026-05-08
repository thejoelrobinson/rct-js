// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4298a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00429aff } from "./429aff.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e429d } from "./5e429d.js";
export function FUN_004298a0(heap) {
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  heap.setU32(0x005f5118, (heap.u32(0x00971ed8) + -0x40) >>> 0);
  if ((heap.u32(0x0099a500) & 1) != 0) {
    heap.setU32(0x005f5118, (heap.u32(0x00971ed8)) >>> 0);
  }
  heap.setU32(0x005f5114, (heap.u32(0x00971ed6)) >>> 0);
  FUN_005e3f31(heap);
  heap.u32((unaff_ESI + 0x1c)) = 0x005f5110;
  FUN_005e429d(heap);
  heap.u32((unaff_EDI + 0x12)) = heap.u32((unaff_EDI + 0x12)) | 0x800;
  heap.setU32(0x00991f88, (0) >>> 0);
  heap.setU32(0x005f4948, (0) >>> 0);
  heap.setU32(0x0099fde0, (0) >>> 0);
  heap.setU32(0x006522aa, (0) >>> 0);
  heap.setU32(0x005f494a, (0) >>> 0);
  heap.setU32(0x005f494b, (0) >>> 0);
  heap.setU32(0x00630b28, (1) >>> 0);
  if ((heap.u32(0x0099a500) & 1) == 0) {
    FUN_005e3f31(heap);
    heap.u32((unaff_ESI + 0x1c)) = 0x005f5124;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0xfffff;
    FUN_005e412c(heap);
    FUN_005e3f31(heap);
    heap.u32((unaff_ESI + 0x1c)) = 0x005f5268;
    heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0x1fc;
    heap.u32((unaff_ESI + 0x168)) = 0;
    FUN_005e412c(heap);
    FUN_00429aff(heap);
    return;
  }
  FUN_005e3f31(heap);
  heap.u32((unaff_ESI + 0x1c)) = 0x005f531c;
  heap.u32((unaff_ESI + 0xc)) = heap.u32((unaff_ESI + 0xc)) | 0xf;
  FUN_005e412c(heap);
  FUN_005e3f31(heap);
  heap.u32((unaff_ESI + 0x1c)) = 0x005f5360;
  FUN_005e412c(heap);
  heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) | 0x10;
  FUN_00429aff(heap);
  return;
}
