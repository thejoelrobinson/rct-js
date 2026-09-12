// @manual — do not regenerate.
//
// Source: decompiled/c/40e2e6.c — Ghidra decompiled this as a bare
// `return 0`, but that's clearly wrong: it's the validation hook called
// from FUN_00402a00 to confirm a DIB section was successfully created
// (FUN_00402a00 then publishes the DIB descriptor pointer to globals
// the per-tick render uses). Returning 0 makes FUN_00402a00 fail,
// FUN_00401220 case 1 (the GDI display-mode setup) returns failure,
// and the binary falls back to its DDraw-only path which our shim
// stack can't fully animate. Returning 1 lets the GDI/DIB render path
// stay live so per-tick code lands pixels in our DIB section, which
// runtime/canvas.js:presentFrame already knows how to blit.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040e2e6(heap) {
  return 1;
}
