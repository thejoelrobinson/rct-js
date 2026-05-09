// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40acfb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DestroyWindow, GetDC, ReleaseDC, SetSystemPaletteUse } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040acfb(heap) {
  let puVar1 = 0;
  let hdc = 0;
  let local_10 = 0;
  let local_8 = 0;
  local_8 = ((heap.u32(0x005ebf48)) >>> 0);
  while (local_8 != 0x0) {
    puVar1 = ((heap.u32(local_8 + (2) * 4)) >>> 0);
    (regs.eax = FUN_00413470(heap, heap.u32(local_8)));
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(local_8 + (1) * 4)) + 8)), heap.u32(local_8 + (1) * 4)));
    (regs.eax = FUN_00413470(heap, local_8));
    local_8 = ((puVar1) >>> 0);
  }
  heap.setU32(0x005ebf48, (0x0) >>> 0);
  if (heap.u32(0x005ebf44) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf44)) + 8)), heap.u32(0x005ebf44)));
    heap.setU32(0x005ebf44, (0x0) >>> 0);
  }
  if (heap.u32(0x005ebf38) != 0) {
    for (local_10 = ((0) >>> 0); local_10 < heap.u32(0x005f0950); local_10 = (((local_10 + 1) >>> 0)) >>> 0) {
      (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((heap.u32(0x005ebf38) + local_10 * 4))) + 8)), heap.u32((heap.u32(0x005ebf38) + local_10 * 4))));
    }
    (regs.eax = FUN_00413470(heap, heap.u32(0x005ebf38)));
    heap.setU32(0x005ebf38, (0) >>> 0);
  }
  if (heap.u32(0x005ebf34) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 8)), heap.u32(0x005ebf34)));
    heap.setU32(0x005ebf34, (0x0) >>> 0);
  }
  if (heap.u32(0x005ebf3c) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf3c)) + 8)), heap.u32(0x005ebf3c)));
    heap.setU32(0x005ebf3c, (0x0) >>> 0);
  }
  if (heap.u32(0x005e916c) != ((0x0) >>> 0)) {
    hdc = ((GetDC(heap, heap.u32(0x005e916c))) >>> 0);
    if (hdc != ((0x0) >>> 0)) {
      SetSystemPaletteUse(heap, hdc, 1);
      ReleaseDC(heap, heap.u32(0x005e916c), hdc);
    }
    DestroyWindow(heap, heap.u32(0x005e916c));
    heap.setU32(0x005e916c, (((0x0) >>> 0)) >>> 0);
  }
  return;
}
