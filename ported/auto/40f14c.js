// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f14c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteObject, DestroyWindow } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040eadf } from "./40eadf.js";
import { FUN_00413470 } from "./413470.js";
import { FUN_00413c90 } from "./413c90.js";
export function FUN_0040f14c(heap) {
  let puVar1 = 0;
  let local_8 = 0;
  if (heap.u32(0x005ec07c) != ((0x0) >>> 0)) {
    DeleteObject(heap, heap.u32(0x005ec07c));
    heap.setU32(0x005ec07c, (((0x0) >>> 0)) >>> 0);
  }
  if (heap.u32(0x005ec074) != 0x0) {
    local_8 = ((heap.u32(0x005ec074)) >>> 0);
    while (local_8 != 0x0) {
      (regs.eax = FUN_0040eadf(heap, heap.u32(local_8)));
      puVar1 = ((heap.u32(local_8 + (1) * 4)) >>> 0);
      (regs.eax = FUN_00413470(heap, local_8));
      local_8 = ((puVar1) >>> 0);
    }
    heap.setU32(0x005ec074, (0x0) >>> 0);
  }
  if (heap.u32(0x005ec078) != 0) {
    (regs.eax = FUN_00413c90(heap, 0x005ec0cc, 0x005ec0bc, 0x2b9));
  }
  if (heap.u32(0x005e916c) != ((0x0) >>> 0)) {
    DestroyWindow(heap, heap.u32(0x005e916c));
    heap.setU32(0x005e916c, (((0x0) >>> 0)) >>> 0);
  }
  return;
}
