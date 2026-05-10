// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429f6c.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the bottom
// status-bar / toolbar window in the unscaled (in-game) layout. EBP at
// WindowCreate time = 0x429f6c → stored at window+0x0 → invoked
// indirectly by FUN_005e3f31's epilogue.
//
// Calling convention:
//   ESI = window struct pointer
//   EDI = phase sentinel (-1 = initial open / state-update,
//         anything else = paint event at body 0x42a005)
//
// Disassembly (the EDI == -1 path, which is what fires at boot):
//   00429f6c  cmp edi, -1
//   00429f6f  jnz 0x42a005           ; paint body — see stub note below
//   00429f75  mov byte [0x5f52d8], 0
//   00429f7c  mov byte [0x5f52e8], 0
//   00429f83  mov byte [0x5f52c8], 0
//   00429f8a  mov byte [0x5f5278], 0
//   00429f91  mov byte [0x5f5308], 0
//   00429f98  cmp byte [0x8d7eb8], 0
//   00429f9f  jz 0x42a004            ; ret if no scenario loaded
//   00429fa1  mov byte [0x5f52d8], 2
//   00429fa8  mov byte [0x5f52e8], 2
//   00429faf  mov byte [0x5f52c8], 0x14
//   00429fb6  btr dword [esi+0x10], 7   ; clear bit 7 of window+0x10
//   00429fbb  btr dword [esi+0x10], 8
//   00429fc0  mov dl, [0x8d7eb8]        ; current scenario id
//   00429fc6  mov ecx, [0x8d7eba]       ; current park-management state
//   00429fcc  call 0x429c3d             ; query "available?" — returns ax
//   00429fd1  cmp ax, 0x8000
//   00429fd5  jnz 0x429fdc
//   00429fd7  bts dword [esi+0x10], 8   ; ax==0x8000 → set bit 8
//   00429fdc  movzx ebx, byte [0x8d7eb8]
//   00429fe3  test byte [ebx+0x5f5540], 2
//   00429fea  jnz 0x429ff1
//   00429fec  bts dword [esi+0x10], 7
//   00429ff1  test byte [0x8d7eb9], 1
//   00429ff8  jz 0x42a004
//   00429ffa  bts dword [esi+0x10], 8
//   00429fff  bts dword [esi+0x10], 7
//   0042a004  ret
//
// EDI != -1 path (0x42a005..) is the per-frame paint body: call 5e4400,
// read 4 view-rect overrides from 0x5f526a..0x5f5270, adjust by window
// origin, and call into the standard widget-paint helpers. That path is
// LARGE (200+ bytes of paint code) and Ghidra didn't lift it as a
// function — porting it would require lifting 0x42a005 as a separate
// fn first. Per the task spec: SAFE STUB the EDI != -1 case.

import { regs } from "../../runtime/regs.js";
import { FUN_00429c3d } from "./429c3d.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00429f6c(heap) {
  // 0x429f6c..6f: branch on phase sentinel.
  if ((regs.edi >>> 0) !== 0xffffffff) {
    // STUB: EDI != -1 enters the per-frame paint body at 0x42a005, which
    // calls FUN_005e4400 then iterates 4 widget rects out of 0x5f526a..70
    // and blits them via FUN_005e5ce2/FUN_009b30f1. Not yet ported. Safe
    // no-op until the paint pipeline is wired up — the binary handles a
    // null/no-op paint by leaving the window blank, which is what we
    // already do anyway.
    return;
  }

  const esi = regs.esi >>> 0;

  // 0x429f75..91: zero a block of widget-state DAT bytes.
  heap.setU8(0x005f52d8, 0);
  heap.setU8(0x005f52e8, 0);
  heap.setU8(0x005f52c8, 0);
  heap.setU8(0x005f5278, 0);
  heap.setU8(0x005f5308, 0);

  // 0x429f98..9f: if no scenario is loaded yet, return.
  if (heap.u8(0x008d7eb8) === 0) return;

  // 0x429fa1..af: scenario loaded → set widget-active markers.
  heap.setU8(0x005f52d8, 0x02);
  heap.setU8(0x005f52e8, 0x02);
  heap.setU8(0x005f52c8, 0x14);

  // 0x429fb6..bb: clear bits 7 & 8 of window+0x10 (widget-disabled bits).
  let w10 = heap.u32(esi + 0x10) >>> 0;
  w10 = (w10 & ~((1 << 7) | (1 << 8))) >>> 0;
  heap.setU32(esi + 0x10, w10);

  // 0x429fc0..cc: query availability via FUN_00429c3d.
  // dl = byte [0x8d7eb8] (scenario id), ecx = dword [0x8d7eba] (state).
  regs.edx = ((regs.edx & 0xffffff00) | heap.u8(0x008d7eb8)) >>> 0;
  regs.ecx = heap.u32(0x008d7eba) >>> 0;
  regs.esi = esi;
  FUN_00429c3d(heap);
  const ax = regs.eax & 0xffff;

  // 0x429fd1..d7: if ax == 0x8000, set bit 8 of window+0x10.
  let w10b = heap.u32(esi + 0x10) >>> 0;
  if (ax === 0x8000) {
    w10b = (w10b | (1 << 8)) >>> 0;
  }

  // 0x429fdc..ec: if ([0x5f5540 + scenario_id] & 2) == 0 → set bit 7.
  const sid = heap.u8(0x008d7eb8);
  if ((heap.u8(0x005f5540 + sid) & 2) === 0) {
    w10b = (w10b | (1 << 7)) >>> 0;
  }
  heap.setU32(esi + 0x10, w10b);

  // 0x429ff1..429fff: if ([0x8d7eb9] & 1) → force both bits 7 and 8 set.
  if ((heap.u8(0x008d7eb9) & 1) !== 0) {
    w10b = (w10b | (1 << 7) | (1 << 8)) >>> 0;
    heap.setU32(esi + 0x10, w10b);
  }
  // 0x42a004: ret
}
