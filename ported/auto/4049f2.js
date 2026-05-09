// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4049f2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetDeviceCaps, GetSystemMetrics, ReleaseDC } from "../../runtime/win32.js";
export function FUN_004049f2(heap, param_1) {
  let iVar1 = 0;
  let hdc = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  iVar1 = ((GetSystemMetrics(heap, 0)) >>> 0);
  heap.setU32(param_1, (((iVar1) << 16 >> 16)) & 0xffffffff);
  iVar1 = ((GetSystemMetrics(heap, 1)) >>> 0);
  heap.setU16((param_1 + (1) * 2), (((iVar1) << 16 >> 16)) & 0xffff);
  hdc = ((GetDC(heap, ((0x0) >>> 0))) >>> 0);
  if (hdc == ((0x0) >>> 0)) {
    heap.setU8((param_1 + ((3) * 2)), (0) & 0xff);
    heap.setU8((((param_1) >>> 0) + 7), (0) & 0xff);
    heap.setU16((param_1 + (6) * 2), (0) & 0xffff);
    heap.setU16((param_1 + (8) * 2), (0) & 0xffff);
  } else {
    uVar2 = ((GetDeviceCaps(heap, hdc, 0x26)) >>> 0);
    iVar1 = ((GetDeviceCaps(heap, hdc, 0x68)) >>> 0);
    iVar3 = ((GetDeviceCaps(heap, hdc, 0xc)) >>> 0);
    heap.setI8((param_1 + ((3) * 2)), (((iVar3) << 24 >> 24)) & 0xff);
    heap.setU32((((param_1) >>> 0) + 7), ((uVar2 & 0x100) != 0) & 0xffffffff);
    heap.setU16((param_1 + (6) * 2), (((iVar1) << 16 >> 16)) & 0xffff);
    iVar1 = ((GetDeviceCaps(heap, hdc, 0x6c)) >>> 0);
    heap.setU16((param_1 + (8) * 2), (((iVar1) & 0xff) / 3) & 0xffff);
    ReleaseDC(heap, ((0x0) >>> 0), hdc);
  }
  heap.setU16((param_1 + (4) * 2), (0) & 0xffff);
  heap.setU16((param_1 + (5) * 2), (0) & 0xffff);
  heap.setU8((param_1 + ((2) * 2)), (0) & 0xff);
  heap.setU8((((param_1) >>> 0) + 5), (0) & 0xff);
  heap.setU8((param_1 + ((7) * 2)), (0) & 0xff);
  heap.setU8((((param_1) >>> 0) + 0xf), (0) & 0xff);
  return;
}
