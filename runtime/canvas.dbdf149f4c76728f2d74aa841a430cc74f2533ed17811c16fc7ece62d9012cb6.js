// runtime/canvas.js — present a DIB section to a <canvas>.
//
// Every game frame the binary fills a DIB section (8-bit palette indices)
// allocated by gdi32.js:CreateDIBSection. presentFrame() reads the bytes
// from heap.bytes at dib.bufAddr, applies state.capturedPalette (RGBA), and
// writes the result via putImageData.
//
// The browser displays the pointer separately; presenting a game frame must
// not add artwork to it. Windows cursor resources are not CSG sprite IDs.
//
// Returns true if a frame was presented, false if no DIB exists yet (boot
// hasn't created one). Cheap to call every rAF.

import { state } from "./win32/context.js";
import { defaultPalette } from "../harness/csg.js";

let _imageData = null;     // cached ImageData reused frame-to-frame
let _imageDataKey = "";    // dimensions key — reallocate on size change
let _imageData32 = null;   // Uint32Array view over _imageData.data (same buffer)
let _palLut = new Uint32Array(256);  // palette index → packed RGBA dword
// ImageData bytes are RGBA in memory order; pack the dword to match the
// host's endianness (every realistic target is little-endian, but be exact).
const _isLE = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;

// Draws a placeholder frame with status text. Used while the binary is
// running but hasn't allocated a DIB section yet — gives visual confirmation
// that the runtime is alive and ticking.
export function presentBootStatus(canvas, ctx, lines) {
  if (canvas.width !== 640 || canvas.height !== 480) {
    canvas.width = 640;
    canvas.height = 480;
  }
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#9ec5e8";
  ctx.font = "14px monospace";
  ctx.fillText("RCT-js — native runtime (no x86 interpreter)", 20, 30);
  ctx.fillStyle = "#888";
  let y = 60;
  for (const line of lines) { ctx.fillText(line, 20, y); y += 18; }
}

export function presentFrame(heap, canvas, ctx) {
  // Pick the DDraw surface with the most non-zero content. Primary is the
  // intended target, but the binary often draws to a back-buffer first
  // (intending a Blt that may not have fired yet). Counting bytes finds
  // whichever has the actual frame.
  let width, height, stride, bufAddr, topDown = true;
  let bestNonZero = 0;
  let bestSurface = null;
  for (const surf of state.ddrawSurfaces.values()) {
    if (surf.width < 320 || surf.height < 240) continue;   // skip cursor/icons
    let nz = 0;
    const sz = surf.width * surf.height;
    // Cheap density estimate: sample 256 stride-spaced bytes.
    const stride256 = Math.max(1, sz >> 8);
    for (let i = 0; i < sz; i += stride256) if (heap.bytes[surf.bytes + i] !== 0) nz++;
    // Primary tie-breaker: if anything else has more content, use that.
    if (nz > bestNonZero || (bestSurface === null && surf.isPrimary)) {
      bestNonZero = nz;
      bestSurface = surf;
    }
  }
  if (bestSurface) {
    width = bestSurface.width; height = bestSurface.height;
    stride = bestSurface.pitch; bufAddr = bestSurface.bytes;
  }
  if (width === undefined && state.dibSections.length > 0) {
    const dib = state.dibSections[state.dibSections.length - 1];
    if (dib.bitCount !== 8) return false;
    width = dib.width; height = dib.height;
    stride = dib.stride; bufAddr = dib.bufAddr;
    topDown = dib.topDown;
  }
  if (width === undefined) return false;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  // capturedPalette can be a near-empty array (binary set only a few entries
  // before our snapshot) — fall back to defaultPalette() if fewer than 32
  // unique non-black entries exist.
  let palette = state.capturedPalette;
  if (palette) {
    let nonBlackEntries = 0;
    for (let i = 0; i < 256; i++) {
      if (palette[i*4] || palette[i*4+1] || palette[i*4+2]) nonBlackEntries++;
    }
    if (nonBlackEntries < 32) palette = defaultPalette();
  } else {
    palette = defaultPalette();
  }
  const key = `${width}x${height}`;
  if (_imageDataKey !== key) {
    _imageData = ctx.createImageData(width, height);
    _imageDataKey = key;
    // Word-sized view over the same backing buffer — lets the blit below
    // write one packed RGBA dword per pixel instead of 4 byte stores.
    _imageData32 = new Uint32Array(_imageData.data.buffer, _imageData.data.byteOffset, width * height);
  }
  // Rebuild the palette LUT each frame (256 entries — trivially cheap, and
  // the palette can be animated by the game). Packs each entry as a
  // little-endian RGBA dword: r | g<<8 | b<<16 | 0xff<<24.
  const lut = _palLut;
  if (_isLE) {
    for (let i = 0, p = 0; i < 256; i++, p += 4) {
      lut[i] = (palette[p] | (palette[p + 1] << 8) | (palette[p + 2] << 16) | 0xff000000) >>> 0;
    }
  } else {
    for (let i = 0, p = 0; i < 256; i++, p += 4) {
      lut[i] = ((palette[p] << 24) | (palette[p + 1] << 16) | (palette[p + 2] << 8) | 0xff) >>> 0;
    }
  }
  const out32 = _imageData32;
  const src = heap.bytes;
  for (let y = 0; y < height; y++) {
    const srcRow = topDown ? y : (height - 1 - y);
    const srcOff = bufAddr + srcRow * stride;
    let dst = y * width;
    for (let x = 0; x < width; x++, dst++) {
      out32[dst] = lut[src[srcOff + x]];
    }
  }
  ctx.putImageData(_imageData, 0, 0);
  return true;
}
