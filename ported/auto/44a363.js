// @manual — do not regenerate.
//
// Source: decompiled/c/44a363.c — small init helper for the message
// header buffer at DAT_00631d0c. Both the single store at 0x631d0c and
// the fill loop at 0x631d0d are byte stores in the binary
// (`movb $0x0/$-0x1, 0x631d0X(%ecx)` at 0x44a363, 0x44a36c).
// Stride bug, same family as 40179d.js.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0044a363(heap) {
  let uVar1 = 0;
  heap.setU8(0x00631d0c, 0);
  uVar1 = ((0) >>> 0);
  // BYTE-stride fill (see header for the bug).
  do {
    heap.setU8(((0x00631d0d) + uVar1) >>> 0, 0xff);
    uVar1 = ((uVar1 + 1) >>> 0);
  } while (uVar1 < 6);
  heap.setU8(0x00631d54, (0) & 0xff);
  return;
}
