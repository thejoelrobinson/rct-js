// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4080e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CloseHandle, CreateFileA, CreateFileMappingA, MapViewOfFile } from "../../runtime/win32.js";
export function FUN_004080e0(heap, param_1, param_2, param_3) {
  let hFile = 0;
  let hFileMappingObject = 0;
  let local_20 = 0;
  let local_1c = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_20 = 0x0;
  if (param_2 == 0) {
    local_10 = 0x80000000;
    local_8 = 2;
    local_1c = 4;
    local_c = 3;
  } else {
    if (param_2 == 1) {
    local_10 = 0xc0000000;
    local_8 = 4;
    local_1c = 2;
    local_c = 4;
  }
  }
  hFile = CreateFileA(heap, param_1, local_10, 0, 0x0, local_c, 0x80, 0x0);
  if (hFile != 0xffffffff) {
    hFileMappingObject = CreateFileMappingA(heap, hFile, 0x0, local_8, 0, param_3, 0x0);
    CloseHandle(heap, hFile);
    if (hFileMappingObject != 0x0) {
      local_20 = MapViewOfFile(heap, hFileMappingObject, local_1c, 0, 0, param_3);
      CloseHandle(heap, hFileMappingObject);
    }
  }
  return local_20;
}
