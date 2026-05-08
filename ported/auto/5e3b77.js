// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3b77.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e3b77(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a013c = __sp + 0;
  try {
  let in_AX = 0;
  let in_CX = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  let puVar1 = 0;
  if ((((-(unaff_BX >>> 2) <= in_DX) && (in_DX <= ((unaff_BX >>> 2) * -2 + heap.u32(0x00971ed6)))) && (0x1d < in_AX)) && (in_AX <= (heap.u32(0x00971ed8) - (in_CX >>> 2)))) {
    puVar1 = __addr_DAT_009a013c;
    while (true) {
      if (heap.u32(0x009a1164) <= puVar1) {
        return in_AX;
      }
      if ((((heap.u32((puVar1 + 0x32)) & 1) == 0) && (heap.u32((puVar1 + 0x20)) < (in_DX + unaff_BX))) && ((in_DX < (heap.u32((puVar1 + 0x20)) + heap.u32((puVar1 + 0x24))) && ((heap.u32((puVar1 + 0x22)) < (in_AX + in_CX) && (in_AX < (heap.u32((puVar1 + 0x22)) + heap.u32((puVar1 + 0x26))))))))) {
        break;
      }
      puVar1 = puVar1 + 0x178;
    }
  }
  return in_AX;
} finally {
    heap.freeFrame(4);
  }
}
