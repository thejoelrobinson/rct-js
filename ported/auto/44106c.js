// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44106c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044106c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f5b78 = __sp + 0;
  try {
  let in_EAX = 0;
  let cVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  cVar1 = '\x14';
  if ((((heap.u32((__addr_DAT_005f5b78 + in_EAX * 8)) & 0x800000) != 0) || (cVar1 = '\x15', (heap.u32((__addr_DAT_005f5b78 + in_EAX * 8)) & 0x1000000) != 0)) || (cVar1 = '\x16', (heap.u32((__addr_DAT_005f5b78 + in_EAX * 8)) & 0x2000000) != 0)) {
    uVar2 = 0;
    do {
      while (true) {
        if (heap.u32((unaff_ESI + 0xb0 + uVar2 * 4)) == -1) {
          return;
        }
        uVar3 = uVar2;
        if (cVar1 != heap.u32((unaff_ESI + 0xb0 + uVar2 * 4))) {
          break;
        }
        for (; uVar3 < 4; uVar3 = uVar3 + 1) {
          heap.u32((unaff_ESI + 0xb0 + uVar3 * 4)) = heap.u32((unaff_ESI + 0xb4 + uVar3 * 4));
        }
        heap.u32((unaff_ESI + 0xb0 + uVar3 * 4)) = 0xff;
        heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 1;
      }
      uVar2 = uVar2 + 1;
    } while (uVar2 < 5);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
