// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4046fc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetSystemTime } from "../../runtime/win32.js";
export function FUN_004046fc(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_14 = __sp + 0;
  try {
  // All four destinations are 16-bit SYSTEMTIME fields and the binary stores
  // them as WORDS; Ghidra widened every one to 32 bits, clobbering the two
  // bytes above each destination:
  //   0x404713: 66 a3 a4 1c 5f 00  mov WORD ptr [0x5f1ca4], ax   ; wDay
  //   0x40471d: 66 a3 94 13 5f 00  mov WORD ptr [0x5f1394], ax   ; wMonth
  //   0x404727: 66 a3 bc 1c 5f 00  mov WORD ptr [0x5f1cbc], ax   ; wYear
  //   0x404731: 66 a3 c0 14 5f 00  mov WORD ptr [0x5f14c0], ax   ; wDayOfWeek
  // These are REAL-WORLD calendar fields (GetSystemTime), not the in-game
  // date — FUN_0042ca0e gates its charge on the real date changing.
  GetSystemTime(heap, __addr_local_14);
  heap.setU16(0x005f1ca4, (heap.u16((__addr_local_14 + 6))) & 0xffff);
  heap.setU16(0x005f1394, (heap.u16((__addr_local_14 + 2))) & 0xffff);
  heap.setU16(0x005f1cbc, (heap.u16(__addr_local_14)) & 0xffff);
  heap.setU16(0x005f14c0, (heap.u16((__addr_local_14 + 4))) & 0xffff);
  return;
} finally {
    heap.freeFrame(128);
  }
}
