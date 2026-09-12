// @manual — do not regenerate.
// Source: decompiled/c/4080e0.c — mmap helper. Opens a file via
// CreateFileA, then maps it into memory via CreateFileMappingA +
// MapViewOfFile. The binary's signature is
// `void* FUN_004080e0(LPCSTR path, int mode, DWORD size)`, but Ghidra
// rendered `path` as a u32 because some callers pass 0 and let the
// binary's path-buffer convention kick in: when the arg is zero (or a
// small integer file-table index), the assembly uses the path string
// at 0x005f831a (populated by FUN_0042f239 — same convention as
// FUN_004083b5).
//
// Without the heuristic FUN_009b3000 passes 0 → CreateFileA(NULL) →
// returns INVALID_HANDLE → mmap fails → g1_elements stays all zero →
// sprite painters read NULL offsets → no sprite pixels.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CloseHandle, CreateFileA, CreateFileMappingA, MapViewOfFile } from "../../runtime/win32.js";

const PATH_BUFFER = 0x005f831a;

export function FUN_004080e0(heap, param_1, param_2, param_3) {
  let hFile = 0;
  let hFileMappingObject = 0;
  let local_20 = 0;
  let local_1c = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  local_20 = 0;
  if (param_2 == 0) {
    local_10 = 0x80000000 >>> 0;
    local_8 = 2;
    local_1c = 4;
    local_c = 3;
  } else {
    if (param_2 == 1) {
      local_10 = 0xc0000000 >>> 0;
      local_8 = 4;
      local_1c = 2;
      local_c = 4;
    }
  }
  // Path-buffer heuristic: if param_1 is below typical pointer range,
  // it's an index/zero — use the prebuilt path buffer at 0x005f831a.
  const path = (param_1 >>> 0) < 0x00100000 ? PATH_BUFFER : (param_1 >>> 0);
  hFile = (CreateFileA(heap, path, local_10, 0, 0, local_c, 0x80, 0x0)) >>> 0;
  if (hFile != 0xffffffff) {
    hFileMappingObject = (CreateFileMappingA(heap, hFile, 0, local_8, 0, param_3, 0)) >>> 0;
    CloseHandle(heap, hFile);
    if (hFileMappingObject != 0x0) {
      local_20 = (MapViewOfFile(heap, hFileMappingObject, local_1c, 0, 0, param_3)) >>> 0;
      CloseHandle(heap, hFileMappingObject);
    }
  }
  return local_20;
}
