// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d316.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042d316(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_008d8a3c = __sp + 0;
  const __addr_DAT_008dbe94 = __sp + 4;
  const __addr_DAT_005f5540 = __sp + 8;
  try {
  let iVar1 = 0;
  let in_CX = 0;
  let in_DX = 0;
  pbVar2 = __addr_DAT_008d8a3c;
  iVar1 = 0;
  while (true) {
    if (heap.u32(pbVar2) == 0) {
      return -1;
    }
    if (in_DX < 0x2a) {
      break;
    }
    pbVar2 = pbVar2 + 0x10c;
    iVar1 = iVar1 + 1;
    in_DX = in_DX + -0x2a;
    if (__addr_DAT_008dbe94 <= pbVar2) {
      return -1;
    }
  }
  if ((((heap.u32(pbVar2 + (1) * 4) & 1) == 0) && (0xd < in_DX)) && (in_DX < 0x26)) {
    if ((in_CX < 0x148) || (0x15f < in_CX)) {
      if ((0x15f < in_CX) && ((in_CX < 0x178 && ((heap.u32((__addr_DAT_005f5540) + (heap.u32(pbVar2)) * 4) & 1) != 0)))) {
        return iVar1;
      }
    } else {
      if ((heap.u32((__addr_DAT_005f5540) + (heap.u32(pbVar2)) * 4) & 2) != 0) {
      return iVar1;
    }
    }
  }
  return iVar1;
} finally {
    heap.freeFrame(12);
  }
}
