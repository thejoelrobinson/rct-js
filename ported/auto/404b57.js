// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404b57.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FormatMessageA, GetLastError, MessageBoxA } from "../../runtime/win32.js";
import { Arguments } from "../../runtime/ghidra-builtins.js";
export function FUN_00404b57(heap, param_1) {
  const __sp = heap.allocFrame(260);
  const __addr_local_108 = __sp + 0;
  try {
  let dwMessageId = 0;
  let dwLanguageId = 0;
  let nSize = 0;
  Arguments = 0x0;
  nSize = 0x104;
  lpBuffer = __addr_local_108;
  dwLanguageId = 0x400;
  dwMessageId = GetLastError(heap);
  FormatMessageA(heap, 0x1000, 0x0, dwMessageId, dwLanguageId, lpBuffer, nSize, Arguments);
  MessageBoxA(heap, 0x0, __addr_local_108, param_1, 0x40);
  return;
} finally {
    heap.freeFrame(260);
  }
}
