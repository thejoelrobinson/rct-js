// @manual — do not regenerate.
//
// Source: decompiled/c/42f239.c — builds an asset-file path string by
// indexing &PTR_s_Data_CSG1_DAT_005f8174 with `unaff_EBX` (a register
// value the caller sets up). With unaff_EBX zeroed, the string-walk
// loops escape into runaway memcpy.
//
// We don't currently model x86 register inputs (the unaff_* convention).
// This is one of the early-game functions that builds the CSG1.dat path
// string — the binary uses these strings only to open files via
// CreateFileA, which our VFS already serves by hardcoded basename.
// Returning a no-op here is safe: file open lookups don't depend on
// the in-memory path string.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042f239(heap) {
  return 0;
}
