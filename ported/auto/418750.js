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
  uVar4 = 0x80000000;
  uVar1 = heap.u32((param_2 + 6));
  uVar2 = heap.u32(param_2);
  uVar3 = (uVar1 & 0x7ff0) >>> 4;
  if (uVar3 == 0) {
    uVar4 = 0;
    if (((heap.u32(param_2 + (1) * 4) & 0xfffff) == 0) && (uVar2 == 0)) {
      heap.u32(param_1 + (1) * 4) = 0;
      heap.u32(param_1) = 0;
      heap.u32((param_1 + 2)) = 0;
      return;
    }
    iVar6 = 0x3c01;
  } else {
    if (uVar3 == 0x7ff) {
    iVar6 = 0x7fff;
  } else {
    iVar6 = uVar3 + 0x3c00;
  }
  }
  uVar5 = iVar6;
  uVar3 = uVar2 >>> 0x15 | (heap.u32(param_2 + (1) * 4) & 0xfffff) << 0xb | uVar4;
  heap.u32(param_1 + (1) * 4) = uVar3;
  heap.u32(param_1) = uVar2 << 0xb;
  for (; uVar4 == 0; uVar4 = uVar4 & 0x80000000) {
    uVar4 = uVar3 * 2;
    uVar3 = heap.u32(param_1) >>> 0x1f | uVar4;
    iVar6 = iVar6 + 0xffff;
    uVar5 = iVar6;
    heap.u32(param_1 + (1) * 4) = uVar3;
    heap.u32(param_1) = heap.u32(param_1) * 2;
  }
  heap.u32((param_1 + 2)) = uVar5 | uVar1 & 0x8000;
  return;
}
