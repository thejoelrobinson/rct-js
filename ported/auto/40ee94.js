// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ee94.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, RealizePalette, SelectPalette } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040ec7b } from "./40ec7b.js";
export function FUN_0040ee94(heap, param_1, param_2) {
  let uVar1 = 0;
  if (heap.u32(0x005ec080) == ((0x0) >>> 0)) {
    if ((heap.i32((param_1 + 0x90)) == 0) && (heap.i32((param_2 + 0x90)) != 0)) {
      heap.setU32(0x005ec080, (GetDC(heap, heap.u32(0x005e916c))) >>> 0);
      if (heap.u32(0x005ec080) == ((0x0) >>> 0)) {
        uVar1 = ((0) >>> 0);
      } else {
        heap.setU32(0x005ec084, (heap.u32((param_1 + 0x88))) >>> 0);
        heap.setU32(0x005ec088, (heap.u32((param_1 + 0x84))) >>> 0);
        heap.setU32(0x005ec08c, (((heap.i16((param_1 + 8))) >>> 0)) >>> 0);
        heap.setU32(0x005ef298, (SelectPalette(heap, heap.u32(0x005ec080), heap.u32(0x005ec07c), 0)) >>> 0);
        (regs.eax = FUN_0040ec7b(heap, param_1, 0, 0x100, 0x005eee98));
        RealizePalette(heap, heap.u32(0x005ec080));
        uVar1 = ((1) >>> 0);
      }
    } else {
      uVar1 = ((0) >>> 0);
    }
  } else {
    uVar1 = ((0) >>> 0);
  }
  return uVar1;
}
