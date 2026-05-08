// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405949.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CloseHandle, CreateMutexA, OpenMutexA } from "../runtime/win32.js";
import { FUN_00413170 } from "./413170.js";
import { FUN_00413180 } from "./413180.js";
export function FUN_00405949(heap, param_1) {
  let hObject = 0;
  FUN_00413170(heap, local_108, param_1);
  FUN_00413180(heap, local_108, 0x005ebdf4);
  hObject = OpenMutexA(heap, 0x1f0001, 0, local_108);
  if (hObject == 0x0) {
    CreateMutexA(heap, 0x0, 0, local_108);
  } else {
    CloseHandle(heap, hObject);
  }
  return hObject != 0x0;
}
