// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e06cc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e06cc(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = 0x20;
  uVar2 = 0x20;
  do {
    do {
      if (heap.u32((heap.u32((__addr_DAT_00971ef4) + (((uVar2 << 7 | uVar2 >>> 9 | uVar1) >>> 5 | (uVar2 >>> 9) << 0xb)) * 4) + 2)) < 0x18) {
        heap.u32((heap.u32((__addr_DAT_00971ef4) + (((uVar2 << 7 | uVar2 >>> 9 | uVar1) >>> 5 | (uVar2 >>> 9) << 0xb)) * 4) + 5)) = 6;
      }
      uVar1 = uVar1 + 0x20;
    } while (uVar1 < 0xfe0);
    uVar1 = 0x20;
    uVar2 = uVar2 + 0x20;
  } while (uVar2 < 0xfe0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
