// @manual — do not regenerate.
// Source: binary 0x440fe3..0x44106b (capstone disasm); decompiled/c/440fe3.c
// mistypes the action-id table. Hand-port (2026-06-11) replacing the auto
// translation, which carried two corruptions:
//   - the action-id lookup `mov cl, byte [ecx*2 + 0x62d324]` (BYTE array,
//     stride 2) was emitted as `heap.u32(0x62d324 + (al*2)*4)` — wrong
//     width AND wrong scale (Ghidra typed the table as int[]), so the
//     0xff "no action" compare almost never fired and [esi+0x71] got a
//     byte from the wrong table row;
//   - `in_EAX = (regs.eax = FUN_005e53ca(heap))` clobbered the thought id
//     with 5e53ca's JS return value (binary preserves eax across both
//     calls), so the dedup scan + head insert below used ax=1 instead of
//     the (id | arg<<8) word whenever the action branch fired.
//
// FUN_00440fe3 — queue a "thought" on the peep: ax = thought id (al) |
// argument (ah). If the action table row at [0x62d324 + id*2] is not
// 0xff and no action is in progress ([esi+0x71] >= 0xfe), start that
// action animation (43c60b refresh + 5e53ca invalidate — both via their
// faithful hand-ports, which touch no regs). Then de-dup the 5-slot
// thought queue at [esi+0xb0] (stride 4: u16 id+arg, u8 freshness pair)
// and push the new thought at the head via the 5-step xchg shift.
// EXIT EAX = the dword displaced off the END of the queue by the last
// xchg (the binary's callers see that, not ax); all other GPRs
// preserved.
//
// Oracle: tools/_lockstep-statrio.mjs SEED=1 exercises this through the
// stat trio's thought paths (whole-heap per-call compare vs the
// interpreter, kept live); the 43c751 / 439b86 lockstep tools cover the
// litter/crowd/vandalism thought sites.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0043c60b } from "./43c60b.js";
import { invalidateSpriteBbox } from "./extra_invalidate.js";

export function FUN_00440fe3(heap) {
  const esi = regs.esi >>> 0;
  const ax = regs.eax & 0xffff;
  const act = heap.u8(0x62d324 + (ax & 0xff) * 2);        // BYTE, stride 2
  if (act !== 0xff && heap.u8(esi + 0x71) >= 0xfe) {
    heap.setU8(esi + 0x71, act);
    heap.setU8(esi + 0x72, 0);
    heap.setU8(esi + 0x70, 0);
    FUN_0043c60b(heap);                                   // touches no regs
    invalidateSpriteBbox(heap);                           // touches no regs
  }
  // de-dup scan (0x441012): stop at the first empty slot (id byte 0xff);
  // on a match, shift the tail up, free the last slot, re-check slot i.
  let i = 0;
  while (i < 5) {
    if (heap.u8(esi + 0xb0 + i * 4) === 0xff) break;
    if (ax === heap.u16(esi + 0xb0 + i * 4)) {
      for (let k = i; k !== 4; k++) {
        heap.setU32(esi + 0xb0 + k * 4, heap.u32(esi + 0xb4 + k * 4));
      }
      heap.setU8(esi + 0xc0, 0xff);
      continue;                                           // jmp 0x441012
    }
    i++;
  }
  // head insert (0x441052): and eax,0xffff; 5× xchg shift-down. The last
  // xchg's displaced dword is the exit eax.
  let v = ax >>> 0;
  for (let k = 0; k < 5; k++) {
    const old = heap.u32(esi + 0xb0 + k * 4) >>> 0;
    heap.setU32(esi + 0xb0 + k * 4, v);
    v = old;
  }
  heap.setU8(esi + 0x45, heap.u8(esi + 0x45) | 1);
  regs.eax = v >>> 0;
  return regs.eax;
}
