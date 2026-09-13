// @manual — do not regenerate.
//
// Source: decompiled/c/413180.c — Ghidra-decompiled `strcat` with
// per-byte-loop-unrolling tricks (8-byte-at-a-time SIMD-style scan,
// goto into a sibling while-loop body). The goto pattern can't lower
// to labeled break in JS. Easier to hand-write the well-known
// behaviour directly: `strcat(dest, src)` returns dest.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00413180(heap, dest, src) {
  // Walk dest to its null terminator.
  let end = dest >>> 0;
  while (heap.u8(end) !== 0) end = (end + 1) >>> 0;
  // Append src, including the null.
  let s = src >>> 0;
  while (true) {
    const b = heap.u8(s);
    heap.setU8(end, b);
    if (b === 0) break;
    end = (end + 1) >>> 0;
    s = (s + 1) >>> 0;
  }
  return dest >>> 0;
}
