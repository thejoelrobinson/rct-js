// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4179a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetLastError, SetFilePointer } from "../runtime/win32.js";
import { FUN_00418d90 } from "./418d90.js";
import { FUN_00418ea0 } from "./418ea0.js";
export function FUN_004179a0(heap, param_1, param_2, param_3) {
  let hFile = 0;
  let DVar1 = 0;
  let DVar2 = 0;
  let iVar3 = 0;
  if (param_1 < heap.u32(0x005f3f60)) {
    iVar3 = (param_1 & 0x1f) * 8;
    if ((heap.u32((heap.u32((0x005f3e60) + (param_1 >>> 5) * 4) + 4 + iVar3)) & 1) != 0) {
      hFile = FUN_00418ea0(heap, param_1);
      if (hFile == 0xffffffff) {
        heap.setU32(0x005efec0, (9) >>> 0);
        return 0xffffffff;
      }
      DVar1 = SetFilePointer(heap, hFile, param_2, 0x0, param_3);
      if (DVar1 == 0xffffffff) {
        DVar2 = GetLastError(heap);
      } else {
        DVar2 = 0;
      }
      if (DVar2 != 0) {
        FUN_00418d90(heap, DVar2);
        return 0xffffffff;
      }
      heap.u32((heap.u32((0x005f3e60) + (param_1 >>> 5) * 4) + 4 + iVar3)) = heap.u32((heap.u32((0x005f3e60) + (param_1 >>> 5) * 4) + 4 + iVar3)) & 0xfd;
      return DVar1;
    }
  }
  heap.setU32(0x005efec0, (9) >>> 0);
  heap.setU32(0x005efec4, (0) >>> 0);
  return 0xffffffff;
}
