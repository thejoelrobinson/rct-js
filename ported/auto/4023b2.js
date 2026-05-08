// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4023b2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";
export function FUN_004023b2(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f2420 = __sp + 0;
  const __addr_local_bc = __sp + 4;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let iVar5 = 0;
  let local_fc = 0;
  let local_c0 = 0;
  let local_b6 = 0;
  let local_ac = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_cc = __addr_DAT_005f2420;
  iVar1 = (heap.u32(heap.u32(0x005ebe58)))(__addr_local_bc);
  if (iVar1 == 0) {
    uVar2 = 0;
  } else {
    iVar1 = (heap.u32(heap.u32(0x005ebe5c)))(__addr_local_bc);
    if (iVar1 == 0) {
      uVar2 = 0;
    } else {
      iVar1 = FUN_00402a00(heap);
      if (iVar1 == 0) {
        (heap.u32(heap.u32(0x005ebe60)))(__addr_local_bc);
        uVar2 = 0;
      } else {
        local_c = local_b6;
        for (local_8 = 0; local_8 < heap.u32(0x005f15c4); local_8 = local_8 + 0x40) {
          local_fc = 0;
          local_c0 = 0;
          while (iVar1 = local_c0, local_c0 < heap.u32(0x005f1b34)) {
            if (heap.u32(local_cc + (local_fc) * 4) == '\0') {
              local_fc = local_fc + 0x14;
              local_c0 = local_c0 + 8;
            } else {
              do {
                heap.u32(local_cc + (local_fc) * 4) = 0;
                local_fc = local_fc + 0x14;
                local_c0 = local_c0 + 8;
                if (heap.u32(0x005f1b34) <= local_c0) {
                  break;
                }
              } while (heap.u32(local_cc + (local_fc) * 4) != '\0');
              local_14 = local_c0 - iVar1;
              puVar3 = (heap.u32(0x005f1ff4) * iVar1 + local_8 + heap.u32(0x005f1fec));
              puVar4 = (local_ac * iVar1 + local_8 + heap.u32(__addr_local_bc));
              local_10 = heap.u32(0x005f1ff4) + -0x40;
              iVar1 = 0x10;
              iVar5 = local_14;
              do {
                for (; iVar1 != 0; iVar1 = iVar1 + -1) {
                  heap.u32(puVar4) = heap.u32(puVar3);
                  puVar3 = puVar3 + 1;
                  puVar4 = puVar4 + 1;
                }
                puVar4 = (puVar4 + local_ac + -0x40);
                puVar3 = (puVar3 + local_10);
                iVar5 = iVar5 + -1;
                iVar1 = 0x10;
              } while (iVar5 != 0);
              heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
            }
          }
          local_cc = local_cc + 1;
        }
        FUN_00402aa4(heap);
        (heap.u32(heap.u32(0x005ebe60)))(__addr_local_bc);
        heap.setU32(0x005f1fe0, (3) >>> 0);
        uVar2 = 1;
      }
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(8);
  }
}
