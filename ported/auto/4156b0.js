// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4156b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004156b0(heap, param_1, param_2, param_3) {
  let ppuVar1 = 0;
  let uVar2 = 0;
  ppuVar1 = ((0x005ec500) >>> 0);
  while (param_1 <= heap.u32(ppuVar1 + (4) * 4) || (heap.u32(ppuVar1 + (5) * 4) <= param_1)) {
    ppuVar1 = ((heap.u32(ppuVar1)) >>> 0);
    if (ppuVar1 == 0x005ec500) {
      return 0;
    }
  }
  if ((((param_1) >>> 0) & 0xf) != 0) {
    return 0;
  }
  if ((((param_1) >>> 0) & 0xfff) < 0x100) {
    return 0;
  }
  heap.setU32(param_2, (ppuVar1) & 0xffffffff);
  uVar2 = ((((param_1) >>> 0) & 0xfffff000) >>> 0);
  heap.setU32(param_3, (uVar2) & 0xffffffff);
  return ((((param_1 + (-0x100 - uVar2))) >>> 0) >>> 4) + 8 + uVar2;
}
