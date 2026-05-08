// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436f36.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
export function FUN_00436f36(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let bVar2 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let bVar3 = 0;
  let iVar4 = 0;
  if ((in_EAX & 0x1f) < 0x10) {
    bVar3 = 4;
    if (0xf < (in_CX & 0x1f)) {
      bVar3 = 8;
    }
  } else {
    bVar3 = 1;
    if ((in_CX & 0x1f) < 0x10) {
      bVar3 = 2;
    }
  }
  bVar2 = (byte)(in_EDX >>> 2);
  iVar4 = heap.u32((__addr_DAT_00971ef4) + ((ushort)((ushort)((in_CX & 0xffe0) << 7 | in_CX >>> 9 | in_EAX & 0xffe0) >>> 5 | (in_CX >>> 9) << 0xb)) * 4);
  while ((bVar2 < heap.u32((iVar4 + 2)) || (heap.u32((iVar4 + 3)) <= bVar2)) || ((heap.u32((iVar4 + 1)) & bVar3) == 0)) {
    pbVar1 = (iVar4 + 1);
    iVar4 = iVar4 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return CONCAT44(heap, in_EDX, in_EAX);
    }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
