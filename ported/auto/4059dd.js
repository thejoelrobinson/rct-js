// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4059dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { OutputDebugStringA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413620 } from "./413620.js";
export function FUN_004059dd(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(4096);
  const __addr_local_404 = __sp + 0;
  try {
  let piVar1 = 0;
  let pcVar2 = 0;
  let local_408 = 0;
  local_408 = ((0x005e9408) >>> 0);
  do {
    if (heap.i32((local_408 + 0x30)) == param_1) {
      break;
    }
    pcVar2 = ((local_408 + 0x34) >>> 0);
    piVar1 = (((local_408 + 100)) >>> 0);
    local_408 = ((pcVar2) >>> 0);
  } while (heap.i32(piVar1) != 0xffff);
  (regs.eax = FUN_00413620(heap, __addr_local_404, 0x005ebe00, local_408, param_1, param_2, param_3));
  OutputDebugStringA(heap, __addr_local_404);
  return 1;
} finally {
    heap.freeFrame(4096);
  }
}
