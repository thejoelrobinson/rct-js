// @manual — do not regenerate.
// Source: decompiled/c/40e38e.c
// Fix: PALETTEENTRY[i] byte-stride writes were emitted as setU32; replaced
// with setU8. Also removed bogus extra `*4` on the index.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { AnimatePalette, GetDC, ReleaseDC, SelectPalette } from "../../runtime/win32.js";
export function FUN_0040e38e(heap, param_1, param_2, param_3) {
  let hdc = 0;
  let hPal = 0;
  let local_10 = 0;
  if ((heap.u32(0x005ec07c) != 0x0) && (((param_2) | 0) < 0x100)) {
    if (((param_2) | 0) < heap.i32(0x005ec0dc)) {
      param_2 = ((heap.u32(0x005ec0dc)) >>> 0);
    }
    if ((((heap.u32(0x005ec0e0) + heap.u32(0x005ec0dc))) | 0) < (((param_3 + param_2)) | 0)) {
      param_3 = ((heap.u32(0x005ec0e0) - param_2) >>> 0);
    }
    for (local_10 = ((param_2) >>> 0); ((local_10) | 0) < (((param_3 + param_2)) | 0); local_10 = (((local_10 + 1) >>> 0)) >>> 0) {
      heap.setU8(((0x005eee9a) + local_10 * 4), (heap.u8((param_1 + 2 + local_10 * 4))) & 0xff);
      heap.setU8(((0x005ef2a4) + local_10 * 4), (heap.u8((0x005eee9a) + local_10 * 4)) & 0xff);
      heap.setU8(((0x005eee99) + local_10 * 4), (heap.u8((param_1 + 1 + local_10 * 4))) & 0xff);
      heap.setU8(((0x005ef2a5) + local_10 * 4), (heap.u8((0x005eee99) + local_10 * 4)) & 0xff);
      heap.setU8(((0x005eee98) + local_10 * 4), (heap.u8((param_1 + local_10 * 4))) & 0xff);
      heap.setU8(((0x005ef2a6) + local_10 * 4), (heap.u8((0x005eee98) + local_10 * 4)) & 0xff);
    }
    hdc = ((GetDC(heap, heap.u32(0x005e916c))) >>> 0);
    hPal = ((SelectPalette(heap, hdc, heap.u32(0x005ec07c), 0)) >>> 0);
    AnimatePalette(heap, heap.u32(0x005ec07c), param_2, param_3, (0x005ef2a4 + param_2 * 4));
    SelectPalette(heap, hdc, hPal, 1);
    ReleaseDC(heap, heap.u32(0x005e916c), hdc);
  }
  return;
}
