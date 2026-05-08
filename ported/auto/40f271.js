// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f271.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetDeviceCaps, ReleaseDC } from "../../runtime/win32.js";
import { FUN_004049f2 } from "./4049f2.js";
export function FUN_0040f271(heap, param_1) {
  let iVar1 = 0;
  let hdc = 0;
  let uVar2 = 0;
  iVar1 = param_1 * 0x12 + heap.u32(0x005ebe38);
  FUN_004049f2(heap, iVar1);
  heap.setU32((iVar1 + 4), (1) >>> 0);
  hdc = GetDC(heap, 0x0);
  if (hdc != 0x0) {
    uVar2 = GetDeviceCaps(heap, hdc, 0x6a);
    heap.setU32((iVar1 + 8), (((uVar2 & 0xffff) >>> 1)) >>> 0);
    heap.setU32((iVar1 + 10), (heap.u32((iVar1 + 8))) >>> 0);
    ReleaseDC(heap, 0x0, hdc);
  }
  return param_1 + 1;
}
