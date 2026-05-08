// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406d10.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DirectInputCreateA, GetKeyboardType, GetSystemMetrics, SystemParametersInfoA } from "../runtime/win32.js";
import { FUN_00406fca } from "./406fca.js";
import { FUN_0040704d } from "./40704d.js";
export function FUN_00406d10(heap) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_005f1180 = __sp + 0;
  const __addr_local_10 = __sp + 4;
  const __addr_DAT_005f1284 = __sp + 8;
  const __addr_DAT_005ebef8 = __sp + 12;
  const __addr_DAT_005e7cc0 = __sp + 16;
  const __addr_DAT_005ebefc = __sp + 20;
  const __addr_DAT_0041b170 = __sp + 24;
  const __addr_DAT_005e7cb0 = __sp + 28;
  const __addr_DAT_005ebf00 = __sp + 32;
  const __addr_DAT_0041b0e0 = __sp + 36;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let local_14 = 0;
  let local_c = 0;
  let local_8 = 0;
  for (local_14 = 0; local_14 < 0x100; local_14 = local_14 + 1) {
    heap.u32((__addr_DAT_005f1180) + (local_14) * 4) = 0;
  }
  SystemParametersInfoA(heap, 3, 0, __addr_local_10, 0);
  heap.setU32(0x005f1148, (heap.u32(__addr_local_10)) >>> 0);
  heap.setU32(0x005f114c, (local_c) >>> 0);
  heap.setU32(0x005f1144, (local_8) >>> 0);
  heap.setU32(0x005f1150, (GetSystemMetrics(heap, 0x17)) >>> 0);
  heap.setU32(0x005f1158, (GetKeyboardType(heap, 0)) >>> 0);
  heap.setU32(0x005f115c, (GetKeyboardType(heap, 1)) >>> 0);
  heap.setU32(0x005f1160, (GetKeyboardType(heap, 2)) >>> 0);
  heap.setU32(0x005ebef4, (0) >>> 0);
  heap.setU32(0x005ebf04, (0) >>> 0);
  heap.setU32(0x005ebf08, (0) >>> 0);
  heap.setU32(0x005ebee4, (0) >>> 0);
  heap.setU32(0x005ebee8, (0) >>> 0);
  heap.setU32(0x005f1140, (0) >>> 0);
  heap.setU32(0x005f1154, (0) >>> 0);
  _memset(__addr_DAT_005f1284, 4, 0);
  heap.setU32(0x005f1288, (0) >>> 0);
  iVar1 = DirectInputCreateA(heap, heap.u32(0x005f1398), 0x500, __addr_DAT_005ebef8, 0);
  if (iVar1 == 0) {
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebef8)) + 0xc))))(heap.u32(__addr_DAT_005ebef8), __addr_DAT_005e7cc0, __addr_DAT_005ebefc, 0);
    if ((iVar1 == 0) && (iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebefc)) + 0x2c))))(heap.u32(__addr_DAT_005ebefc), __addr_DAT_0041b170), iVar1 == 0)) {
      FUN_00406fca(heap);
      heap.setU32(0x005f1140, (1) >>> 0);
    }
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebef8)) + 0xc))))(heap.u32(__addr_DAT_005ebef8), __addr_DAT_005e7cb0, __addr_DAT_005ebf00, 0);
    if ((iVar1 == 0) && (iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf00)) + 0x2c))))(heap.u32(__addr_DAT_005ebf00), __addr_DAT_0041b0e0), iVar1 == 0)) {
      FUN_0040704d(heap);
      heap.setU32(0x005f1154, (1) >>> 0);
    }
    uVar2 = 1;
  } else {
    uVar2 = 0;
  }
  return uVar2;
} finally {
    heap.freeFrame(40);
  }
}
