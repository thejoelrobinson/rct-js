// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44ba3c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044ba3c(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_005f5b78 = __sp + 4;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let unaff_ESI = 0;
  uVar1 = 0;
  uVar2 = heap.u32((uint)(byte)(__addr_DAT_00887420) + ((uint) * (unaff_ESI + 0x30) * 0x260) * 4);
  if ((heap.u32((__addr_DAT_005f5b78 + uVar2 * 8)) & 0x200) == 0) {
    uVar1 = 0x200;
  }
  if ((heap.u32((__addr_DAT_005f5b78 + uVar2 * 8)) & 0x2000) != 0) {
    uVar1 = uVar1 | 0x20;
  }
  if ((heap.u32((__addr_DAT_005f5b78 + uVar2 * 8)) & 0x4000007) == 0) {
    uVar1 = uVar1 | 0x80;
  }
  if ((heap.u32((__addr_DAT_005f5b78 + uVar2 * 8)) & 0x20000) != 0) {
    uVar1 = uVar1 | 0x140;
  }
  heap.u32((unaff_ESI + 0x10)) = uVar1;
  return;
} finally {
    heap.freeFrame(8);
  }
}
