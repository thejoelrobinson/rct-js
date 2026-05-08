// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448bbc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00448a45 } from "./448a45.js";
export function FUN_00448bbc(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00630be0 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_00887462 = __sp + 8;
  const __addr_DAT_00887452 = __sp + 12;
  const __addr_DAT_00971ef4 = __sp + 16;
  try {
  let bVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let uVar5 = 0;
  let iVar8 = 0;
  for (pbVar6 = __addr_DAT_00630be0; pbVar6 < heap.u32(0x00630bdc); pbVar6 = pbVar6 + 1) {
    bVar2 = heap.u32(pbVar6);
    iVar8 = bVar2 * 0x260;
    if (heap.u32((__addr_DAT_00887420) + (iVar8) * 4) != -1) {
      uVar5 = 0;
      do {
        uVar4 = heap.u32((__addr_DAT_00887462) + (bVar2 * 0x130 + uVar5) * 4);
        if (uVar4 != 0xffff) {
          bVar3 = heap.u32((__addr_DAT_00887452) + (iVar8 + uVar5) * 4);
          pbVar7 = heap.u32((__addr_DAT_00971ef4) + ((ushort)((ushort)((uVar4 >>> 8) << 0xc | (uVar4 & 0xff) << 5) >>> 5 | ((ushort)((uVar4 >>> 8) << 5) >>> 9) << 0xb)) * 4);
          do {
            if ((((heap.u32(pbVar7) & 0x3c) == 0x10) && (bVar3 == heap.u32(pbVar7 + (2) * 4))) && (heap.u32(pbVar7 + (4) * 4) == 0)) {
              FUN_00448a45(heap);
            }
            pbVar1 = pbVar7 + 1;
            pbVar7 = pbVar7 + 8;
          } while ((heap.u32(pbVar1) & 0x80) == 0);
        }
        uVar5 = uVar5 + 1;
      } while (uVar5 < 4);
    }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(20);
  }
}
