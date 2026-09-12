// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408c1c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00408c1c(heap, param_1) {
  let puVar1 = 0;
  puVar1 = (((heap.u32(0x005f0954) * 0x12 + heap.u32(0x005ebe38))) >>> 0);
  heap.setU32(puVar1, (((heap.u32((param_1 + 0xc))) << 16 >> 16)) & 0xffffffff);
  heap.setU16((puVar1 + (1) * 2), (((heap.u32((param_1 + 8))) << 16 >> 16)) & 0xffff);
  heap.setU8((puVar1 + ((2) * 2)), (2) & 0xff);
  heap.setU8((puVar1 + ((7) * 2)), (heap.u8((param_1 + 0x18))) & 0xff);
  if ((heap.u8((param_1 + 0x4c)) & 0x40) == 0) {
    heap.setU8((((puVar1) | 0) + 5), (0) & 0xff);
    heap.setU8((puVar1 + ((3) * 2)), (0) & 0xff);
    heap.setU16((puVar1 + (8) * 2), (0) & 0xffff);
  } else {
    heap.setU8((((puVar1) | 0) + 5), (1) & 0xff);
    heap.setU8((puVar1 + ((3) * 2)), (heap.u8((param_1 + 0x54))) & 0xff);
    heap.setU16((puVar1 + (8) * 2), (6) & 0xffff);
  }
  if ((heap.u32((param_1 + 0x4c)) & 0x1828) == 0) {
    heap.setU8((((puVar1) | 0) + 7), (0) & 0xff);
    heap.setU16((puVar1 + (6) * 2), (0) & 0xffff);
  } else {
    heap.setU8((((puVar1) | 0) + 7), (1) & 0xff);
    heap.setU16((puVar1 + (6) * 2), ((((1 << (heap.u8((puVar1 + ((3) * 2))) & 0x1f))) << 16 >> 16)) & 0xffff);
  }
  heap.setU16((puVar1 + (4) * 2), (0) & 0xffff);
  heap.setU16((puVar1 + (5) * 2), (0) & 0xffff);
  heap.setU8((((puVar1) | 0) + 0xf), (1) & 0xff);
  heap.setU32(0x005f0954, (heap.u32(0x005f0954) + 1) >>> 0);
  return 1;
}
