// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416790.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetModuleHandleA, GetProcAddress } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00416740 } from "./416740.js";
export function FUN_00416790(heap) {
  let hModule = 0;
  let pFVar1 = 0;
  hModule = ((GetModuleHandleA(heap, "KERNEL32")) >>> 0);
  if (hModule != ((0x0) >>> 0)) {
    pFVar1 = ((GetProcAddress(heap, hModule, "IsProcessorFeaturePresent")) >>> 0);
    if (pFVar1 != ((0x0) >>> 0)) {
      return (regs.eax = callIndirect(heap, pFVar1, 0));
    }
  }
  return (regs.eax = FUN_00416740(heap));
}
