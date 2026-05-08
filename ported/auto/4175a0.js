// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4175a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004175a0(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ec2e0 = __sp + 0;
  try {
  puVar2 = __addr_DAT_005ec2e0;
  if (heap.u32(0x005ec2e4) != param_1) {
    puVar3 = puVar2;
    do {
      puVar2 = puVar3 + 0xc;
      if (__addr_DAT_005ec2e0 + heap.u32(0x005ec360) * 0xc <= puVar2) {
        break;
      }
      piVar1 = (puVar3 + 0x10);
      puVar3 = puVar2;
    } while (heap.u32(piVar1) != param_1);
  }
  if ((__addr_DAT_005ec2e0 + heap.u32(0x005ec360) * 0xc <= puVar2) || (heap.u32((puVar2 + 4)) != param_1)) {
    puVar2 = 0x0;
  }
  return puVar2;
} finally {
    heap.freeFrame(4);
  }
}
