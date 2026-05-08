// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416790.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetModuleHandleA, GetProcAddress } from "../runtime/win32.js";
import { FUN_00416740 } from "./416740.js";
export function FUN_00416790(heap) {
  let hModule = 0;
  let pFVar1 = 0;
  hModule = GetModuleHandleA(heap, "KERNEL32");
  if (hModule != 0x0) {
    pFVar1 = GetProcAddress(heap, hModule, "IsProcessorFeaturePresent");
    if (pFVar1 != 0x0) {
      (heap.u32(pFVar1))(0);
      return;
    }
  }
  FUN_00416740(heap);
  return;
}
