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

  // Direct Uint8Array access for the per-pixel inner loops. heap.u8/setU8 go
  // through bounds-checked method dispatch which costs ~3-4x per pixel; using
  // the raw bytes array (with cached length) is ~80% faster on hot copies.
  const bytes = heap.bytes;
  const N = bytes.length;

  // ADDENDUM 135 — the EXIT REGISTERS are part of this function's contract.
  // The binary advances esi/edi past what it consumed and wrote, leaves ecx
  // drained by `rep movsd`, ebp at the next row base and edx = the row stride
  // (`movzx edx, word [0x9a2030]` on the row-terminator path). The caller
  // continues from those. The port previously returned with the ENTRY values
  // still in place, which is invisible in this call's pixels -- they are
  // byte-identical -- but corrupts LATER calls: measured as 10 calls x 960 px
  // = the whole 9600 px playable-gate band.
  let esiOut = spriteBase, ediOut = rowBase, ecxOut = regs.ecx >>> 0;

  // Bound iteration to keep accidental OOB/loops from hanging the painter.
  for (let iter = 0; iter < 0x40000; iter++) {
    const hdrByte = puVar10 < N ? bytes[puVar10] : 0;
    if (0x009aa032 < N) bytes[0x009aa032] = hdrByte;
    const xOffAddr = (puVar10 + 1) >>> 0;
    const xOff   = xOffAddr < N ? bytes[xOffAddr] : 0;
    const runLen = hdrByte & 0x7f;
    const srcRunStart = (puVar10 + 2) >>> 0;
    puVar10 = (puVar10 + 2 + runLen) >>> 0;

    // `mov esi, ebx` / `mov edi, ebp` happen every run, before any clipping.
    esiOut = srcRunStart;
    ediOut = rowBase;

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

      // `sub esi, edx` on the left-clip path; `add edi, edx` on the other.
      esiOut = (srcRunStart + srcSkip) >>> 0;
      ediOut = (rowBase + dstX) >>> 0;

      if (len > 0) {
        const src = (srcRunStart + srcSkip) >>> 0;
        const dst = (rowBase + dstX) >>> 0;

        // Clamp len to in-bounds for both src and dst to keep the inner loop
        // branchless. Out-of-range reads yield 0; out-of-range writes drop.
        const srcEnd = src + len;
        const dstEnd = dst + len;
        const cap = Math.max(0, Math.min(len, N - src, N - dst));
        const L = cap;
        // `shr ecx,1 / movsb / shr ecx,1 / movsw / rep movsd` advances esi and
        // edi by the byte count and leaves ecx == 0. Reuse L rather than
        // recomputing the clamp -- this is the hot path (perf_regression.test).
        esiOut = (esiOut + L) >>> 0;
        ediOut = (ediOut + L) >>> 0;
        ecxOut = 0;

        // DEBUG ASSERT (ADDENDUM 107) — opt-in via globalThis.__blitAssert.
        // The scratch/parameter block lives at [0x9a2000, 0x9ab000) (the start
        // of the DataSeg section). A destination that underflows the DDraw
        // surface lands exactly there, and the blit oracle measured our JS
        // corrupting 0x9a202a / 0x9a202e while the binary never touches them.
        // heap.setU8/16/32 instrumentation CANNOT see it: the inner loops below
        // write `bytes[...]` directly for speed. So assert here, in the port.
        if (globalThis.__blitAssert && L > 0 && (dst + L) > 0x009a2000 && dst < 0x009ab000) {
          const w = (s) => { try { process.stdout.write(s + "\n"); } catch (_) {} };
          w(`BAD BLIT WRITE dst=0x${dst.toString(16)}..0x${(dst + L).toString(16)} L=${L}`
            + ` | rowBase=0x${rowBase.toString(16)} dstX=${dstX} xOff=${xOff} runLen=${runLen}`
            + ` | clipLeft=${clipLeft} clipRight=${clipRight} iVar9=${iVar9} srcSkip=${srcSkip}`
            + ` | rowCounter=${rowCounter} rowStride=${rowStride} flags=${flagRemap ? "R" : "-"}${flagTint ? "T" : "-"}`);
          if (globalThis.__blitAssertThrow) throw new Error("blit write into scratch block");
        }

        if (!flagRemap && !flagTint) {
          // Plain copy. Use Uint8Array.copyWithin equivalent via direct loop
          // (typed-array .set() is faster than per-byte for L >= 4).
          if (L > 0) {
            if (L >= 8) {
              bytes.set(bytes.subarray(src, src + L), dst);
            } else {
              for (let i = 0; i < L; i++) bytes[dst + i] = bytes[src + i];
            }
          }
        } else if (flagRemap && !flagTint) {
          // Palette remap: dst[i] = remap[src[i]].
          for (let i = 0; i < L; i++) {
            const s = bytes[src + i];
            const ra = (remapBase + s) >>> 0;
            bytes[dst + i] = ra < N ? bytes[ra] : 0;
          }
        } else if (!flagRemap && flagTint) {
          // In-place recolour: dst[i] = remap[dst[i]]. Source pixels not used.
          for (let i = 0; i < L; i++) {
            const d = bytes[dst + i];
            const ra = (remapBase + d) >>> 0;
            bytes[dst + i] = ra < N ? bytes[ra] : 0;
          }
        } else {
          // Translucent: dst[i] = mix[remapBase - 0x100 + (src<<8) + dst].
          const baseM = (remapBase - 0x100) >>> 0;
          for (let i = 0; i < L; i++) {
            const s = bytes[src + i];
            const d = bytes[dst + i];
            const addr = (baseM + (s << 8) + d) >>> 0;
            bytes[dst + i] = addr < N ? bytes[addr] : 0;
          }
        }
      }
    }

    // Row terminator: high bit of length byte marks end-of-row.
    if ((hdrByte & 0x80) !== 0) {
      rowBase = (rowBase + rowStride) >>> 0;
      rowCounter = (rowCounter - 1) & 0xffff;
      heap.setU16(0x009a202c, rowCounter);
      if (rowCounter === 0) {
        // ONLY the plain-copy branch. That branch moves bytes with
        // `shr ecx,1 / movsb / shr ecx,1 / movsw / rep movsd`, and the string
        // ops advance esi/edi and drain ecx -- so the exit registers are part
        // of its contract and the caller continues from them.
        //
        // The remap / tint / translucent branches do NOT: they address pixels
        // INDEXED (`mov al,[esi+i]` ... `mov [edi+i],al`), leaving esi/edi
        // where they were. Applying the plain-copy contract to all four was
        // measured WRONG: it fixed the playable path (9600 -> 0) but broke the
        // title screen at tick 5 (0xeb366c2d vs interpreter truth 0xc087912d).
        // The verified call (#123999) had flags == 0, i.e. plain copy only, so
        // that is the only branch this models. The other three need their own
        // disassembly before their exit registers are claimed.
        if (!flagRemap && !flagTint) {
          regs.esi = esiOut >>> 0;
          regs.edi = ediOut >>> 0;
          regs.ebp = rowBase >>> 0;
          regs.ebx = puVar10 >>> 0;
          regs.ecx = ecxOut >>> 0;
          regs.edx = ((regs.edx & 0xffff0000) | (rowStride & 0xffff)) >>> 0;
        }
        return 0;
      }
    }
  }
  return 0;
}
