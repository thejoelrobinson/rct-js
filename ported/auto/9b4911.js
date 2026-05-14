// @manual — do not regenerate.
// Source: decompiled/c/9b4911.c — sprite RLE-decoder with 4-way dispatch
// on DAT_009a2000 bits 0x20000000/0x40000000. Ghidra translated only the
// no-flag branch (line 144+); the other 3 branches end in indirect
// jumptables ("Could not recover jumptable at 0x9b585a/0x9b4a22/0x9b513e")
// that this port now reproduces.
//
// Jumptables recovered from binary/rct.exe (CodeSeg, raw_off=0x5ab000):
//   0x9b5864 — both bits set (translucent mix)
//   0x9b4a2c — 0x20000000 only (palette remap)
//   0x9b5148 — 0x40000000 only (in-place dest recolour)
// Each table is uVar6-indexed; entry [N] = a sequence of N per-pixel
// micro-ops followed by a shared epilogue at entry [0]. Disassembly of
// the unrolled targets shows the per-pixel op shape:
//
//   Table 1 (both): mov ah,[esi+i]; mov al,[edi+i]; mov al,[eax+ebx-0x100]; mov [edi+i],al
//                   -> dst[i] = mix[remapBase - 0x100 + (src<<8) + dst]   (translucent)
//   Table 2 (0x20): mov al,[esi+i]; mov al,[eax+ebx];                mov [edi+i],al
//                   -> dst[i] = remap[src[i]]                           (palette remap)
//   Table 3 (0x40): mov al,[edi+i]; mov al,[eax+ebx];                mov [edi+i],al
//                   -> dst[i] = remap[dst[i]]                           (in-place recolour;
//                                                                       source RLE drives WHERE
//                                                                       to recolour, not WHAT)
//
// All four branches share: row-table lookup → per-row run-walk → per-run
// clip to [DAT_009a2024, DAT_009a2028) → write → row terminator updates
// row-base by DAT_009a2030 and decrements DAT_009a202c (u16).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_009b4911(heap) {
  const flags = heap.u32(0x009a2000);
  const flagRemap = (flags & 0x20000000) !== 0;
  const flagTint  = (flags & 0x40000000) !== 0;

  // Sprite RLE base from ESI; CONCAT22 with upper 16 of DAT_009a2020 (start row + carry/aux)
  const spriteBase  = regs.esi >>> 0;
  const startRow    = heap.u16(0x009a2020);
  const startRowHi  = heap.u16(0x009a2022);
  const rowOff      = heap.u16((spriteBase + startRow * 2) >>> 0);
  let   puVar10     = (((startRowHi << 16) | rowOff) + spriteBase) >>> 0;

  // Row base (advances by DAT_009a2030 on terminator) and clip rect.
  let   rowBase     = regs.edi >>> 0;
  const clipLeft    = heap.i16(0x009a2024);
  const clipRight   = heap.i16(0x009a2028);
  const rowStride   = heap.u16(0x009a2030);
  const remapBase   = heap.u32(0x009a200c);

  let rowCounter = heap.u16(0x009a202c);
  if (rowCounter === 0) return 0;

  // Bound iteration to keep accidental OOB/loops from hanging the painter.
  for (let iter = 0; iter < 0x40000; iter++) {
    const hdrByte = heap.u8(puVar10);
    heap.setU8(0x009aa032, hdrByte);
    const xOff   = heap.u8((puVar10 + 1) >>> 0);
    const runLen = hdrByte & 0x7f;
    const srcRunStart = (puVar10 + 2) >>> 0;
    puVar10 = (puVar10 + 2 + runLen) >>> 0;

    let iVar9   = xOff - clipLeft;             // signed; can be negative
    let srcSkip = 0;
    let dstX    = 0;
    let len     = runLen;
    let doWrite = false;

    if (iVar9 <= 0) {
      // Run starts at/before left-clip: skip -iVar9 pixels from source.
      srcSkip = -iVar9;
      len     = runLen + iVar9;                // may go <= 0
      dstX    = 0;
      if (len > 0) {
        iVar9   = 0;
        doWrite = true;
      }
    } else {
      // Run starts to the right of left-clip.
      dstX    = iVar9;
      doWrite = true;
    }

    if (doWrite) {
      // Right clip: end = iVar9 + len; overshoot = end - clipRight.
      const overshoot = (iVar9 + len) - clipRight;
      if (overshoot <= 0) {
        // Entire (already-left-clipped) run fits.
      } else {
        const adjusted = len - overshoot;
        if (adjusted > 0 && overshoot <= len) {
          len = adjusted;
        } else {
          len = 0;
        }
      }

      if (len > 0) {
        const src = (srcRunStart + srcSkip) >>> 0;
        const dst = (rowBase + dstX) >>> 0;

        if (!flagRemap && !flagTint) {
          // Plain copy (the Ghidra-translated branch).
          for (let i = 0; i < len; i++) {
            heap.setU8((dst + i) >>> 0, heap.u8((src + i) >>> 0));
          }
        } else if (flagRemap && !flagTint) {
          // Palette remap: dst[i] = remap[src[i]].
          for (let i = 0; i < len; i++) {
            const s = heap.u8((src + i) >>> 0);
            heap.setU8((dst + i) >>> 0, heap.u8((remapBase + s) >>> 0));
          }
        } else if (!flagRemap && flagTint) {
          // In-place recolour: dst[i] = remap[dst[i]]. Source pixels not used.
          for (let i = 0; i < len; i++) {
            const d = heap.u8((dst + i) >>> 0);
            heap.setU8((dst + i) >>> 0, heap.u8((remapBase + d) >>> 0));
          }
        } else {
          // Translucent: dst[i] = mix[remapBase - 0x100 + (src<<8) + dst].
          for (let i = 0; i < len; i++) {
            const s = heap.u8((src + i) >>> 0);
            const d = heap.u8((dst + i) >>> 0);
            const addr = (remapBase - 0x100 + (s << 8) + d) >>> 0;
            heap.setU8((dst + i) >>> 0, heap.u8(addr));
          }
        }
      }
    }

    // Row terminator: high bit of length byte marks end-of-row.
    if ((hdrByte & 0x80) !== 0) {
      rowBase = (rowBase + rowStride) >>> 0;
      rowCounter = (rowCounter - 1) & 0xffff;
      heap.setU16(0x009a202c, rowCounter);
      if (rowCounter === 0) return 0;
    }
  }
  return 0;
}
