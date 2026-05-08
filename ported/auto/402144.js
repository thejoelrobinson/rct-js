// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402144.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";
export function FUN_00402144(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f2420 = __sp + 0;
  const __addr_local_bc = __sp + 4;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar6 = 0;
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
        for (local_c0 = 0; local_c0 < heap.u32(0x005f1b34); local_c0 = local_c0 + 8) {
          local_8 = 0;
          while (iVar1 = local_8, local_8 < 0x500) {
            if (heap.u32(local_cc) == '\0') {
              local_cc = local_cc + 1;
              local_8 = local_8 + 0x40;
            } else {
              local_14 = 8;
              for (; (local_8 < 0x500 && (heap.u32(local_cc) != '\0')); local_cc = local_cc + 1) {
                heap.u32(local_cc) = '\0';
                local_8 = local_8 + 0x40;
              }
              uVar3 = local_8 - iVar1;
              puVar4 = (local_c0 * heap.u32(0x005f1ff4) + iVar1 + heap.u32(0x005f1fec));
              puVar5 = (local_ac * local_c0 + iVar1 + heap.u32(__addr_local_bc));
              local_10 = heap.u32(0x005f1ff4) - uVar3;
              uVar6 = uVar3 >>> 2;
              iVar1 = local_14;
              do {
                for (; uVar6 != 0; uVar6 = uVar6 - 1) {
                  heap.u32(puVar5) = heap.u32(puVar4);
                  puVar4 = puVar4 + 1;
                  puVar5 = puVar5 + 1;
                }
                puVar5 = (puVar5 + (local_ac - uVar3));
                puVar4 = (puVar4 + local_10);
                iVar1 = iVar1 + -1;
                uVar6 = uVar3 >>> 2;
              } while (iVar1 != 0);
              heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
            }
          }
        }
        FUN_00402aa4(heap);
        (heap.u32(heap.u32(0x005ebe60)))(__addr_local_bc);
        heap.setU32(0x005f1fe0, (2) >>> 0);
        uVar2 = 1;
      }
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(8);
  }
}
