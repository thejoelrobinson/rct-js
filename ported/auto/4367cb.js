// @manual — do not regenerate.
// Source: decompiled/c/4367cb.c, hand-fixed for the register prologue Ghidra elides.
//
// FUN_004367cb — per-tile setup that runs before each surface paint. Called
// from FUN_extra_paint_436b50 (the rotation diamond walker) once per tile
// (AX = tile X, CX = tile Y in world coords / 32-pixel units, low 16 bits).
//
// Two paths:
//   • In-bounds (0x20 < AX,CX < 0xfe0): zeros 11 dwords + 4 bytes of
//     scratch globals, stores AX/CX, then dispatches via PTR_LAB_004368c8
//     (the rotation-0..3 surface painters at 0x4368d8/e0/ec/ff).
//   • Off-map: dispatches via PTR_LAB_00436a8c (off-map painters at
//     0x436a9c/aa4/ab0/ac3) — drawn as solid water/dark cells.
//
// CRITICAL HAND-FIX (Phase N):
//
// Ghidra's C decompilation HIDES the actual register prologue before the
// jmp through PTR_LAB_004368c8. The asm is (bytes at 0x43689b..0x4368c1):
//
//   66 8b d1          mov dx, cx                       ; DX = Y
//   66 c1 c2 07       rol dx, 7                        ; rotate Y left 7
//   66 0b d0          or dx, ax                        ; DX |= X
//   66 c1 ca 05       ror dx, 5                        ; rotate right 5
//   0f b7 f2          movzx esi, dx                    ; ESI = DX (u16)
//   8b 34 b5 f4 1e 97 00  mov esi, [esi*4 + 0x971ef4]  ; ESI = tile_pointers[esi]
//   50                push eax                         ; save X (callee-restore)
//   51                push ecx                         ; save Y
//   8b 15 88 1f 99 00 mov edx, [0x991f88]              ; EDX = rotation (0..3)
//   8b 3d f8 1e 98 00 mov edi, [0x981ef8]              ; EDI = DPI ptr
//   ff 24 95 c8 68 43 00  jmp [edx*4 + 0x4368c8]       ; dispatch
//
// The callees at 0x4368d8 (= the surface painters at 0x436909) read ESI as
// the current tile_element list head, EDI as the DPI struct ptr, and at
// the very end do `pop ecx; pop eax; ret` (relying on the saved X/Y).
//
// The auto-translator emitted just `callIndirect(heap, heap.u32(0x4368c8 +
// rot*4))` — no register setup. ESI carried over whatever the caller had
// (random heap pointer like 0x9a0020), so the painter's tile_element walk
// loop at 0x4369e7 (`while ([esi+1] & 0x80) esi += 8`) walked garbage,
// then on the way out OOB-read past the end of the heap.
//
// The tile_pointers grid at 0x971ef4 is a 256x256 (= 0x10000-entry) table
// of u32 pointers into the tile_element heap (0x6e3b80..0x8dc08c). The
// hash (rol dx, 7; or; ror dx, 5) maps (X, Y) tile coords (in 32-px
// units) to this grid.
//
// Calling convention preservation: the JS painter-bridge syncs regs ↔ cpu
// across each shim call, so setting regs.esi / regs.edi / regs.edx here
// flows through to the bridged 0x4368d8 painter. The push eax/push ecx
// in the original asm is for the painter's epilogue; in JS we save and
// restore eax/ecx around the callIndirect manually.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

export function FUN_004367cb(heap) {
  const in_AX = regs.eax & 0xffff;
  const in_CX = regs.ecx & 0xffff;

  if ((in_AX < 0xfe0) && (in_CX < 0xfe0) && (in_AX > 0x1f) && (in_CX > 0x1f)) {
    // Reset 11 dwords of per-tile scratch globals.
    heap.setU32(0x00991f04, 0xffff);
    heap.setU32(0x00991f08, 0xffff);
    heap.setU32(0x00991f0c, 0xffff);
    heap.setU32(0x00991f10, 0xffff);
    heap.setU32(0x00991f14, 0xffff);
    heap.setU32(0x00991f18, 0xffff);
    heap.setU32(0x00991f1c, 0xffff);
    heap.setU32(0x00991f20, 0xffff);
    heap.setU32(0x00991f24, 0xffff);
    heap.setU32(0x00991f28, 0xffff);
    heap.setU32(0x00991f2c, 0xffff);
    heap.setU8(0x0099c165, 0);
    heap.setU8(0x00999f9a, 0xff);
    heap.setU8(0x00999fdc, 0xff);
    heap.setU32(0x0099a01e, 0xff);

    // Store X/Y for the painter to read. The binary at 0x436880/0x436886 does
    //   66 a3 72 1f 99 00     mov word ptr [0x991f72], ax   (2 bytes)
    //   66 89 0d 76 1f 99 00  mov word ptr [0x991f76], cx   (2 bytes)
    // — both u16 stores (disasm-cited). The earlier setU32 here overran into
    // [0x991f74]/[0x991f78]; with the harness/x86.js 0x66 mov-moffs bug fixed,
    // the binary's faithful render keeps these as distinct u16 tile-coord
    // fields, so we must match (setU16). [0x991f74] is then rewritten by
    // 4368d8 anyway, but [0x991f72]/[0x991f76]/[0x991f78] parity matters.
    heap.setU16(0x00991f72, in_AX);
    heap.setU16(0x00991f76, in_CX);
    heap.setU16(0x00991f7c, in_AX);
    heap.setU16(0x00991f7c + 2, in_CX);

    // === HAND-FIX: register prologue Ghidra elided ===
    //
    // Compute tile_pointers index from (X, Y) via the binary's hash:
    //   dx = Y; rol dx, 7; dx |= X; ror dx, 5
    let dx = in_CX & 0xffff;
    dx = (((dx << 7) | (dx >>> 9)) & 0xffff);   // rol dx, 7
    dx = (dx | in_AX) & 0xffff;                  // or dx, ax
    dx = (((dx >>> 5) | (dx << 11)) & 0xffff);  // ror dx, 5

    // ESI = tile_pointers[dx] — head of the tile_element list for this tile.
    const tilePtr = heap.u32(0x00971ef4 + dx * 4) >>> 0;

    // Save AX/CX (the painter epilogue does `pop ecx; pop eax; ret`).
    const savedAX = regs.eax;
    const savedCX = regs.ecx;

    // Set up registers for the bridged painter.
    regs.esi = tilePtr;                           // tile_element list head
    regs.edx = heap.u32(0x00991f88) >>> 0;        // rotation (0..3)
    regs.edi = heap.u32(0x00981ef8) >>> 0;        // DPI ptr

    // Dispatch via PTR_LAB_004368c8[rotation].
    regs.eax = callIndirect(heap, heap.u32(0x004368c8 + (heap.u8(0x00991f88)) * 4));

    // Restore AX/CX so the rotation walker (extra_paint_436b50) can keep
    // its diamond loop arithmetic intact.
    regs.eax = savedAX;
    regs.ecx = savedCX;
    return regs.eax;
  }

  // Off-map path: dispatch via PTR_LAB_00436a8c (no tile_element setup —
  // these painters draw water/dark fill, no per-tile state needed).
  // HAND-FIX (Phase O): binary @ 0x436a76..0x436a8e sets edx = rotation
  // and edi = DPI ptr before the jmp. Without edi, the off-map painter
  // (e.g. 0x436a9c) reads [edi+0x6] / [edi+0xa] off whatever stale edi
  // happened to be — typically 0 or a high pointer, both cause OOB.
  regs.edx = heap.u32(0x00991f88) >>> 0;
  regs.edi = heap.u32(0x00981ef8) >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32(0x00436a8c + (heap.u8(0x00991f88)) * 4)));
}
