// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45268c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_00452739 } from "./452739.js";
export function FUN_0045268c(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_PTR_006323b8 = __sp + 0;
  const __addr_DAT_00632602 = __sp + 4;
  try {
  let uVar1 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = 0;
  piVar5 = heap.u32(0x005ebf10);
  if (heap.u32(0x005f8d48) != '\0') {
    do {
      if ((((heap.u32(piVar5) == heap.u32(0x005f8d49)) && (heap.u32(piVar5 + (1) * 4) == heap.u32(0x005f8d4d))) && (heap.u32(piVar5 + (2) * 4) == heap.u32(0x005f8d51))) && (heap.u32(piVar5 + (3) * 4) == heap.u32(0x005f8d55))) {
        break;
      }
      uVar3 = uVar3 + 1;
      piVar5 = piVar5 + 0x84;
    } while (uVar3 < heap.u32(0x005ebf0c));
  }
  FUN_00452739(heap);
  uVar3 = 0;
  do {
    puVar2 = heap.u32((__addr_PTR_PTR_006323b8) + (uVar3) * 4);
    uVar1 = heap.u32((puVar2 + 2));
    FUN_0042f239(heap);
    iVar4 = FUN_004083b5(heap, uVar1);
    if (iVar4 != -1) {
      FUN_00408276(heap, iVar4, __addr_DAT_00632602, 4, iVar4);
      FUN_00408387(heap, iVar4);
      if (heap.u32(__addr_DAT_00632602) == 0x78787878) {
        heap.u32(puVar2) = 0;
      }
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 0xf);
  return;
} finally {
    heap.freeFrame(8);
  }
}
