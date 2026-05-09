// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4175a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004175a0(heap, param_1) {
  let piVar1 = 0;
  let puVar2 = 0;
  let puVar3 = 0;
  puVar2 = ((0x005ec2e0) >>> 0);
  if (heap.u32(0x005ec2e4) != param_1) {
    puVar3 = ((puVar2) >>> 0);
    do {
      puVar2 = ((puVar3 + 0xc) >>> 0);
      if (0x005ec2e0 + heap.u32(0x005ec360) * 0xc <= puVar2) {
        break;
      }
      piVar1 = (((puVar3 + 0x10)) >>> 0);
      puVar3 = ((puVar2) >>> 0);
    } while (heap.i32(piVar1) != param_1);
  }
  if ((0x005ec2e0 + heap.u32(0x005ec360) * 0xc <= puVar2) || (heap.i32((puVar2 + 4)) != param_1)) {
    puVar2 = ((0x0) >>> 0);
  }
  return puVar2;
}
