// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4182e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004182e0(heap, param_1, param_2) {
  let iVar1 = 0;
  let bVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let puVar6 = 0;
  let iVar7 = 0;
  iVar1 = (((((param_2 + (param_2 >>> 0x1f & 0x1f))) >>> 0) >>> 5) >>> 0);
  bVar2 = ((((param_2 >>> 0x1f) & 0xff)) & 0xff);
  uVar5 = ((0) >>> 0);
  bVar2 = ((((((param_2) & 0xff) ^ bVar2) - bVar2 & 0x1f ^ bVar2) - bVar2) & 0xff);
  param_2 = ((3) >>> 0);
  puVar6 = ((param_1) >>> 0);
  do {
    uVar4 = ((heap.u32(puVar6) >>> (bVar2 & 0x1f) | uVar5) >>> 0);
    uVar5 = (((~(-1 << (bVar2 & 0x1f)) & heap.u32(puVar6)) << (0x20 - bVar2 & 0x1f)) >>> 0);
    heap.setU32(puVar6, (uVar4) & 0xffffffff);
    param_2 = ((param_2 + -1) >>> 0);
    puVar6 = ((puVar6 + ((1) * 4)) >>> 0);
  } while (param_2 != 0);
  iVar7 = ((2) >>> 0);
  iVar3 = ((8) >>> 0);
  do {
    if (iVar7 < iVar1) {
      heap.setU32((((param_1) >>> 0) + iVar3), (0) & 0xffffffff);
    } else {
      heap.setU32((((param_1) >>> 0) + iVar3), (heap.u32((((param_1) >>> 0) + iVar3 + iVar1 * -4))) & 0xffffffff);
    }
    iVar7 = ((iVar7 + -1) >>> 0);
    iVar3 = ((iVar3 + -4) >>> 0);
  } while (-1 < (iVar3 | 0));
  return;
}
