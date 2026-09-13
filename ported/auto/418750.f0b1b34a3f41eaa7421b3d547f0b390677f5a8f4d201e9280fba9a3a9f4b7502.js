// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418750.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418750(heap, param_1, param_2) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  uVar4 = ((0x80000000) >>> 0);
  uVar1 = ((heap.u16((((param_2) | 0) + 6))) & 0xffff);
  uVar2 = ((heap.u32(param_2)) >>> 0);
  uVar3 = (((uVar1 & 0x7ff0) >>> 4) >>> 0);
  if (uVar3 == 0) {
    uVar4 = ((0) >>> 0);
    if (((heap.u32(param_2 + (1) * 4) & 0xfffff) == 0) && (uVar2 == 0)) {
      heap.setU32((param_1 + (1) * 4), (0) & 0xffffffff);
      heap.setU32(param_1, (0) & 0xffffffff);
      heap.setU16((param_1 + ((2) * 4)), (0) & 0xffff);
      return;
    }
    iVar6 = ((0x3c01) >>> 0);
  } else {
    if (uVar3 == 0x7ff) {
    iVar6 = ((0x7fff) >>> 0);
  } else {
    iVar6 = ((uVar3 + 0x3c00) >>> 0);
  }
  }
  uVar5 = ((((iVar6) & 0xffff)) & 0xffff);
  uVar3 = ((uVar2 >>> 0x15 | (heap.u32(param_2 + (1) * 4) & 0xfffff) << 0xb | uVar4) >>> 0);
  heap.setU32((param_1 + (1) * 4), (uVar3) & 0xffffffff);
  heap.setU32(param_1, (uVar2 << 0xb) & 0xffffffff);
  for (; uVar4 == 0; uVar4 = (((uVar4 & 0x80000000) >>> 0)) >>> 0) {
    uVar4 = ((uVar3 * 2) >>> 0);
    uVar3 = ((heap.u32(param_1) >>> 0x1f | uVar4) >>> 0);
    iVar6 = ((iVar6 + 0xffff) >>> 0);
    uVar5 = ((((iVar6) & 0xffff)) & 0xffff);
    heap.setU32((param_1 + (1) * 4), (uVar3) & 0xffffffff);
    heap.setU32(param_1, (heap.u32(param_1) * 2) & 0xffffffff);
  }
  heap.setU16((param_1 + ((2) * 4)), (uVar5 | uVar1 & 0x8000) & 0xffff);
  return;
}
