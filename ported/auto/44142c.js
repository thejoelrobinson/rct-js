// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/44142c.c.
// Source disasm: binary 0x44142c..0x441451 (capstone).
//
// Ride/queue bookkeeping when a peep in state 3 or 7 detaches: decrement
// a per-ride byte counter and set two flag bits in the ride record
// (stride 0x260, base block at 0x887xxx, ride index = sprite byte +0x68).
//
// The auto-translation had three corrupting bugs (translator classes):
// 1. `movzx edi, byte ptr [esi+0x68]` (ride index, BYTE) read as u32 —
//    pulling 3 unrelated sprite-record bytes into the index.
// 2/3. `dec byte ptr [edi+0x88752b]` / `or byte ptr [edi+0x88751d], 0xc`
//    emitted as setU32 read-modify-writes at `base + off*4` — the offset
//    (already scaled by 0x260) was scaled AGAIN by 4, and the byte ops
//    clobbered 3 neighbouring bytes each. Net effect: quasi-random
//    4-byte stomps across the ride/sprite-bucket region (0x887xxx+),
//    which corrupted the sprite spatial lists whose unlink walk
//    (0x43e7ca loop) then ran away for 50M interpreter steps per tick.
// Byte-equality vs the x86 interpreter: tools/_diff-441452.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_0044142c(heap) {
  const esi = regs.esi >>> 0;
  const st = heap.u8((esi + 0x2b) >>> 0);
  if (st === 7 || st === 3) {
    const off = heap.u8((esi + 0x68) >>> 0) * 0x260;
    const cnt = (0x0088752b + off) >>> 0;
    heap.setU8(cnt, (heap.u8(cnt) - 1) & 0xff);
    const flg = (0x0088751d + off) >>> 0;
    heap.setU8(flg, heap.u8(flg) | 0xc);
  }
}
