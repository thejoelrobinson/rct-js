// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405a70.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00405a70(heap, param_1) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f12c0 = __sp + 0;
  const __addr_DAT_005f12c2 = __sp + 4;
  const __addr_DAT_005f12c4 = __sp + 8;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  iVar1 = heap.u32((param_1 + 0x54));
  uVar2 = heap.u32((param_1 + 8));
  if (heap.u32(0x005f1290) < 0x20) {
    if (iVar1 != 0) {
      heap.u32((__addr_DAT_005f12c0 + heap.u32(0x005f1290) * 6)) = heap.u32((param_1 + 0xc));
      heap.u32((__addr_DAT_005f12c2 + heap.u32(0x005f1290) * 6)) = uVar2;
      heap.u32((__addr_DAT_005f12c4 + heap.u32(0x005f1290) * 6)) = iVar1;
      heap.setU32(0x005f1290, (heap.u32(0x005f1290) + 1) >>> 0);
    }
    uVar2 = 1;
  } else {
    uVar2 = 0;
  }
  return uVar2;
} finally {
    heap.freeFrame(12);
  }
}
