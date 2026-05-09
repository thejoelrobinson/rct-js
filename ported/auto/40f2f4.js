// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f2f4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CreatePalette, GetDC, GetDeviceCaps, GetSystemPaletteEntries, GetSystemPaletteUse, ReleaseDC } from "../../runtime/win32.js";
export function FUN_0040f2f4(heap, param_1, param_2, param_3) {
  let hdc = 0;
  let UVar1 = 0;
  let iVar2 = 0;
  let local_8 = 0;
  hdc = ((GetDC(heap, ((0x0) >>> 0))) >>> 0);
  UVar1 = ((GetSystemPaletteUse(heap, hdc)) >>> 0);
  if (UVar1 == 2) {
    for (local_8 = ((0) >>> 0); local_8 < param_2; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
      heap.setU8(heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4), (heap.i32((param_1 + 2 + local_8 * 4))) & 0xff);
      heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 1), (heap.i32((param_1 + 1 + local_8 * 4))) & 0xff);
      heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 2), (heap.i32((param_1 + local_8 * 4))) & 0xff);
      heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (1) & 0xff);
    }
    for (; local_8 < 0x100; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
      heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (1) & 0xff);
    }
    heap.setU8(heap.u32(param_3 + (0x80) * 4), (0xff) & 0xff);
    heap.setU8((((heap.u32(param_3 + (0x80) * 4)) >>> 0) + 1), (0xff) & 0xff);
    heap.setU8((heap.u32(param_3 + (0x80) * 4) + 2), (0xff) & 0xff);
    heap.setU8(((((heap.u32(param_3 + (0x80) * 4) + 2)) >>> 0) + 1), (0) & 0xff);
    heap.setU8(heap.u32(heap.u32((param_3 + 4)) + (0) * 4), (0) & 0xff);
    heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (0) * 4) + 1), (0) & 0xff);
    heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (0) * 4) + 2), (0) & 0xff);
    heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (0) * 4) + 3), (0) & 0xff);
    heap.setU32(0x005ec0dc, (1) >>> 0);
    heap.setU32(0x005ec0e0, (0xfe) >>> 0);
  } else {
    iVar2 = ((GetDeviceCaps(heap, hdc, 0x18)) >>> 0);
    if (iVar2 < 1) {
      for (local_8 = ((0) >>> 0); local_8 < param_2; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
        heap.setU8(heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4), (heap.i32((param_1 + 2 + local_8 * 4))) & 0xff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 1), (heap.i32((param_1 + 1 + local_8 * 4))) & 0xff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 2), (heap.i32((param_1 + local_8 * 4))) & 0xff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (1) & 0xff);
      }
      heap.setU32(0x005ec0dc, (0) >>> 0);
      heap.setU32(0x005ec0e0, (0x100) >>> 0);
    } else {
      UVar1 = ((iVar2 >>> 1) >>> 0);
      heap.setU32(0x005ec0dc, (UVar1) >>> 0);
      heap.setU32(0x005ec0e0, (param_2 - iVar2) >>> 0);
      GetSystemPaletteEntries(heap, hdc, 0, UVar1, heap.u32((param_3 + 4)));
      for (local_8 = ((0) >>> 0); local_8 < ((UVar1) >>> 0); local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
        heap.setI32((param_1 + 2 + local_8 * 4), (heap.u8(heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4))) & 0xffffffff);
        heap.setI32((param_1 + 1 + local_8 * 4), (heap.u8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 1))) & 0xffffffff);
        heap.setI32((param_1 + local_8 * 4), (heap.u8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 2))) & 0xffffffff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (0) & 0xff);
      }
      for (; local_8 < ((((param_2 - iVar2) + UVar1)) >>> 0); local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
        heap.setU8(heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4), (heap.i32((param_1 + 2 + local_8 * 4))) & 0xff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 1), (heap.i32((param_1 + 1 + local_8 * 4))) & 0xff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 2), (heap.i32((param_1 + local_8 * 4))) & 0xff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (1) & 0xff);
      }
      for (; local_8 < (((0x100 - UVar1)) >>> 0); local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (1) & 0xff);
      }
      GetSystemPaletteEntries(heap, hdc, 0x100 - UVar1, UVar1, (((((param_3) >>> 0) + (0x100 - UVar1) * 4 + 4)) >>> 0));
      for (local_8 = ((0x100 - UVar1) >>> 0); local_8 < 0x100; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
        heap.setI32((param_1 + 2 + local_8 * 4), (heap.u8(heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4))) & 0xffffffff);
        heap.setI32((param_1 + 1 + local_8 * 4), (heap.u8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 1))) & 0xffffffff);
        heap.setI32((param_1 + local_8 * 4), (heap.u8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 2))) & 0xffffffff);
        heap.setU8((heap.u32(heap.u32((param_3 + 4)) + (local_8) * 4) + 3), (0) & 0xff);
      }
    }
  }
  ReleaseDC(heap, ((0x0) >>> 0), hdc);
  heap.setU16((param_3 + 2), (0x100) & 0xffff);
  heap.setU16(param_3, (0x300) & 0xffff);
  return CreatePalette(heap, param_3);
}
