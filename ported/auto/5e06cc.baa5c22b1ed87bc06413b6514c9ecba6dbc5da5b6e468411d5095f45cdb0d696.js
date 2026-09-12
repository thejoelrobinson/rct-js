// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e06cc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e06cc(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = ((0x20) & 0xffff);
  uVar2 = ((0x20) & 0xffff);
  do {
    do {
      if (heap.u8((heap.u32((0x00971ef4) + (((((uVar2 << 7 | uVar2 >>> 9 | uVar1) & 0xffff) >>> 5 | (uVar2 >>> 9) << 0xb) & 0xffff)) * 4) + 2)) < 0x18) {
        heap.setU8((heap.u32((0x00971ef4) + (((((uVar2 << 7 | uVar2 >>> 9 | uVar1) & 0xffff) >>> 5 | (uVar2 >>> 9) << 0xb) & 0xffff)) * 4) + 5), (6) & 0xff);
      }
      uVar1 = ((uVar1 + 0x20) & 0xffff);
    } while (uVar1 < 0xfe0);
    uVar1 = ((0x20) & 0xffff);
    uVar2 = ((uVar2 + 0x20) & 0xffff);
  } while (uVar2 < 0xfe0);
  return;
}
