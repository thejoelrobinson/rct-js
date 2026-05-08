// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436634.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00404ba4 } from "./404ba4.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0040840d } from "./40840d.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_005df431 } from "./5df431.js";
export function FUN_00436634(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_006e3b90 = __sp + 4;
  try {
  let iVar2 = 0;
  let in_EAX = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar7 = 0;
  let iVar6 = 0;
  heap.setU32(0x00991f34, (4) >>> 0);
  FUN_00404ba4(heap, heap.u32(0x009a1560));
  iVar3 = FUN_004083e1(heap, 0x00628af7);
  if (iVar3 == -1) {
    uVar4 = FUN_005df431(heap);
    return uVar4;
  }
  uVar7 = 0;
  do {
    iVar2 = heap.u32((__addr_DAT_00971ef4) + (uVar7) * 4);
    iVar6 = iVar2;
    do {
      iVar5 = iVar6 + 8;
      pbVar1 = (iVar6 + 1);
      iVar6 = iVar5;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    iVar5 = iVar5 - iVar2;
    FUN_00408342(heap, iVar3, iVar2, iVar5, uVar7, iVar2, iVar5);
    uVar7 = uVar7 + 1;
  } while (uVar7 < 0x4000);
  FUN_00408387(heap, iVar3);
  puVar8 = __addr_DAT_006e3b90;
  for (iVar3 = 0x18000; iVar3 != 0; iVar3 = iVar3 + -1) {
    heap.u32(puVar8) = 0;
    puVar8 = puVar8 + 1;
  }
  iVar3 = FUN_004083b5(heap, 0x00628af7);
  if (iVar3 == -1) {
    uVar4 = FUN_005df431(heap);
    return uVar4;
  }
  FUN_00408276(heap, iVar3, __addr_DAT_006e3b90, 0x60000);
  FUN_00408387(heap, iVar3);
  FUN_0040840d(heap, 0x00628af7);
  FUN_00436558(heap);
  return in_EAX;
} finally {
    heap.freeFrame(8);
  }
}
