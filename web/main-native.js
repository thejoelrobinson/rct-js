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

import { createRuntime, skipFadeIn, skipTitleIntro } from "../runtime/harness.js";
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
  // Phase E: title-screen demo scenario. The binary's data.bin has the
  // template filename "SC21.SC4" baked in at 0x005f888e. Real RCT cycles
  // through Scenarios/SC*.SC4 — we ship one fixed copy (SC20 = Forest
  // Frontiers) under the SC21 name. runtime/harness.js force-drives the
  // scenario parser at runInit (see Phase E section there).
  "sc21.sc4",
];
// Files referenced by the binary's asset table but not shipped in our
// build. The asset-load loop opens then immediately closes — it just
// validates presence. Provide empty placeholders so the loop completes
// successfully and execution proceeds to scenario init / sprite-table
// population. ReadFile against an empty file returns 0 bytes, which
// the binary treats as a successful zero-length read.
const VFS_PLACEHOLDERS = [
  "css10.dat", "css12.dat", "css16.dat", "tutl.dat",
];

// Win32 message constants we care about for the rAF pump.
const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;

async function main() {
  status("fetching decompiled/data.bin…");
  const dataBin = await fetchBytes("../decompiled/data.bin");
  log(`data.bin: ${(dataBin.length / 1e6).toFixed(2)} MB`, "ok");

  status("fetching binary/rct.exe + lifter/extra-entries.json…");
  // painter-bridge needs rct.exe's .text/CODESEG bytes plus the extras list
  // to know which addresses to bridge. In Node it reads from disk; in the
  // browser we hand it pre-fetched bytes.
  const [exeBytes, extraEntriesText] = await Promise.all([
    fetchBytes("../binary/rct.exe"),
    fetch("../lifter/extra-entries.json").then((r) => r.text()),
  ]);
  const extraEntriesJson = JSON.parse(extraEntriesText);
  log(`rct.exe: ${(exeBytes.length / 1e6).toFixed(2)} MB, extras: ${extraEntriesJson.length} entries`, "ok");

  status("fetching asset files…");
  const vfs = new Map();
  let totalBytes = 0;
  await Promise.all(VFS_FILES.map(async (name) => {
    const bytes = await fetchBytes(`./assets/${name}`);
    vfs.set(name.toLowerCase(), bytes);
    totalBytes += bytes.length;
  }));
  for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));
  log(`vfs: ${VFS_FILES.length} files (${VFS_PLACEHOLDERS.length} placeholders), ${(totalBytes / 1e6).toFixed(1)} MB`, "ok");

  status("createRuntime…");
  const runtime = createRuntime({ dataBin, vfs, canvas, exeBytes, extraEntriesJson });
  log(`heap: ${(runtime.heap.bytes.length / 1e6).toFixed(0)} MB allocated`, "ok");

  // Watchdog: per-phase heap-op budget + wallclock. Init has a generous
  // budget; tick resets both before each runTick. Throws on overrun with
  // a stack trace.
  let _ops = 0;
  let _budget = 200_000_000; // init may exercise painter-bridge interpreter
  let _startMs = Date.now();
  let _wallBudgetMs = 60_000; // 60s for init (was 30s)
  const HEAP_FNS = ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"];
  const _origHeapFns = {}; // pre-wrap originals (prototype methods), restored by unwrapHeap
  for (const name of HEAP_FNS) {
    _origHeapFns[name] = runtime.heap[name];
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
  // Restore the unwrapped accessors. The watchdog wrappers cost a closure
  // call + spread per heap op — measurable per-frame tax in the steady-state
  // loop, where 2000+ stable ticks have shown there is no hang to guard.
  // Assign the originals back (do NOT delete the instance properties).
  function unwrapHeap() {
    for (const name of HEAP_FNS) runtime.heap[name] = _origHeapFns[name];
  }

  status("runInit() — registering window class + creating window…");
  try {
    runtime.runInit();
    log(`[init] complete after ${_ops.toLocaleString()} heap ops: ${state.windows.size} window(s), ${state.windowClasses.size} class(es)`, "ok");
    log(`[init] dibs: ${state.dibSections.length}, palette captured: ${!!state.capturedPalette}`, "info");
  } catch (e) {
    log(`[init] threw: ${e.message}`, "err");
    if (e.stack) log(e.stack.slice(0, 2000), "err");
    status("init error — see log");
    return;
  }

  // First tick = "init phase 2": runs FUN_004385d8 with cb8==0, which
  // executes the binary's first-time-init sequence (asset loading, sprite
  // table population, etc). This is genuinely heavy work that only runs
  // once. Allow 60s and 2B heap ops for it; subsequent ticks are bounded
  // much tighter.
  status("first tick (asset load + scene init)…");
  _budget = 2_000_000_000;
  _wallBudgetMs = 60_000;
  _ops = 0;
  _startMs = Date.now();
  try {
    const t0 = Date.now();
    runtime.runTick(() => {});
    log(`[first tick] complete after ${_ops.toLocaleString()} heap ops in ${Date.now() - t0}ms`, "ok");
  } catch (e) {
    log(`[first tick] threw at ${_ops.toLocaleString()} ops: ${(e.message || e).slice(0, 200)}`, "err");
    if (e.stack) log(e.stack.split("\n").slice(0, 8).join("\n"), "err");
  }
  // Enter GAMEPLAY: complete the fade-in and open the sprite-update gate so the
  // park actually simulates (peeps walk, rides animate) instead of showing only
  // the static title backdrop. CLAUDE.md's old warning that skipTitleIntro makes
  // a tick take "minutes" predates this session's interpreter fixes (CPUID, shim
  // returns, callDepth/sentinel handling, DirectDraw EnumDisplayModes); a
  // gameplay tick is now ~26-340ms and runs 2000+ ticks with no hang.
  try {
    skipFadeIn(runtime.heap);
    skipTitleIntro(runtime.heap);
    log(`[gameplay] fade-in + title-intro opened — park is live`, "ok");
  } catch (e) {
    log(`[gameplay] skip threw: ${((e && e.message) || e).toString().slice(0, 200)}`, "err");
  }

  // The FIRST gameplay tick (the sprite-update gate just opened) does heavy
  // one-time work (~15s) — run it once with a generous budget so the per-frame
  // watchdog below doesn't false-abort it.
  status("first gameplay tick (sprite warm-up, ~15s)…");
  _budget = 2_000_000_000; _wallBudgetMs = 30_000; _ops = 0; _startMs = Date.now();
  try {
    const t0 = Date.now();
    runtime.runTick(() => {});
    log(`[gameplay] warm-up tick ${Date.now() - t0}ms`, "ok");
  } catch (e) {
    log(`[gameplay warm-up] ${((e && e.message) || e).toString().slice(0, 150)}`, "err");
  }

  // Steady state: the watchdog MUST stay armed. Live-browser testing
  // (2026-06-13) found a real-clock steady-state RUNAWAY: ~10-20s after
  // boot a tick stops returning (a once-per-second wallclock-gated path —
  // node's fake-clock soaks never reach it; suspects: the [0x99fe00]
  // >999ms accumulator paths in FUN_005e1653 and friends). With the
  // accessors unwrapped there is NO interruption mechanism and the
  // renderer freezes solid; with the watchdog armed the wallclock check
  // throws, tick() catches, and the game keeps running. Keep the
  // wrappers until that runaway is found and fixed with a lockstep
  // oracle (then unwrapHeap() can land for the per-op speedup).
  _budget = 2_000_000_000;
  _wallBudgetMs = 15_000;
  void unwrapHeap; // defined above; intentionally NOT called yet

  // Main loop. rAF cadence ≈ 60 Hz. Post WM_TIMER every 16 ms (matches the
  // game's expectation of a 60 Hz tick clock) and WM_PAINT every 33 ms.
  status("running…");
  let lastTimer = 0, lastPaint = 0;
  let frameCount = 0;
  let tickErrors = 0;
  const MAX_ERRORS = 20;
  const hwnd = state.firstHwnd || 0;

  // Wire DOM events on the canvas to the message queue.
  // Pass the heap so right-drag pan can mutate viewport coords directly
  // (the binary's title-state machine that normally drives the pan is
  // gated behind unreachable CODESEG code).
  attachInput(canvas, { heap: runtime.heap });

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
