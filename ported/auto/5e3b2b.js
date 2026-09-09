// @manual — do not regenerate.
// Source: decompiled/c/5e3b2b.c
// Source disasm: binary 0x5e3b2b..0x5e3b59 (+ the class-only variant at
// 0x5e3b5a reached when CX bit 7 is set).
//
// HAND-FIX (register result not written back — same translator bug class as the
// 5e12eb/5e13d2 register fixes): FUN_005e3b2b finds a window slot by class (CL) and
// number (DX) and returns the slot pointer in ESI. Ghidra decompiled the result
// (puVar2) as a local and the translator emitted `return;` void, leaving regs.esi
// stale — so the painter-bridge cpu's `call [esi+4]` dereferenced garbage and ran
// away (multi-minute hang on a tool-armed viewport click).
//
// SECOND HAND-FIX (binary fidelity): on not-found the binary does
// `xor esi, esi; or esi, esi` (0x5e3b55-0x5e3b57) — ESI = 0, ZF = 1; on
// found, ZF = 0. The earlier fix returned the pool-end pointer on miss
// (a misreading of the loop exit), so callers' found checks (`je` after
// the call ≙ esi==0 / regs.zf) took the wrong branch and dereferenced
// [pool-end+4] — the junk 0x12000 callIndirect seen 4x/tick from
// FUN_005e69bd in gameplay soaks. Mirror the binary exactly: esi =
// slot-or-0, regs.zf = not-found. Also: the slot-number compare is an
// unsigned 16-bit cmp (`cmp dx, [esi+0x30]`), not signed — use u16.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e3b2b_exact(heap) {
  const classOnly = (regs.ecx & 0x80) !== 0;
  regs.ecx = (regs.ecx & ~0x80) >>> 0;
  let window = 0x9a013c;
  const end = heap.u32(0x9a1164);
  while (window < end) {
    if (heap.u8(window + 0x174) === (regs.ecx & 0xff) &&
        (classOnly || heap.u16(window + 0x30) === (regs.edx & 0xffff))) break;
    window = (window + 0x178) >>> 0;
  }
  regs.esi = window >= end ? 0 : window;
  regs.cf = 0; regs.zf = regs.esi === 0 ? 1 : 0;
  regs.sf = regs.esi >>> 31; regs.of = 0;
  return regs.eax >>> 0;
}

export function FUN_005e3b2b(heap) {
  let bVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let puVar2 = 0;
  puVar2 = ((0x009a013c) >>> 0);
  bVar1 = ((((in_CX) & 0xff) & 0x7f) & 0xff);
  if ((in_CX >>> 7 & 1) == 0) {
    for (; (puVar2 < heap.u32(0x009a1164) && ((bVar1 != heap.u8(puVar2 + (0x174)) || (in_DX != heap.u16((puVar2 + 0x30)))))); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {

    }
  } else {
    for (; (puVar2 < heap.u32(0x009a1164) && (bVar1 != heap.u8(puVar2 + (0x174)))); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {

    }
  }
  if (puVar2 >= (heap.u32(0x009a1164) >>> 0)) puVar2 = 0; // 0x5e3b55: xor esi, esi
  regs.esi = (puVar2) >>> 0;
  regs.zf = puVar2 === 0 ? 1 : 0; // 0x5e3b57: or esi, esi
  return;
}
