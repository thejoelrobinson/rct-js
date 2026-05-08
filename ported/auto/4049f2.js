// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4049f2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetDC, GetDeviceCaps, GetSystemMetrics, ReleaseDC } from "../runtime/win32.js";
export function FUN_004049f2(heap, param_1) {
  let iVar1 = 0;
  let hdc = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  iVar1 = GetSystemMetrics(heap, 0);
  heap.u32(param_1) = iVar1;
  iVar1 = GetSystemMetrics(heap, 1);
  heap.u32(param_1 + (1) * 4) = iVar1;
  hdc = GetDC(heap, 0x0);
  if (hdc == 0x0) {
    heap.u32((param_1 + 3)) = 0;
    heap.u32((param_1 + 7)) = 0;
    heap.u32(param_1 + (6) * 4) = 0;
    heap.u32(param_1 + (8) * 4) = 0;
  } else {
    uVar2 = GetDeviceCaps(heap, hdc, 0x26);
    iVar1 = GetDeviceCaps(heap, hdc, 0x68);
    iVar3 = GetDeviceCaps(heap, hdc, 0xc);
    heap.u32((param_1 + 3)) = iVar3;
    heap.u32((param_1 + 7)) = (uVar2 & 0x100) != 0;
    heap.u32(param_1 + (6) * 4) = iVar1;
    iVar1 = GetDeviceCaps(heap, hdc, 0x6c);
    heap.u32(param_1 + (8) * 4) = iVar1 / 3;
    ReleaseDC(heap, 0x0, hdc);
  }
  heap.u32(param_1 + (4) * 4) = 0;
  heap.u32(param_1 + (5) * 4) = 0;
  heap.u32((param_1 + 2)) = 0;
  heap.u32((param_1 + 5)) = 0;
  heap.u32((param_1 + 7)) = 0;
  heap.u32((param_1 + 0xf)) = 0;
  return;
}
