// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42547b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042547b(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  if ((in_EAX < 0x1000) && (in_CX < 0x1000)) {
    uVar2 = in_CX << 7 | in_CX >>> 9 | in_EAX;
    pbVar3 = heap.u32((__addr_DAT_00971ef4) + ((uVar2 >>> 5 | uVar2 << 0xb)) * 4);
    bVar1 = heap.u32(pbVar3);
    while ((bVar1 & 0x3c) != 0) {
      pbVar3 = pbVar3 + 8;
      bVar1 = heap.u32(pbVar3);
    }
    if (((heap.u32(pbVar3 + (7) * 4) & 0x20) != 0) || (((heap.u32(pbVar3 + (7) * 4) & 0x10) != 0 && ((bVar1 = (byte)(in_EDX >>> 2), bVar1 < heap.u32(pbVar3 + (2) * 4) || (heap.u32(pbVar3 + (2) * 4) < (byte)(bVar1 - 4))))))) {
      return in_EAX;
    }
  }
  heap.setU32(0x00991efc, (0x6a9) >>> 0);
  return in_EAX;
} finally {
    heap.freeFrame(4);
  }
}
