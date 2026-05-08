// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4059dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { OutputDebugStringA } from "../runtime/win32.js";
import { FUN_00413620 } from "./413620.js";
export function FUN_004059dd(heap, param_1, param_2, param_3) {
  local_408 = 0x005e9408;
  do {
    if (heap.u32((local_408 + 0x30)) == param_1) {
      break;
    }
    pcVar2 = local_408 + 0x34;
    piVar1 = (local_408 + 100);
    local_408 = pcVar2;
  } while (heap.u32(piVar1) != 0xffff);
  FUN_00413620(heap, local_404, 0x005ebe00, local_408, param_1, param_2, param_3);
  OutputDebugStringA(heap, local_404);
  return 1;
}
