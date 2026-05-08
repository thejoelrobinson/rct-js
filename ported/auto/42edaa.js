// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42edaa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408210 } from "./408210.js";
import { FUN_00408254 } from "./408254.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004083e1 } from "./4083e1.js";
export function FUN_0042edaa(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0099a888 = __sp + 0;
  const __addr_DAT_0099aa88 = __sp + 4;
  const __addr_DAT_00981efc = __sp + 8;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  iVar1 = FUN_004083b5(heap, __addr_DAT_0099a888);
  if (iVar1 == -1) {
    iVar1 = FUN_004083b5(heap, __addr_DAT_0099aa88);
    if (iVar1 != -1) {
      heap.setU32(0x005f8d3a, (iVar1) >>> 0);
      iVar1 = FUN_004083e1(heap, __addr_DAT_0099a888);
      if (iVar1 != -1) {
        heap.setU32(0x005f8d3e, (iVar1) >>> 0);
        uVar2 = FUN_00408254(heap, heap.u32(0x005f8d3a), 0);
        FUN_00408210(heap, heap.u32(0x005f8d3a), 0);
        do {
          uVar3 = uVar2;
          if (0x10000 < uVar2) {
            uVar3 = 0x10000;
          }
          FUN_00408276(heap, heap.u32(0x005f8d3a), __addr_DAT_00981efc, uVar3);
          FUN_00408342(heap, heap.u32(0x005f8d3e), __addr_DAT_00981efc, uVar3);
          uVar2 = uVar2 - uVar3;
        } while (uVar2 != 0);
        FUN_00408387(heap, heap.u32(0x005f8d3a));
        iVar1 = FUN_00408387(heap, heap.u32(0x005f8d3e));
        return iVar1;
      }
      iVar1 = FUN_00408387(heap, heap.u32(0x005f8d3a));
    }
  } else {
    iVar1 = FUN_00408387(heap, iVar1);
  }
  return iVar1;
} finally {
    heap.freeFrame(12);
  }
}
