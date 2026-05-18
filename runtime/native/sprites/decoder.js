// In-game RLE / bitmap sprite decoder. Idiomatic JS rewrite of the
// verbose translator-style chain at ported/auto/9b438b.js + 9b4457.js +
// 9b4660.js + 9b4911.js (1390 LOC total, ~5 distinct translator-bug
// classes hand-fixed). Designed to drop in at the same FUN_009b... call
// sites via thin shims that delegate to dispatchSprite() /
// dispatchSpriteWithRemap() / decodeBitmapRows() / decodeRleRows().
//
// STATUS (Phase S+C, 2026-05-17): module lands standalone — NOT yet
// wired in. A first attempt to swap the shims caused a tick-1 hash
// divergence in test/runtime/title_replay.test.js (expected 0xcb5f8797,
// got 0x2a743eab). Pixel-count probe was sane (72.3k non-zero, 167
// distinct palette indices) but pixels were not byte-equal. Per Phase
// S+B workflow, the per-instructions response is to land the rewrite as
// reference, leave the existing chain active, and let the user
// adjudicate before flipping the shims + setEipHooks. Suspected
// divergence: signed-vs-unsigned comparisons of clip-deltas after
// `& 0xffff` (the existing 9b438b.js path A inherits this bug too but
// is not exercised in the replay scenarios; my rewrite collapsed paths
// and may now hit it from a different angle). LZ pre-pass and outer
// dispatch were spot-checked against C source and asm.
//
// The reference for the wire format is `harness/csg.js` (the standalone
// csg1.dat decoder); semantic intent for the in-game dispatch + clip math
// comes from OpenRCT2's src/openrct2/drawing/Drawing.Sprite.cpp (read for
// understanding only — the JS is written fresh).
//
// Sprite-class layout (entries at TBL_SPRITE_CLASS_BASE + i*16):
//
//   +0x00  uint32  src_data_ptr
//   +0x04  int16   width
//   +0x06  int16   height
//   +0x08  int16   xOffset
//   +0x0a  int16   yOffset
//   +0x0c  uint32  flags     (bit 1 = LZ-compressed; bit 2 = RLE;
//                             bits 4/5 = sub-sprite recursion;
//                             bit 16 = drop-one-row interlace)
//
// DPI struct at unaff_EDI (passed by every caller):
//
//   +0x00  uint32  dst_pixels_ptr
//   +0x04  int16   dpi_x          (back-buffer x in pixels)
//   +0x06  int16   dpi_y          (back-buffer y in pixels)
//   +0x08  int16   dpi_w          (clip width)
//   +0x0a  int16   dpi_h          (clip height)
//   +0x0c  int16   pitch_extra    (added to width for stride)
//   +0x0e  int16   dpi_zoom       (0 = pixel-perfect, 1 = half, etc.)
//
// Per-blit scratch globals (overwritten by every call):
//
//   DAT_REMAP_CLASS  = ebx & 0x60000000   (palette-mode flag)
//   DAT_PAL_REMAP    = remap-LUT base ptr (set if remap_class != 0)
//   DAT_SRC_BASE     = sprite src pixel base
//   DAT_SRC_W/H_I16  = sprite dimensions
//   DAT_SPR_X/Y_I16  = sprite anchor offsets
//   DAT_SPR_FLAGS    = sprite flags
//   DAT_ROW_SKIP     = top-clip skip rows (RLE path)
//   DAT_COL_SKIP     = left-clip skip cols (RLE path)
//   DAT_COL_COUNT    = post-clip column count
//   DAT_ROW_COUNT    = post-clip row count
//   DAT_COL_SKIP_B   = left-clip cols (bitmap path)
//   DAT_ROW_STRIDE   = dst stride (RLE) or per-row dst-skip (bitmap)
//   DAT_LZ_SCRATCH   = scratch buffer for LZ-decompressed source
//
// Public entrypoints (preserved for ~39 JS callers via thin shims at
// ported/auto/9b{438b,4457,4660,4911}.js):
//
//   dispatchSprite()           - 9b438b: public blit; 0x60000000 remap setup
//   dispatchSpriteWithRemap()  - 9b4457: same, palette-remap pre-wired
//   decodeBitmapRows()         - 9b4660: per-row bitmap inner loop (zoom 0)
//   decodeRleRows()            - 9b4911: per-row RLE inner loop (zoom 0)
//
// The two remaining sub-helpers (FUN_009b6863 / FUN_009b64ea) handle
// zoom-1 downsampling and remain in ported/auto/ — they're called from
// _blitZoom1Rle / _blitZoom1Bitmap below.

import { CONCAT11, CONCAT22 } from "../../ghidra-builtins.js";
import { regs } from "../../regs.js";
import { FUN_009b6863 } from "../../../ported/auto/9b6863.js";
import { FUN_009b64ea } from "../../../ported/auto/9b64ea.js";
import { FUN_009b8491 } from "../../../ported/auto/9b8491.js";

// --- DAT_ addresses (named) ---
const DAT_REMAP_CLASS  = 0x009a2000;
const DAT_PAL_REMAP    = 0x009a200c;
const DAT_SRC_BASE     = 0x009a2010;
const DAT_SRC_WH_PACK  = 0x009a2014;   // packed: lo=W, hi=H
const DAT_SRC_W_I16    = 0x009a2014;
const DAT_SRC_H_I16    = 0x009a2016;
const DAT_SPR_X_I16    = 0x009a2018;
const DAT_SPR_FLAGS    = 0x009a201c;
const DAT_ROW_SKIP     = 0x009a2020;
const DAT_COL_SKIP     = 0x009a2024;
const DAT_COL_COUNT    = 0x009a2028;
const DAT_ROW_COUNT    = 0x009a202c;
const DAT_COL_SKIP_B   = 0x009a202e;
const DAT_ROW_STRIDE   = 0x009a2030;
const DAT_LZ_SCRATCH   = 0x009a2032;
const DAT_RLE_HDR_TMP  = 0x009aa032;

// Sprite-class table (16-byte entries: src / WH-i32 / Xoff Yoff i32 / flags).
const TBL_SPRITE_CLASS_BASE = 0x008dc0b4;

// Palette-remap auxiliary tables (0x60000000-mode setup at 9b438b prologue).
const TBL_PAL_INDEX  = 0x009aa06c;
const DAT_REMAP_OUT1 = 0x009aa237;
const DAT_REMAP_OUT2 = 0x009aa20e;
const PAL_REMAP_BASE = 0x009aa144;

// ===========================================================================
// Inner blit/decode loops (zoom 0).
// ===========================================================================

/** RLE row decoder (was FUN_009b4911). Reaches here with regs.esi = sprite
 * src base and regs.edi = first dst row. Walks the per-row offset table
 * then per-run records, optionally palette-remapping via remap_class bits
 * 0x20000000 / 0x40000000. */
export function decodeRleRows(heap) {
  const flags     = heap.u32(DAT_REMAP_CLASS);
  const flagRemap = (flags & 0x20000000) !== 0;
  const flagTint  = (flags & 0x40000000) !== 0;

  const spriteBase = regs.esi >>> 0;
  const startRow   = heap.u16(DAT_ROW_SKIP);
  const startRowHi = heap.u16(DAT_ROW_SKIP + 2);
  const rowOff     = heap.u16((spriteBase + startRow * 2) >>> 0);
  let   rowSrcPtr  = (((startRowHi << 16) | rowOff) + spriteBase) >>> 0;

  let   rowBase    = regs.edi >>> 0;
  const clipLeft   = heap.i16(DAT_COL_SKIP);
  const clipRight  = heap.i16(DAT_COL_COUNT);
  const rowStride  = heap.u16(DAT_ROW_STRIDE);
  const remapBase  = heap.u32(DAT_PAL_REMAP);

  let rowCounter = heap.u16(DAT_ROW_COUNT);
  if (rowCounter === 0) return 0;

  const bytes = heap.bytes;
  const N = bytes.length;

  // Bound iteration to keep accidental OOB/loops from hanging the painter.
  for (let iter = 0; iter < 0x40000; iter++) {
    const hdrByte = rowSrcPtr < N ? bytes[rowSrcPtr] : 0;
    if (DAT_RLE_HDR_TMP < N) bytes[DAT_RLE_HDR_TMP] = hdrByte;
    const xOffAddr = (rowSrcPtr + 1) >>> 0;
    const xOff   = xOffAddr < N ? bytes[xOffAddr] : 0;
    const runLen = hdrByte & 0x7f;
    const srcRunStart = (rowSrcPtr + 2) >>> 0;
    rowSrcPtr = (rowSrcPtr + 2 + runLen) >>> 0;

    const startsBeforeClip = xOff - clipLeft;
    let srcSkip = 0, dstX = 0, len = runLen, doWrite = false, leftOff = 0;

    if (startsBeforeClip <= 0) {
      srcSkip = -startsBeforeClip;
      len     = runLen + startsBeforeClip;
      if (len > 0) { leftOff = 0; doWrite = true; }
    } else {
      dstX    = startsBeforeClip;
      leftOff = startsBeforeClip;
      doWrite = true;
    }

    if (doWrite) {
      const overshoot = (leftOff + len) - clipRight;
      if (overshoot > 0) {
        const adjusted = len - overshoot;
        len = (adjusted > 0 && overshoot <= len) ? adjusted : 0;
      }
      if (len > 0) {
        const src = (srcRunStart + srcSkip) >>> 0;
        const dst = (rowBase + dstX) >>> 0;
        const cap = Math.max(0, Math.min(len, N - src, N - dst));
        if (cap > 0) _writeRleRun(bytes, src, dst, cap, flagRemap, flagTint, remapBase, N);
      }
    }

    if ((hdrByte & 0x80) !== 0) {
      rowBase = (rowBase + rowStride) >>> 0;
      rowCounter = (rowCounter - 1) & 0xffff;
      heap.setU16(DAT_ROW_COUNT, rowCounter);
      if (rowCounter === 0) return 0;
    }
  }
  return 0;
}

function _writeRleRun(bytes, src, dst, len, flagRemap, flagTint, remapBase, N) {
  if (!flagRemap && !flagTint) {
    if (len >= 8) bytes.set(bytes.subarray(src, src + len), dst);
    else for (let i = 0; i < len; i++) bytes[dst + i] = bytes[src + i];
  } else if (flagRemap && !flagTint) {
    for (let i = 0; i < len; i++) {
      const s = bytes[src + i];
      const ra = (remapBase + s) >>> 0;
      bytes[dst + i] = ra < N ? bytes[ra] : 0;
    }
  } else if (!flagRemap && flagTint) {
    for (let i = 0; i < len; i++) {
      const d = bytes[dst + i];
      const ra = (remapBase + d) >>> 0;
      bytes[dst + i] = ra < N ? bytes[ra] : 0;
    }
  } else {
    // Translucent: dst[i] = mix[(remapBase - 0x100) + (src<<8) + dst]
    const baseM = (remapBase - 0x100) >>> 0;
    for (let i = 0; i < len; i++) {
      const s = bytes[src + i];
      const d = bytes[dst + i];
      const addr = (baseM + (s << 8) + d) >>> 0;
      bytes[dst + i] = addr < N ? bytes[addr] : 0;
    }
  }
}

/** Bitmap row blitter (was FUN_009b4660). Reaches here with esi = current
 * row src ptr, edi = current row dst ptr, ebp = dst-row stride extra, edx
 * = src-row stride extra, ah = (row count − 1) packed in eax bits 15..8.
 * Reads DAT_COL_COUNT, DAT_PAL_REMAP, and remap_class bits 0x20000000 /
 * 0x40000000. Skips transparent src pixels (==0) only in the remap and
 * tint branches; plain-copy is byte-for-byte. */
export function decodeBitmapRows(heap) {
  const flags     = heap.u32(DAT_REMAP_CLASS);
  const flagRemap = (flags & 0x20000000) !== 0;
  const flagTint  = (flags & 0x40000000) !== 0;
  const cols      = heap.u16(DAT_COL_COUNT);
  // R+9c guard: zero-col underflow walks ~64KB per row.
  if (cols === 0) return;

  const remapBase = heap.u32(DAT_PAL_REMAP) >>> 0;
  let src = regs.esi >>> 0;
  let dst = regs.edi >>> 0;
  const dstStrideExtra = regs.ebp >>> 0;
  const srcStrideExtra = regs.edx >>> 0;
  const bytes = heap.bytes;
  const N = bytes.length;

  // Row counter in EAX bits 15..8 (ah).
  let rowsRemaining = (regs.eax >>> 8) & 0xff;

  do {
    if (flagRemap && !flagTint) {
      for (let i = 0; i < cols; i++) {
        const s = bytes[(src + i) >>> 0];
        if (s !== 0) {
          const ra = (remapBase + s) >>> 0;
          bytes[(dst + i) >>> 0] = ra < N ? bytes[ra] : 0;
        }
      }
    } else if (!flagRemap && flagTint) {
      for (let i = 0; i < cols; i++) {
        const s = bytes[(src + i) >>> 0];
        if (s !== 0) {
          const d = bytes[(dst + i) >>> 0];
          const ra = (remapBase + d) >>> 0;
          bytes[(dst + i) >>> 0] = ra < N ? bytes[ra] : 0;
        }
      }
    } else {
      if (cols >= 8) bytes.set(bytes.subarray(src, src + cols), dst);
      else for (let i = 0; i < cols; i++) bytes[(dst + i) >>> 0] = bytes[(src + i) >>> 0];
    }
    dst = (dst + cols + dstStrideExtra) >>> 0;
    src = (src + cols + srcStrideExtra) >>> 0;
    rowsRemaining = (rowsRemaining - 1) & 0xff;
  } while (rowsRemaining !== 0);
}

// ===========================================================================
// LZ pre-pass: expand a flag-2 (compressed) sprite into DAT_LZ_SCRATCH so the
// row blitter can read it linearly. Verified against asm at 0x9b45e8-0x9b4659.
// Per record: hdr<0x80 → literal copy of `hdr` bytes; hdr≥0x80 → back-ref of
// `-(int8(hdr)>>3)` bytes from `scratch[-((hdr<<8|next)&0x7ff)]`.
// ===========================================================================
function _expandLZ(heap, srcPtr, srcWxH) {
  let remaining = srcWxH & 0xffff;
  let s = srcPtr >>> 0;
  let d = DAT_LZ_SCRATCH;
  while (remaining !== 0) {
    const hdr = heap.u8(s);
    if (hdr >= 0x80) {
      // back-reference (run-length with offset). Note: pbVar10 in the C is
      // `s+1` read BEFORE we step s past hdr, and `(hdr<<8 | *pbVar10) & 0x7ff`
      // is the back-distance from current dst pointer.
      const lo = heap.u8((s + 1) >>> 0);
      const distance = (CONCAT11(hdr, lo) & 0x7ff) >>> 0;
      const signedHdr = (hdr << 24) >> 24;
      const runLen = (-(signedHdr >> 3)) & 0xff;
      s = (s + 2) >>> 0;
      let from = (d - distance) >>> 0;
      remaining = (remaining - runLen) & 0xffff;
      for (let i = 0; i < runLen; i++) {
        heap.setU8(d, heap.u8(from) & 0xff);
        d = (d + 1) >>> 0;
        from = (from + 1) >>> 0;
      }
    } else {
      // literal: copy `hdr` bytes (note loop reads s, then advances s)
      const litLen = hdr & 0xff;
      remaining = (remaining - litLen) & 0xffff;
      for (let i = 0; i < litLen; i++) {
        s = (s + 1) >>> 0;  // matches C's `pbVar9 = pbVar9 + 1` in for-init
        heap.setU8(d, heap.u8(s) & 0xff);
        d = (d + 1) >>> 0;
      }
      s = (s + 1) >>> 0;  // post-loop advance past hdr byte
    }
  }
}

// ===========================================================================
// Outer dispatcher (was FUN_009b438b).
// ===========================================================================

/** Public sprite-blit entrypoint. Optional 0x60000000 remap pre-pass, then
 * delegates to dispatchSpriteWithRemap. Inputs from regs.ebx (sprite handle
 * + flags), regs.ecx/edx (x/y), regs.edi (DPI struct ptr). */
export function dispatchSprite(heap) {
  const ebx = regs.ebx >>> 0;
  heap.setU32(DAT_REMAP_CLASS, (ebx & 0x60000000) >>> 0);

  let palIdx;
  if (heap.u32(DAT_REMAP_CLASS) !== 0) {
    palIdx = (ebx >>> 0x11) & 0x7f;
    if ((ebx & 0x80000000) !== 0) {
      if (palIdx !== 0x27) {
        // Per-sprite-class remap pre-pass: load 12 palette-swizzle bytes
        // from the source class entry into DAT_009aa237/aa20e, then tail-
        // call dispatchSpriteWithRemap with DAT_PAL_REMAP = &DAT_009aa144.
        let entry = heap.u32(TBL_SPRITE_CLASS_BASE + heap.i32(TBL_PAL_INDEX + palIdx * 4) * 16) >>> 0;
        heap.setU32(DAT_REMAP_OUT1 + 0, heap.u32(entry + 0xf3));
        heap.setU32(DAT_REMAP_OUT1 + 4, heap.u32(entry + 0xf7));
        heap.setU32(DAT_REMAP_OUT1 + 8, heap.u32(entry + 0xfb));
        entry = heap.u32(TBL_SPRITE_CLASS_BASE + heap.i32(TBL_PAL_INDEX + ((ebx >>> 0x18) & 0x1f) * 4) * 16) >>> 0;
        heap.setU32(DAT_REMAP_OUT2 + 0, heap.u32(entry + 0xf3));
        heap.setU32(DAT_REMAP_OUT2 + 4, heap.u32(entry + 0xf7));
        heap.setU32(DAT_REMAP_OUT2 + 8, heap.u32(entry + 0xfb));
        heap.setU32(DAT_PAL_REMAP, PAL_REMAP_BASE);
        return dispatchSpriteWithRemap(heap);
      }
    }
    // Else: low-bit set, or palIdx===0x27. Point DAT_PAL_REMAP at the class
    // entry's own start (sprite-class table base + palIdx*16).
    const classEntry = heap.u32(TBL_SPRITE_CLASS_BASE + heap.i32(TBL_PAL_INDEX + palIdx * 4) * 16) >>> 0;
    heap.setU32(DAT_PAL_REMAP, classEntry);
  }
  return _blitOrRecurse(heap, ebx);
}

/** Public entrypoint: same as dispatchSprite, but with palette-remap already
 * wired (DAT_PAL_REMAP populated). Reached via dispatchSprite's tail-call
 * path or as a sub-sprite recursion target. */
export function dispatchSpriteWithRemap(heap) {
  return _blitOrRecurse(heap, regs.ebx >>> 0);
}

function _blitOrRecurse(heap, ebx) {
  // Scale sprite-class index. Asm: `and ebx,0x1ffff; shl ebx,4`. Mirror to
  // regs.ebx so any callee that reads it (notably FUN_009b8491 which uses
  // `[ebx + 0x8dc0c0]` directly) sees the scaled value.
  const spriteIdx = ebx & 0x1ffff;
  const classByteOff = (spriteIdx * 0x10) >>> 0;
  regs.ebx = classByteOff;

  const dpiPtr = regs.edi >>> 0;
  const zoom = heap.i16(dpiPtr + 0xe);

  if (zoom === 0) return _blitZoom0(heap, spriteIdx, classByteOff, dpiPtr);
  if (zoom !== 1) return (regs.eax = FUN_009b8491(heap)) >>> 0;

  // zoom == 1
  const sprFlags = heap.u16(TBL_SPRITE_CLASS_BASE + 0xc + classByteOff);
  if ((sprFlags & 0x20) !== 0) return regs.eax >>> 0;
  if ((sprFlags & 0x10) !== 0) return _zoomHalveAndRecurse(heap, classByteOff);
  return _blitZoom1(heap, spriteIdx, classByteOff, dpiPtr);
}

function _zoomHalveAndRecurse(heap, classByteOff) {
  const dpiPtr = regs.edi >>> 0;
  heap.setI16(dpiPtr + 0xe, (heap.i16(dpiPtr + 0xe) - 1) & 0xffff);
  heap.setI16(dpiPtr + 4,  (heap.i16(dpiPtr + 4)  >> 1) & 0xffff);
  heap.setI16(dpiPtr + 6,  (heap.i16(dpiPtr + 6)  >> 1) & 0xffff);
  heap.setI16(dpiPtr + 8,  (heap.i16(dpiPtr + 8)  >> 1) & 0xffff);
  heap.setI16(dpiPtr + 10, (heap.i16(dpiPtr + 10) >> 1) & 0xffff);
  regs.ebx = heap.u16(classByteOff + 0x008dc0c2) >>> 0;  // sub-sprite handle
  regs.ecx = (((regs.ecx << 16) >> 16) >> 1) & 0xffff;
  regs.edx = (((regs.edx << 16) >> 16) >> 1) & 0xffff;
  const ret = (regs.eax = dispatchSpriteWithRemap(heap)) >>> 0;
  heap.setI16(dpiPtr + 0xe, (heap.i16(dpiPtr + 0xe) + 1) & 0xffff);
  heap.setI16(dpiPtr + 4,  (heap.i16(dpiPtr + 4)  << 1) & 0xffff);
  heap.setI16(dpiPtr + 6,  (heap.i16(dpiPtr + 6)  << 1) & 0xffff);
  heap.setI16(dpiPtr + 8,  (heap.i16(dpiPtr + 8)  << 1) & 0xffff);
  heap.setI16(dpiPtr + 10, (heap.i16(dpiPtr + 10) << 1) & 0xffff);
  return ret;
}

// Load the 4 sprite-class fields into the scratch globals and return the
// sign-extended yOffset (top half of the X/Y dword).
function _loadSpriteFields(heap, spriteIdx, classByteOff) {
  const srcBase  = heap.u32(TBL_SPRITE_CLASS_BASE + (spriteIdx * 4) * 4) >>> 0;
  const whPack   = heap.u32(TBL_SPRITE_CLASS_BASE + 4 + classByteOff) >>> 0;
  const xyPack   = heap.u32(TBL_SPRITE_CLASS_BASE + 8 + classByteOff) >>> 0;
  const sprFlags = heap.u32(TBL_SPRITE_CLASS_BASE + 0xc + classByteOff) >>> 0;
  const sprYOff  = ((xyPack >>> 16) << 16) >> 16;
  heap.setU32(DAT_SPR_X_I16, xyPack);
  heap.setU32(DAT_SPR_FLAGS, sprFlags);
  heap.setU32(DAT_SRC_W_I16,   (whPack << 16) >> 16);
  heap.setU32(DAT_SRC_H_I16,  ((whPack >>> 16) << 16) >> 16);
  heap.setU32(DAT_SRC_BASE,    srcBase);
  heap.setU32(DAT_SRC_WH_PACK, whPack);  // also keep packed form
  return sprYOff;
}

function _blitZoom0(heap, spriteIdx, classByteOff, dpiPtr) {
  const sprYOff = _loadSpriteFields(heap, spriteIdx, classByteOff);
  const sprFlags = heap.u32(DAT_SPR_FLAGS) >>> 0;
  if ((sprFlags & 4) !== 0) return _blitZoom0Rle(heap, dpiPtr, sprYOff);
  return _blitZoom0Bitmap(heap, dpiPtr, sprYOff);
}

// Zoom-0 RLE path. After clip-rect setup, calls decodeRleRows.
function _blitZoom0Rle(heap, dpiPtr, sprYOff) {
  const inCX = regs.ecx & 0xffff;
  const inDX = regs.edx & 0xffff;
  let uVar4 = CONCAT22(sprYOff, heap.u32(DAT_SRC_H_I16)) >>> 0;
  heap.setU32(DAT_ROW_SKIP, 0);
  heap.setU32(DAT_ROW_COUNT, heap.u32(DAT_SRC_H_I16) >>> 0);
  let topDelta = ((inDX + sprYOff) - heap.i16(dpiPtr + 6)) & 0xffff;
  if (topDelta < 0) {
    heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_SRC_H_I16) + topDelta) >>> 0);
    if (heap.u32(DAT_ROW_COUNT) < 0) { heap.setU32(DAT_ROW_SKIP, 0); return uVar4; }
    if (heap.u32(DAT_ROW_COUNT) === 0) { heap.setU32(DAT_ROW_SKIP, 0); return uVar4; }
    heap.setU32(DAT_ROW_SKIP, (-topDelta) >>> 0);
    topDelta = 0;
  } else {
    uVar4 = (((heap.i16(dpiPtr + 8) + heap.i16(dpiPtr + 0xc)) << 16 >> 16) * (topDelta | 0)) >>> 0;
  }
  let sVar2 = heap.u32(DAT_ROW_COUNT) & 0xffff;
  let sVar6 = ((topDelta + heap.u32(DAT_ROW_COUNT)) - heap.i16(dpiPtr + 10)) & 0xffff;
  if (sVar6 === 0 || ((topDelta + heap.u32(DAT_ROW_COUNT)) << 16 >> 16) < heap.i16(dpiPtr + 10) ||
      (heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_ROW_COUNT) - sVar6) >>> 0),
       heap.u32(DAT_ROW_COUNT) !== 0 && sVar6 <= sVar2)) {
    uVar4 = CONCAT22((uVar4 >>> 0x10) << 16 >> 16, heap.u32(DAT_SRC_W_I16)) >>> 0;
    heap.setU32(DAT_COL_SKIP, 0);
    heap.setU32(DAT_COL_COUNT, heap.u32(DAT_SRC_W_I16) >>> 0);
    let leftDelta = ((inCX + heap.u32(DAT_SPR_X_I16)) - heap.i16(dpiPtr + 4)) & 0xffff;
    if (leftDelta < 0) {
      heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_SRC_W_I16) + leftDelta) >>> 0);
      if (heap.u32(DAT_COL_COUNT) < 0) { heap.setU32(DAT_COL_SKIP, 0); return uVar4; }
      if (heap.u32(DAT_COL_COUNT) === 0) { heap.setU32(DAT_COL_SKIP, 0); return uVar4; }
      heap.setU32(DAT_COL_SKIP, (-(leftDelta | 0)) >>> 0);
      leftDelta = 0;
    }
    sVar2 = heap.u32(DAT_COL_COUNT) & 0xffff;
    sVar6 = ((leftDelta + heap.u32(DAT_COL_COUNT)) - heap.i16(dpiPtr + 8)) & 0xffff;
    if (sVar6 === 0 || ((leftDelta + heap.u32(DAT_COL_COUNT)) << 16 >> 16) < heap.i16(dpiPtr + 8) ||
        (heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_COL_COUNT) - sVar6) >>> 0),
         heap.u32(DAT_COL_COUNT) !== 0 && sVar6 <= sVar2)) {
      heap.setU32(DAT_ROW_STRIDE, (heap.i16(dpiPtr + 8) + heap.i16(dpiPtr + 0xc)) >>> 0);
      // Pre-compute dst row pointer = *DPI + topDelta_yoff_bytes + leftDelta_xoff.
      regs.ebp = dpiPtr >>> 0;
      regs.esi = heap.u32(DAT_SRC_BASE) >>> 0;
      regs.edi = (heap.u32(dpiPtr) + uVar4 + (leftDelta << 16 >> 16)) >>> 0;
      uVar4 = (regs.eax = decodeRleRows(heap)) >>> 0;
      regs.edi = dpiPtr >>> 0;
      heap.setU32(DAT_SRC_WH_PACK, heap.u32(DAT_SRC_W_I16) >>> 0);  // write-back srcW
    }
  }
  return uVar4;
}

// Zoom-0 bitmap path. Optional LZ-expand, then decodeBitmapRows.
function _blitZoom0Bitmap(heap, dpiPtr, sprYOff) {
  const inCX = regs.ecx & 0xffff;
  const inDX = regs.edx & 0xffff;
  const srcW = heap.u32(DAT_SRC_W_I16) >>> 0;
  const srcH = heap.u32(DAT_SRC_H_I16) >>> 0;
  const srcBaseOrig = heap.u32(DAT_SRC_BASE) >>> 0;
  let uVar3 = CONCAT22(sprYOff, heap.u32(DAT_SRC_H_I16)) >>> 0;
  heap.setU32(DAT_ROW_COUNT, heap.u32(DAT_SRC_H_I16) >>> 0);
  let topDelta = ((inDX + sprYOff) - heap.i16(dpiPtr + 6)) & 0xffff;
  let _dstYOff = 0, _srcYOff = 0, _srcXSkip = 0;
  if ((topDelta << 16 >> 16) < 0) {
    heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_SRC_H_I16) + topDelta) >>> 0);
    if (heap.u32(DAT_ROW_COUNT) < 0) return uVar3;
    if (heap.u32(DAT_ROW_COUNT) === 0) return uVar3;
    uVar3 = (((heap.u32(DAT_SRC_W_I16) & 0xffff) * ((0 >>> 0) - topDelta)) & 0xffff) >>> 0;
    _srcYOff = ((heap.u32(DAT_SRC_W_I16) & 0xffff) * ((-((topDelta << 16) >> 16)) & 0xffff)) & 0xffff;
    topDelta = 0;
  } else {
    uVar3 = (((heap.i16(dpiPtr + 8) + heap.i16(dpiPtr + 0xc)) >>> 0) * topDelta) >>> 0;
    _dstYOff = uVar3 & 0xffff;
  }
  let sVar4 = heap.u32(DAT_ROW_COUNT) & 0xffff;
  let sVar2 = ((topDelta + heap.u32(DAT_ROW_COUNT)) - heap.i16(dpiPtr + 10)) & 0xffff;
  if (sVar2 === 0 || ((topDelta + heap.u32(DAT_ROW_COUNT)) << 16 >> 16) < heap.i16(dpiPtr + 10) ||
      (heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_ROW_COUNT) - sVar2) >>> 0),
       heap.u32(DAT_ROW_COUNT) !== 0 && sVar2 <= sVar4)) {
    heap.setU32(DAT_COL_COUNT, heap.u32(DAT_SRC_W_I16) >>> 0);
    heap.setU32(DAT_ROW_STRIDE, ((heap.i16(dpiPtr + 8) - heap.u32(DAT_SRC_W_I16)) + heap.i16(dpiPtr + 0xc)) >>> 0);
    uVar3 = CONCAT22((uVar3 >>> 0x10) << 16 >> 16, heap.u32(DAT_ROW_STRIDE)) >>> 0;
    heap.setU32(DAT_COL_SKIP_B, 0);
    let leftDelta = ((inCX + heap.u32(DAT_SPR_X_I16)) - heap.i16(dpiPtr + 4)) & 0xffff;
    if (leftDelta < 0) {
      heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_SRC_W_I16) + leftDelta) >>> 0);
      if (heap.u32(DAT_COL_COUNT) < 0) { heap.setU32(DAT_COL_SKIP_B, 0); return uVar3; }
      if (heap.u32(DAT_COL_COUNT) === 0) { heap.setU32(DAT_COL_SKIP_B, 0); return uVar3; }
      heap.setU32(DAT_COL_SKIP_B, (-leftDelta) >>> 0);
      heap.setU32(DAT_ROW_STRIDE, (heap.u32(DAT_ROW_STRIDE) - leftDelta) >>> 0);
      _srcXSkip = (-((leftDelta << 16) >> 16)) & 0xffff;
      leftDelta = 0;
    }
    sVar4 = heap.u32(DAT_COL_COUNT) & 0xffff;
    sVar2 = ((leftDelta + heap.u32(DAT_COL_COUNT)) - heap.i16(dpiPtr + 8)) & 0xffff;
    if (sVar2 !== 0 && heap.i16(dpiPtr + 8) <= ((leftDelta + heap.u32(DAT_COL_COUNT)) << 16 >> 16)) {
      heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_COL_COUNT) - sVar2) >>> 0);
      if (heap.u32(DAT_COL_COUNT) === 0 || sVar4 < sVar2) return uVar3;
      heap.setU32(DAT_COL_SKIP_B, (heap.u32(DAT_COL_SKIP_B) + sVar2) >>> 0);
      heap.setU32(DAT_ROW_STRIDE, (heap.u32(DAT_ROW_STRIDE) + sVar2) >>> 0);
    }
    const dpiPx = (heap.u32(dpiPtr) + _dstYOff + (leftDelta & 0xffff)) >>> 0;
    const srcOff = ((_srcYOff - _srcXSkip) | 0) & 0xffffffff;
    const srcPx = (srcBaseOrig + srcOff) >>> 0;
    _setupBitmapRegs(heap, dpiPx);
    const sprFlags = heap.u32(DAT_SPR_FLAGS) >>> 0;
    if ((sprFlags & 2) !== 0) {
      _expandLZ(heap, srcBaseOrig, srcW * srcH);
      regs.esi = (DAT_LZ_SCRATCH + srcOff) >>> 0;
      uVar3 = (regs.eax = decodeBitmapRows(heap)) >>> 0;
      regs.edi = dpiPtr >>> 0;
      return uVar3 || 0;  // decodeBitmapRows returns undefined; match return type
    }
    regs.esi = srcPx;
    uVar3 = (regs.eax = decodeBitmapRows(heap)) >>> 0;
    regs.edi = dpiPtr >>> 0;
    heap.setU32(DAT_SRC_WH_PACK, heap.u32(DAT_SRC_W_I16) >>> 0);
  }
  return uVar3 || 0;
}

// Stage register inputs for the bitmap row decoder.
function _setupBitmapRegs(heap, dpiPx) {
  regs.ebp = heap.i16(DAT_ROW_STRIDE) >>> 0;
  regs.edx = heap.i16(DAT_COL_SKIP_B) >>> 0;
  regs.eax = ((heap.u8(DAT_ROW_COUNT) << 8) & 0xff00) >>> 0;
  regs.ebx = heap.u32(DAT_REMAP_CLASS) >>> 0;
  regs.edi = dpiPx;
}

// Zoom-1 dispatcher. Mirrors _blitZoom0 with /2 on coords and dispatches
// to cold zoom-1 helpers (still in ported/auto/).
function _blitZoom1(heap, spriteIdx, classByteOff, dpiPtr) {
  const sprYOff = _loadSpriteFields(heap, spriteIdx, classByteOff);
  const sprFlags = heap.u32(DAT_SPR_FLAGS) >>> 0;
  if ((sprFlags & 4) !== 0) return _blitZoom1Rle(heap, dpiPtr, sprYOff);
  return _blitZoom1Bitmap(heap, dpiPtr, sprYOff);
}

function _blitZoom1Rle(heap, dpiPtr, sprYOff) {
  const inCX = regs.ecx & 0xffff;
  const inDX = regs.edx & 0xffff;
  const sprFlags = heap.u32(DAT_SPR_FLAGS) >>> 0;
  let uVar4 = CONCAT22(sprYOff, heap.u32(DAT_SRC_H_I16)) >>> 0;
  heap.setU32(DAT_ROW_SKIP, 0);
  if ((sprFlags & 0x10000) !== 0) {
    uVar4 = CONCAT22(sprYOff, heap.u32(DAT_SRC_H_I16) - 1) >>> 0;
    if (((heap.u32(DAT_SRC_H_I16) - 1) << 16 >> 16) === 0) { heap.setU32(DAT_ROW_SKIP, 0); return uVar4; }
    heap.setU32(DAT_ROW_SKIP, 1);
  }
  heap.setU32(DAT_ROW_COUNT, uVar4 & 0xffff);
  let topDelta = ((inDX + sprYOff & 0xfffe) - heap.i16(dpiPtr + 6)) & 0xffff;
  let _dstYOff_C = 0;
  if ((topDelta << 16 >> 16) < 0) {
    heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_ROW_COUNT) + topDelta) >>> 0);
    if (heap.u32(DAT_ROW_COUNT) < 0) return uVar4;
    if (heap.u32(DAT_ROW_COUNT) === 0) return uVar4;
    heap.setU32(DAT_ROW_SKIP, (heap.u32(DAT_ROW_SKIP) - topDelta) >>> 0);
    topDelta = 0;
  } else {
    uVar4 = ((((heap.u16(dpiPtr + 8) >>> 1) + heap.i16(dpiPtr + 0xc)) << 16 >> 16) * (((topDelta >>> 1) << 16 >> 16) | 0)) >>> 0;
    _dstYOff_C = uVar4 & 0xffff;
  }
  let sVar4 = heap.u32(DAT_ROW_COUNT) & 0xffff;
  let sVar2 = ((topDelta + heap.u32(DAT_ROW_COUNT)) - heap.i16(dpiPtr + 10)) & 0xffff;
  if (sVar2 === 0 || ((topDelta + heap.u32(DAT_ROW_COUNT)) << 16 >> 16) < heap.i16(dpiPtr + 10) ||
      (heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_ROW_COUNT) - sVar2) >>> 0),
       heap.u32(DAT_ROW_COUNT) !== 0 && sVar2 <= sVar4)) {
    uVar4 = CONCAT22((uVar4 >>> 0x10) << 16 >> 16, heap.u32(DAT_SRC_W_I16)) >>> 0;
    heap.setU32(DAT_COL_SKIP, 0);
    heap.setU32(DAT_COL_COUNT, heap.u32(DAT_SRC_W_I16) >>> 0);
    let leftDelta = ((inCX + heap.u32(DAT_SPR_X_I16) & 0xfffe) - heap.i16(dpiPtr + 4)) & 0xffff;
    if (leftDelta < 0) {
      heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_SRC_W_I16) + leftDelta) >>> 0);
      if (heap.u32(DAT_COL_COUNT) < 0) { heap.setU32(DAT_COL_SKIP, 0); return uVar4; }
      if (heap.u32(DAT_COL_COUNT) === 0) { heap.setU32(DAT_COL_SKIP, 0); return uVar4; }
      heap.setU32(DAT_COL_SKIP, (-(leftDelta | 0)) >>> 0);
      leftDelta = 0;
    }
    sVar4 = heap.u32(DAT_COL_COUNT) & 0xffff;
    sVar2 = ((leftDelta + heap.u32(DAT_COL_COUNT)) - heap.i16(dpiPtr + 8)) & 0xffff;
    if (sVar2 === 0 || ((leftDelta + heap.u32(DAT_COL_COUNT)) << 16 >> 16) < heap.i16(dpiPtr + 8) ||
        (heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_COL_COUNT) - sVar2) >>> 0),
         heap.u32(DAT_COL_COUNT) !== 0 && sVar2 <= sVar4)) {
      heap.setU32(DAT_ROW_STRIDE, ((heap.u16(dpiPtr + 8) >>> 1) + heap.i16(dpiPtr + 0xc)) >>> 0);
      const _dstXOff_C = (leftDelta & 0xffff) >>> 1;
      regs.ebx = heap.u32(DAT_REMAP_CLASS) >>> 0;
      regs.esi = heap.u32(DAT_SRC_BASE) >>> 0;
      regs.ebp = dpiPtr >>> 0;
      regs.edi = (heap.u32(dpiPtr) + _dstYOff_C + _dstXOff_C) >>> 0;
      uVar4 = (regs.eax = FUN_009b6863(heap)) >>> 0;
      regs.edi = dpiPtr >>> 0;
      heap.setU32(DAT_SRC_WH_PACK, heap.u32(DAT_SRC_W_I16) >>> 0);
    }
  }
  return uVar4;
}

function _blitZoom1Bitmap(heap, dpiPtr, sprYOff) {
  const inCX = regs.ecx & 0xffff;
  const inDX = regs.edx & 0xffff;
  const sprFlags = heap.u32(DAT_SPR_FLAGS) >>> 0;
  const srcW = heap.u32(DAT_SRC_W_I16) >>> 0;
  const srcH = heap.u32(DAT_SRC_H_I16) >>> 0;
  const srcBaseOrig = heap.u32(DAT_SRC_BASE) >>> 0;
  let sVar2 = heap.u32(DAT_SRC_H_I16) & 0xffff;
  let _srcInterlace_D = 0;
  if ((sprFlags & 0x10000) !== 0) {
    sVar2 = (heap.u32(DAT_SRC_H_I16) - 1) & 0xffff;
    _srcInterlace_D = heap.u32(DAT_SRC_W_I16) & 0xffff;
  }
  let uVar3 = CONCAT22(sprYOff, sVar2) >>> 0;
  if (sVar2 === 0) return uVar3;
  let topDelta = ((inDX + sprYOff & 0xfffe) - heap.i16(dpiPtr + 6)) & 0xffff;
  let _dstYOff_D = 0, _srcYOff_D = 0, _srcXSkip_D = 0;
  if ((topDelta << 16 >> 16) < 0) {
    heap.setU32(DAT_ROW_COUNT, (sVar2 + topDelta) >>> 0);
    if (heap.u32(DAT_ROW_COUNT) < 0) return uVar3;
    if (heap.u32(DAT_ROW_COUNT) === 0) return uVar3;
    uVar3 = (((sprFlags & 0xffff) * ((0 >>> 0) - topDelta)) & 0xffff) >>> 0;
    _srcYOff_D = ((heap.u32(DAT_SRC_W_I16) & 0xffff) * ((-((topDelta << 16) >> 16)) & 0xffff)) & 0xffff;
    topDelta = 0;
  } else {
    uVar3 = (((heap.u16(dpiPtr + 8) >>> 1) + heap.i16(dpiPtr + 0xc)) >>> 0) * ((topDelta >>> 1) >>> 0) >>> 0;
    heap.setU32(DAT_ROW_COUNT, sVar2);
    _dstYOff_D = uVar3 & 0xffff;
  }
  let sVar4 = heap.u32(DAT_ROW_COUNT) & 0xffff;
  sVar2 = ((topDelta + heap.u32(DAT_ROW_COUNT)) - heap.i16(dpiPtr + 10)) & 0xffff;
  if (sVar2 === 0 || ((topDelta + heap.u32(DAT_ROW_COUNT)) << 16 >> 16) < heap.i16(dpiPtr + 10) ||
      (heap.setU32(DAT_ROW_COUNT, (heap.u32(DAT_ROW_COUNT) - sVar2) >>> 0),
       heap.u32(DAT_ROW_COUNT) !== 0 && sVar2 <= sVar4)) {
    heap.setU32(DAT_COL_COUNT, heap.u32(DAT_SRC_W_I16) >>> 0);
    heap.setU32(DAT_ROW_STRIDE, ((heap.u16(dpiPtr + 8) >>> 1) + heap.i16(dpiPtr + 0xc)) >>> 0);
    uVar3 = CONCAT22((uVar3 >>> 0x10) << 16 >> 16, heap.u32(DAT_ROW_STRIDE)) >>> 0;
    heap.setU32(DAT_COL_SKIP_B, 0);
    let leftDelta = ((inCX + heap.u32(DAT_SPR_X_I16) & 0xfffe) - heap.i16(dpiPtr + 4)) & 0xffff;
    if (leftDelta < 0) {
      heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_SRC_W_I16) + leftDelta) >>> 0);
      if (heap.u32(DAT_COL_COUNT) < 0) { heap.setU32(DAT_COL_SKIP_B, 0); return uVar3; }
      if (heap.u32(DAT_COL_COUNT) === 0) { heap.setU32(DAT_COL_SKIP_B, 0); return uVar3; }
      heap.setU32(DAT_COL_SKIP_B, (-leftDelta) >>> 0);
      _srcXSkip_D = (-((leftDelta << 16) >> 16)) & 0xffff;
      leftDelta = 0;
    }
    sVar4 = heap.u32(DAT_COL_COUNT) & 0xffff;
    sVar2 = ((leftDelta + heap.u32(DAT_COL_COUNT)) - heap.i16(dpiPtr + 8)) & 0xffff;
    if (sVar2 !== 0 && heap.i16(dpiPtr + 8) <= ((leftDelta + heap.u32(DAT_COL_COUNT)) << 16 >> 16)) {
      heap.setU32(DAT_COL_COUNT, (heap.u32(DAT_COL_COUNT) - sVar2) >>> 0);
      if (heap.u32(DAT_COL_COUNT) === 0 || sVar4 < sVar2) return uVar3;
      heap.setU32(DAT_COL_SKIP_B, (heap.u32(DAT_COL_SKIP_B) + sVar2) >>> 0);
    }
    const _dstXOff_D = (leftDelta & 0xffff) >>> 1;
    const dpiPx = (heap.u32(dpiPtr) + _dstYOff_D + _dstXOff_D) >>> 0;
    const srcOff = ((_srcInterlace_D + _srcYOff_D - _srcXSkip_D) | 0) & 0xffffffff;
    const srcPx = (srcBaseOrig + srcOff) >>> 0;
    _setupBitmapRegs(heap, dpiPx);
    if ((sprFlags & 2) !== 0) {
      _expandLZ(heap, srcBaseOrig, srcW * srcH);
      regs.esi = (DAT_LZ_SCRATCH + srcOff) >>> 0;
      uVar3 = (regs.eax = FUN_009b64ea(heap)) >>> 0;
      regs.edi = dpiPtr >>> 0;
      return uVar3;
    }
    regs.esi = srcPx;
    uVar3 = (regs.eax = FUN_009b64ea(heap)) >>> 0;
    regs.edi = dpiPtr >>> 0;
    heap.setU32(DAT_SRC_WH_PACK, heap.u32(DAT_SRC_W_I16) >>> 0);
  }
  return uVar3;
}
