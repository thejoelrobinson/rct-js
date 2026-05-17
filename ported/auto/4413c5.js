// @manual — do not regenerate.
//
// Source: decompiled/c/4413c5.c — per-peep happiness-accumulator update.
// Hand-port fix (stride bug, same family as 40179d.js): every load/store
// in this function is byte-typed in the binary, against the per-peep
// struct at base unaff_EDI (which is the peep_index * 0x260 offset, NOT
// an element index). The translator emitted u32 with stride *4 because
// Ghidra typed the DAT_00887xxx symbols as int*. Verified at 0x4413c5..
// 0x4413f9 — all `[edi + 0x88751x]` accesses are `addb`/`incb`/`cmpb`/
// `movb`/`xchgb` (byte width), stride 1 on edi.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004413c5(heap) {
  let bVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_EDI = regs.edi >>> 0;
  // BYTE-typed per-peep struct accesses (see header for the bug).
  heap.setU8((0x0088751c + unaff_EDI) >>> 0, (heap.u8(0x0088751c + unaff_EDI) + unaff_BL) & 0xff);
  heap.setU8((0x0088751b + unaff_EDI) >>> 0, (heap.u8(0x0088751b + unaff_EDI) + 1) & 0xff);
  if (0x13 < heap.u8(0x0088751b + unaff_EDI)) {
    LOCK();
    bVar1 = heap.u8(0x0088751c + unaff_EDI);
    heap.setU8((0x0088751c + unaff_EDI) >>> 0, 0);
    UNLOCK();
    heap.setU8((0x0088751a + unaff_EDI) >>> 0, (bVar1 >>> 2) & 0xff);
    heap.setU8((0x0088751b + unaff_EDI) >>> 0, 0);
    heap.setU8((0x0088751d + unaff_EDI) >>> 0, (heap.u8(0x0088751d + unaff_EDI) | 1) & 0xff);
  }
  return;
}
