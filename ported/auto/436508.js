// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436508.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00436508(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_008ad1c8 = __sp + 0;
  const __addr_PTR_LAB_00628ab0 = __sp + 4;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let puVar3 = 0;
  let puVar4 = 0;
  let puVar5 = 0;
  let bVar6 = 0;
  uVar1 = heap.u32(0x008ae938);
  bVar6 = false;
  if (uVar1 != 0) {
    puVar3 = __addr_DAT_008ad1c8;
    while (true) {
      while ((heap.u32(heap.u32((__addr_PTR_LAB_00628ab0) + (heap.u32((puVar3 + 1))) * 4)))(), !bVar6) {
        bVar6 = 0xfffffff9 < puVar3;
        puVar3 = puVar3 + 3;
        uVar1 = uVar1 - 1;
        if (uVar1 == 0) {
          return;
        }
      }
      heap.setU32(0x008ae938, (heap.u32(0x008ae938) - 1) >>> 0);
      uVar1 = uVar1 - 1;
      if (uVar1 == 0) {
        break;
      }
      iVar2 = (uVar1 * 3);
      bVar6 = iVar2 != uVar1 * 3;
      puVar4 = puVar3 + 3;
      puVar5 = puVar3;
      for (; iVar2 != 0; iVar2 = iVar2 + -1) {
        heap.setU32(puVar5, (heap.u32(puVar4)) >>> 0);
        puVar4 = puVar4 + 1;
        puVar5 = puVar5 + 1;
      }
    }
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
