// runtime/harness.js — native runtime entry point.
//
// Loads the binary's data sections into a Heap (no rct.exe at runtime),
// wires the VFS, populates state.fnDispatch with all 1214 ported
// functions, and calls FUN_00401000(heap) — the binary's WinMain-equivalent.
//
// Used both by the browser (web/main.js → here) and the native-boot
// smoke test (tools/native-boot.js → here).

import { Heap } from "./heap.js";
import { initHeap } from "./win32/kernel32.js";
import { state, setRuntimeContext } from "./win32/context.js";
import { dispatch as portedDispatch } from "../ported/auto/_dispatch.js";
import { defaultPalette } from "../harness/csg.js";
// Side-effect imports — these modules register procs / DLL-export
// stubs at module-load time. The binary discovers them via
// LoadLibraryA + GetProcAddress, so they're not directly imported by
// any ported function but still need to be evaluated.
import "./win32/ddraw.js";

/**
 * @param {object} opts
 * @param {Uint8Array} opts.dataBin    decompiled/data.bin contents (sparse PE image)
 * @param {Map<string, Uint8Array>} [opts.vfs]   filename(lowercase) → bytes
 * @param {object} [opts.canvas]       optional <canvas> element
 * @param {number} [opts.heapBase]     where to start the runtime heap (default: end of dataBin)
 * @param {number} [opts.heapSize]     heap size (default: 64 MB)
 * @returns {{ heap: Heap, run: () => any }}
 */
export function createRuntime(opts) {
  const { dataBin } = opts;
  const heapBase = opts.heapBase ?? dataBin.length;
  const heapSize = opts.heapSize ?? 64 * 1024 * 1024;
  const stackSize = 1 * 1024 * 1024;
  const totalSize = heapBase + heapSize + stackSize;

  // Allocate the full address space at once. Binary's data lives at the
  // bottom (positioned at its virtual addresses), runtime allocator above,
  // stack at the top (grows down).
  const memory = new Uint8Array(totalSize);
  memory.set(dataBin, 0);

  const heap = new Heap(memory, totalSize);
  initHeap(heapBase, heapBase + heapSize);

  // Populate the dispatch map for DispatchMessageA / SendMessageA. Don't
  // clear first — module-load registerProc() calls (e.g. from ddraw.js)
  // populate fnDispatch with synthetic-address entries that we want to
  // keep. Ported functions live at 0x4xxxxx, procs at 0x10100000+, no
  // collision.
  for (const [addr, fn] of portedDispatch) state.fnDispatch.set(addr, fn);

  // Wire browser-side resources (or stubs in node).
  setRuntimeContext({
    vfs: opts.vfs || new Map(),
    canvas: opts.canvas || null,
  });

  // Pre-populate state.capturedPalette from the OpenRCT2-baked reference
  // palette. The binary normally fills this via FUN_00411b58 →
  // FindResourceA/LoadResource/LockResource on its own .rsrc PE section, but
  // we stub those to 0 (no PE rsrc parser yet), so the load silently fails
  // and only ~18 of 256 entries get populated by later SetPaletteEntries
  // calls. Pre-populating gives a sensible default for the unset slots;
  // any later CreatePalette / SetPaletteEntries / IDDP_SetEntries call from
  // the binary still wins (they overwrite their own slots).
  state.capturedPalette = new Uint8ClampedArray(defaultPalette());

  return {
    heap,
    state,
    // Original FUN_00401000 entry — runs the binary's full WinMain. Blocks
    // until WM_QUIT, so unsuitable for the browser (no message ever arrives
    // in our message queue to set the quit flag). Kept for the native-boot
    // smoke test which runs only the init prelude before exiting.
    run() {
      const entry = portedDispatch.get(0x401000);
      if (!entry) throw new Error("FUN_00401000 not in dispatch table");
      return entry(heap);
    },
    // Cooperative driver. The binary's true WinMain is FUN_00402e9b
    // (hInstance, ...) which calls FUN_00401000 (the inner game loop).
    // We can't intercept FUN_00401000 via dispatch monkey-patching because
    // ES modules import it directly — the translator emits a static call.
    // Instead we replicate FUN_00402e9b's pre-loop work here, calling each
    // sub-init by address. After this returns, the window class is
    // registered, DDraw is up, and the message queue is ready for ticks.
    runInit() {
      const call = (addr, ...args) => {
        const fn = portedDispatch.get(addr);
        if (!fn) throw new Error(`init: FUN_${addr.toString(16)} missing from dispatch`);
        return fn(heap, ...args);
      };
      // Globals the binary sets from WinMain args (hInstance, lpCmdLine).
      heap.setU32(0x005f1398, 1);  // hInstance — non-zero token
      heap.setU32(0x005e9190, 0);  // lpCmdLine — empty
      // Skip LoadCursorA(0x7f00)→DAT_005e91c8: cursor isn't required to boot.
      // Skip the local-array zero-inits — heap memory is already zero.
      // String copies: Ghidra's FUN_00413170(dst, src) copies a C string.
      call(0x413170, 0x005f17e0, 0x005ebbcc);  // "GSK Error Trapper"
      call(0x413170, 0x005f1ba0, 0x005e9030);  // "RollerCoaster Tycoon"
      // Pre-init: heap allocator + globals.
      call(0x404752);
      call(0x404b0e);
      // RegisterClassA — returns 0 on failure.
      const classOk = call(0x405f2c);
      if (!classOk) throw new Error("init: RegisterClassA returned 0");
      // Post-class init: DDraw surface, palette, fonts, MIDI probe.
      call(0x406d10);
      call(0x40d9a0);
      call(0x40df00);
      // Stop here — FUN_00401000 (the message loop) is what runTick drives.
    },
    // One frame of the binary's main loop body (the body of FUN_00401000's
    // `while (FUN_00403c2a()) { ... }`):
    //   FUN_00402bef() — pre-tick housekeeping
    //   FUN_004385d8() — main game tick (update + render to DIB)
    //   if (DAT_005e9104) FUN_0040179d() — redraw trigger
    runTick(onProgress) {
      const fn_403c2a = portedDispatch.get(0x403c2a);  // message pump
      const fn_402bef = portedDispatch.get(0x402bef);
      const fn_4385d8 = portedDispatch.get(0x4385d8);
      const fn_40179d = portedDispatch.get(0x40179d);
      if (!fn_402bef || !fn_4385d8) throw new Error("tick functions missing from dispatch");
      // Pump messages first — matches FUN_00401000's `while (FUN_00403c2a()) { tick }`
      // pattern. Without this, WM_SIZE / WM_PAINT / WM_TIMER posted by the runtime
      // never reach the binary's WindowProc, leaving screen-dim globals at 0
      // (which gates the entire render path).
      if (fn_403c2a) {
        onProgress && onProgress("403c2a:enter");
        fn_403c2a(heap);
        onProgress && onProgress("403c2a:exit");
      }
      onProgress && onProgress("402bef:enter");
      fn_402bef(heap);
      onProgress && onProgress("402bef:exit");
      onProgress && onProgress("4385d8:enter");
      fn_4385d8(heap);
      onProgress && onProgress("4385d8:exit");
      if (heap.u32(0x005e9104) !== 0 && fn_40179d) {
        onProgress && onProgress("40179d:enter");
        fn_40179d(heap);
        onProgress && onProgress("40179d:exit");
      }
    },
  };
}
