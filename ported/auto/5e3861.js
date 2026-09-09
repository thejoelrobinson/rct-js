// @manual — do not regenerate. No decompiled/c/5e3861.c exists; this is a
// direct transcription from binary/rct.exe.
//
// The TOOLTIP window's EVENT proc. FUN_005e3652 stores it at window slot+4 via
// WindowCreate (ported/auto/5e3652.js:60, `mov edx, 0x5e3861`). Unported, so
// every tooltip event hit
//   [callIndirect] no JS function at 0x5e3861 — returning 0
//
// Binary (0x5e3861-0x5e3873):
//   0x5e3861: jmp 0x5e386d
//   0x5e3863: mov word ptr [0x991f54], 0
//   0x5e386c: ret
//   0x5e386d: cmp bp, 6            ; message id 6 = WE_UPDATE
//   0x5e3871: je  0x5e3863
//   0x5e3873: ret
//
// i.e. on message 6 only, zero the WORD at 0x991f54 and return; every other
// message is ignored. 0x991f54 is the mouse-dwell accumulator (traced as
// `dwellHi` by tools/_timetrace.mjs), which is what decides when a tooltip is
// shown — so with this proc dead the dwell timer was never reset while a
// tooltip was up. The store is `66 c7 05` = a WORD store; do not widen it.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { compare } from "./extra_ui_state.js";

export function FUN_005e3861_exact(heap) {
  compare(regs.ebp & 0xffff, 6);
  if (regs.zf) heap.setU16(0x991f54, 0);
}

export function FUN_005e3861(heap) {
  // `cmp bp, 6` compares the low 16 bits only.
  if ((regs.ebp & 0xffff) === 6) {
    heap.setU16(0x00991f54, 0);
  }
}
