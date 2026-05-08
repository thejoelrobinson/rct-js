// runtime/win32/context.js
//
// Per-instance shared state for the Win32 runtime. Sub-modules read/write
// these to coordinate (e.g. user32 puts events into the message queue, and
// the rAF driver pulls them; gdi32 publishes the DIB section, the canvas
// blitter consumes it).
//
// Module-scope state is intentional: at most one runtime instance per page.
// Browser-side code initialises this once at startup via setRuntimeContext().

// ---- Browser-provided resources (set by harness.js at boot) ----

let _vfs = new Map();              // basename(lowercase) → Uint8Array
let _canvas = null;                // <canvas> element (for DIB → screen blit)
let _mainCanvasCtx = null;         // CanvasRenderingContext2D
let _audioCtx = null;              // AudioContext (lazy)

export function setRuntimeContext(env = {}) {
  if (env.vfs) _vfs = env.vfs;
  if (env.canvas) {
    _canvas = env.canvas;
    _mainCanvasCtx = _canvas.getContext("2d");
  }
  if (env.audioCtx) _audioCtx = env.audioCtx;
}

export function getVfs() { return _vfs; }
export function getCanvas() { return _canvas; }
export function getCanvasCtx() { return _mainCanvasCtx; }
export function getAudioCtx() {
  if (!_audioCtx && typeof AudioContext !== "undefined") {
    _audioCtx = new AudioContext();
  }
  return _audioCtx;
}

// ---- Cross-module state ----
//
// Keep references here so sub-modules can wire to each other without a
// dependency cycle. Each entry is a { Map / array / object } that another
// module owns mutability of, but everyone can read.

export const state = {
  // user32: window classes (atom → { wndProc, name }), windows (hwnd → { atom, x, y, w, h }), message queue
  windowClasses: new Map(),
  windowsByName: new Map(),
  windows: new Map(),
  messageQueue: [],
  firstHwnd: 0,
  nextClassAtom: 0xc001,
  nextHwnd: 0x10010000,

  // gdi32 / ddraw: DIB sections, palettes, surfaces
  dibSections: [],          // { width, height, bitCount, stride, bufAddr, topDown }
  capturedPalette: null,    // Uint8ClampedArray(256*4) RGBA
  paletteSnapshots: 0,
  ddrawSurfaces: new Map(), // surface address → { width, height, pitch, bytes, palette }

  // kernel32 / VFS: open file handles, file mapping handles, find handles
  openHandles: new Map(),   // hFile → { name, offset, bytes, writeable }
  fileMappings: new Map(),  // hMapping → { hFile, name, size }
  findHandles: new Map(),   // hFind → { pattern, results, idx }
  nextHandle: 0x100,

  // Timers (user32 SetTimer)
  timers: new Map(),        // tid → { hwnd, ms, intervalId }
  nextTimerId: 1,

  // Boot time for GetTickCount-style queries
  bootTime: Date.now(),

  // Function dispatch — addr → JS fn(heap, ...args).
  // The harness fills this from ported/auto/<addr>.js so that DispatchMessageA
  // and SendMessageA can call back into the binary's WindowProc.
  fnDispatch: new Map(),
};

// Reset state — used by tests to start clean per case.
export function resetState() {
  state.windowClasses.clear();
  state.windowsByName.clear();
  state.windows.clear();
  state.messageQueue.length = 0;
  state.firstHwnd = 0;
  state.nextClassAtom = 0xc001;
  state.nextHwnd = 0x10010000;
  state.dibSections.length = 0;
  state.capturedPalette = null;
  state.paletteSnapshots = 0;
  state.ddrawSurfaces.clear();
  state.openHandles.clear();
  state.fileMappings.clear();
  state.findHandles.clear();
  state.nextHandle = 0x100;
  state.timers.forEach(t => { if (t.intervalId) clearInterval(t.intervalId); });
  state.timers.clear();
  state.nextTimerId = 1;
}
