// runtime/win32/gdi32.js — DC, palette, DIB section, blits, fonts.
//
// Lifted from harness/shims.js (lines 588-728). Behaviours unchanged except
// cpu.memory[] → heap.bytes[]/heap.uX(). The most important piece is
// CreateDIBSection: every game frame, the binary fills a DIB buffer with
// 8-bit palette indices; runtime/canvas.js blits that to the <canvas> using
// the captured palette. Real rendering happens here, just deferred to the
// next requestAnimationFrame.

import { state } from "./context.js";
import { heapAlloc } from "./kernel32.js";

// ---- DC ----
// (GetDC / ReleaseDC live in user32.js — they're USER32 imports.)

export function CreateCompatibleDC(heap, hDC) { return 0x20100000; }
export function DeleteDC(heap, hDC) { return 1; }

export function GetDeviceCaps(heap, hDC, nIndex) {
  // Common indices: 8 = HORZRES (800), 10 = VERTRES (600), 12 = BITSPIXEL (8),
  // 14 = PLANES (1), 88 = LOGPIXELSX (96), 90 = LOGPIXELSY (96).
  switch (nIndex) {
    case 8:  return 800;
    case 10: return 600;
    case 12: return 8;
    case 14: return 1;
    case 88:
    case 90: return 96;
    case 38: return 256;   // SIZEPALETTE
    case 39: return 20;    // NUMRESERVED
    default: return 0;
  }
}

// ---- Stock objects / generic GDI handles ----

export function GetStockObject(heap, fnObject) { return 0x30000100 | (fnObject & 0xff); }
export function GetObjectA(heap, hgdiobj, cbBuffer, lpvObject) { return 0; }
export function SelectObject(heap, hDC, hgdiobj) { return hgdiobj; }
export function DeleteObject(heap, hObject) { return 1; }

export function CreateFontIndirectA(heap, lplf) { return 0x30000200; }
export function CreateFontA(heap, ...args)       { return 0x30000201; }
export function CreateRectRgn(heap, x1, y1, x2, y2) { return 0x30000400; }
export function GetRegionData(heap, hRgn, dwCount, lpRgnData) { return 0; }

// ---- Palette ----

export function CreatePalette(heap, lpLogPalette) {
  // LOGPALETTE: WORD palVersion(0), WORD palNumEntries(2), PALETTEENTRY palPalEntry[](4)
  if (!lpLogPalette) return 0x30000500;
  const num = heap.u16(lpLogPalette + 2);
  if (num > 0) {
    if (!state.capturedPalette) {
      state.capturedPalette = new Uint8ClampedArray(256 * 4);
      for (let i = 0; i < 256; i++) state.capturedPalette[i*4 + 3] = i === 0 ? 0 : 255;
    }
    // Merge: only entries the binary specified, and only if non-black.
    // Pre-populated default-palette entries for unset slots survive — see
    // runtime/harness.js for why (binary's resource-loader is broken).
    for (let i = 0; i < num && i < 256; i++) {
      const r = heap.u8(lpLogPalette + 4 + i*4 + 0);
      const g = heap.u8(lpLogPalette + 4 + i*4 + 1);
      const b = heap.u8(lpLogPalette + 4 + i*4 + 2);
      if (r || g || b) {
        state.capturedPalette[i*4 + 0] = r;
        state.capturedPalette[i*4 + 1] = g;
        state.capturedPalette[i*4 + 2] = b;
        state.capturedPalette[i*4 + 3] = i === 0 ? 0 : 255;
      }
    }
    state.paletteSnapshots++;
  }
  return 0x30000500;
}

export function SetPaletteEntries(heap, hPal, iStart, cEntries, lpEntries) {
  if (!state.capturedPalette) {
    state.capturedPalette = new Uint8ClampedArray(256 * 4);
    for (let i = 0; i < 256; i++) state.capturedPalette[i*4 + 3] = 255;
  }
  for (let i = 0; i < cEntries; i++) {
    const idx = iStart + i;
    if (idx >= 256) break;
    state.capturedPalette[idx*4 + 0] = heap.u8(lpEntries + i*4 + 0);
    state.capturedPalette[idx*4 + 1] = heap.u8(lpEntries + i*4 + 1);
    state.capturedPalette[idx*4 + 2] = heap.u8(lpEntries + i*4 + 2);
    state.capturedPalette[idx*4 + 3] = 255;
  }
  state.paletteSnapshots++;
  return cEntries;
}

export function GetPaletteEntries(heap, hPal, iStart, cEntries, lpEntries) {
  if (!state.capturedPalette) return 0;
  const n = Math.min(cEntries, 256 - iStart);
  for (let i = 0; i < n; i++) {
    const idx = iStart + i;
    heap.setU8(lpEntries + i*4 + 0, state.capturedPalette[idx*4 + 0]);
    heap.setU8(lpEntries + i*4 + 1, state.capturedPalette[idx*4 + 1]);
    heap.setU8(lpEntries + i*4 + 2, state.capturedPalette[idx*4 + 2]);
    heap.setU8(lpEntries + i*4 + 3, 0);
  }
  return n;
}

export function AnimatePalette(heap, hPal, iStartIndex, cEntries, ppe) {
  // Same effect as SetPaletteEntries for our purposes.
  return SetPaletteEntries(heap, hPal, iStartIndex, cEntries, ppe);
}
export function ResizePalette(heap, hPal, nEntries) { return 1; }
export function SelectPalette(heap, hDC, hPal, bForceBkgd) { return 0x30000500; }
export function RealizePalette(heap, hDC) { return 256; }
export function UpdateColors(heap, hDC) { return 1; }

// ---- DIB ----

export function CreateDIBSection(heap, hdc, pbmi, iUsage, ppvBits, hSection, dwOffset) {
  // BITMAPINFOHEADER (40 bytes): +0 dwSize, +4 width, +8 height,
  // +12 planes, +14 bitCount, +16 compression, +20 sizeImage, ...
  const width    = heap.i32(pbmi + 4);
  const heightS  = heap.i32(pbmi + 8);
  const height   = Math.abs(heightS);
  const bitCount = heap.u16(pbmi + 14);
  const w = width || 800;
  const h = height || 600;
  const bc = bitCount || 8;
  const stride = ((w * bc + 31) >> 5) * 4;     // DIB rows are dword-aligned
  const bytes = stride * h;
  const buf = heapAlloc(bytes);
  if (ppvBits) heap.setU32(ppvBits, buf);
  state.dibSections.push({
    width: w, height: h, bitCount: bc, stride,
    bufAddr: buf, topDown: heightS < 0,
  });
  return 0x30000300 + state.dibSections.length;
}

export function SetDIBColorTable(heap, hDC, uStartIndex, cEntries, pColors) {
  // Update the captured palette with the BGR-format DIB color table.
  // BITMAPINFO PALETTEENTRY layout matches RGBQUAD: BGRA per entry.
  if (!state.capturedPalette) {
    state.capturedPalette = new Uint8ClampedArray(256 * 4);
    for (let i = 0; i < 256; i++) state.capturedPalette[i*4 + 3] = 255;
  }
  for (let i = 0; i < cEntries; i++) {
    const idx = uStartIndex + i;
    if (idx >= 256) break;
    // RGBQUAD: rgbBlue, rgbGreen, rgbRed, rgbReserved
    state.capturedPalette[idx*4 + 2] = heap.u8(pColors + i*4 + 0); // B
    state.capturedPalette[idx*4 + 1] = heap.u8(pColors + i*4 + 1); // G
    state.capturedPalette[idx*4 + 0] = heap.u8(pColors + i*4 + 2); // R
    state.capturedPalette[idx*4 + 3] = 255;
  }
  state.paletteSnapshots++;
  return cEntries;
}
export function GetDIBColorTable(heap, hDC, uStartIndex, cEntries, pColors) { return cEntries; }

export function StretchDIBits(heap, ...args) { return 0; }
export function SetDIBitsToDevice(heap, ...args) { return 0; }

// ---- Drawing primitives (stubbed; rendering happens via DIB → canvas) ----

export function BitBlt(heap, hDest, x, y, w, h, hSrc, x1, y1, dwRop) { return 1; }
export function StretchBlt(heap, ...args) { return 1; }
export function GetPixel(heap, hDC, x, y) { return 0; }
export function SetPixel(heap, hDC, x, y, color) { return color; }
export function PatBlt(heap, hDC, x, y, w, h, dwRop) { return 1; }
export function FillRect(heap, hDC, lprc, hbr) { return 1; }
export function MoveToEx(heap, hDC, x, y, lpPoint) { return 1; }
export function LineTo(heap, hDC, x, y) { return 1; }
export function Rectangle(heap, hDC, l, t, r, b) { return 1; }
export function Ellipse(heap, hDC, l, t, r, b) { return 1; }
export function Polygon(heap, hDC, lpPoints, cCount) { return 1; }

export function TextOutA(heap, hDC, x, y, lpString, cbString) { return 1; }
export function ExtTextOutA(heap, ...args) { return 1; }
export function DrawTextA(heap, hDC, lpString, nCount, lpRect, uFormat) { return 1; }
export function GetTextExtentPointA(heap, hDC, lpString, cbString, lpSize) {
  if (lpSize) { heap.setU32(lpSize, 80); heap.setU32(lpSize + 4, 16); }
  return 1;
}
export function GetTextExtentPoint32A(heap, hDC, lpString, cbString, lpSize) {
  return GetTextExtentPointA(heap, hDC, lpString, cbString, lpSize);
}

// ---- Color / mode state (most are stubbed) ----

export function SetTextColor(heap, hDC, crColor) { return 0; }
export function GetTextColor(heap, hDC) { return 0; }
export function SetBkColor(heap, hDC, crColor) { return 0; }
export function GetBkColor(heap, hDC) { return 0xffffff; }
export function SetBkMode(heap, hDC, iBkMode) { return iBkMode; }
export function GetBkMode(heap, hDC) { return 1; }
export function SetROP2(heap, hDC, fnDrawMode) { return fnDrawMode; }
export function SetMapMode(heap, hDC, fnMapMode) { return fnMapMode; }
export function SetViewportOrgEx(heap, hDC, x, y, lpPoint) { return 1; }
export function GetViewportOrgEx(heap, hDC, lpPoint) {
  if (lpPoint) { heap.setU32(lpPoint, 0); heap.setU32(lpPoint + 4, 0); }
  return 1;
}
export function GdiFlush(heap) { return 1; }
