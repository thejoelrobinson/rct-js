// runtime/canvas.js — present a DIB section to a <canvas>.
//
// Every game frame the binary fills a DIB section (8-bit palette indices)
// allocated by gdi32.js:CreateDIBSection. presentFrame() reads the bytes
// from heap.bytes at dib.bufAddr, applies state.capturedPalette (RGBA), and
// writes the result via putImageData.
//
// After the main blit, an in-game cursor sprite is overlaid at the live
// inputState.cursorX/Y location (RCT1 normally renders this each frame via
// its native pipeline; that path is gated behind unreachable code in our
// harness, so we draw it directly here as a post-blit overlay).
//
// Returns true if a frame was presented, false if no DIB exists yet (boot
// hasn't created one). Cheap to call every rAF.

import { state, getVfs } from "./win32/context.js";
import { defaultPalette, loadCsg, decodeSprite } from "../harness/csg.js";

// Default arrow cursor sprite index in csg1.dat (RCT1/OpenRCT2 convention —
// SPR_CURSOR_ARROW lives early in the cursor block of csg1). 5320 is the
// arrow in the OpenRCT2 sprite table; we keep this configurable via
// state.cursorSpriteId so other code (or tests) can swap it.
const DEFAULT_CURSOR_SPRITE_ID = 5320;

let _csg = null;             // cached { csg1Bytes, csg1iBytes, indexCount }
let _cursorSprite = null;    // cached decoded sprite { width, height, pixels, xOffset, yOffset }
let _cursorSpriteIdLoaded = -1;

// Lazily load csg1.dat/csg1i.dat from the VFS and decode the cursor sprite.
// Returns the decoded sprite or null if the assets aren't in the VFS (which
// is the case in some test harnesses).
function getCursorSprite() {
  const wantId = (state.cursorSpriteId ?? DEFAULT_CURSOR_SPRITE_ID) | 0;
  if (_cursorSprite && _cursorSpriteIdLoaded === wantId) return _cursorSprite;
  if (!_csg) {
    const vfs = getVfs();
    const csg1 = vfs && vfs.get("csg1.dat");
    const csg1i = vfs && vfs.get("csg1i.dat");
    if (!csg1 || !csg1i || csg1.length === 0 || csg1i.length === 0) return null;
    try { _csg = loadCsg(csg1, csg1i); } catch (_) { return null; }
  }
  try {
    _cursorSprite = decodeSprite(_csg, wantId);
    _cursorSpriteIdLoaded = wantId;
  } catch (_) { _cursorSprite = null; }
  return _cursorSprite;
}

// Blit the cursor sprite directly into an ImageData buffer at (cx, cy).
// Honors the sprite's xOffset/yOffset (the hotspot is at +xOffset/+yOffset
// inside the sprite's bitmap). Palette index 0xff = transparent; 0 is
// treated as transparent too (RCT1 sprite convention for cursor mask).
function drawCursorOverlay(imageData, palette, sprite, cx, cy) {
  const W = imageData.width, H = imageData.height;
  const data = imageData.data;
  const sx0 = (cx + sprite.xOffset) | 0;
  const sy0 = (cy + sprite.yOffset) | 0;
  const sw = sprite.width, sh = sprite.height;
  const pixels = sprite.pixels;
  for (let py = 0; py < sh; py++) {
    const dy = sy0 + py;
    if (dy < 0 || dy >= H) continue;
    const rowSrc = py * sw;
    const rowDst = dy * W * 4;
    for (let px = 0; px < sw; px++) {
      const dx = sx0 + px;
      if (dx < 0 || dx >= W) continue;
      const idx = pixels[rowSrc + px];
      if (idx === 0xff || idx === 0) continue;
      const po = idx * 4;
      const off = rowDst + dx * 4;
      data[off]     = palette[po];
      data[off + 1] = palette[po + 1];
      data[off + 2] = palette[po + 2];
      data[off + 3] = 255;
    }
  }
}

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
  // Cursor overlay — draw the in-game cursor sprite at the live cursor
  // coords before pushing to the canvas. inputState lives at state.inputState
  // (populated by runtime/input.js). If the VFS doesn't have csg1.dat (e.g.
  // bare unit tests) this silently no-ops.
  const input = state.inputState;
  if (input) {
    const sprite = getCursorSprite();
    if (sprite) {
      const cx = Math.max(0, Math.min(width - 1, input.cursorX | 0));
      const cy = Math.max(0, Math.min(height - 1, input.cursorY | 0));
      drawCursorOverlay(_imageData, palette, sprite, cx, cy);
    } else {
      // Fallback: tiny solid square so the cursor is at least visible even
      // without csg1.dat decoded. Uses palette index 0xfe (typically white).
      const cx = Math.max(0, Math.min(width - 1, input.cursorX | 0));
      const cy = Math.max(0, Math.min(height - 1, input.cursorY | 0));
      const r = palette[0xfe * 4], g = palette[0xfe * 4 + 1], b = palette[0xfe * 4 + 2];
      const out = _imageData.data;
      for (let dy = -2; dy <= 2; dy++) {
        const yy = cy + dy;
        if (yy < 0 || yy >= height) continue;
        for (let dx = -2; dx <= 2; dx++) {
          const xx = cx + dx;
          if (xx < 0 || xx >= width) continue;
          const off = (yy * width + xx) * 4;
          out[off] = r; out[off + 1] = g; out[off + 2] = b; out[off + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(_imageData, 0, 0);
  return true;
}

// Test/debug hook: reset cached sprite so the next presentFrame() reloads
// it from VFS. Useful if assets are swapped at runtime.
export function _resetCursorCache() {
  _csg = null;
  _cursorSprite = null;
  _cursorSpriteIdLoaded = -1;
}
