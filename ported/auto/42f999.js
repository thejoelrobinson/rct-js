// @manual — do not regenerate.
// Source: decompiled/c/42f999.c, hand-fixed for two signed-char comparisons
// that the auto-translator emitted as unsigned u8 reads.
//
// FUN_0042f999 is the per-byte Sawyer-RLE state machine called by the
// decompressor in FUN_0042f98e. Three globals form its state:
//
//   DAT_005f88ae (s8)  mode: 0 = need new marker, +1 = literal-run continues,
//                      -1 (0xff) = repeat-run continues
//   DAT_005f8d34 (s8)  remaining count (decremented each continue)
//   DAT_005f8cb4 (u32) cached repeat byte (for the repeat-run path)
//
// The C source uses signed `char` for the first two — the comparisons
// `DAT_005f88ae < '\0'` (line 8) and `-1 < DAT_005f8d34` (line 21) both
// rely on sign-extension. The auto-port emitted `heap.u8(...)` which
// returns unsigned 0..255, so:
//
//   • line 12 (was `heap.u8(0x005f88ae) < 0`)   — always false → the
//     repeat-continue branch was dead. Every cached-repeat byte after
//     the first was never returned.
//   • line 26 (was `-1 < (heap.u8(0x005f8d34) | 0)`) — always true →
//     the negative-marker branch (where the run is a repeat) was dead.
//     Every repeat marker (high bit set, e.g. 0x80..0xff) was instead
//     misinterpreted as a literal-run length of 128..255, causing the
//     stream pointer to advance by hundreds of bytes per repeat marker.
//
// Net effect on scenario load: the RLE inflater of sc21.sc4 produced
// the right byte count at 0x6e3b80..0x8dc08c but with every repeat run
// expanded as garbage literals — sprite_desc[*].type = 0xff at every
// slot, tile_grid never populated. This was the next-blocker after
// Phase E shipped the loader wiring.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042f91e } from "./42f91e.js";

export function FUN_0042f999(heap) {
  let uVar1 = 0;
  // Mode != 0 → we're inside a run. Pick the right continue branch.
  if (heap.u8(0x005f88ae) != 0) {
    if (heap.i8(0x005f88ae) < 0) {
      // Repeat-run continuing — return the cached byte.
      if (heap.u8(0x005f8d34) != 0) {
        heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + -1) & 0xff);
        return heap.u32(0x005f8cb4);
      }
    } else {
      // Literal-run continuing — read next byte from stream.
      if (heap.u8(0x005f8d34) != 0) {
        heap.setU8(0x005f8d34, (heap.u8(0x005f8d34) + -1) & 0xff);
        uVar1 = (((regs.eax = FUN_0042f91e(heap))) & 0xff);
        return uVar1;
      }
    }
  }
  // Mode == 0 (or count exhausted) — read a new marker byte. Sign of
  // marker selects literal-run (>= 0) vs repeat-run (< 0).
  heap.setU8(0x005f8d34, ((regs.eax = FUN_0042f91e(heap))) & 0xff);
  if (-1 < heap.i8(0x005f8d34)) {
    // Literal marker M ≥ 0: produces M+1 literal bytes. Return the
    // first one and leave count = M (the C code stores M before --).
    heap.setU8(0x005f88ae, (1) & 0xff);
    uVar1 = (((regs.eax = FUN_0042f91e(heap))) & 0xff);
    return uVar1;
  }
  // Repeat marker M < 0: produces -M cached bytes. Save the byte,
  // negate the count, set mode = -1.
  heap.setU8(0x005f88ae, (0xff) & 0xff);
  heap.setU8(0x005f8d34, (-heap.i8(0x005f8d34)) & 0xff);
  heap.setU32(0x005f8cb4, ((regs.eax = FUN_0042f91e(heap))) >>> 0);
  return heap.u32(0x005f8cb4);
}
