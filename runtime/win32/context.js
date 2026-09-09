// runtime/win32/context.js
//
// Per-instance shared state for the Win32 runtime. Sub-modules read/write
// these to coordinate (e.g. user32 puts events into the message queue, and
// the rAF driver pulls them; gdi32 publishes the DIB section, the canvas
// blitter consumes it).
//
// Module-scope state is intentional: at most one runtime instance per page.
// Browser-side code initialises this once at startup via setRuntimeContext().

import { regs } from "../regs.js";

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
  executionMode: "hybrid",
  unresolvedDispatchCount: 0,
  dispatchErrorCount: 0,
  interpreterFallbackCount: 0,
  liftedFallbackCount: 0,
  __callNative: null,
  __painterCpu: null,
  __liftedCpu: null,
  promotedLiftedAddresses: new Set(),

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
// Re-entry guard for the interpreter fallback below.
let _inNativeFallback = false;
function notifyMissingIndirect(address, reason, error = null) {
  if (typeof globalThis._missingIndirectHook !== "function") return;
  globalThis._missingIndirectHook(address >>> 0, {
    reason,
    error: error ? String(error?.message || error).slice(0, 240) : null,
    registers: Object.fromEntries(["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"]
      .map((name) => [name, regs[name] >>> 0])),
    flags: Object.fromEntries(["cf", "zf", "sf", "of", "df"].map((name) => [name, regs[name] | 0])),
    stack: (new Error().stack || "").split("\n").slice(2, 10),
  });
}
export function callIndirect(heap, fnAddr, ...args) {
  const a = fnAddr >>> 0;     // unsigned — addresses are positive
  if (a === 0) { notifyMissingIndirect(a, "null"); return 0; }
  const fn = state.fnDispatch.get(a);
  // Dynamic call-graph tracing (opt-in via globalThis.__indirectHook; zero-cost
  // when off). EVERY indirect call funnels through here, so this captures the
  // exact edges the static import graph misses. The hook derives the caller
  // from its own JS stack (ported fns are named FUN_xxxxxxxx). See
  // tools/trace-callgraph.js. resolved=true means a JS function was found.
  if (globalThis.__indirectHook) globalThis.__indirectHook(a, typeof fn === "function");
  if (typeof fn === "function") return fn(heap, ...args);
  state.unresolvedDispatchCount++;
  if (state.executionMode === "pure-js") {
    notifyMissingIndirect(a, "pure-js-unresolved");
    throw new Error(`pure-js unresolved function 0x${a.toString(16)}`);
  }
  // No JS port. Before giving up, run the REAL BINARY CODE for this address in
  // the bridge interpreter — the hybrid design's whole point (CLAUDE.md
  // "Browser path"): a function without a JS port is supposed to execute from
  // rct.exe, not vanish.
  //
  // This is what was keeping the UI inert. Every window's event proc is reached
  // only through this function (5e5ff1, 5e1653 and friends do `call [esi+4]`),
  // and historically none of them were ported — 0x430326 (scenario select),
  // 0x429a65 (title menu), 0x429ae1 (logo), 0x42b076 (viewport). Returning 0
  // meant no window ever received an event, so nothing laid itself out or
  // refreshed. Individual entries now move to JS as they are validated.
  //
  // Guarded three ways: the address must be inside rct.exe's CODESEG
  // [0x401000, 0x9c0000) — vtable reads through uninitialised pointers and
  // Ghidra's unrecovered jumptables produce small integers and even ASCII
  // (a live example: 0x6e656353, the text "Scen" read as a proc pointer) —
  // the bridge must be installed, and re-entry is blocked so a proc that
  // itself calls back through here cannot spiral.
  //
  // Gated on __realStartup: this changes what runs on EVERY unported indirect
  // call, and the frozen sc21 soak baseline (5b79d5b5 / canary 7b14266) was
  // captured with them all returning 0. See CLAUDE.md's gating pattern.
  if (globalThis.__realStartup && a >= 0x401000 && a < 0x9c0000
      && typeof state.__callNative === "function" && !_inNativeFallback) {
    _inNativeFallback = true;
    try {
      return state.__callNative(a, args);
    } catch (e) {
      state.dispatchErrorCount++;
      notifyMissingIndirect(a, "interpreter-threw", e);
      if (!_missingProcWarned.has(a)) {
        _missingProcWarned.add(a);
        if (typeof console !== "undefined") {
          console.warn(`[callIndirect] interpreter fallback 0x${a.toString(16)} threw: ${String(e && e.message || e).slice(0, 120)}`);
        }
      }
      return 0;
    } finally {
      _inNativeFallback = false;
    }
  }
  // Unresolved address — warn once per address and return 0. Common cases:
  //   - jump-table targets at non-function-start addresses (Ghidra couldn't
  //     recover the table so we don't have a JS function for them)
  //   - vtable reads through uninitialised pointers (LHS was 0 → reading
  //     vtable+slot = small value, not a real address)
  // Aborting the tick on these stops boot in its tracks; warn-once preserves
  // visibility while letting the binary keep running.
  state.dispatchErrorCount++;
  if (!_missingProcWarned.has(a)) {
    _missingProcWarned.add(a);
    if (typeof console !== "undefined") {
      console.warn(`[callIndirect] no JS function at 0x${a.toString(16)} — returning 0`);
    }
  }
  // Opt-in audit hook (tools/indirect-call-audit.js). Called on every miss so
  // counts and caller info accumulate. No-op when the hook is unset.
  notifyMissingIndirect(a, "unresolved");
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
  state.executionMode = "hybrid";
  state.unresolvedDispatchCount = 0;
  state.dispatchErrorCount = 0;
  state.interpreterFallbackCount = 0;
  state.liftedFallbackCount = 0;
  state.__callNative = null;
  state.__painterCpu = null;
  state.__liftedCpu = null;
  state.promotedLiftedAddresses.clear();
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
