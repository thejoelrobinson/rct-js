// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405a70.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00405a70(heap, param_1) {
  let iVar1 = 0;
  let uVar2 = 0;
  iVar1 = ((heap.i32((param_1 + 0x54))) >>> 0);
  uVar2 = ((heap.u32((param_1 + 8))) >>> 0);
  if (heap.u32(0x005f1290) < 0x20) {
    if (iVar1 != 0) {
      heap.setI16((0x005f12c0 + heap.u32(0x005f1290) * 6), (((heap.u32((param_1 + 0xc))) << 16 >> 16)) & 0xffff);
      heap.setI16((0x005f12c2 + heap.u32(0x005f1290) * 6), (((uVar2) << 16 >> 16)) & 0xffff);
      heap.setI16((0x005f12c4 + heap.u32(0x005f1290) * 6), (((iVar1) << 16 >> 16)) & 0xffff);
      heap.setU32(0x005f1290, (heap.u32(0x005f1290) + 1) >>> 0);
    }
    uVar2 = ((1) >>> 0);
  } else {
    uVar2 = ((0) >>> 0);
  }
  return uVar2;
}
