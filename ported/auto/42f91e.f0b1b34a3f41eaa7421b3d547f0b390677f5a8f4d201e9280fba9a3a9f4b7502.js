// @manual — do not regenerate.
// Source: decompiled/c/42f91e.c
//
// FUN_0042f91e is the buffered byte-reader feeding FUN_0042f999 (Sawyer
// RLE decoder) during scenario load. It maintains a 1024-byte read cache
// at DAT_005f88b0, a pointer DAT_005f88a8 into the cache, and a
// remaining-count DAT_005f88ac. Each call returns one byte from the
// cache; when the cache is empty it refills via ReadFile (FUN_00408276)
// for another 0x400 bytes.
//
// Bug in the auto-port:
//
//   The translator emitted setU8 for the assignment `DAT_005f88ac =
//   0x400;` (refill count) and for the decrement `DAT_005f88ac =
//   DAT_005f88ac + -1;`. DAT_005f88ac holds values in [0..0x400] — it
//   must be at least 16-bit (the binary's asm is `mov word ptr ...,
//   0x400`). setU8 truncates 0x400 to 0, so right after a refill the
//   count is 0 instead of 1024, and the next read immediately triggers
//   another refill, throwing away ~768 bytes per round. The decompressed
//   stream lands in the destination buffer but at the wrong file offsets
//   — most of sprite_desc[] ends up filled with text from later in the
//   scenario file (news messages, etc.) instead of actual sprite records.
//
// Hand-port: use setU16/u16 for the count, matching the asm word-stride.

import { regs } from "../../runtime/regs.js";
import { FUN_00408276 } from "./408276.js";

export function FUN_0042f91e(heap) {
  let uVar1 = 0;
  if (heap.u16(0x005f88ac) === 0) {
    (regs.eax = FUN_00408276(heap, heap.u32(0x005f88a4), 0x005f88b0, 0x400));
    heap.setU16(0x005f88ac, 0x400);
    heap.setU32(0x005f88a8, 0x005f88b0 >>> 0);
  }
  uVar1 = heap.u8(heap.u32(0x005f88a8)) & 0xff;
  heap.setU16(0x005f88ac, (heap.u16(0x005f88ac) - 1) & 0xffff);
  heap.setU32(0x005f88a8, (heap.u32(0x005f88a8) + 1) >>> 0);
  return uVar1;
}
