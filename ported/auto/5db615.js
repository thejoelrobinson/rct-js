// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db615.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../runtime/win32.js";
export function FUN_005db615(heap) {
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let cVar5 = 0;
  let in_EAX = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  let uVar6 = 0;
  let unaff_ESI = 0;
  uVar4 = heap.u32((unaff_ESI + 0x3c)) >>> 2;
  uVar6 = in_DX << 7 | in_DX >>> 9 | unaff_BX;
  pbVar7 = heap.u32((0x00971ef4) + ((ushort)(uVar6 >>> 5 | uVar6 << 0xb)) * 4);
  do {
    bVar2 = uVar4;
    if ((heap.u32(pbVar7) & 0x3c) == 0) {
      uVar4 = CONCAT11(heap, heap.u32(pbVar7 + (5) * 4), bVar2) & 0x1fff;
      cVar3 = uVar4;
      cVar5 = (uVar4 >>> 8) * '\x04';
      uVar4 = CONCAT11(heap, cVar5, cVar3);
      if (cVar3 != cVar5) {
        return in_EAX;
      }
    } else {
      uVar4 = CONCAT11(heap, heap.u32(pbVar7 + (2) * 4) - 4, bVar2);
      if (((byte)(heap.u32(pbVar7 + (2) * 4) - 4) < bVar2) && (uVar4 = CONCAT11(heap, heap.u32(pbVar7 + (3) * 4) + 4, bVar2), bVar2 < (byte)(heap.u32(pbVar7 + (3) * 4) + 4))) {
        return in_EAX;
      }
    }
    pbVar1 = pbVar7 + 1;
    pbVar7 = pbVar7 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return in_EAX;
    }
  } while (true);
}
