// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429ae4.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the scaled-mode
// scenario-detail window. EBP at WindowCreate time = 0x429ae4 → stored
// at window+0x0 → invoked indirectly by FUN_005e3f31's epilogue.
//
// Calling convention:
//   ESI = window struct pointer
//   EDI = phase sentinel (-1 = initial open, anything else = real event)
//
// Disassembly:
//   00429ae4  cmp edi, -1
//   00429ae7  jnz 0x429aea
//   00429ae9  ret                  ; EDI == -1 → no-op
//   00429aea  push esi
//   00429aeb  mov cx, [esi+0x20]   ; CX = window view_x
//   00429aef  mov dx, [esi+0x22]   ; DX = window view_y
//   00429af3  mov ebx, 0x95c6      ; sprite/glyph id constant
//   00429af8  call 0x9b438b        ; FUN_009b438b — sprite blitter
//   00429afd  pop esi
//   00429afe  ret
//
// At boot, MainOpen invokes this with EDI=-1, so the no-op branch fires.
// Once a real paint event dispatches, the binary draws sprite 0x95c6 at
// the window's (view_x, view_y) anchor.

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00429ae4(heap) {
  // 0x429ae4: `cmp edi, -1; jnz 0x429aea; ret`
  if ((regs.edi >>> 0) === 0xffffffff) return;
  // 0x429aea: paint sprite 0x95c6 anchored at the window's (view_x, view_y).
  const esi = regs.esi >>> 0;
  regs.ecx = ((regs.ecx & 0xffff0000) | heap.u16(esi + 0x20)) >>> 0;
  regs.edx = ((regs.edx & 0xffff0000) | heap.u16(esi + 0x22)) >>> 0;
  regs.ebx = 0x95c6 >>> 0;
  FUN_009b438b(heap);
  regs.esi = esi;  // pop esi — restore the caller's window pointer
}
