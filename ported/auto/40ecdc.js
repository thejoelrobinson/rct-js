// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ecdc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, RealizePalette, ReleaseDC, SelectPalette, StretchDIBits } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040ec7b } from "./40ec7b.js";
export function FUN_0040ecdc(heap, param_1, param_2, param_3, param_4, param_5) {
  let hdc = 0;
  let hPal = 0;
  let bVar1 = 0;
  if ((heap.i32((param_1 + 0x90)) == 0) && (heap.i32((param_3 + 0x90)) != 0)) {
    hdc = ((GetDC(heap, heap.u32(0x005e916c))) >>> 0);
    bVar1 = ((hdc != ((0x0) | 0)) & 0xff);
    if (bVar1) {
      hPal = ((SelectPalette(heap, hdc, heap.u32(0x005ec07c), 0)) >>> 0);
      (regs.eax = FUN_0040ec7b(heap, param_1, 0, 0x100, 0x005eee98));
      RealizePalette(heap, hdc);
      StretchDIBits(heap, hdc, param_4, param_5, heap.i32(param_2 + (2) * 4) - heap.i32(param_2), heap.i32(param_2 + (3) * 4) - heap.i32(param_2 + (1) * 4), heap.i32(param_2), ((heap.i16((param_1 + 8))) | 0) - heap.i32(param_2 + (3) * 4), heap.i32(param_2 + (2) * 4) - heap.i32(param_2), heap.i32(param_2 + (3) * 4) - heap.i32(param_2 + (1) * 4), heap.u32((param_1 + 0x84)), heap.u32((param_1 + 0x88)), 0, 0xcc0020);
      SelectPalette(heap, hdc, hPal, 1);
      ReleaseDC(heap, heap.u32(0x005e916c), hdc);
    }
  } else {
    bVar1 = ((false) & 0xff);
  }
  return bVar1;
}
