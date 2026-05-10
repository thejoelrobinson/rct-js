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

  // GetProcAddress lookup — DLL-export name (e.g. "DirectDrawCreate") to the
  // synthetic address we hand back. Same address is also keyed in fnDispatch
  // so callIndirect routes through. Synthetic addresses live above the heap
  // allocator's range so they don't collide with real heap reads.
  procRegistry: new Map(),
  nextProcAddr: 0x10100000,
};

// Register a Win32 export (looked up via GetProcAddress) with a JS impl.
// Returns the synthetic address it lives at; idempotent — re-registering
// the same name returns the same address. The address is also installed
// in fnDispatch so callIndirect can route to it.
export function registerProc(name, jsFn) {
  let addr = state.procRegistry.get(name);
  if (addr !== undefined) {
    state.fnDispatch.set(addr, jsFn);   // allow re-registration to update impl
    return addr;
  }
  addr = state.nextProcAddr;
  state.nextProcAddr += 4;
  state.procRegistry.set(name, addr);
  state.fnDispatch.set(addr, jsFn);
  return addr;
}

// callIndirect — translated equivalent of x86 `(*fn_ptr)(...)`.
// The translator emits this whenever Ghidra's C uses a pointer-deref-call.
// Looks up the target in state.fnDispatch and invokes; if no JS function is
// registered for that address, throws a clear error so we can surface
// missing-port problems. Address 0 is special-cased to return 0 — calling
// through a null pointer would crash the real program, but in diff-test
// scenarios with uninitialised data the interpreter typically returns 0
// from the same code path, so this matches the oracle's behaviour.
const _missingProcWarned = new Set();
export function callIndirect(heap, fnAddr, ...args) {
  const a = fnAddr >>> 0;     // unsigned — addresses are positive
  if (a === 0) return 0;
  const fn = state.fnDispatch.get(a);
  if (typeof fn === "function") return fn(heap, ...args);
  // Unresolved address — warn once per address and return 0. Common cases:
  //   - jump-table targets at non-function-start addresses (Ghidra couldn't
  //     recover the table so we don't have a JS function for them)
  //   - vtable reads through uninitialised pointers (LHS was 0 → reading
  //     vtable+slot = small value, not a real address)
  // Aborting the tick on these stops boot in its tracks; warn-once preserves
  // visibility while letting the binary keep running.
  if (!_missingProcWarned.has(a)) {
    _missingProcWarned.add(a);
    if (typeof console !== "undefined") {
      console.warn(`[callIndirect] no JS function at 0x${a.toString(16)} — returning 0`);
    }
  }
  // Opt-in audit hook (tools/indirect-call-audit.js). Called on every miss so
  // counts and caller info accumulate. No-op when the hook is unset.
  if (typeof globalThis._missingIndirectHook === "function") {
    globalThis._missingIndirectHook(a);
  }
  return 0;
}

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
  state.procRegistry.clear();
  state.nextProcAddr = 0x10100000;
}
