// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42913a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { LOCK } from "../runtime/ghidra-builtins.js";
import { FUN_00428ec0 } from "./428ec0.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042913a(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_0087cc8a = __sp + 0;
  const __addr_DAT_0087ccaa = __sp + 4;
  const __addr_DAT_0087d104 = __sp + 8;
  const __addr_DAT_0087d314 = __sp + 12;
  const __addr_DAT_0087d518 = __sp + 16;
  try {
  let bVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  sVar4 = heap.u32(0x0087cba0);
  heap.setU32(0x0087cba0, (heap.u32(0x0087c81c)) >>> 0);
  heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 4) >>> 0);
  heap.setU32(0x0087c3d6, (1) >>> 0);
  if ((-0x14 < (heap.u32(0x0087c81c) - sVar4)) && (heap.setU32(0x0087c3d6, (2) >>> 0), (heap.u32(0x0087c81c) - sVar4) < 0x14)) {
    heap.setU32(0x0087c3d6, (0) >>> 0);
  }
  uVar5 = FUN_00428ec0(heap);
  uVar5 = uVar5 >>> 2;
  uVar8 = 0;
  do {
    LOCK();
    bVar1 = heap.u32((__addr_DAT_0087cc8a) + (uVar8) * 4);
    heap.u32((__addr_DAT_0087cc8a) + (uVar8) * 4) = uVar5;
    uVar5 = bVar1;
    UNLOCK(heap);
    uVar8 = uVar8 + 1;
  } while (uVar8 < 0x20);
  FUN_005e5301(heap);
  uVar5 = heap.u32(0x0087c81c);
  if (0x9c4 < heap.u32(0x0087c81c)) {
    uVar5 = 0x9c4;
  }
  uVar8 = uVar5 / 10;
  uVar9 = 0;
  do {
    LOCK();
    bVar1 = heap.u32((__addr_DAT_0087ccaa) + (uVar9) * 4);
    heap.u32((__addr_DAT_0087ccaa) + (uVar9) * 4) = uVar8;
    uVar8 = bVar1;
    UNLOCK(heap);
    uVar9 = uVar9 + 1;
  } while (uVar9 < 0x20);
  FUN_005e5301(heap);
  uVar8 = 0;
  iVar6 = heap.u32(0x0087c3b4) - heap.u32(0x0087c3b8);
  do {
    LOCK();
    iVar2 = heap.u32((__addr_DAT_0087d104) + (uVar8) * 4);
    heap.u32((__addr_DAT_0087d104) + (uVar8) * 4) = iVar6;
    UNLOCK(heap);
    uVar8 = uVar8 + 1;
    iVar6 = iVar2;
  } while (uVar8 < 0x80);
  FUN_005e5301(heap);
  if (1 < heap.u32(0x0087d310)) {
    heap.setU32(0x0087d30c, (heap.u32(0x0087d30c) / heap.u32(0x0087d310)) >>> 0);
  }
  uVar8 = 0;
  do {
    LOCK();
    iVar6 = heap.u32((__addr_DAT_0087d314) + (uVar8) * 4);
    heap.u32((__addr_DAT_0087d314) + (uVar8) * 4) = heap.u32(0x0087d30c);
    UNLOCK(heap);
    uVar8 = uVar8 + 1;
    heap.setU32(0x0087d30c, (iVar6) >>> 0);
  } while (uVar8 < 0x80);
  heap.setU32(0x0087d30c, (0) >>> 0);
  heap.setU32(0x0087d310, (0) >>> 0);
  FUN_005e5301(heap);
  uVar8 = 0;
  uVar7 = heap.u32(0x0087d514);
  do {
    LOCK();
    uVar3 = heap.u32((__addr_DAT_0087d518) + (uVar8) * 4);
    heap.u32((__addr_DAT_0087d518) + (uVar8) * 4) = uVar7;
    UNLOCK(heap);
    uVar8 = uVar8 + 1;
    uVar7 = uVar3;
  } while (uVar8 < 0x80);
  return;
} finally {
    heap.freeFrame(20);
  }
}
