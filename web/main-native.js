// Browser entry — auto-translated RCT1, no x86 interpreter loaded.
//
// Sequence:
//   1. fetch decompiled/data.bin (the binary's data sections at their VAs)
//   2. fetch the .dat asset files into a VFS Map
//   3. createRuntime({ dataBin, vfs, canvas })
//   4. runInit() — runs the binary's window-creation prelude
//   5. requestAnimationFrame loop:
//        post WM_TIMER + WM_PAINT periodically
//        runTick() — one game frame (FUN_00402bef + FUN_004385d8)
//        presentFrame() — DIB → canvas

import { createRuntime } from "../runtime/harness.js";
import { presentFrame, presentBootStatus } from "../runtime/canvas.js";
import { attachInput } from "../runtime/input.js";
import { state } from "../runtime/win32/context.js";
import { postWindowMessage } from "../runtime/win32/user32.js";

const logEl = document.getElementById("log");
const statusEl = document.getElementById("status");
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

function log(msg, cls = "") {
  const span = document.createElement("span");
  span.className = cls;
  span.textContent = msg + "\n";
  logEl.appendChild(span);
  logEl.scrollTop = logEl.scrollHeight;
}
function status(s) { statusEl.textContent = s; }

async function fetchBytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fetch ${url}: ${r.status}`);
  return new Uint8Array(await r.arrayBuffer());
}

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat",
];

// Win32 message constants we care about for the rAF pump.
const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;

async function main() {
  status("fetching decompiled/data.bin…");
  const dataBin = await fetchBytes("../decompiled/data.bin");
  log(`data.bin: ${(dataBin.length / 1e6).toFixed(2)} MB`, "ok");

  status("fetching asset files…");
  const vfs = new Map();
  let totalBytes = 0;
  await Promise.all(VFS_FILES.map(async (name) => {
    const bytes = await fetchBytes(`./assets/${name}`);
    vfs.set(name.toLowerCase(), bytes);
    totalBytes += bytes.length;
  }));
  log(`vfs: ${VFS_FILES.length} files, ${(totalBytes / 1e6).toFixed(1)} MB`, "ok");

  status("createRuntime…");
  const runtime = createRuntime({ dataBin, vfs, canvas });
  log(`heap: ${(runtime.heap.bytes.length / 1e6).toFixed(0)} MB allocated`, "ok");

  // Watchdog: per-phase heap-op budget + wallclock. Init has a generous
  // budget; tick resets both before each runTick. Throws on overrun with
  // a stack trace.
  let _ops = 0;
  let _budget = 10_000_000;
  let _startMs = Date.now();
  let _wallBudgetMs = 30_000; // 30s for init
  for (const name of ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"]) {
    const orig = runtime.heap[name].bind(runtime.heap);
    runtime.heap[name] = (...args) => {
      if (++_ops > _budget) throw new Error(`heap-op budget (${_budget}) exceeded — likely infinite loop`);
      // Wallclock check every 100k ops (cheap modulo via mask).
      if ((_ops & 0x1ffff) === 0 && Date.now() - _startMs > _wallBudgetMs) {
        throw new Error(`wallclock budget (${_wallBudgetMs}ms) exceeded after ${_ops.toLocaleString()} heap ops — likely infinite loop`);
      }
      return orig(...args);
    };
  }
  function unwrapHeap() { /* no-op — keep watchdog active for tick loop */ }

  status("runInit() — registering window class + creating window…");
  try {
    runtime.runInit();
    log(`[init] complete after ${_ops.toLocaleString()} heap ops: ${state.windows.size} window(s), ${state.windowClasses.size} class(es)`, "ok");
    log(`[init] dibs: ${state.dibSections.length}, palette captured: ${!!state.capturedPalette}`, "info");
    // Bump budget for per-tick work. The first tick is init-heavy
    // (FUN_004385d8's first-time block runs lots of sub-inits); subsequent
    // ticks should be smaller.
    _budget = 500_000_000;  // raised — 4385d8 has a 25ms busy-wait loop that
    // hits the budget when ticks are run synchronously without yielding
    _wallBudgetMs = 120_000; // 2 minutes per tick — full-screen DDraw blit
    // (FUN_00402027) iterates 480 rows × 160 dwords with several heap ops
    // each, so per-tick op count is naturally high (~14M); raise wallclock
    // proportionally rather than treating it as an infinite loop.
    _ops = 0;
    _startMs = Date.now();
  } catch (e) {
    unwrapHeap();
    log(`[init] threw: ${e.message}`, "err");
    if (e.stack) log(e.stack.slice(0, 2000), "err");
    status("init error — see log");
    return;
  }

  // Main loop. rAF cadence ≈ 60 Hz. Post WM_TIMER every 16 ms (matches the
  // game's expectation of a 60 Hz tick clock) and WM_PAINT every 33 ms.
  status("running…");
  let lastTimer = 0, lastPaint = 0;
  let frameCount = 0;
  let tickErrors = 0;
  const MAX_ERRORS = 20;
  const hwnd = state.firstHwnd || 0;

  // Wire DOM events on the canvas to the message queue.
  attachInput(canvas);

  // Expose state for browser-console inspection.
  window._runtime = runtime;
  window._state = state;
  // Translator emits a soft early-return for unsupported gotos. Capture
  // hits here so we can see which functions are being short-circuited.
  const _gotoHits = new Map();
  globalThis._gotoWarn = (site) => { _gotoHits.set(site, (_gotoHits.get(site) || 0) + 1); };
  window._gotoHits = _gotoHits;

  function tick(t) {
    try {
      const hwnd = state.firstHwnd || 0;
      if (hwnd && t - lastTimer >= 16) { postWindowMessage(hwnd, WM_TIMER, 1, 0); lastTimer = t; }
      if (hwnd && t - lastPaint >= 33) { postWindowMessage(hwnd, WM_PAINT, 0, 0); lastPaint = t; }
      _ops = 0;
      _startMs = Date.now();
      let _lastPhase = "(none)";
      try {
        runtime.runTick((phase) => {
          // Only log on first tick to avoid spamming the log. Captures the
          // phase string in a closure so the catch handler below can report
          // which sub-call hung.
          _lastPhase = phase;
          if (frameCount === 0) log(`[tick #0] ${phase} @ ${_ops.toLocaleString()} ops, ${Date.now() - _startMs}ms`, "info");
        });
      } catch (e) {
        const msg = (e && e.message) || String(e);
        tickErrors++;
        if (tickErrors <= 3) {
          log(`[tick #${frameCount}] (after phase ${_lastPhase}) ${msg}`, "err");
          if (e && e.stack) log(e.stack.split("\n").slice(0, 6).join("\n"), "err");
        }
        if (tickErrors >= MAX_ERRORS) {
          log(`[tick] ${MAX_ERRORS} errors — aborting`, "err");
          status(`tick error after ${frameCount} frames — see log`);
          return;
        }
      }
      try {
        const presented = presentFrame(runtime.heap, canvas, ctx);
        if (!presented) {
          presentBootStatus(canvas, ctx, [
            `frame: #${frameCount}`,
            `hwnd: 0x${(state.firstHwnd||0).toString(16)}`,
            `windows: ${state.windows.size}, classes: ${state.windowClasses.size}`,
            `dibs: ${state.dibSections.length}  palette: ${state.capturedPalette ? "captured" : "none"}`,
            `messages queued: ${state.messageQueue.length}`,
            `tick errors: ${tickErrors}`,
            "",
            "(no DIB section yet — render path not entered)",
          ]);
        }
      } catch (e) {
        if (tickErrors <= 3) log(`[present] ${(e && e.message) || e}`, "err");
        tickErrors++;
      }
      frameCount++;
      status(`tick #${frameCount}, hwnd=0x${(state.firstHwnd||0).toString(16)}, dibs=${state.dibSections.length}, msgs=${state.messageQueue.length}, classes=${state.windowClasses.size}, wins=${state.windows.size}, errs=${tickErrors}`);
    } catch (e) {
      // Outer safety net — if status update or anything else throws, log
      // it instead of letting rAF die silently.
      log(`[tick:outer] ${(e && e.message) || e}`, "err");
      if (e && e.stack) log(e.stack.split("\n").slice(0, 4).join("\n"), "err");
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

main().catch((e) => {
  log(`[fatal] ${e.message}`, "err");
  if (e.stack) log(e.stack.slice(0, 2000), "err");
  status("fatal");
});
