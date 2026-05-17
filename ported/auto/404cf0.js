// @manual — do not regenerate.
// Source: decompiled/c/404cf0.c
// Fix: szTip[0x3f] = 0 null-terminator was emitted as setU32 at a
// dereferenced-then-multiplied address. szTip is a char[] starting at
// offset 24 of NOTIFYICONDATAA; the assignment is a 1-byte store at
// (__addr_local_5c + 24 + 0x3f). Also fixed _strncpy passing dest as
// heap.u8(...) instead of the address.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { Shell_NotifyIconA, _strncpy } from "../../runtime/win32.js";
export function FUN_00404cf0(heap, param_1, param_2) {
  const __sp = heap.allocFrame(128);
  const __addr_local_5c = __sp + 0;
  try {
  heap.setU32(__addr_local_5c, (0x58) >>> 0);
  heap.setU32((__addr_local_5c + 4), (heap.u32(0x005e916c)) >>> 0);
  heap.setU32((__addr_local_5c + 8), (1) >>> 0);
  heap.setU32((__addr_local_5c + 12), (3) >>> 0);
  heap.setU32((__addr_local_5c + 12), (0x400) >>> 0);
  heap.setU32((__addr_local_5c + 16), (param_1) >>> 0);
  if (param_2 != 0x0) {
    _strncpy(heap, (__addr_local_5c + 24), param_2, 0x3f);
    heap.setU8(((__addr_local_5c + 24) + 0x3f), (0) & 0xff);
    heap.setU32((__addr_local_5c + 12), (heap.u32((__addr_local_5c + 12)) | 4) >>> 0);
  }
  heap.setU32(0x005e93fc, (Shell_NotifyIconA(heap, 0, __addr_local_5c)) >>> 0);
  return heap.u32(0x005e93fc);
} finally {
    heap.freeFrame(128);
  }
}
