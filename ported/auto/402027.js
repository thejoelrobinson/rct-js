// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402027.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";
export function FUN_00402027(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_local_b8 = __sp + 0;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let local_b2 = 0;
  let local_b0 = 0;
  let local_a8 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  iVar1 = (heap.u32(heap.u32(0x005ebe58)))(__addr_local_b8);
  if (iVar1 == 0) {
    uVar2 = 0;
  } else {
    iVar1 = (heap.u32(heap.u32(0x005ebe5c)))(__addr_local_b8);
    if (iVar1 == 0) {
      uVar2 = 0;
    } else {
      iVar1 = FUN_00402a00(heap);
      if (iVar1 == 0) {
        (heap.u32(heap.u32(0x005ebe60)))(__addr_local_b8);
        uVar2 = 0;
      } else {
        local_10 = heap.u32(__addr_local_b8);
        local_c = local_b0;
        local_8 = heap.u32(0x005f1ff4) - local_b2;
        uVar4 = local_b0;
        uVar3 = (local_b2 >>> 2);
        puVar5 = heap.u32(0x005f1fec);
        do {
          for (; uVar3 != 0; uVar3 = uVar3 - 1) {
            heap.setU32(heap.u32(__addr_local_b8), (heap.u32(puVar5)) >>> 0);
            puVar5 = puVar5 + 1;
            heap.setU32(__addr_local_b8, (heap.u32(__addr_local_b8) + 1) >>> 0);
          }
          heap.setU32(__addr_local_b8, ((heap.u32(__addr_local_b8) + (local_a8 - local_b2))) >>> 0);
          puVar5 = (puVar5 + local_8);
          uVar4 = uVar4 - 1;
          uVar3 = (local_b2 >>> 2);
        } while (uVar4 != 0);
        FUN_00402aa4(heap);
        (heap.u32(heap.u32(0x005ebe60)))(__addr_local_b8);
        heap.setU32(0x005f1fe0, (1) >>> 0);
        uVar2 = 1;
      }
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(4);
  }
}
