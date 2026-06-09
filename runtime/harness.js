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
import { installPainterBridge } from "./painter-bridge.js";
import { FUN_extra_paint_436b50 } from "../ported/auto/extra_436b50.js";

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

  // Bridge in the rotation-painter targets Ghidra couldn't recover. Each
  // entry runs via the x86 interpreter on a cpu sharing heap.bytes — the
  // interpreter handles the 0x66 operand-size prefix that's pervasive in
  // these painters (the static lifter mis-decodes it). Painter addresses
  // live in lifter/extra-entries.json.
  installPainterBridge(heap, {
    exeBytes: opts.exeBytes,
    painterAddresses: opts.painterAddresses,
    extraEntriesJson: opts.extraEntriesJson,
  });

  // Override the painter-bridge shim for FUN_extra_paint_436b50 (rotation-0
  // terrain painter) with a hand-port. The interpreter shim bombs because
  // FUN_00436b2a (hand-port) drops the original `mov edi, [0x981ef8]` setup,
  // and the painter reads DPI fields off EDI. The JS port reads DPI from
  // 0x981ef8 directly and calls into existing JS sub-painters.
  state.fnDispatch.set(0x436b50, FUN_extra_paint_436b50);

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
      // Phase H: trigger FUN_004385d8's first-tick lazy-init block on
      // the EMPTY world before loading the scenario. The lazy-init
      // (gated by `if (DAT_00628cb8 == 0)`) runs a ~30-function setup
      // chain that includes FUN_00444a79 (sprite-pool reset). In the
      // binary's normal flow, this fires on the first game tick, well
      // before the title-state machine triggers a scenario load. We
      // drive 42f4be from runInit (the title-state machine is gated
      // behind a CODESEG-stripped jumptable and unreachable), so the
      // ordering was inverted: our world load ran first, then tick
      // fired and the lazy-init wiped sprite_desc back to free-list
      // state. Pre-running 4385d8 here triggers the lazy-init on the
      // empty heap (harmless wipe of zeros), sets DAT_00628cb8 = 1, and
      // primes graphics / pool state. Subsequent calls to 4385d8 (from
      // runTick) skip the lazy-init.
      try { call(0x4385d8); }
      catch (e) {
        if (typeof console !== "undefined") {
          console.warn(`[harness] pre-load tick (FUN_004385d8) threw: ${(e.message || e).slice(0, 160)}`);
        }
      }
      // The priming call above ran the fade-counter init branch (4385d8:152)
      // alongside the cb8==0 lazy-init we wanted — both branches are
      // ungated by separate flags, so the call set DAT_005f8da2 to 0x10 as
      // a side effect. Reset it back to 0 so the caller's first runTick()
      // hits the init branch fresh and lands on the documented post-first-
      // tick state of fade=0x10 (matches the binary's natural boot flow
      // where the very first FUN_004385d8 call IS the one runTick fires).
      // Without this, runTick's call takes the else branch and increments
      // fade to 0x11, off-by-one breaking the fadein test gate.
      heap.setU8(0x005f8da2, 0);

      const path = "sc21.sc4\0";
      for (let i = 0; i < path.length; i++) heap.setU8(0x0099aa88 + i, path.charCodeAt(i));
      try { call(0x42f4be); }
      catch (e) {
        if (typeof console !== "undefined") {
          console.warn(`[harness] scenario auto-load (FUN_0042f4be) threw: ${(e.message || e).slice(0, 160)}`);
        }
      }
      // The 4 rotation painters at 0x436b50 / bc3 / c3d / cb3 (and the
      // other 16 in the 4 other rotation jumptables) are wired via
      // runtime/painter-bridge.js — installPainterBridge() ran in
      // createRuntime, overlaid CODESEG bytes from rct.exe, and registered
      // each painter address with a shim that runs via the interpreter.

      // Phase N: suppress the WM_DISPLAYCHANGE (0x7e) message posted by
      // DDraw.IDD_SetDisplayMode during init. When the first runTick pumps
      // messages via FUN_00403c2a, the binary's WindowProc routes 0x7e to
      // a DDraw re-init path that calls IDDS_Release on the existing
      // surfaces and re-creates them from scratch. Our runtime/win32/ddraw.js
      // honours Release() by deleting from state.ddrawSurfaces (correct
      // semantics) — but the heap-allocated pixel buffers of the original
      // surfaces (already painted by the scenario-load chain via
      // FUN_009b30f1) are then orphaned. New empty surfaces take their
      // place, and the back→front presenter (FUN_004023b2) reads from the
      // new EMPTY back buffer to a new EMPTY front buffer.
      //
      // The painted pixels at 0x2428b90 (the original GAME-BACK surface's
      // bytes ptr) survive in heap memory but are no longer connected to
      // any DDraw surface; the binary then has no path to display them.
      //
      // The per-tick painter chain (FUN_00431b6f / 436b2a / 436b50 / 433bae
      // / 433e1c) DOES fire on subsequent ticks but the viewport's world
      // coords (vp+8 viewX) are 0xfa01 (= -1535 signed), causing the strip
      // painter at 4316f3 to compute write addresses far outside the new
      // back buffer. So even if surfaces were preserved, terrain wouldn't
      // re-render correctly via the tick chain — the scenario-load paint
      // is the ground truth and we want to preserve it.
      //
      // Filter the WM_DISPLAYCHANGE out of the queue so the first runTick
      // doesn't trigger the surface-recreate cascade. With this in place,
      // DAT_005f1fec stays pointing at 0x2428b90 (with 133k painted pixels)
      // and FUN_004023b2 (the back→front presenter) copies them to the
      // primary surface for canvas display.
      if (state.messageQueue && state.messageQueue.length > 0) {
        const before = state.messageQueue.length;
        state.messageQueue = state.messageQueue.filter((m) => m.msg !== 0x7e);
        if (before !== state.messageQueue.length && typeof console !== "undefined") {
          console.warn(`[harness] dropped ${before - state.messageQueue.length} WM_DISPLAYCHANGE message(s) to preserve init-painted surfaces`);
        }
      }

      // Phase O: pan the viewport onto the title-map sprite cluster.
      //
      // MainOpen (FUN_004298a0) calls FUN_005e429d with EDX = 0x07ff07ff,
      // which is "centre on world coord (2047, 2047, z=512)". With our
      // dispatcher + edi fixes in 5e4355.js / 5e429d.js, that resolves
      // to view_x = -320, view_y = 1327 (correct iso math for that input).
      //
      // BUT: the title-screen map's actual sprite cluster sits in
      // world-iso space at X ≈ [597..1775], Y ≈ [1029..1758]. The strip
      // iterator in FUN_004316f3 walks columns from view_x rightward in
      // 32-pixel strips until view_x + view_w. With view_x = -320 and
      // view_w = 640 it sweeps [-320, 320] — entirely left of every sprite.
      //
      // The intended binary flow is the title-state machine at 0x42937c,
      // which would pan the title viewport onto a saved map-centre coord
      // after the title scenario loads. That path is unreachable: it's
      // gated behind a tick-counter wrap + a CODESEG-stripped jumptable
      // (see the scenario-load comment block above and
      // memory/project_painter_bridge.md).
      //
      // Pragmatic fallback: hard-set the viewport's view_x / view_y to
      // the densest sprite cluster. The visibility check at FUN_00444820:76
      // compares sprite bbox vs DPI clip rect in *iso-projected* coords
      // (output of FUN_00444927). DPI clip starts at view_x/view_y and
      // extends view_w × view_h, so the goal is to pick (view_x, view_y)
      // that maximises the count of sprites whose bbox intersects the
      // rectangle [view_x, view_x+view_w] × [view_y, view_y+view_h].
      //
      // Sprite-bbox scan of the active title map (probe-bbox-hist.js)
      // brute-forces over the (view_x, view_y) grid and reports:
      //
      //   Best view (640×416): (976, 1304) → 31 of 68 real sprites visible
      //
      // Phase O #1 used (1186, 1393) — the *world-coord* centroid (sprite
      // wx/wy), not the iso-bbox centroid. With view_w=640 the iso-bbox
      // sweep was [866, 1506] but most bboxes sit in [-269, 1500] iso-x —
      // only a handful at the rightmost edge intersected, and probe
      // (tools/probe-walker-direct.js) showed 0/2 sprites passed visibility.
      //
      // Viewport pool slot 0 is at 0x009a1168, stride 0x14:
      //   +0x08 = view_x (u16, signed)
      //   +0x0a = view_y (u16, signed)
      // The parent window's mirror copy is at window+0x170 / +0x172.
      const VP_SLOT0 = 0x009a1168;
      const VP_VIEW_W = heap.u16(VP_SLOT0 + 0x0c);
      const VP_VIEW_H = heap.u16(VP_SLOT0 + 0x0e);
      if (VP_VIEW_W > 0 && VP_VIEW_H > 0) {
        // Densest-cluster view computed by tools/probe-bbox-hist.js.
        const newViewX = 976 & 0xffff;
        const newViewY = 1304 & 0xffff;
        heap.setU16(VP_SLOT0 + 0x08, newViewX);
        heap.setU16(VP_SLOT0 + 0x0a, newViewY);
        // Mirror into the parent window (esi+0x170/+0x172 in 5e429d). The
        // window slot containing this viewport is the first non-empty
        // entry in the window pool; rather than walk the pool here we
        // search for the window whose +0x8 field points at the viewport.
        // The window pool lives at 0x009af574 with stride 0x500 — but
        // most painters read view_x from the viewport struct directly,
        // so the parent-window mirror is mostly informational.
        if (typeof console !== "undefined") {
          console.warn(`[harness] panned viewport to sprite cluster: view_x=${(newViewX << 16 >> 16)}, view_y=${(newViewY << 16 >> 16)}`);
        }
      }

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
      // Phase J: make the back-buffer DPI struct at 0x0099fb7c paint-ready
      // before invoking each wndProc. FUN_009bb9f5 (called from 4385d8) sets
      // bytes-ptr (+0), width (+8), height (+0xa) from globals, but never
      // initialises clipX (+4) and clipY (+6) — those stay as whatever
      // garbage was previously in the heap. FUN_0042b079 (the viewport
      // wndProc) reads regs.edi as a DPI pointer and pulls clipX/Y/W/H out
      // of edi+4..0xa.
      //
      // FUN_004316f3 computes the back-buffer destination pointer from
      // (clipX, clipY) interpreted as WORLD coordinates (binary's normal
      // event-driven paint pass clips in world space, not screen space).
      // For a full-screen repaint we want (clipX, clipY) = (view_x, view_y)
      // from the active viewport struct (slot+8 offsets +0x08 and +0x0a).
      // Without this, clipX/Y default to 0 and the strip iterator computes
      // pixel addresses ~(view_y * pitch) bytes BEFORE the back buffer
      // (negative Y offset), so painter writes land in unrelated heap
      // pages and never reach the visible back-buffer surface.
      heap.setU16(0x0099fb80, 0);  // clipX (will be overwritten per slot below)
      heap.setU16(0x0099fb82, 0);  // clipY (will be overwritten per slot below)
      // Protect the land/construction TOOL drag rect (0x99a020..0x99a02c)
      // across the synthetic paint pump below.
      //
      // The active tool resolves the cursor tile into this rect during the
      // per-tick input dispatch (FUN_005e38f5 -> 5e6044 -> the land tool's
      // 0x42aa65 -> 0x43424f/0x434efd write [0x99a020] bit0 + the tile rect at
      // +2..+0xa). The build issuer (0x42aeb7 on LMB-down, 0x42abe0 on drag)
      // reads that rect on the NEXT tick's input pass — so it must survive the
      // intervening paint.
      //
      // BUT: the binary's selection-highlight marker collector
      // (FUN_004363f1 -> FUN_005e5562 -> the 0x447c06 rotation case) appends
      // vertices to the marker buffer at 0x999fdc and bumps the byte counter
      // [0x99c166]. That buffer sits IMMEDIATELY below the tool rect
      // (0x999fdc + [0x99c166]*2; 0x99a020 - 0x999fdc = 0x44 = 34 entries).
      // The binary collects markers ONCE per frame; our synthetic pump re-runs
      // every window's wndProc (and thus the selection-highlight collector)
      // many times per tick WITHOUT the binary's per-frame marker reset, so
      // the counter runs past 34 and the marker writes SPILL into the tool
      // rect — clearing [0x99a020] bit0 and overwriting the resolved tile with
      // marker coords (observed: rect -> tile 80, valid bit cleared). That is
      // a pure artifact of the multi-pass pump; the binary's single-pass paint
      // never overflows. Snapshot the 12 rect bytes here and restore them after
      // the pump so the resolved drag rect reaches the next input tick intact.
      const _toolRect = new Uint8Array(0x0c);
      for (let i = 0; i < 0x0c; i++) _toolRect[i] = heap.u8(0x0099a020 + i);
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

          // Read the viewport's world-space view_x/view_y and screen-space
          // width/height. The viewport struct layout (FUN_005e429d output):
          //   +0  screen_w  (u16)
          //   +2  screen_h  (u16)
          //   +4  screen_x  (u16)
          //   +6  screen_y  (u16)
          //   +8  view_x    (u16)  — world coord top-left
          //   +0xa view_y   (u16)
          //   +0x10 zoom    (u8)
          const screenW = heap.u16(viewportPtr + 0x00);
          const screenH = heap.u16(viewportPtr + 0x02);
          const viewX   = heap.u16(viewportPtr + 0x08);
          const viewY   = heap.u16(viewportPtr + 0x0a);
          const zoom    = heap.u8 (viewportPtr + 0x10);
          // For the viewport wndProc (0x42b079), build a TEMP DPI with the
          // viewport's WORLD-space clip rect and SCREEN-space bytes ptr.
          // The binary's normal paint dispatcher does this: each wndProc
          // gets a DPI clipped to its window region. For 42b079 / 4316f3:
          //   DPI.bytes = back_buf + screen_y * pitch + screen_x
          //   DPI.clipX = view_x (world)
          //   DPI.clipY = view_y (world)
          //   DPI.clipW = screen_w << zoom
          //   DPI.clipH = screen_h << zoom
          //   DPI.pitch = back_buf_pitch - DPI.clipW (extra bytes per row)
          //
          // Without this, 42b079 reads (0,0,640,480) from the global back-
          // buffer DPI at 0x0099fb7c — a SCREEN-space rect — and 4316f3
          // computes strip pixel pointers off by `-view_y * pitch` bytes
          // (writes land before the back buffer).
          let dpiPtr;
          if (wndProcAddr === 0x42b079) {
            // Build temp DPI at a scratch location (just past 0x99fb7c
            // — 0x10 bytes is enough for the 16-byte DPI struct, and
            // 0x99fb8c is the next unused slot per the DPI layout).
            dpiPtr = 0x0099fb90;  // 16 bytes of scratch
            const backBuf = heap.u32(0x005f1fec) >>> 0;
            const screenPitch = heap.u32(0x005f2400) & 0xffff;   // = 640
            const clipW = (screenW << zoom) & 0xffff;
            const clipH = (screenH << zoom) & 0xffff;
            // HAND-FIX (Phase L): bytes-ptr is computed to compensate for the
            // painter's formula at 4316f3 line 57:
            //   write_addr = bytes + (ax - dpi.clipX) + (bx - dpi.clipY) * stride
            //   where ax = (clipX_in - vp.world_x) >> zoom + vp.screen_x
            //         bx = (clipY_in - vp.world_y) >> zoom + vp.screen_y
            //         dpi.clipX/Y = vp.world_x/y (set by 42b079's caller)
            //         clipX_in/clipY_in = dpi.clipX/clipY (initially)
            // So ax_initial = vp.screen_x, bx_initial = vp.screen_y. For first
            // strip the formula computes:
            //   write_addr = bytes + (vp.screen_x - vp.world_x)
            //                      + (vp.screen_y - vp.world_y) * stride
            // We want write_addr = back_buf + vp.screen_y * pitch + vp.screen_x.
            // Solve for bytes:
            //   bytes = back_buf + vp.world_y * pitch + vp.world_x
            // i.e. dpi.bytes points at the WORLD ORIGIN row offset by the
            // viewport's panned-to world coord.
            const screenY = heap.u16(viewportPtr + 6) >>> 0;
            const screenX = heap.u16(viewportPtr + 4) >>> 0;
            const dpiBytes = (backBuf + viewY * screenPitch + viewX) >>> 0;
            heap.setU32(dpiPtr + 0x00, dpiBytes);
            heap.setU16(dpiPtr + 0x04, viewX);   // clipX (world)
            heap.setU16(dpiPtr + 0x06, viewY);   // clipY (world)
            heap.setU16(dpiPtr + 0x08, clipW);   // clipW (world span)
            heap.setU16(dpiPtr + 0x0a, clipH);   // clipH
            heap.setU16(dpiPtr + 0x0c, (screenPitch - (screenW & 0xffff)) & 0xffff);  // pitch diff
            heap.setU8 (dpiPtr + 0x0e, zoom);
            heap.setU8 (dpiPtr + 0x0f, 0);
          } else {
            // Other wndProcs (toolbar/cursor): use the global back-buffer DPI.
            dpiPtr = 0x0099fb7c;
          }

          regs.esi = slot >>> 0;
          regs.edi = dpiPtr >>> 0;
          regs.eax = 0; regs.ebx = 0;
          regs.ecx = 640; regs.edx = 480;
          try { fn(heap); } catch (e) { /* per-window paint errors are non-fatal */ }
        }
      }
      // Restore the tool drag rect clobbered by the multi-pass marker overflow
      // (see the _toolRect snapshot comment above). Only restore when a tool is
      // actually armed AND the snapshot held a valid rect — otherwise leave the
      // pump's writes alone (no tool means nothing to protect, and the marker
      // buffer legitimately owns that memory).
      if ((heap.u32(0x00991f30) >>> 3 & 1) !== 0 && (_toolRect[0] & 1) !== 0) {
        for (let i = 0; i < 0x0c; i++) heap.setU8(0x0099a020 + i, _toolRect[i]);
      }

      // Phase J: drive the back→front DirtyCopy after the synthetic paint
      // pump. The binary's normal tick flow has FUN_004015f0 increment
      // [0x5e9158] for each dirty rect and adds entries to the dirty-flag
      // table at 0x99ad63; FUN_0040179d then walks the table, calling
      // FUN_00401f79 → FUN_004023b2 to copy dirty regions from the back
      // surface (lpSurface from the Lock wrapper at 0x99fb7c) to the
      // front surface. Without this, all painter writes stay on the back
      // buffer and are never visible. Force the full screen as dirty so
      // the entire back buffer is copied each tick. The binary's gate at
      // [0x5e9148]!=0 and [0x5e910c]>2&<8 is satisfied by the DDraw init
      // chain; if not, 401f79 silently returns 0 — safe.
      if (heap.u32(0x005e9174) !== 0 && heap.u32(0x005e9178) === 0) {
        // Mark the entire 4023b2 dirty-flag bitmap as dirty so the
        // whole back buffer is copied to the front surface this tick.
        // Layout (per FUN_004015f0 + FUN_004023b2): each cell is ONE BYTE
        // at [0x005f2420 + row_idx + col_idx*0x14], walking row_idx over
        // (height/8) rows and col_idx over (width/0x40) columns. For
        // 640x480 surface that's 60*10 cells; max-supported is well under
        // 0xa00 bytes (the same bound FUN_0040179d clears at end-of-tick).
        // Bound was 0x5000 — that overran the table and clobbered globals
        // downstream including PTR_LAB_005f49a0 (game-cmd jumptable at
        // 0x5f49a0..0x5f49e0). See .claude/scratch/agent-ptr5f49a0-findings.md.
        heap.setU32(0x005e9158, 1);
        for (let i = 0; i < 0xa00; i++) heap.bytes[0x005f2420 + i] = 0xff;
        const fn_40179d = state.fnDispatch.get(0x40179d);
        if (typeof fn_40179d === "function") {
          try { fn_40179d(heap); } catch (e) { /* presenter errors are non-fatal */ }
        }
      }
    },
  };
}

/**
 * Bypass the boot fade-in state machine so callers (tests, dev tools) can
 * exercise the normal-tick input/paint chain immediately, without waiting
 * ~80 ticks for the binary's natural fade-in to complete.
 *
 * Background — see ported/auto/4385d8.js lines ~149-176:
 *   DAT_005f8da2 is the boot fade-in counter. The first tick sets it to 0x10.
 *   Each subsequent tick increments it by 1 and short-circuits the rest of
 *   the tick body (`break LAB_00438a0d`) while the counter is in 0x10..0x5f
 *   — meaning no input dispatch and limited paint runs during that window.
 *   At 0x60 the fade-in completes: the counter snaps to 1 (or 2 if the
 *   binary detected an event during fade-in via DAT_00628ce0), then
 *   FUN_0042f3a2 runs as a one-shot post-fade init (sound/font setup).
 *
 * At 60Hz that's ~1.3s in a foregrounded browser — but in hidden tabs
 * (rAF throttled to ~1Hz) and in node tests it can be 80+ real seconds
 * and blocks any test that wants to verify the post-fade input/dispatch
 * chain.
 *
 * This helper sets DAT_005f8da2 directly to the same post-fade value the
 * binary would land on naturally (preserving the 1-vs-2 distinction based
 * on DAT_00628ce0), then fires FUN_0042f3a2 once to match what 4385d8
 * does at the natural 0x60 transition.
 *
 * Call AFTER runInit() + at least one runTick() so the first-tick lazy
 * init in 4385d8 has populated DAT_00628ce0 / DAT_00628cd0 etc.
 *
 * @param {Heap} heap  runtime heap (from createRuntime().heap)
 */
export function skipFadeIn(heap) {
  // Set counter to post-fade-in state. Mirrors lines 172-174 of 4385d8:
  //   heap.setU8(0x005f8da2, 1);
  //   if (heap.u32(0x00628ce0) != 0) heap.setU8(0x005f8da2, 2);
  heap.setU8(0x005f8da2, 1);
  if (heap.u32(0x00628ce0) !== 0) heap.setU8(0x005f8da2, 2);
  // Fire the one-shot post-fade init the same way 4385d8 would. Use
  // state.fnDispatch instead of a static import so any monkey-patch
  // (painter-bridge / hand-port overlay installed in createRuntime) wins.
  const fn_42f3a2 = state.fnDispatch.get(0x42f3a2);
  if (typeof fn_42f3a2 === "function") {
    try { fn_42f3a2(heap); }
    catch (e) {
      if (typeof console !== "undefined") {
        console.warn(`[harness] skipFadeIn: FUN_0042f3a2 threw: ${(e.message || e).slice(0, 160)}`);
      }
    }
  }
}

/**
 * Skip the title-intro state machine in FUN_00438aac so the cb9==0 gate in
 * FUN_004385d8 (sprite-update + DAT_0099a4fe increment + palette
 * AnimatePalette) opens immediately. The intro normally runs through cases
 * 1→2→3→4→5→6→7→0xFE→0xFF→default(0) over ~700 game ticks; at this runtime's
 * speed (~80s/tick under Node), that's hours of wall-clock just to reach
 * sprite animation.
 *
 * The "default" arm of 438aac (case any-other) sets cb9=0 + runs
 * FUN_009bb717 + zeroes DAT_005e9154 + runs FUN_005e6028 — equivalent to
 * "intro finished cleanup". We mirror that here so any animation state
 * 438aac would have settled is also reached.
 *
 * @param {Heap} heap  runtime heap (from createRuntime().heap)
 */
export function skipTitleIntro(heap) {
  // Stuff cb9 with an out-of-range value so the next 438aac call hits the
  // default arm — but also do the cleanup directly so the gate opens this
  // tick even if 438aac isn't called between now and the next runTick.
  heap.setU8(0x00628cb9, 0);
  heap.setU32(0x005e9154, 0);
  const fn_9bb717 = state.fnDispatch.get(0x9bb717);
  if (typeof fn_9bb717 === "function") {
    try { fn_9bb717(heap); } catch (e) {
      if (typeof console !== "undefined") {
        console.warn(`[harness] skipTitleIntro: FUN_009bb717 threw: ${(e.message || e).slice(0, 160)}`);
      }
    }
  }
  const fn_5e6028 = state.fnDispatch.get(0x5e6028);
  if (typeof fn_5e6028 === "function") {
    try { fn_5e6028(heap); } catch (e) {
      if (typeof console !== "undefined") {
        console.warn(`[harness] skipTitleIntro: FUN_005e6028 threw: ${(e.message || e).slice(0, 160)}`);
      }
    }
  }
}

/**
 * Enter genuine SCENARIO-PLAY (vs the title-demo backdrop), so the world
 * simulates and the input/cursor-pick path resolves clicked tiles — the
 * prerequisite for interactive building.
 *
 * The binary's "play a scenario" flow is 42eae0(menu) -> 42f4be(scenario LOAD)
 * -> 438a1f(play-init). The harness's runInit runs only the LOAD (FUN_0042f4be),
 * which fills the world AND clears the play-mode bit (0x99a500 &= 0xfffe at
 * 42f4be.js:104) — leaving the world loaded but frozen and non-interactive.
 *
 * We do NOT call the full FUN_00438a1f: its chain calls FUN_00444a79, which
 * wipes the sprite pool to an empty free-list (the binary runs 438a1f BEFORE
 * the load and the load repopulates; the harness inverted that order, so a
 * post-load 438a1f would DESTROY the loaded world — the exact failure 42f4be.js
 * documents avoiding). Instead enter play surgically: set the play-mode bit and
 * open the sprite-update gate (skipTitleIntro). The loaded world — sprites, the
 * sprite tile-grid at 0x991f8e, and the terrain tile-pointers at 0x971ef4 — is
 * preserved (verified: the 0x991f8e bucket count is unchanged, owned terrain
 * tiles still resolve, and the sprite array animates over ticks).
 *
 * @param {Heap} heap  runtime heap (from createRuntime().heap)
 */
export function enterScenarioPlay(heap) {
  heap.setU32(0x0099a500, (heap.u32(0x0099a500) | 1) >>> 0); // play-mode bit
  skipTitleIntro(heap); // open the sprite-update gate (cb9=0) + intro cleanup
}
