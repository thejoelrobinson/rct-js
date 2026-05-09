// @manual — do not regenerate.
//
// Source: decompiled/c/458bcf.c — string-table lookup / format helper. Takes
// EAX (string id), ECX (format args base?), and EDI (output buffer) via the
// register-arg convention that Ghidra surfaces as `unaff_*`/`in_*` locals.
// With those zero, the function infinite-loops in its `while (true)` reader
// (or, when reached during boot, occasionally trips callIndirect against an
// unported function pointer at 0x439913). Skipping is acceptable for the boot
// path — UI string formatting is cosmetic and the title screen still renders
// without it. Revisit once the translator can propagate caller register state.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00458bcf(heap) {
  return;
}
