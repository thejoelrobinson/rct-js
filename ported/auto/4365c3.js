// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/4365c3.c.
// Source disasm: binary 0x4365c3..0x436633 (capstone; objdump can't read
// this PE on arm64 hosts).
//
// Per-tick tile-element compactor: round-robins one map tile per call
// (counter DAT_00743b90 & 0x3fff indexes the tile-pointer table at
// 0x971ef4), slides that tile's element chain down over freed (-1)
// slots, marks the vacated source slots free, and shrinks the
// end-of-element-space pointer DAT_00981ef4 over trailing freed slots.
//
// The auto-translation (faithfully mirroring Ghidra's C) had two
// state-corrupting bugs, both classic translator classes:
// 1. `*pcVar4 = -1` (binary 0x43660a: `mov byte ptr [esi], 0xff`) was
//    emitted as setU32(pcVar4, 0xffffffff) — clobbering bytes 1-3 of
//    every vacated element slot instead of only the free-marker byte.
// 2. `DAT_00981ef4[-8] == -1` (binary 0x436622: `cmp byte ptr [esi],
//    0xff` after `sub esi, 8`) was emitted as a u32 read at ptr-32
//    (`u32(ptr + (-8)*4)`) with do-while store sequencing that walked
//    the end pointer by the wrong stride on the wrong width — leaving
//    DAT_00981ef4 wrong whenever the tail had freed slots. A wrong end
//    pointer makes subsequent element insertions allocate over live
//    data, which incrementally corrupts the tile-pointer table /
//    element pool over many ticks.
// Byte-equality vs the x86 interpreter across seeded scenarios:
// tools/_diff-4365c3.mjs (gap-move, no-gap early-return, tail-shrink).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004365c3(heap) {
  // 0x4365c6: edi = (DAT_00743b90 + 1) & 0x3fff; store back.
  const idx = (heap.u32(0x00743b90) + 1) & 0x3fff;
  heap.setU32(0x00743b90, idx >>> 0);

  // 0x4365d9: esi = tile-pointer-table[idx] (head of this tile's chain).
  const head = heap.u32((0x00971ef4 + idx * 4) >>> 0) >>> 0;

  // 0x4365e0-0x4365f2: scan down over freed slots (first byte 0xff),
  // stopping at the pool base 0x6e3b90; ebx ends at the lowest freed
  // slot (or back at head if none).
  let ebx = head;
  for (;;) {
    ebx = (ebx - 8) >>> 0;
    if (ebx < 0x006e3b90) break;
    if (heap.u8(ebx) !== 0xff) break;
  }
  ebx = (ebx + 8) >>> 0;

  // 0x4365f5: no gap below the chain — nothing to do.
  if (ebx === head) return;

  // 0x4365f9: repoint the table at the slid-down location.
  heap.setU32((0x00971ef4 + idx * 4) >>> 0, ebx >>> 0);

  // 0x436600-0x436617: copy 8-byte elements down; mark each vacated
  // source slot free via a BYTE store of 0xff (bytes 1-7 keep stale
  // data, exactly like the binary). Loop until the copied element's
  // flag byte (+1) has the last-element bit 0x80.
  let src = head, dst = ebx;
  for (;;) {
    heap.setU32(dst, heap.u32(src) >>> 0);
    heap.setU32((dst + 4) >>> 0, heap.u32((src + 4) >>> 0) >>> 0);
    heap.setU8(src, 0xff);
    src = (src + 8) >>> 0;
    const flag = heap.u8((dst + 1) >>> 0);
    dst = (dst + 8) >>> 0;
    if ((flag & 0x80) !== 0) break;
  }

  // 0x436619-0x43662a: shrink DAT_00981ef4 over trailing freed slots
  // (byte compare at [esi] after esi -= 8), then store first-live+8.
  let end = heap.u32(0x00981ef4) >>> 0;
  do {
    end = (end - 8) >>> 0;
  } while (heap.u8(end) === 0xff);
  heap.setU32(0x00981ef4, (end + 8) >>> 0);
}
