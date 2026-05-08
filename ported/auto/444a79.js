// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444a79.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00444b4a } from "./444b4a.js";
export function FUN_00444a79(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00743b94 = __sp + 0;
  const __addr_DAT_0087c394 = __sp + 4;
  const __addr_DAT_0087c3a0 = __sp + 8;
  try {
  let puVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  let puVar7 = 0;
  heap.setU32(0x008ad1c0, (0) >>> 0);
  puVar6 = __addr_DAT_00743b94;
  for (iVar3 = 320000; iVar3 != 0; iVar3 = iVar3 + -1) {
    heap.setU32(puVar6, (0) >>> 0);
    puVar6 = puVar6 + 1;
  }
  uVar4 = 0;
  do {
    heap.setU32((__addr_DAT_0087c394 + uVar4), (0xffff) >>> 0);
    heap.setU32((__addr_DAT_0087c3a0 + uVar4), (0) >>> 0);
    uVar4 = uVar4 + 2;
  } while (uVar4 < 0xc);
  uVar2 = 0;
  puVar1 = __addr_DAT_00743b94;
  puVar7 = 0xffffffff;
  do {
    puVar5 = puVar1;
    heap.setU32(puVar5, (0xff) >>> 0);
    heap.setU32((puVar5 + 10), (uVar2) >>> 0);
    heap.setU32((puVar5 + 4), (0xffff) >>> 0);
    heap.setU32((puVar5 + (8) * 4), (0) >>> 0);
    if (puVar7 == 0xffffffff) {
      heap.setU32((puVar5 + 6), (0xffff) >>> 0);
      heap.setU32(0x0087c394, (uVar2) >>> 0);
    } else {
      heap.setU32((puVar5 + 6), (heap.u32((puVar7 + 10))) >>> 0);
      heap.setU32((puVar7 + 4), (uVar2) >>> 0);
    }
    uVar2 = uVar2 + 1;
    puVar1 = puVar5 + 0x100;
    puVar7 = puVar5;
  } while (uVar2 < 5000);
  heap.setU32(0x0087c3a0, (5000) >>> 0);
  FUN_00444b4a(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
