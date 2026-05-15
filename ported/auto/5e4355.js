// @manual — do not regenerate.
// Source: decompiled/c/5e4355.c plus the binary's first three instructions
// at 0x5e4355..0x5e435b which Ghidra's C decompile completely omits
// (Ghidra only emits the indirect jmp at 0x5e4361).
//
// Binary disassembly (rct.exe @ 0x5e4355):
//   5e4355: 66 8b d1                mov dx, cx        ; dx = z          (was ECX_in low)
//   5e4358: 66 8b cb                mov cx, bx        ; cx = wy         (was EBX_in low)
//   5e435b: 8b 1d 88 1f 99 00       mov ebx, [0x991f88]               ; rotation idx
//   5e4361: ff 24 9d 68 43 5e 00    jmp [0x5e4368 + ebx*4]            ; rotation handler
//
// Each rotation handler (e.g. 0x5e4378 for rot=0) does iso math expecting:
//   ax = world_x  (passed through unchanged)
//   cx = world_y  (set by `mov cx, bx` here)
//   dx = z        (set by `mov dx, cx` here)
//
// Without these three movs, the handler would see cx = z and dx = z_in,
// computing iso_y = (wx + z)/2 - z_in instead of (wx + wy)/2 - z. That
// drove viewport view_y to a junk value (0x2ff = 767 instead of ~1300)
// and view_x to -1535 instead of ~-320, putting the strip iterator
// far off the actual sprite cluster.
//
// We mirror the binary's mov sequence on the translator-side regs so
// the painter-bridge interpreter at the jumptable target sees the
// correct register state.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e4355(heap) {
  // mov dx, cx — DX gets the low 16 of ECX (z).
  // mov cx, bx — CX gets the low 16 of EBX (wy).
  // Both are 16-bit moves; upper halves of EDX/ECX are preserved per x86 semantics.
  const _cx_in = regs.ecx >>> 0;
  const _bx_in = regs.ebx >>> 0;
  regs.edx = ((regs.edx & 0xffff0000) | (_cx_in & 0xffff)) >>> 0;
  regs.ecx = ((_cx_in & 0xffff0000) | (_bx_in & 0xffff)) >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32((0x005e4368) + (heap.u8(0x00991f88)) * 4)));
}
