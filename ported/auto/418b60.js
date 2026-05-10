// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418b60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FlushFileBuffers, GetLastError } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00418ea0 } from "./418ea0.js";
export function FUN_00418b60(heap, param_1) {
  let hFile = 0;
  let BVar1 = 0;
  let DVar2 = 0;
  DVar2 = ((heap.u32(0x005efec4)) >>> 0);
  if ((param_1 < heap.u32(0x005f3f60)) && ((heap.u8((heap.u32((0x005f3e60) + (((param_1) | 0) >>> 5) * 4) + 4 + (param_1 & 0x1f) * 8)) & 1) != 0)) {
    hFile = (((regs.eax = FUN_00418ea0(heap, param_1))) >>> 0);
    BVar1 = ((FlushFileBuffers(heap, hFile)) >>> 0);
    if (BVar1 == 0) {
      DVar2 = ((GetLastError(heap)) >>> 0);
    } else {
      DVar2 = ((0) >>> 0);
    }
    if (DVar2 == 0) {
      return 0;
    }
  }
  heap.setU32(0x005efec4, (DVar2) >>> 0);
  heap.setU32(0x005efec0, (9) >>> 0);
  return 0xffffffff;
}
