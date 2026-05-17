// @manual — do not regenerate.
//
// Source: decompiled/c/4413fa.c — per-peep tiredness-accumulator update
// (sister of FUN_004413c5). All accesses to per-peep struct via
// unaff_EDI (= peep_index * 0x260) are byte-typed in the binary
// (`addb`/`incb`/`cmpb`/`xchgb`/`movb` at 0x4413fa..0x441424).
// Translator emitted u32 with bogus stride *4 because Ghidra typed
// DAT_00887528 et al. as int*.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004413fa(heap) {
  let uVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_EDI = regs.edi >>> 0;
  // BYTE-typed per-peep struct accesses (see header for the bug).
  heap.setU8((0x0088752a + unaff_EDI) >>> 0, (heap.u8(0x0088752a + unaff_EDI) + unaff_BL) & 0xff);
  heap.setU8((0x00887529 + unaff_EDI) >>> 0, (heap.u8(0x00887529 + unaff_EDI) + 1) & 0xff);
  if (0x18 < heap.u8(0x00887529 + unaff_EDI)) {
    LOCK();
    uVar1 = heap.u8(0x0088752a + unaff_EDI);
    heap.setU8((0x0088752a + unaff_EDI) >>> 0, 0);
    UNLOCK();
    heap.setU8((0x00887528 + unaff_EDI) >>> 0, uVar1 & 0xff);
    heap.setU8((0x00887529 + unaff_EDI) >>> 0, 0);
    heap.setU8((0x0088751d + unaff_EDI) >>> 0, (heap.u8(0x0088751d + unaff_EDI) | 1) & 0xff);
  }
  return;
}
