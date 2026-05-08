// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e533.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CreateCompatibleDC, GetBkColor, GetBkMode, GetDC, GetTextColor, RealizePalette, SelectObject, SelectPalette, SetDIBColorTable } from "../../runtime/win32.js";
export function FUN_0040e533(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005eee98 = __sp + 0;
  try {
  let CVar1 = 0;
  let iVar2 = 0;
  let pHVar3 = 0;
  let pvVar4 = 0;
  let local_8 = 0;
  if (heap.u32((param_1 + 0x90)) == 0) {
    local_8 = CreateCompatibleDC(heap, 0x0);
  } else {
    local_8 = GetDC(heap, heap.u32(0x005e916c));
  }
  if (local_8 != 0x0) {
    CVar1 = GetTextColor(heap, local_8);
    heap.u32((param_1 + 0x98)) = CVar1;
    CVar1 = GetBkColor(heap, local_8);
    heap.u32((param_1 + 0x9c)) = CVar1;
    iVar2 = GetBkMode(heap, local_8);
    heap.u32((param_1 + 0xa4)) = iVar2;
    heap.u32((param_1 + 0xa0)) = 0;
    heap.u32((param_1 + 0xc)) = 1;
    if (heap.u32((param_1 + 0x90)) == 0) {
      pvVar4 = SelectObject(heap, local_8, heap.u32((param_1 + 0x8c)));
      heap.u32((param_1 + 0x94)) = pvVar4;
      SetDIBColorTable(heap, local_8, 0, 0x100, __addr_DAT_005eee98);
    } else {
      pHVar3 = SelectPalette(heap, local_8, heap.u32(0x005ec07c), 0);
      heap.u32((param_1 + 0x94)) = pHVar3;
      RealizePalette(heap, local_8);
    }
  }
  return local_8;
} finally {
    heap.freeFrame(4);
  }
}
