// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418d90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418d90(heap, param_1) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005eea10 = __sp + 0;
  const __addr_DAT_005eeb78 = __sp + 4;
  try {
  let iVar2 = 0;
  heap.setU32(0x005efec4, (param_1) >>> 0);
  iVar2 = 0;
  puVar1 = __addr_DAT_005eea10;
  do {
    if (param_1 == heap.u32(puVar1)) {
      heap.setU32(0x005efec0, (heap.u32((iVar2 * 8 + 0x5eea14))) >>> 0);
      return;
    }
    puVar1 = puVar1 + 2;
    iVar2 = iVar2 + 1;
  } while (puVar1 < __addr_DAT_005eeb78);
  if ((0x12 < param_1) && (param_1 < 0x25)) {
    heap.setU32(0x005efec0, (0xd) >>> 0);
    return;
  }
  if ((param_1 < 0xbc) || (heap.setU32(0x005efec0, (8) >>> 0), 0xca < param_1)) {
    heap.setU32(0x005efec0, (0x16) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
