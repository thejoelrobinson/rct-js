// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4062cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetDeviceCaps, ReleaseDC } from "../../runtime/win32.js";
import { FUN_004049f2 } from "./4049f2.js";
import { FUN_00408bba } from "./408bba.js";
import { FUN_00408d19 } from "./408d19.js";
import { FUN_0040f25c } from "./40f25c.js";
import { FUN_0040f271 } from "./40f271.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_004062cb(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let hdc = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  iVar1 = FUN_00408bba(heap);
  iVar2 = FUN_0040f25c(heap);
  heap.setU32(0x005ebe34, (iVar1 + iVar2 + 1) >>> 0);
  iVar1 = FUN_004133c0(heap, heap.u32(0x005ebe34) * 0x12);
  heap.setU32(0x005ebe38, (iVar1) >>> 0);
  if (iVar1 != 0) {
    FUN_004049f2(heap, iVar1);
    hdc = GetDC(heap, 0x0);
    if (hdc != 0x0) {
      uVar3 = GetDeviceCaps(heap, hdc, 0x6a);
      heap.setU32((iVar1 + 8), (((uVar3 & 0xffff) >>> 1)) >>> 0);
      heap.setU32((iVar1 + 10), (heap.u32((iVar1 + 8))) >>> 0);
      ReleaseDC(heap, 0x0, hdc);
    }
    uVar4 = FUN_0040f271(heap, 1);
    FUN_00408d19(heap, uVar4);
  }
  return;
}
