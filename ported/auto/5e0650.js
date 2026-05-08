// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0650.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00436795 } from "./436795.js";
import { FUN_005e59ec } from "./5e59ec.js";
export function FUN_005e0650(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  uVar4 = in_CX << 7 | in_CX >>> 9 | in_EAX;
  pbVar5 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar4 >>> 5 | uVar4 << 0xb)) * 4);
  do {
    if ((heap.u32(pbVar5) & 0x3c) == 0x14) {
      sVar2 = heap.u32(pbVar5 + (2) * 4) * 4;
      if (sVar2 <= in_EDX) {
        sVar3 = sVar2 + 0x20;
        if (((heap.u32(pbVar5 + (4) * 4) & 0xf) != 0) && (sVar3 = sVar2 + 0x30, (heap.u32(pbVar5 + (4) * 4) & 0x10) != 0)) {
          sVar3 = sVar2 + 0x40;
        }
        if (in_EDX < sVar3) {
          FUN_005e59ec(heap, pbVar5);
          FUN_00436795(heap);
        }
      }
      break;
    }
    pbVar1 = pbVar5 + 1;
    pbVar5 = pbVar5 + 8;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
