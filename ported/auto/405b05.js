// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405b05.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CreateWindowExA, GetSystemMetrics } from "../runtime/win32.js";
export function FUN_00405b05(heap) {
  let nHeight = 0;
  let nWidth = 0;
  let pHVar1 = 0;
  let hMenu = 0;
  let hInstance = 0;
  let lpParam = 0;
  lpParam = 0x0;
  hMenu = 0x0;
  pHVar1 = 0x0;
  hInstance = heap.u32(0x005f1398);
  nHeight = GetSystemMetrics(heap, 1);
  nWidth = GetSystemMetrics(heap, 0);
  pHVar1 = CreateWindowExA(heap, 8, 0x005e9030, 0x005f1ba0, 0x97080000, 0, 0, nWidth, nHeight, pHVar1, hMenu, hInstance, lpParam);
  return pHVar1;
}
