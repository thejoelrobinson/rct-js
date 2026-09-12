// @manual — do not regenerate.
// Source: decompiled/c/404d67.c
// Fix: same as 404cf0.js — szTip[0x3f] = 0 null-terminator was emitted
// as setU32; replaced with setU8 at correct address.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { Shell_NotifyIconA, _strncpy } from "../../runtime/win32.js";
export function FUN_00404d67(heap, param_1, param_2) {
  const __sp = heap.allocFrame(128);
  const __addr_local_5c = __sp + 0;
  try {
  let BVar1 = 0;
  if (heap.u32(0x005e93fc) == 0) {
    BVar1 = ((0) >>> 0);
  } else {
    heap.setU32(__addr_local_5c, (0x58) >>> 0);
    heap.setU32((__addr_local_5c + 4), (heap.u32(0x005e916c)) >>> 0);
    heap.setU32((__addr_local_5c + 8), (1) >>> 0);
    heap.setU32((__addr_local_5c + 12), (2) >>> 0);
    heap.setU32((__addr_local_5c + 16), (param_1) >>> 0);
    if (param_2 != 0x0) {
      _strncpy(heap, (__addr_local_5c + 24), param_2, 0x3f);
      heap.setU8(((__addr_local_5c + 24) + 0x3f), (0) & 0xff);
      heap.setU32((__addr_local_5c + 12), (heap.u32((__addr_local_5c + 12)) | 4) >>> 0);
    }
    BVar1 = ((Shell_NotifyIconA(heap, 1, __addr_local_5c)) >>> 0);
    heap.setU32(0x005e93fc, (BVar1) >>> 0);
  }
  return BVar1;
} finally {
    heap.freeFrame(128);
  }
}
