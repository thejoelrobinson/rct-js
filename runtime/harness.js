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
import { regs } from "./regs.js";
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

  // Pre-populate screen-dimension globals before the binary's window-init
  // chain runs. Without this, FUN_004298a0 (MainOpen) sees dims = 0 at boot
  // and creates the title window with view_w/view_h = 0; the dims become
  // correct around tick 50 (after FUN_009bb9f5 fires from a synthesized
  // WM_SIZE), but the broken initial window persists. Pre-populating gives
  // 4298a0 sane dims to read at boot. Per decompiled/c/9bb9f5.c:
  //   DAT_005f2400 → width  (640)
  //   DAT_005f1ff0 → height (480)
  // (Note: 971ed6/971ed8 are derived from these by 9bb9f5 with extra
  // clamping, not the same fields — so we set the source DATs, not those.)
  // Also requires ported/auto/402a00.js's hand-port (pointer-arith fix) so
  // the values aren't swapped at tick 1 — which was Team B Round 2's
  // blocker before the 402a00 fix landed.
  heap.setU32(0x005f2400, 640);
  heap.setU32(0x005f1ff0, 480);

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
      // Phase E: force-load the title-screen demo scenario. Without this,
      // the world state stays empty and the viewport paint chain renders
      // only the sky-color fill. The intended in-binary trigger
      // (FUN_00429361 title-state machine) is unreachable — gated behind
      // a tick-counter wrap (~16,380 game-updates) and a stripped CODESEG
      // jumptable at 0x42937c. Drive FUN_0042f4be (encrypted .SC4 loader)
      // directly with the path written to DAT_0099aa88. 42f4be opens the
      // file via VFS basename lookup, decrypts the header, RLE-decompresses
      // ~2 MB of world state into 0x006e3b80..0x008dc08c, and runs the
      // post-load fixup chain that populates the binary's window pool +
      // viewport. Required hand-ports (already landed):
      //   - 42f98e.js: proper ECX countdown (was infinite-loop)
      //   - 42f4be.js: pre-call regs.esi/ecx prologue + drop unreachable
      //     gate
      const path = "sc21.sc4\0";
      for (let i = 0; i < path.length; i++) heap.setU8(0x0099aa88 + i, path.charCodeAt(i));
      try { call(0x42f4be); }
      catch (e) {
        if (typeof console !== "undefined") {
          console.warn(`[harness] scenario auto-load (FUN_0042f4be) threw: ${(e.message || e).slice(0, 160)}`);
        }
      }
      // Phase E experiment: stub the terrain-painter jumptable. The real
      // painters at 0x436b50 / 0x436bc3 / 0x436c3d / 0x436cb3 live in
      // CODESEG which is stripped from data.bin (none of them are ported),
      // so FUN_00436b2a reads 0x436b40 → 0x0 → callIndirect(0) → returns
      // 0 → no terrain painting. To prove the rest of the chain works,
      // populate the table[0] entry with a synthetic address pointing at
      // a stub painter that writes a recognizable diagonal-gradient pattern
      // to the primary DDraw surface. If pixels appear, the per-tick paint
      // chain is correctly wired and only the terrain painters need a
      // hand-port. If not, there's a further block downstream.
      heap.setU32(0x00436b40, 0x00436b50);  // jumptable[0] = stub addr
      state.fnDispatch.set(0x00436b50, function _terrainStub(h) {
        // Paint a diagonal gradient on every 640x480 DDraw surface so the
        // browser's presentFrame (which picks the surface with the most
        // non-zero pixels) sees it too. Pattern: `(x + y) & 0x7f + 80`,
        // palette indices 80..207 — visually distinct from the existing
        // solid-teal viewport fill (idx 0x0a).
        for (const surf of state.ddrawSurfaces.values()) {
          if (surf.width !== 640 || surf.height !== 480) continue;
          for (let y = 0; y < 64; y++) {
            const row = surf.bytes + y * surf.pitch;
            for (let x = 0; x < 640; x++) {
              h.bytes[row + x] = 80 + ((x + y) & 0x7f);
            }
          }
        }
        return 0;
      });
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
      // Synthetic per-tick paint dispatch — walks the binary's internal window
      // pool at DAT_009a013c and invokes each slot's wndProc with a full-screen
      // clip rect. This bypasses the binary's own per-tick paint dispatcher
      // (which lives somewhere we haven't fully identified yet — candidates are
      // 9bbfb3/9bbff8 gated on DAT_008d7eb6, or 4533d0 gated on DAT_006323f4,
      // neither of which is open during boot). Without this, the viewport
      // WindowProc (0x42b079) gets called only at WindowCreate time and never
      // for actual paint, so the inner viewport-paint chain (FUN_00431b6f /
      // FUN_00436b2a / FUN_00433bae / FUN_00433e1c) stays dormant and the
      // framebuffer never receives terrain/sprite content.
      //
      // Direct-invocation experiment (/tmp/probe-direct-42b079.mjs) confirmed
      // that calling 0x42b079 with regs.esi = slot_addr, regs.edi != -1,
      // and clip = (0,0,640,480) fires all 4 dormant helpers and fills the
      // 640x480 surface with 307,200 non-zero pixels.
      //
      // Skip the first few ticks — viewport pointers at slot+8 aren't attached
      // until MainOpen (FUN_004298a0) has run, which happens during tick 1.
      const POOL_START = 0x009a013c >>> 0;
      const POOL_END_PTR = 0x009a1164 >>> 0;
      const SLOT_STRIDE = 0x178;
      const poolEnd = heap.u32(POOL_END_PTR) >>> 0;
      if (poolEnd > POOL_START && poolEnd < 0x009a013c + 256 * SLOT_STRIDE) {
        for (let slot = POOL_START; slot < poolEnd; slot += SLOT_STRIDE) {
          const wndProcAddr = heap.u32(slot) >>> 0;
          if (wndProcAddr === 0 || wndProcAddr === 0xffffffff) continue;
          const fn = state.fnDispatch.get(wndProcAddr);
          if (typeof fn !== "function") continue;
          // Skip slots where the viewport pointer isn't attached yet. The
          // viewport WindowProc (0x42b079) requires window+8 to be non-zero;
          // calling it with viewport=0 hits an early-return that does no harm
          // but produces no work — saves cycles to skip.
          const viewportPtr = heap.u32(slot + 8) >>> 0;
          if (viewportPtr === 0) continue;
          regs.esi = slot >>> 0;
          regs.edi = 0x99fb7c >>> 0;        // any non -1 — paint phase
          regs.eax = 0; regs.ebx = 0;       // clipX, clipY
          regs.ecx = 640; regs.edx = 480;   // clipW, clipH
          try { fn(heap); } catch (e) { /* per-window paint errors are non-fatal */ }
        }
      }
    },
  };
}
