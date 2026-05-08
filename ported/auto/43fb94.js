// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fb94.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0043fb94(heap) {
  let in_AX = 0;
  let unaff_EBX = 0;
  if ((heap.u32((0x0062d325) + (unaff_EBX * 2) * 4) & 1) != 0) {
    return in_AX * 0x260;
  }
  if ((heap.u32((0x0062d325) + (unaff_EBX * 2) * 4) & 2) != 0) {
    heap.setU32(0x0062d2ee, (in_AX + 0x6f9) >>> 0);
    return in_AX + 0x6f9;
  }
  if ((heap.u32((0x0062d325) + (unaff_EBX * 2) * 4) & 4) != 0) {
    heap.setU32(0x0062d2ee, (in_AX + 0x719) >>> 0);
    return in_AX + 0x719;
  }
  if ((heap.u32((0x0062d325) + (unaff_EBX * 2) * 4) & 8) == 0) {
    return in_AX;
  }
  heap.setU32(0x0062d2ee, (in_AX + 0x729) >>> 0);
  return in_AX + 0x729;
}
