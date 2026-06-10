// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/43e792.c.
// Source disasm: binary 0x43e792..0x43e7ee (capstone).
//
// Unlinks a peep from its ride/station queue bucket: decrements the
// per-station byte count at [0x88747a + ride*0x260 + station], then
// either repoints the bucket head (u16 sprite index at
// [0x887472 + ride*0x260 + station*2]) or walks the +0x74 next-index
// chain through the sprite records (0x743b94 + idx*0x100) and splices.
//
// The auto-translation had the catalogued translator bug classes:
// - ride index `movzx edi, byte [esi+0x68]` and station index
//   `movzx ebx, byte [esi+0x69]` both read as u32 (garbage indices);
// - `dec byte ptr [ebx+edi+0x88747a]` emitted as a setU32 RMW at
//   `0x88747a + (off)*4` — byte op widened to 4 bytes at a
//   quadruple-scaled address, stomping the ride-record region.
// Those stomps corrupted the very bucket lists this function walks,
// which made the interpreter-bridged callers (peep state handlers
// 0x43a5f8 et al) run away for 50M steps inside this loop at
// 0x43e7ca. Byte-equality vs the interpreter: tools/_diff-43e792.mjs.
//
// All four touched registers are push/popped by the binary — no
// register effects survive the call.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_0043e792(heap) {
  const esi = regs.esi >>> 0;
  const ride = heap.u8((esi + 0x68) >>> 0);
  const station = heap.u8((esi + 0x69) >>> 0);
  const rideOff = ride * 0x260;
  const own = heap.u16((esi + 0xa) >>> 0);

  // dec byte [ebx + edi + 0x88747a] — per-station queue count.
  const cntAddr = (0x0088747a + rideOff + station) >>> 0;
  heap.setU8(cntAddr, (heap.u8(cntAddr) - 1) & 0xff);

  // Bucket head: u16 at [edi + ebx*2 + 0x887472].
  const headAddr = (0x00887472 + rideOff + station * 2) >>> 0;
  const next = heap.u16((esi + 0x74) >>> 0);
  let cur = heap.u16(headAddr);
  if (cur === own) {
    heap.setU16(headAddr, next);
    return;
  }
  // Walk sprite records' +0x74 next-index chain until the record whose
  // next == own, then splice. Faithful to the binary: no cycle guard.
  for (;;) {
    const rec = (0x00743b94 + cur * 0x100) >>> 0;
    const n = heap.u16((rec + 0x74) >>> 0);
    if (n === own) {
      heap.setU16((rec + 0x74) >>> 0, next);
      return;
    }
    cur = n;
  }
}
