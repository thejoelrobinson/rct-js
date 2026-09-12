// @manual — do not regenerate.
//
// Source: decompiled/c/42f239.c
//
// Builds an asset-file path string by concatenating a base path
// (DAT_005f8648 or DAT_005f874c, selected by `(&DAT_005f851c)[unaff_EBX]`)
// with a filename from PTR_s_Data_CSG1_DAT_005f8174[unaff_EBX].
//
// Caller passes the file index in EBX. Index 0 → CSG1.DAT, index 1 →
// CSG1I.DAT, etc. The full PTR_s_Data table is at 0x005f8174 — an array
// of pointers to filename strings.
//
// Our CreateFileA looks up by lowercase basename, so the leading path
// doesn't matter — but we still need to write the FILENAME portion to
// the destination buffer (DAT_005f831a) so subsequent code can use the
// full path.

import { regs } from "../../runtime/regs.js";

export function FUN_0042f239(heap) {
  const ebx = regs.ebx | 0;
  // Pick base path: prefer alt path if (&DAT_005f851c)[ebx] != 0.
  let basePath = 0x005f8648;
  if (heap.u8(0x005f851c + ebx) !== 0) basePath = 0x005f874c;
  // Copy base path → DAT_005f831a (destination string buffer).
  let dst = 0x005f831a;
  let src = basePath;
  let lastChar = 0;
  while (true) {
    const c = heap.u8(src);
    heap.setU8(dst, c);
    src = (src + 1) >>> 0;
    if (c === 0) break;
    lastChar = c;
    dst = (dst + 1) >>> 0;
  }
  // Now append "\\" + filename. dst points at the null terminator after copy.
  const fnPtr = heap.u32(0x005f8174 + ebx * 4);
  if (fnPtr === 0) {
    regs.eax = 0;
    return 0;
  }
  // If last char of base wasn't '\', insert one.
  if (lastChar !== 0x5c) {  // '\\'
    heap.setU8(dst, 0x5c);
    dst = (dst + 1) >>> 0;
  }
  // Copy filename.
  src = fnPtr;
  while (true) {
    const c = heap.u8(src);
    heap.setU8(dst, c);
    if (c === 0) break;
    src = (src + 1) >>> 0;
    dst = (dst + 1) >>> 0;
  }
  // EAX preserved on entry — the C source returns `in_EAX`.
  return regs.eax >>> 0;
}
