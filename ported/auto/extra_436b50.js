// @manual — do not regenerate.
//
// FUN_extra_paint_436b50 — rotation-0 entry of the terrain rotation painter
// (PTR_LAB_00436b40[0]). The CODESEG body is small, dense 16-bit asm with
// the 0x66 operand-size prefix on nearly every instruction; Ghidra couldn't
// decompile and the interpreter-bridge stumbled on missing EDI setup +
// unsupported opcodes deeper in the call chain. This is a faithful JS port
// of the bytes at 0x436b50..0x436bc3.
//
// Disassembly (preamble + Y-row loop body):
//   preamble (0x436b50..0x436b83):
//     mov ax, [edi+6]            ; clipY  (DPI struct field)
//     mov bx, [edi+4]            ; clipX
//     sub ax, 0x10
//     and bx, 0xffe0             ; clipX = round_down(clipX, 32)
//     and ax, 0xffe0             ; clipY = round_down(clipY-16, 32)
//     sar bx, 1                  ; bx = clipX / 2 (signed)
//     mov cx, ax                 ; cx = ay
//     sub ax, bx                 ; ax = ay - clipX/2
//     add cx, bx                 ; cx = ay + clipX/2
//     and al, 0xe0               ; mask low byte to 32px boundary
//     and cl, 0xe0
//     mov dx, [edi+0xa]          ; clipH
//     add dx, 0x450              ; +1104 (overscan margin)
//     shr dx, 5                  ; rows = (clipH + 1104) / 32
//     push dx                    ; loop counter on stack
//   loop body (0x436b84..0x436bbe — diamond of 4 tiles per iteration):
//     call 0x4367cb              ; setup sprite-state for (ax, cx)
//     call 0x444820              ; paint sprite chain at (ax, cx)
//     add cx, 0x20
//     sub ax, 0x20
//     call 0x444820              ; paint at (ax-0x20, cx+0x20)
//     add ax, 0x20
//     call 0x4367cb              ; setup for (ax, cx+0x20)
//     call 0x444820              ; paint at (ax, cx+0x20)
//     add ax, 0x20
//     sub cx, 0x20
//     call 0x444820              ; paint at (ax+0x20, cx)
//     add cx, 0x20
//     dec word [esp]
//     jne loop
//
// DPI pointer: the binary reads it from EDI, which FUN_00436b2a originally
// loaded from [0x981ef8] (the per-strip DPI ptr stashed by FUN_004316f3).
// The hand-port at ported/auto/436b2a.js drops that load — it just does
// callIndirect through the jumptable. Rather than fixing 436b2a (which
// could change behaviour for the other rotation painters that still run
// through painter-bridge), we read 0x981ef8 directly here.
//
// Calling convention for ax/cx across 0x4367cb and 0x444820: both are
// callee-preserve in the binary (they save/restore via the diamond loop
// arithmetic that mutates ax/cx between calls — the binary relies on the
// callees not clobbering them). The JS ports do mutate regs.eax/regs.ecx
// internally, so we save ax/cx in local vars and re-prime regs before
// each call.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004367cb } from "./4367cb.js";
import { FUN_00444820 } from "./444820.js";

export function FUN_extra_paint_436b50(heap) {
  if (typeof globalThis._renderTrace === "function") {
    globalThis._renderTrace("FUN_extra_paint_436b50");
  }

  const dpi = heap.u32(0x00981ef8) >>> 0;
  if (dpi === 0) return;

  // Critical: prime regs.edi so deeper painters (0x4368d8, 0x4368e0, ...,
  // still running through painter-bridge) see DPI in EDI. The original
  // binary set EDI at FUN_00436b2a entry; the hand-port of 436b2a dropped
  // that load, and several CODESEG painters read [edi+6] / [edi+0xa].
  regs.edi = dpi;

  // Preamble: compute isometric tile coords from DPI clip rect.
  const clipY = heap.u16(dpi + 6);
  const clipX = heap.u16(dpi + 4);
  const clipH = heap.u16(dpi + 0xa);

  let ay = (clipY - 0x10) & 0xffe0;
  let bx = clipX & 0xffe0;
  // sar bx, 1  — signed 16-bit arithmetic shift right by 1.
  bx = ((((bx << 16) >> 16) >> 1) & 0xffff);

  let ax = (ay - bx) & 0xffff;
  let cx = (ay + bx) & 0xffff;
  // and al, 0xe0 / and cl, 0xe0 — clear bottom 5 bits of low byte.
  ax = (ax & 0xffe0);
  cx = (cx & 0xffe0);

  let rows = ((clipH + 0x450) & 0xffff) >>> 5;

  while (rows > 0) {
    // setup + paint tile A
    regs.eax = ax; regs.ecx = cx;
    FUN_004367cb(heap);
    regs.eax = ax; regs.ecx = cx;
    FUN_00444820(heap);

    // tile B: (ax-0x20, cx+0x20)
    cx = (cx + 0x20) & 0xffff;
    ax = (ax - 0x20) & 0xffff;
    regs.eax = ax; regs.ecx = cx;
    FUN_00444820(heap);

    // tile C: setup + paint at (ax+0x20, cx) — i.e. back to ay column at cx+0x20
    ax = (ax + 0x20) & 0xffff;
    regs.eax = ax; regs.ecx = cx;
    FUN_004367cb(heap);
    regs.eax = ax; regs.ecx = cx;
    FUN_00444820(heap);

    // tile D: (ax+0x20, cx)
    ax = (ax + 0x20) & 0xffff;
    cx = (cx - 0x20) & 0xffff;
    regs.eax = ax; regs.ecx = cx;
    FUN_00444820(heap);

    // advance: cx += 0x20 (loop body net: ax += 0x20, cx += 0x20 per iter)
    cx = (cx + 0x20) & 0xffff;
    rows--;
  }
}
