// @manual — do not regenerate.
// Source: decompiled/c/5e3b2b.c
//
// HAND-FIX (register result not written back — same translator bug class as the
// 5e12eb/5e13d2 register fixes): FUN_005e3b2b finds a window slot by class (CL) and
// number (DX) and returns the slot pointer (or DAT_009a1164 pool-end if not found)
// in ESI. The caller — e.g. the armed tool-mode handler 0x5e27de — does
// `call 0x5e3b2b` then `call [esi+4]` to invoke the found window's slot+4 callback
// (the build-command emitter that reaches 0x426f56). Ghidra decompiled the result
// (puVar2) as a local and the translator emitted `return;` void, leaving regs.esi
// stale — so the painter-bridge cpu's `call [esi+4]` dereferenced garbage and ran
// away (multi-minute hang on a tool-armed viewport click). Mirror the binary: leave
// the search result in regs.esi. On not-found puVar2 == pool-end, so the caller's
// own `cmp esi,[0x9a1164]` not-found check fires correctly instead of dereferencing.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e3b2b(heap) {
  let bVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let puVar2 = 0;
  puVar2 = ((0x009a013c) >>> 0);
  bVar1 = ((((in_CX) & 0xff) & 0x7f) & 0xff);
  if ((in_CX >>> 7 & 1) == 0) {
    for (; (puVar2 < heap.u32(0x009a1164) && ((bVar1 != heap.u8(puVar2 + (0x174)) || (in_DX != heap.i16((puVar2 + 0x30)))))); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
    
    }
  } else {
    for (; (puVar2 < heap.u32(0x009a1164) && (bVar1 != heap.u8(puVar2 + (0x174)))); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {

    }
  }
  regs.esi = (puVar2) >>> 0;
  return;
}
