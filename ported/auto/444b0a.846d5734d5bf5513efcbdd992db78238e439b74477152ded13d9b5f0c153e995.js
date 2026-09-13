// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444b0a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00444b0a(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let puVar6 = 0;
  uVar4 = ((heap.u32(0x0087c394)) & 0xffff);
  while (uVar4 != 0xffff) {
    uVar5 = ((((uVar4) >>> 0)) >>> 0);
    uVar2 = ((heap.u32((0x00743b98 + uVar5 * 0x80))) >>> 0);
    uVar1 = ((heap.u32((0x00743b9e) + (uVar5 * 0x80) * 4)) & 0xffff);
    puVar6 = (((0x00743b94 + uVar5 * 0x100)) >>> 0);
    for (iVar3 = ((0x40) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
      heap.setU32(puVar6, (0) & 0xffffffff);
      puVar6 = ((puVar6 + ((1) * 4)) >>> 0);
    }
    heap.setU32(((0x00743b94) + (uVar5 * 0x100) * 4), (0xff) & 0xffffffff);
    heap.setU32((0x00743b98 + uVar5 * 0x80), (uVar2) & 0xffffffff);
    heap.setU32(((0x00743b9c) + (uVar5 * 0x100) * 4), (0) & 0xffffffff);
    heap.setU32(((0x00743b9e) + (uVar5 * 0x80) * 4), (uVar1) & 0xffffffff);
    uVar4 = ((heap.u32((0x00743b98) + (uVar5 * 0x80) * 4)) & 0xffff);
  }
  return;
}
