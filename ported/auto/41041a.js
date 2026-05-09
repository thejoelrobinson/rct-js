// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41041a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CreateCompatibleDC, GetDC, RealizePalette, ReleaseDC, SelectObject, SelectPalette, SetDIBColorTable } from "../../runtime/win32.js";
export function FUN_0041041a(heap, param_1, param_2) {
  let uVar1 = 0;
  if (heap.u32(0x005ec0e4) == ((0x0) >>> 0)) {
    if ((heap.i32((param_1 + 0x90)) == 0) && (heap.i32((param_2 + 0x90)) != 0)) {
      heap.setU32(0x005ec0e4, (GetDC(heap, heap.u32(0x005e916c))) >>> 0);
      if (heap.u32(0x005ec0e4) == ((0x0) >>> 0)) {
        uVar1 = ((0) >>> 0);
      } else {
        heap.setU32(0x005ec0e8, (CreateCompatibleDC(heap, heap.u32(0x005ec0e4))) >>> 0);
        if (heap.u32(0x005ec0e8) == ((0x0) >>> 0)) {
          ReleaseDC(heap, heap.u32(0x005e916c), heap.u32(0x005ec0e4));
          uVar1 = ((0) >>> 0);
        } else {
          heap.setU32(0x005f0324, (SelectObject(heap, heap.u32(0x005ec0e8), heap.i32((param_1 + 0x8c)))) >>> 0);
          heap.setU32(0x005f0328, (SelectPalette(heap, heap.u32(0x005ec0e4), heap.u32(0x005ec0d8), 0)) >>> 0);
          SetDIBColorTable(heap, heap.u32(0x005ec0e8), 0, 0x100, 0x005ef6a8);
          RealizePalette(heap, heap.u32(0x005ec0e4));
          uVar1 = ((1) >>> 0);
        }
      }
    } else {
      uVar1 = ((0) >>> 0);
    }
  } else {
    uVar1 = ((0) >>> 0);
  }
  return uVar1;
}
