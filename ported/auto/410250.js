// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410250.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { BitBlt, CreateCompatibleDC, DeleteDC, GetDC, RealizePalette, ReleaseDC, SelectObject, SelectPalette, SetDIBColorTable } from "../../runtime/win32.js";
export function FUN_00410250(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ef6a8 = __sp + 0;
  try {
  let hdc = 0;
  let hdc_00 = 0;
  let h = 0;
  let hPal = 0;
  let bVar1 = 0;
  bVar1 = false;
  if ((heap.u32((param_1 + 0x90)) == 0) && (heap.u32((param_3 + 0x90)) != 0)) {
    hdc = GetDC(heap, heap.u32(0x005e916c));
    if (hdc != 0x0) {
      hdc_00 = CreateCompatibleDC(heap, hdc);
      bVar1 = hdc_00 != 0x0;
      if (bVar1) {
        h = SelectObject(heap, hdc_00, heap.u32((param_1 + 0x8c)));
        hPal = SelectPalette(heap, hdc, heap.u32(0x005ec0d8), 0);
        SetDIBColorTable(heap, hdc_00, 0, 0x100, __addr_DAT_005ef6a8);
        RealizePalette(heap, hdc);
        BitBlt(heap, hdc, param_4, param_5, heap.u32(param_2 + (2) * 4) - heap.u32(param_2), heap.u32(param_2 + (3) * 4) - heap.u32(param_2 + (1) * 4), hdc_00, heap.u32(param_2), heap.u32(param_2 + (1) * 4), 0xcc0020);
        SelectPalette(heap, hdc, hPal, 1);
        SelectObject(heap, hdc_00, h);
        DeleteDC(heap, hdc_00);
      }
      ReleaseDC(heap, heap.u32(0x005e916c), hdc);
    }
  } else {
    bVar1 = false;
  }
  return bVar1;
} finally {
    heap.freeFrame(4);
  }
}
