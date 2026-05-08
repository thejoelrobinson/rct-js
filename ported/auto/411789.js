// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411789.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00411789(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_local_103 = __sp + 0;
  const __addr_local_104 = __sp + 4;
  try {
  let iVar1 = 0;
  heap.setU32(__addr_local_104, (heap.u32(0x005ec240)) >>> 0);
  puVar2 = __addr_local_103;
  for (iVar1 = 0x3f; iVar1 != 0; iVar1 = iVar1 + -1) {
    heap.u32(puVar2) = 0;
    puVar2 = puVar2 + 1;
  }
  heap.u32(puVar2) = 0;
  heap.u32((puVar2 + 2)) = 0;
  mciSendStringA(0x005ec244, __addr_local_104, 0x100, heap.u32(0x005e916c));
  iVar1 = _strcmp(__addr_local_104, 0x005ec258);
  heap.setU32(0x005ec1c8, ((uint)(iVar1 == 0)) >>> 0);
  return iVar1 == 0;
} finally {
    heap.freeFrame(8);
  }
}
