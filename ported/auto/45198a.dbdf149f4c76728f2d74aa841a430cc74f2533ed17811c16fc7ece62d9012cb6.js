// @manual — do not regenerate.
//
// Source: decompiled/c/45198a.c — peep-thirst hand-off (subset of the
// per-peep state-tick chain). The translator emitted `(addr) + (iVar2) * 4`
// for what the binary does with `[esi + addr]` byte/word stores (esi is
// the per-peep struct base, iVar2 = peep_index * 0x260).
// Binary trace (0x4519b9): `movb $0x0, 0x88756b(%esi)` — BYTE store, no
// stride. The earlier line 14 already does setU32 to 0x887422+offset but
// it's an `andw` (16-bit) in the binary at 0x451994 — left as-is for now.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0045198a(heap) {
  let uVar1 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar2 = 0;
  iVar2 = (((in_EDX & 0xff) * 0x260) >>> 0);
  // 16-bit `andw $0xfeff` at 0x451994 — keep as u16 read/write.
  heap.setU16((0x00887422 + (in_EDX & 0xff) * 0x260), (heap.u16(0x00887422 + (in_EDX & 0xff) * 0x260) & 0xfeff) & 0xffff);
  uVar1 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
  heap.setU16((0x00887566 + iVar2), (heap.i16((0x00887566 + iVar2)) + (uVar1 & 0xff) * ((((100 - (((heap.u16((0x00887566 + iVar2)) >>> 8)) << 24 >> 24)) & 0xff) >>> 2) & 0xffff)) & 0xffff);
  // BYTE stores on per-peep state (see header for the bug).
  heap.setU8((0x0088756b + iVar2) >>> 0, 0);
  heap.setU8((0x0088751d + iVar2) >>> 0, (heap.u8(0x0088751d + iVar2) | 0x1c) & 0xff);
  return;
}
