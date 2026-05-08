// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426b08.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00426b08(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_0087cc8a = __sp + 0;
  const __addr_DAT_0087ccaa = __sp + 4;
  const __addr_DAT_0087d104 = __sp + 8;
  const __addr_DAT_0087d314 = __sp + 12;
  const __addr_DAT_0087d518 = __sp + 16;
  const __addr_DAT_0087d738 = __sp + 20;
  try {
  let uVar1 = 0;
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087cc8a) + (uVar1) * 4) = 0xff;
    heap.u32((__addr_DAT_0087ccaa) + (uVar1) * 4) = 0xff;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x20);
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087d104) + (uVar1) * 4) = 0x80000000;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x80);
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087d314) + (uVar1) * 4) = 0x80000000;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x80);
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087d518) + (uVar1) * 4) = 0x80000000;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x80);
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087d738) + (uVar1 * 2) * 4) = 0;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 4);
  return;
} finally {
    heap.freeFrame(24);
  }
}
