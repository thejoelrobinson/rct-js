// runtime/canvas.js — present a DIB section to a <canvas>.
//
// Every game frame the binary fills a DIB section (8-bit palette indices)
// allocated by gdi32.js:CreateDIBSection. presentFrame() reads the bytes
// from heap.bytes at dib.bufAddr, applies state.capturedPalette (RGBA), and
// writes the result via putImageData.
//
// Returns true if a frame was presented, false if no DIB exists yet (boot
// hasn't created one). Cheap to call every rAF.

import { state } from "./win32/context.js";
import { defaultPalette } from "../harness/csg.js";

let _imageData = null;     // cached ImageData reused frame-to-frame
let _imageDataKey = "";    // dimensions key — reallocate on size change

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
  }
  const out = _imageData.data;     // Uint8ClampedArray RGBA
  const src = heap.bytes;
  for (let y = 0; y < height; y++) {
    const srcRow = topDown ? y : (height - 1 - y);
    const srcOff = bufAddr + srcRow * stride;
    const dstOff = y * width * 4;
    for (let x = 0; x < width; x++) {
      const idx = src[srcOff + x] * 4;
      const dst = dstOff + x * 4;
      out[dst    ] = palette[idx    ];
      out[dst + 1] = palette[idx + 1];
      out[dst + 2] = palette[idx + 2];
      out[dst + 3] = 255;
    }
  }
  ctx.putImageData(_imageData, 0, 0);
  return true;
}
