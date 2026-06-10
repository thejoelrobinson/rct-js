// @manual — do not regenerate.
// Source: decompiled/c/5e1653.c
//
// KNOWN DIVERGENCE (deliberately left in place — see below): the
// binary's per-window loop register IS ESI (`mov esi, 0x9a013c; ...;
// call 0x5e16f7; add esi, 0x178` at 0x5e1665..0x5e1685), and
// FUN_005e16f7 reads its window record from ESI (`call [esi+4]` first
// thing). Ghidra rendered the loop variable as a local (puVar1) and the
// translator never mirrored it into regs.esi, so 5e16f7 dereferences a
// stale ESI every iteration and its body no-ops (the per-tick
// `callIndirect 0x12000` warn-once in gameplay soaks).
//
// The one-line fix (`regs.esi = puVar1` before the FUN_005e16f7 call)
// is KNOWN but currently DISABLED: with a valid ESI, 5e16f7's live
// window-update path runs the auto-translated scroll/redraw chain
// 5e19eb -> 5e1b3e -> 9bb374, which is register-broken in the same
// ways (unaff_ESI/EDI/BP straight from stale regs) and 9bb374's
// backward blit do-while UNDERFLOWS on a 0-row input (sVar4-1 & 0xffff
// = 65535 rows), stomping ~the whole sprite pool (observed: sprite
// count 74 -> 4630 in 2 ticks) and never returning. Enable the fix
// only together with an oracle-gated pass over that chain
// (interpreter-diff 5e16f7/5e19eb/5e1b3e/9bb374, or delegate them to
// bridge shims). The browser's visible rendering goes through the
// WM_PAINT path (presentFrame), which is unaffected by this no-op.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e1210 } from "./5e1210.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e1653(heap) {
  let puVar1 = 0;
  let puVar2 = 0;
  if (heap.u8(0x00971ef0) != 0) {
    (regs.eax = FUN_005e1210(heap));
    for (puVar1 = ((0x009a013c) >>> 0); puVar1 < heap.u32(0x009a1164); puVar1 = (((puVar1 + 0x178) >>> 0)) >>> 0) {
      if (heap.i32((puVar1 + 8)) != 0) {
        // regs.esi = (puVar1) >>> 0; // CORRECT per binary 0x5e1678 — see
        // header: disabled until the 5e16f7->9bb374 chain is oracle-gated.
        (regs.eax = FUN_005e16f7(heap));
      }
    }
    heap.setU32(0x0099fe00, (heap.u32(0x0099fe00) + heap.u8(0x00999f98)) >>> 0);
    puVar1 = ((heap.u32(0x009a1164)) >>> 0);
    if (999 < heap.u32(0x0099fe00)) {
      heap.setU32(0x0099fe00, (0) >>> 0);
      puVar2 = ((heap.u32(0x009a1164)) >>> 0);
      while (puVar1 = ((heap.u32(0x009a1164)) >>> 0), 0x9a013b < puVar2 + -0x178) {
        (regs.eax = callIndirect(heap, heap.u32((puVar2 + -0x174))));
        puVar2 = ((puVar2 + -0x178) >>> 0);
      }
    }
    while (puVar2 = ((puVar1) >>> 0), puVar1 = ((puVar2 + -0x178) >>> 0), 0x9a013b < puVar1) {
      if (((heap.u16((puVar2 + -0x146)) & 0x600) != 0) && (heap.setI16((puVar2 + -0x146), (heap.i16((puVar2 + -0x146)) + -0x200) & 0xffff), (heap.u16((puVar2 + -0x146)) & 0x600) == 0)) {
        (regs.eax = FUN_005e43de(heap));
      }
    }
  }
  return;
}
