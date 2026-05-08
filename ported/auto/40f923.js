// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f923.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00405b58 } from "./405b58.js";
import { FUN_0040f2f4 } from "./40f2f4.js";
import { FUN_0040fb35 } from "./40fb35.js";
import { FUN_0040fb47 } from "./40fb47.js";
import { FUN_0040fb7c } from "./40fb7c.js";
import { FUN_0040fbbe } from "./40fbbe.js";
import { FUN_0040fbd2 } from "./40fbd2.js";
import { FUN_0040fbdd } from "./40fbdd.js";
import { FUN_0040fd4f } from "./40fd4f.js";
import { FUN_0040fd6c } from "./40fd6c.js";
import { FUN_0040fd77 } from "./40fd77.js";
import { FUN_0040fd82 } from "./40fd82.js";
import { FUN_0040fe8d } from "./40fe8d.js";
import { FUN_0040ff69 } from "./40ff69.js";
import { FUN_0040ff74 } from "./40ff74.js";
import { FUN_0040ff7f } from "./40ff7f.js";
import { FUN_0040ff8a } from "./40ff8a.js";
import { FUN_00410063 } from "./410063.js";
import { FUN_004100f9 } from "./4100f9.js";
import { FUN_0041023e } from "./41023e.js";
import { FUN_00410250 } from "./410250.js";
import { FUN_00410390 } from "./410390.js";
import { FUN_004103a2 } from "./4103a2.js";
import { FUN_0041041a } from "./41041a.js";
import { FUN_0041051e } from "./41051e.js";
import { FUN_0041058e } from "./41058e.js";
import { FUN_00410606 } from "./410606.js";
import { FUN_00410618 } from "./410618.js";
import { FUN_0041068b } from "./41068b.js";
import { FUN_0041069d } from "./41069d.js";
import { FUN_00413c90 } from "./413c90.js";
export function FUN_0040f923(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_005ec100 = __sp + 0;
  const __addr_DAT_005ef6a8 = __sp + 4;
  const __addr_DAT_005ef6a9 = __sp + 8;
  const __addr_DAT_005ef6aa = __sp + 12;
  const __addr_DAT_005ef6ab = __sp + 16;
  const __addr_DAT_005efaa8 = __sp + 20;
  try {
  let uVar1 = 0;
  let local_8 = 0;
  heap.setU32(0x005e916c, (FUN_00405b58(heap)) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar1 = 0;
  } else {
    if (0 < heap.u32(0x005f12b4)) {
      FUN_00413c90(heap, __addr_DAT_005ec100, 0x005ec0ec, 799);
    }
    for (local_8 = 0; local_8 < 0x100; local_8 = local_8 + 1) {
      heap.u32((__addr_DAT_005ef6a8) + (local_8 * 4) * 4) = local_8;
      heap.u32((__addr_DAT_005ef6a9) + (local_8 * 4) * 4) = heap.u32((__addr_DAT_005ef6a8) + (local_8 * 4) * 4);
      heap.u32((__addr_DAT_005ef6aa) + (local_8 * 4) * 4) = heap.u32((__addr_DAT_005ef6a9) + (local_8 * 4) * 4);
      heap.u32((__addr_DAT_005ef6ab) + (local_8 * 4) * 4) = 0;
    }
    heap.setU32(0x005ec0d8, (FUN_0040f2f4(heap, __addr_DAT_005ef6a8, 0x100, __addr_DAT_005efaa8)) >>> 0);
    if (heap.u32(0x005ec0d8) == 0) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005ebe50, (FUN_0041069d) >>> 0);
      heap.setU32(0x005ebe54, (FUN_0040fb35) >>> 0);
      heap.setU32(0x005ebe58, (FUN_0040fb47) >>> 0);
      heap.setU32(0x005ebe5c, (FUN_0040fb7c) >>> 0);
      heap.setU32(0x005ebe60, (FUN_0040fbbe) >>> 0);
      heap.setU32(0x005ebe70, (FUN_0040fd6c) >>> 0);
      heap.setU32(0x005ebe68, (FUN_0040fd4f) >>> 0);
      heap.setU32(0x005ebe6c, (FUN_0040fbdd) >>> 0);
      heap.setU32(0x005ebe64, (FUN_0040fbd2) >>> 0);
      heap.setU32(0x005ebe74, (FUN_0040fd77) >>> 0);
      heap.setU32(0x005ebe78, (FUN_0040fd82) >>> 0);
      heap.setU32(0x005ebe7c, (FUN_0040fe8d) >>> 0);
      heap.setU32(0x005ebe80, (FUN_0040ff69) >>> 0);
      heap.setU32(0x005ebe84, (FUN_0040ff74) >>> 0);
      heap.setU32(0x005ebe88, (FUN_0040ff7f) >>> 0);
      heap.setU32(0x005ebe8c, (FUN_0040ff8a) >>> 0);
      heap.setU32(0x005ebe90, (FUN_00410063) >>> 0);
      heap.setU32(0x005ebe94, (FUN_004100f9) >>> 0);
      heap.setU32(0x005ebe98, (FUN_0041023e) >>> 0);
      heap.setU32(0x005ebe9c, (FUN_00410250) >>> 0);
      heap.setU32(0x005ebea0, (FUN_00410390) >>> 0);
      heap.setU32(0x005ebea4, (FUN_0041041a) >>> 0);
      heap.setU32(0x005ebea8, (FUN_0041051e) >>> 0);
      heap.setU32(0x005ebeac, (FUN_0041058e) >>> 0);
      heap.setU32(0x005ebeb0, (FUN_00410606) >>> 0);
      heap.setU32(0x005ebeb4, (FUN_00410618) >>> 0);
      heap.setU32(0x005ebeb8, (FUN_0041068b) >>> 0);
      heap.setU32(0x005e91cc, (FUN_004103a2) >>> 0);
      uVar1 = 1;
    }
  }
  return uVar1;
} finally {
    heap.freeFrame(24);
  }
}
