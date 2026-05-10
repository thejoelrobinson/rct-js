// runtime/win32/ddraw.js
//
// DDRAW.DLL — synthetic IDirectDraw / IDirectDrawSurface / IDirectDrawPalette
// / IDirectDrawClipper COM objects, just enough for RCT1's render path.
//
// The binary loads DDRAW.DLL via LoadLibraryA, resolves DirectDrawCreate
// via GetProcAddress, then calls it to obtain an IDirectDraw object.
// All subsequent calls go through COM-style vtable dispatch:
//
//     (**(code **)(*lpDD + 0x18))(lpDD, &desc, &lplpSurface, NULL)
//
// translated to JS as:
//
//     callIndirect(heap, heap.u32(heap.u32(lpDD) + 0x18), lpDD, descAddr, ...)
//
// We implement that by:
//  1. Allocating a heap buffer for each COM object (4 bytes: vtable pointer)
//  2. Allocating a separate heap buffer for the vtable (one slot per method)
//  3. Filling each vtable slot with a synthetic proc address (registerProc)
//     that routes back to a JS impl
//
// Surfaces back onto plain heap-allocated byte buffers; Blt does an actual
// memcpy between buffers. The primary surface buffer is registered in
// state.ddrawSurfaces and consumed by runtime/canvas.js:presentFrame.

import { state, registerProc, callIndirect } from "./context.js";
import { heapAlloc } from "./kernel32.js";

const DD_OK = 0;
const DDERR_GENERIC = 0x80004005 | 0;

// ---- IDirectDraw vtable methods ----

function IDD_AddRef(heap, self)  { return 1; }
function IDD_Release(heap, self) { return 0; }

// CreateClipper(self, dwFlags, lplpClipper, pUnkOuter)
function IDD_CreateClipper(heap, self, flags, lplpClipper, pUnkOuter) {
  const obj = allocClipper();
  heap.setU32(lplpClipper, obj);
  return DD_OK;
}

// CreatePalette(self, dwFlags, lpEntries, lplpPalette, pUnkOuter)
function IDD_CreatePalette(heap, self, flags, lpEntries, lplpPalette, pUnkOuter) {
  const obj = allocPalette(lpEntries);
  heap.setU32(lplpPalette, obj);
  return DD_OK;
}

// CreateSurface(self, lpDDSurfaceDesc, lplpSurface, pUnkOuter)
function IDD_CreateSurface(heap, self, lpDesc, lplpSurface, pUnkOuter) {
  // Read DDSURFACEDESC fields we care about.
  const dwFlags  = heap.u32(lpDesc + 0x04);
  const dwHeight = heap.u32(lpDesc + 0x08);
  const dwWidth  = heap.u32(lpDesc + 0x0C);
  const dwCaps   = heap.u32(lpDesc + 0x68);  // ddsCaps.dwCaps

  const isPrimary = (dwCaps & 0x200) !== 0;   // DDSCAPS_PRIMARYSURFACE
  // Primary surface: dimensions come from the cooperative-level display mode
  // we expose. We treat it as 640x480x8bpp to match RCT1's only-fallback mode.
  const w = isPrimary ? 640 : (dwWidth  || 640);
  const h = isPrimary ? 480 : (dwHeight || 480);

  const obj = allocSurface(w, h, isPrimary);
  heap.setU32(lplpSurface, obj);
  return DD_OK;
}

// SetCooperativeLevel(self, hwnd, dwFlags) — no-op success.
function IDD_SetCooperativeLevel(heap, self, hwnd, flags) { return DD_OK; }

// SetDisplayMode(self, dwWidth, dwHeight, dwBPP) — accept and post the
// WM_DISPLAYCHANGE that the binary's WindowProc (case 0x7e) uses to set
// DAT_005e9184 = 1 — the gate that re-runs the title-screen init block
// in FUN_009bb9f5.
function IDD_SetDisplayMode(heap, self, dwWidth, dwHeight, dwBPP) {
  if (typeof globalThis !== "undefined") {
    globalThis._sdmInvocations = (globalThis._sdmInvocations || 0) + 1;
    globalThis._sdmLast = { dwWidth, dwHeight, dwBPP, hwnd: state.firstHwnd };
  }
  if (state.firstHwnd) {
    // wParam = bit-depth; lParam = (height << 16) | width
    state.messageQueue.push({
      hwnd: state.firstHwnd,
      msg: 0x007e,
      wParam: dwBPP & 0xff,
      lParam: ((dwHeight & 0xffff) << 16) | (dwWidth & 0xffff),
    });
  }
  return DD_OK;
}

// EnumDisplayModes(self, dwFlags, lpDDSurfaceDesc, lpContext, lpEnumModesCallback)
// The binary uses this to discover modes it can switch to. We advertise a
// single 640x480x8 paletted mode — the only one RCT1 actually picks in our
// stripped-down 9bb4b4 path. Callback returns 1 to continue, 0 to stop.
function IDD_EnumDisplayModes(heap, self, flags, lpFilterDesc, lpContext, lpCallback) {
  // Build a minimal DDSURFACEDESC the callback (FUN_00405a70) can read:
  //   +0x00 dwSize, +0x08 dwHeight, +0x0C dwWidth, +0x54 dwRGBBitCount.
  const desc = heapAlloc(0x6c);
  for (let i = 0; i < 0x6c; i += 4) heap.setU32(desc + i, 0);
  heap.setU32(desc + 0x00, 0x6c);   // dwSize
  heap.setU32(desc + 0x04, 0x06);   // dwFlags = HEIGHT|WIDTH
  heap.setU32(desc + 0x08, 480);    // dwHeight
  heap.setU32(desc + 0x0C, 640);    // dwWidth
  heap.setU32(desc + 0x48, 0x20);   // ddpfPixelFormat.dwSize
  heap.setU32(desc + 0x54, 8);      // ddpfPixelFormat.dwRGBBitCount
  callIndirect(heap, lpCallback, desc, lpContext);
  return DD_OK;
}

// ---- IDirectDrawSurface vtable methods ----

function IDDS_AddRef(heap, self)  { return 1; }
function IDDS_Release(heap, self) {
  state.ddrawSurfaces.delete(self);
  return 0;
}

// Blt(self, lpDestRect, lpSrcSurface, lpSrcRect, dwFlags, lpDDBltFx)
function IDDS_Blt(heap, self, lpDestRect, lpSrcSurface, lpSrcRect, flags, lpFx) {
  const dst = state.ddrawSurfaces.get(self);
  const src = state.ddrawSurfaces.get(lpSrcSurface);
  if (!dst || !src) return DD_OK;
  // RECTs are 4 LONGs: left, top, right, bottom. NULL rect means whole.
  const sR = readRect(heap, lpSrcRect, src.width, src.height);
  const dR = readRect(heap, lpDestRect, dst.width, dst.height);
  const w = Math.min(sR.right - sR.left, dR.right - dR.left);
  const h = Math.min(sR.bottom - sR.top, dR.bottom - dR.top);
  blitRect(heap, src, sR.left, sR.top, dst, dR.left, dR.top, w, h);
  return DD_OK;
}

// Flip(self, lpSurfaceTargetOverride, dwFlags) — single-buffered, no-op.
function IDDS_Flip(heap, self, lpTarget, flags) { return DD_OK; }

function IDDS_GetFlipStatus(heap, self, flags) { return DD_OK; }
function IDDS_IsLost(heap, self) { return DD_OK; }   // never lost
function IDDS_Restore(heap, self) { return DD_OK; }
function IDDS_SetClipper(heap, self, lpClipper) { return DD_OK; }

// SetPalette(self, lpDDPalette) — also called with a fake palette pointer.
function IDDS_SetPalette(heap, self, lpPalette) {
  const palette = state.ddrawPalettes && state.ddrawPalettes.get(lpPalette);
  if (palette) mergePaletteIntoCaptured(palette);
  return DD_OK;
}

// Merge `src` into state.capturedPalette: only overwrite entries where src is
// non-black. The binary's resource-loader (FUN_00411b58) is broken — its
// FindResourceA/LoadResource/LockResource path returns 0 (stubbed), so the
// palette it builds is mostly zeros. Pre-populated default entries should
// survive so the rendered frame uses sensible colors. Real palette updates
// (e.g. cycling sky colors via AnimatePalette) still take effect because
// those entries are non-zero.
function mergePaletteIntoCaptured(src) {
  if (!state.capturedPalette || state.capturedPalette.length < 1024) {
    state.capturedPalette = new Uint8ClampedArray(1024);
    for (let i = 0; i < 256; i++) state.capturedPalette[i*4 + 3] = i === 0 ? 0 : 255;
  }
  const dst = state.capturedPalette;
  for (let i = 0; i < 256; i++) {
    const r = src[i*4], g = src[i*4 + 1], b = src[i*4 + 2];
    if (r || g || b) {
      dst[i*4]     = r;
      dst[i*4 + 1] = g;
      dst[i*4 + 2] = b;
      dst[i*4 + 3] = i === 0 ? 0 : 255;
    }
  }
}

// Lock(self, lpDestRect, lpDDSurfaceDesc, dwFlags, hEvent)
// Fills lpDDSurfaceDesc with width/height/pitch and lpSurface (offset 0x24)
// pointing at the pixel buffer. The binary then writes pixels through
// the returned pointer until Unlock.
function IDDS_Lock(heap, self, lpDestRect, lpDesc, flags, hEvent) {
  const s = state.ddrawSurfaces.get(self);
  if (!s) return DDERR_GENERIC;
  if (lpDesc) {
    heap.setU32(lpDesc + 0x04, 0xF);          // dwFlags = HEIGHT|WIDTH|PITCH|CAPS
    heap.setU32(lpDesc + 0x08, s.height);
    heap.setU32(lpDesc + 0x0C, s.width);
    heap.setU32(lpDesc + 0x10, s.pitch);
    heap.setU32(lpDesc + 0x24, s.bytes);     // lpSurface — pixel buffer
  }
  return DD_OK;
}

function IDDS_Unlock(heap, self, lpRect) { return DD_OK; }

// GetDC(self, lphdc) — return a pseudo-HDC. RCT1 uses this for sprite blits.
function IDDS_GetDC(heap, self, lphdc) {
  if (lphdc) heap.setU32(lphdc, 0x20300000 | (self & 0xffff));
  return DD_OK;
}
function IDDS_ReleaseDC(heap, self, hdc) { return DD_OK; }

// GetSurfaceDesc(self, lpDesc) — fill width/height/pitch.
function IDDS_GetSurfaceDesc(heap, self, lpDesc) {
  const s = state.ddrawSurfaces.get(self);
  if (!s) return DDERR_GENERIC;
  heap.setU32(lpDesc + 0x04, 7);              // dwFlags = HEIGHT|WIDTH|CAPS
  heap.setU32(lpDesc + 0x08, s.height);
  heap.setU32(lpDesc + 0x0C, s.width);
  heap.setU32(lpDesc + 0x10, s.pitch);
  return DD_OK;
}

// ---- IDirectDrawClipper vtable methods ----

function IDDC_AddRef(heap, self)  { return 1; }
function IDDC_Release(heap, self) { return 0; }
function IDDC_SetHWnd(heap, self, flags, hwnd) { return DD_OK; }

// ---- IDirectDrawPalette vtable methods ----

function IDDP_AddRef(heap, self)  { return 1; }
function IDDP_Release(heap, self) { return 0; }
// SetEntries(self, dwFlags, dwStartIndex, dwCount, lpEntries)
function IDDP_SetEntries(heap, self, flags, start, count, lpEntries) {
  const palette = readPaletteFromEntries(heap, lpEntries, count, start, self);
  state.ddrawPalettes.set(self, palette);
  mergePaletteIntoCaptured(palette);
  return DD_OK;
}

// ---- vtable construction ----
//
// Build a single shared vtable per interface in heap memory at module load.
// Slot N = synthetic address registered for the JS method. Vtable size is
// generous to cover all defined slots even if we only implement some.

function buildVtable(slots) {
  // Allocate a 0x100-byte vtable (64 dword slots). Unimplemented slots stay
  // zero — callIndirect treats 0 as a no-op return-zero.
  const addr = heapAlloc(0x100);
  for (let i = 0; i < 0x100; i += 4) heap_setU32(addr + i, 0);
  for (const [offset, jsFn, name] of slots) {
    heap_setU32(addr + offset, registerProc(name, jsFn));
  }
  return addr;
}

// We need heap.setU32 available before the runtime caller passes us heap.
// The win32 layer always operates on the singleton from harness.js — we
// stash a reference at first use and reuse.
let _heap = null;
function heap_setU32(addr, v) { _heap.setU32(addr, v); }
function heap_setU8 (addr, v) { _heap.setU8(addr, v); }

let _ddrawVtable = 0, _surfaceVtable = 0, _clipperVtable = 0, _paletteVtable = 0;

function ensureVtables() {
  if (_ddrawVtable) return;
  if (!state.ddrawPalettes) state.ddrawPalettes = new Map();
  _ddrawVtable = buildVtable([
    [0x04, IDD_AddRef,             "IDirectDraw_AddRef"],
    [0x08, IDD_Release,            "IDirectDraw_Release"],
    [0x10, IDD_CreateClipper,      "IDirectDraw_CreateClipper"],
    [0x14, IDD_CreatePalette,      "IDirectDraw_CreatePalette"],
    [0x18, IDD_CreateSurface,      "IDirectDraw_CreateSurface"],
    [0x20, IDD_EnumDisplayModes,   "IDirectDraw_EnumDisplayModes"],
    [0x50, IDD_SetCooperativeLevel,"IDirectDraw_SetCooperativeLevel"],
    [0x54, IDD_SetDisplayMode,     "IDirectDraw_SetDisplayMode"],
  ]);
  _surfaceVtable = buildVtable([
    [0x04, IDDS_AddRef,        "IDirectDrawSurface_AddRef"],
    [0x08, IDDS_Release,       "IDirectDrawSurface_Release"],
    [0x14, IDDS_Blt,           "IDirectDrawSurface_Blt"],
    [0x2C, IDDS_Flip,          "IDirectDrawSurface_Flip"],
    [0x44, IDDS_GetDC,         "IDirectDrawSurface_GetDC"],
    [0x48, IDDS_GetFlipStatus, "IDirectDrawSurface_GetFlipStatus"],
    [0x58, IDDS_GetSurfaceDesc,"IDirectDrawSurface_GetSurfaceDesc"],
    [0x60, IDDS_IsLost,        "IDirectDrawSurface_IsLost"],
    [0x64, IDDS_Lock,          "IDirectDrawSurface_Lock"],
    [0x68, IDDS_ReleaseDC,     "IDirectDrawSurface_ReleaseDC"],
    [0x6C, IDDS_Restore,       "IDirectDrawSurface_Restore"],
    [0x70, IDDS_SetClipper,    "IDirectDrawSurface_SetClipper"],
    [0x7C, IDDS_SetPalette,    "IDirectDrawSurface_SetPalette"],
    [0x80, IDDS_Unlock,        "IDirectDrawSurface_Unlock"],
  ]);
  _clipperVtable = buildVtable([
    [0x04, IDDC_AddRef,  "IDirectDrawClipper_AddRef"],
    [0x08, IDDC_Release, "IDirectDrawClipper_Release"],
    [0x20, IDDC_SetHWnd, "IDirectDrawClipper_SetHWnd"],
  ]);
  _paletteVtable = buildVtable([
    [0x04, IDDP_AddRef,    "IDirectDrawPalette_AddRef"],
    [0x08, IDDP_Release,   "IDirectDrawPalette_Release"],
    [0x0C, IDDP_SetEntries,"IDirectDrawPalette_SetEntries"],
  ]);
}

// ---- COM object allocation ----

function allocComObject(vtable) {
  // 4 bytes (vtable pointer) + 4 bytes scratch (identity) = 8 bytes total
  const obj = heapAlloc(8);
  heap_setU32(obj + 0, vtable);
  heap_setU32(obj + 4, 0);
  return obj;
}

function allocSurface(w, h, isPrimary) {
  ensureVtables();
  const obj = allocComObject(_surfaceVtable);
  const pitch = (w + 3) & ~3;
  const bytes = heapAlloc(pitch * h);
  // Zero-fill the surface buffer.
  for (let i = 0; i < pitch * h; i += 4) _heap.setU32(bytes + i, 0);
  state.ddrawSurfaces.set(obj, { width: w, height: h, pitch, bytes, isPrimary });
  return obj;
}

function allocPalette(lpEntries) {
  ensureVtables();
  const obj = allocComObject(_paletteVtable);
  const palette = readPaletteFromEntries(_heap, lpEntries, 256, 0);
  state.ddrawPalettes.set(obj, palette);
  // First palette also becomes the captured palette for canvas display
  // (binary calls SetPalette right after CreatePalette).
  if (!state.capturedPalette) state.capturedPalette = palette;
  return obj;
}

function allocClipper() {
  ensureVtables();
  return allocComObject(_clipperVtable);
}

// PALETTEENTRY is 4 bytes: peRed, peGreen, peBlue, peFlags. Convert to
// our captured palette format (Uint8ClampedArray of RGBA, 256*4).
function readPaletteFromEntries(heap, lpEntries, count, startIdx, surfaceObj) {
  // Re-use existing palette if surfaceObj given (SetEntries appends to it).
  let out;
  if (surfaceObj && state.ddrawPalettes.has(surfaceObj)) {
    out = state.ddrawPalettes.get(surfaceObj);
  } else {
    out = new Uint8ClampedArray(256 * 4);
  }
  for (let i = 0; i < count; i++) {
    const src = lpEntries + i * 4;
    const dst = (startIdx + i) * 4;
    out[dst    ] = heap.u8(src + 0);  // R
    out[dst + 1] = heap.u8(src + 1);  // G
    out[dst + 2] = heap.u8(src + 2);  // B
    out[dst + 3] = 255;
  }
  return out;
}

function readRect(heap, lpRect, defaultW, defaultH) {
  if (!lpRect) return { left: 0, top: 0, right: defaultW, bottom: defaultH };
  return {
    left:   heap.i32(lpRect + 0),
    top:    heap.i32(lpRect + 4),
    right:  heap.i32(lpRect + 8),
    bottom: heap.i32(lpRect + 12),
  };
}

function blitRect(heap, src, sx, sy, dst, dx, dy, w, h) {
  // Clamp to surface bounds.
  if (sx < 0) { dx -= sx; w += sx; sx = 0; }
  if (sy < 0) { dy -= sy; h += sy; sy = 0; }
  if (dx < 0) { sx -= dx; w += dx; dx = 0; }
  if (dy < 0) { sy -= dy; h += dy; dy = 0; }
  w = Math.min(w, src.width  - sx, dst.width  - dx);
  h = Math.min(h, src.height - sy, dst.height - dy);
  if (w <= 0 || h <= 0) return;
  const bytes = heap.bytes;
  for (let y = 0; y < h; y++) {
    const srcOff = src.bytes + (sy + y) * src.pitch + sx;
    const dstOff = dst.bytes + (dy + y) * dst.pitch + dx;
    for (let x = 0; x < w; x++) bytes[dstOff + x] = bytes[srcOff + x];
  }
}

// ---- DirectDrawCreate (the API entry point) ----
//
// Signature: HRESULT DirectDrawCreate(GUID *lpGUID, IDirectDraw **lplpDD, IUnknown *pUnkOuter)
// Returns DD_OK and writes the IDirectDraw object pointer to *lplpDD.

function DirectDrawCreate(heap, lpGuid, lplpDD, pUnkOuter) {
  _heap = heap;
  ensureVtables();
  const obj = allocComObject(_ddrawVtable);
  heap.setU32(lplpDD, obj);
  return DD_OK;
}

function DirectDrawCreateEx(heap, lpGuid, lplpDD, riid, pUnkOuter) {
  _heap = heap;
  ensureVtables();
  const obj = allocComObject(_ddrawVtable);
  heap.setU32(lplpDD, obj);
  return DD_OK;
}

function DirectDrawEnumerateA(heap, lpCallback, lpContext) { return DD_OK; }
function DirectDrawEnumerateW(heap, lpCallback, lpContext) { return DD_OK; }

// ---- Module-load registration ----
//
// Pre-register our DLL-export-style functions so GetProcAddress can find
// them. The synthetic addresses we hand out also live in state.fnDispatch
// (via registerProc) so callIndirect routes through.

registerProc("DirectDrawCreate",      DirectDrawCreate);
registerProc("DirectDrawCreateEx",    DirectDrawCreateEx);
registerProc("DirectDrawEnumerateA",  DirectDrawEnumerateA);
registerProc("DirectDrawEnumerateW",  DirectDrawEnumerateW);

// Re-export so the runtime barrel can pull us in for side-effects.
export { DirectDrawCreate, DirectDrawCreateEx, DirectDrawEnumerateA, DirectDrawEnumerateW };
