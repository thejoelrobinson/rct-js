// @manual — do not regenerate.
//
// Source: decompiled/c/4083b5.c — opens an asset file. Ghidra's signature
// `void FUN_004083b5(LPCSTR param_1)` is partially wrong: the binary's
// callers pass either a real path pointer (e.g. `&DAT_0099aa88`) OR a
// small integer (e.g. `0x12` — a file-table index), and the assembly
// uses the path buffer at 0x005f831a (populated by FUN_0042f239) when
// the arg is a number.
//
// Heuristic: if param_1 is below typical pointer range (< 0x100000),
// treat it as a no-arg call and use the prebuilt path buffer.

import { CreateFileA } from "../../runtime/win32.js";

const PATH_BUFFER = 0x005f831a;

export function FUN_004083b5(heap, param_1) {
  const path = (param_1 >>> 0) < 0x00100000 ? PATH_BUFFER : (param_1 >>> 0);
  return CreateFileA(heap, path, 0x80000000, 1, 0, 3, 0x10000080, 0);
}
