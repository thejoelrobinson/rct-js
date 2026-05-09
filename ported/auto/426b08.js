// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426b08.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00426b08(heap) {
  let uVar1 = 0;
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087cc8a) + (uVar1) * 4), (0xff) & 0xffffffff);
    heap.setU32(((0x0087ccaa) + (uVar1) * 4), (0xff) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x20);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d104) + (uVar1) * 4), (0x80000000) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x80);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d314) + (uVar1) * 4), (0x80000000) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x80);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d518) + (uVar1) * 4), (0x80000000) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x80);
  uVar1 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087d738) + (uVar1 * 2) * 4), (0) & 0xffffffff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 4);
  return;
}
