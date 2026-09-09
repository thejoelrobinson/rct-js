// @manual — do not regenerate.
//
// Source: decompiled/c/42c6f3.c — small zero-init helper.
// Hand-port fix (stride bug, same family as 40179d.js): the auto-translator
// emitted the 16-byte zero-fill of DAT_0087d728 with u32 stride. The binary
// uses BYTE store (`movb $0x0, 0x87d728(%ebx)` at 0x42c703), bound 0x10.
// Note line 10 is also wrong-looking — Ghidra typed 0x8d8a3c as u32 but
// the binary uses `movb $0x0, 0x8d8a3c` (single byte). Fix that too.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042c6f3(heap) {
  let uVar1 = 0;
  heap.setU8(0x008d7eb8, (0) & 0xff);
  heap.setU8(0x008d8a3c, (0) & 0xff);
  uVar1 = ((0) >>> 0);
  // BYTE-stride zero-fill (see header for the bug).
  do {
    heap.setU8(((0x0087d728) + uVar1) >>> 0, 0);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 0x10);
  return;
}
