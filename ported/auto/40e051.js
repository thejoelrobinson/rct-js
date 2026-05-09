// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e051.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetDeviceCaps, ReleaseDC } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004049f2 } from "./4049f2.js";
export function FUN_0040e051(heap, param_1) {
  let iVar1 = 0;
  let hdc = 0;
  let uVar2 = 0;
  iVar1 = ((param_1 * 0x12 + heap.u32(0x005ebe38)) >>> 0);
  (regs.eax = FUN_004049f2(heap, iVar1));
  heap.setU8((iVar1 + 4), (1) & 0xff);
  hdc = ((GetDC(heap, ((0x0) >>> 0))) >>> 0);
  if (hdc != ((0x0) >>> 0)) {
    uVar2 = ((GetDeviceCaps(heap, hdc, 0x6a)) >>> 0);
    heap.setI16((iVar1 + 8), (((((((uVar2 & 0xffff)) >>> 0) >>> 1)) << 16 >> 16)) & 0xffff);
    heap.setU16((iVar1 + 10), (heap.u16((iVar1 + 8))) & 0xffff);
    ReleaseDC(heap, ((0x0) >>> 0), hdc);
  }
  return param_1 + 1;
}
