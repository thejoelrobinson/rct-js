// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3bbf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e3bbf(heap) {
  let in_AX = 0;
  let in_CX = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  if ((((-1 < in_DX) && (0x1d < in_AX)) && ((in_DX + unaff_BX) <= heap.u32(0x00971ed6))) && ((in_AX + in_CX) <= heap.u32(0x00971ed8))) {
    puVar1 = 0x009a013c;
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
}
