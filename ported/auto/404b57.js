// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404b57.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FormatMessageA, GetLastError, MessageBoxA } from "../../runtime/win32.js";
export function FUN_00404b57(heap, param_1) {
  const __sp = heap.allocFrame(1040);
  const __addr_local_108 = __sp + 0;
  try {
  let dwMessageId = 0;
  let dwLanguageId = 0;
  let lpBuffer = 0;
  let nSize = 0;
  let Arguments = 0;
  void (0x0) /* assign to Arguments elided (SEH not modelled) */;
  nSize = ((0x104) >>> 0);
  lpBuffer = ((__addr_local_108) >>> 0);
  dwLanguageId = ((0x400) >>> 0);
  dwMessageId = ((GetLastError(heap)) >>> 0);
  FormatMessageA(heap, 0x1000, ((0x0) >>> 0), dwMessageId, dwLanguageId, lpBuffer, nSize, Arguments);
  return MessageBoxA(heap, ((0x0) >>> 0), __addr_local_108, param_1, 0x40);
} finally {
    heap.freeFrame(1040);
  }
}
