// @manual — do not regenerate.
// Source: binary 0x43c60b..0x43c65d (capstone disasm); decompiled/c/43c60b.c
// mistypes every table. Hand-port (2026-06-11) replacing the auto
// translation, which read all three byte tables as int[] (u32 at
// quadruple-scaled offsets — CLAUDE.md mistyped-array class):
//   - the action→anim-group maps at 0x62d304 (by action [esi+0x71]) and
//     0x62d301 (by sprite group [esi+0x6d]) were read as
//     `u32(base + idx*4) & 0xff` — the wrong byte for every idx > 0, so
//     [esi+0x6e] (anim group) got garbage;
//   - the per-type anim-info pointer at [0x62d644 + [esi+0x2d]*8] was
//     read with `u32(esi+0x2d) * 2 * 4` scaling — wrong width and wrong
//     pointer, so the sprite extent bytes written to
//     [esi+0x14]/[esi+9]/[esi+0x15] came from unrelated memory;
//   - the 5e53ca invalidate pair routed through the translated
//     5e53ca.js, which marks a stale dirty-grid rect (see
//     extra_invalidate.js).
//
// FUN_0043c60b — refresh the peep's animation group after an action /
// state change: pick the group byte ([esi+0x71] action, or the
// [esi+0x6d] walk group when no action), and if it differs from
// [esi+0x6e]: invalidate, store it, refresh the sprite extent triple
// from the anim-info table, invalidate again. Preserves all GPRs in
// the binary (push ebx + inner push eax/edx; 5e53ca is pushal/popal) —
// this port touches no regs.
//
// Oracle: tools/_lockstep-statrio.mjs (the stat-trio thought paths run
// this through 440fe3 with the interpreter kept live, SEED=1 coverage).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { invalidateSpriteBbox } from "./extra_invalidate.js";

export function FUN_0043c60b(heap) {
  const esi = regs.esi >>> 0;
  const action = heap.u8(esi + 0x71);
  let group;
  if (action >= 0xfe) {
    group = heap.u8(0x62d301 + heap.u8(esi + 0x6d));      // BYTE table
  } else {
    group = heap.u8(0x62d304 + action);                   // BYTE table
  }
  if (group === heap.u8(esi + 0x6e)) return;
  invalidateSpriteBbox(heap);
  heap.setU8(esi + 0x6e, group);
  const info = heap.u32(0x62d644 + heap.u8(esi + 0x2d) * 8) >>> 0;
  heap.setU8(esi + 0x14, heap.u8(info + group * 4));
  heap.setU8(esi + 9, heap.u8(info + group * 4 + 1));
  heap.setU8(esi + 0x15, heap.u8(info + group * 4 + 2));
  invalidateSpriteBbox(heap);
}
