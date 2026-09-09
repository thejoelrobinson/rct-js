// Browser entry for the hybrid migration runtime and the promoted pure-JS runtime.
// Hybrid mode loads rct.exe as a development oracle. `?pure=1` omits it and rejects
// every unresolved dispatch or interpreter fallback.
//
// Sequence:
//   1. fetch decompiled/data.bin (the binary's data sections at their VAs)
//   2. fetch the .dat asset files into a VFS Map
//   3. load promoted generated modules; hybrid mode also fetches binary/rct.exe
//   4. runInit() — runs the binary's window-creation prelude
//   5. requestAnimationFrame loop:
//        post WM_TIMER + WM_PAINT periodically
//        runTick() — one game frame (FUN_00402bef + FUN_004385d8)
//        presentFrame() — DIB → canvas

import { createRuntime, skipFadeIn, skipTitleIntro } from "../runtime/harness.js";
import { presentFrame, presentBootStatus } from "../runtime/canvas.js";
import { state } from "../runtime/win32/context.js";
import { postWindowMessage } from "../runtime/win32/user32.js";
import { regs } from "../runtime/regs.js";
// input.js is imported dynamically (below) with a cache-buster so edits to the
// title-menu click bridge are picked up on reload; the browser otherwise keeps
// the ES module cached across navigations. It resolves its own deps (regs,
// state, painter-bridge) from the shared no-query graph, so the bridge acts on
// the same installed interpreter and register file as the rest of the runtime.
const { attachInput } = await import(`../runtime/input.js?v=${Date.now()}`);

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
  // Tutorial data (ADDENDUM 82). tutl.dat was previously faked as an empty
  // placeholder; these are the real files from the retail Data/ directory.
  "tutk.dat", "tutl.dat", "tutoriak.dat",
  // FULL SCENARIO SET (ADDENDUM 82). The retail Scenarios/ directory ships
  // 21 scenarios plus the SC.IDX index; we previously shipped exactly ONE
  // (sc21.sc4), so scenario select had nothing to enumerate and "New Game"
  // could never work. kernel32's FindFirstFileA/FindNextFileA already glob
  // the VFS by basename, so listing them here is enough for the binary's own
  // enumeration to see them. Retail filename case is inconsistent (sc0.SC4,
  // SC10.SC4, sc6.sc4) — the VFS lowercases basenames on lookup.
  "SC.IDX",
  "sc0.SC4", "sc1.SC4", "sc2.SC4", "sc3.SC4", "SC4.SC4", "SC5.SC4",
  "sc6.sc4", "sc7.sc4", "sc8.sc4", "SC9.SC4", "SC10.SC4", "SC11.SC4",
  "SC12.SC4", "SC13.SC4", "SC14.SC4", "SC15.SC4", "SC16.SC4", "SC17.SC4",
  "SC18.SC4", "SC19.SC4", "SC20.SC4",
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
// NOTE (ADDENDUM 82): css10/css12/css16 are FAITHFUL as empty placeholders —
// they are 6-byte stub files in the retail Data/ directory too, so faking them
// is not a fidelity gap. tutl.dat was removed from this list: the real 117 KB
// file is now shipped (see VFS_FILES above).
const VFS_PLACEHOLDERS = [
  "css10.dat", "css12.dat", "css16.dat",
];

// Win32 message constants we care about for the rAF pump.
const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;

async function main() {
  const executionMode = new URLSearchParams(location.search).get("pure") === "1" ? "pure-js" : "hybrid";
  // Audio bisection toggle: ?noaudio=1 disables WebAudio playback (the DSound
  // shim keeps its COM bookkeeping, so game logic is identical). Use it to
  // confirm whether the audio path is responsible for a periodic stall.
  try {
    if (new URLSearchParams(location.search).get("noaudio") === "1") {
      globalThis.__rctNoAudio = true;
      log("[audio] disabled via ?noaudio=1", "info");
    }
  } catch (_) {}

  status("fetching decompiled/data.bin…");
  const dataBin = await fetchBytes("../decompiled/data.bin");
  log(`data.bin: ${(dataBin.length / 1e6).toFixed(2)} MB`, "ok");

  status(executionMode === "pure-js" ? "loading promoted JavaScript…" : "fetching binary/rct.exe + lifter metadata…");
  // painter-bridge needs rct.exe's .text/CODESEG bytes plus the extras list
  // to know which addresses to bridge. In Node it reads from disk; in the
  // browser we hand it pre-fetched bytes.
  let exeBytes = null, extraEntriesJson = [], promotedLifted = null;
  try {
    promotedLifted = (await import(`../generated/promoted-loader.js?v=${Date.now()}`)).promotedLifted;
    log(`promoted lifted roots: ${promotedLifted.entries.length}`, "ok");
  } catch (error) {
    if (executionMode === "pure-js") throw new Error(`pure-js generated loader unavailable: ${error.message}`);
  }
  if (executionMode === "hybrid") {
    const [loadedExe, extraEntriesText] = await Promise.all([
      fetchBytes("../binary/rct.exe"),
      fetch("../lifter/extra-entries.json").then((response) => response.text()),
    ]);
    exeBytes = loadedExe;
    extraEntriesJson = JSON.parse(extraEntriesText);
    log(`rct.exe: ${(exeBytes.length / 1e6).toFixed(2)} MB, extras: ${extraEntriesJson.length} entries`, "ok");
  }

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

  // REAL STARTUP (Task #13): boot to the binary's own title screen (menu +
  // logo) via the first tick's title-setup path, instead of force-loading a
  // gameplay park at runInit. The gameplay-forcing skipFadeIn/skipTitleIntro
  // block below is gated off when this is set; gameplay is reached the real
  // way — New Game → scenario select → load.
  globalThis.__realStartup = true;

  status("createRuntime…");
  const runtime = createRuntime({ dataBin, vfs, canvas, exeBytes, extraEntriesJson, executionMode, promotedLifted });
  log(`heap: ${(runtime.heap.bytes.length / 1e6).toFixed(0)} MB allocated`, "ok");

  // Watchdog: per-phase heap-op budget + wallclock. Init has a generous
  // budget; tick resets both before each runTick. Throws on overrun with
  // a stack trace.
  let _ops = 0;
  // Init may exercise the painter-bridge interpreter. With __enumScenarios on,
  // the Phase H pre-run tick also reaches FUN_0042fdf4, the binary's scenario-
  // list builder, which RLE-decompresses EVERY shipped SC*.SC4 (22 files × ~2 MB
  // into the world buffer) to read each park's name/id — genuinely expensive and
  // exactly what retail RCT does on a cold scenario index. 200M heap ops is not
  // enough for that; give it headroom when the flag is on.
  let _budget = (globalThis.__enumScenarios || globalThis.__realStartup) ? 2_000_000_000 : 200_000_000;
  let _startMs = Date.now();
  let _wallBudgetMs = (globalThis.__enumScenarios || globalThis.__realStartup) ? 120_000 : 60_000;
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
  if (!globalThis.__realStartup) {
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
  } else {
    log(`[real-startup] staying on the title screen (menu + logo)`, "ok");
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

  // The watchdog's counters are reset per rAF frame, but INPUT handlers run
  // outside that reset — and one input action is legitimately huge: picking a
  // scenario runs FUN_0042f4be, which decompresses a ~2 MB park (comparable to
  // init, not to a frame). With the frame's budget already partly spent, the
  // watchdog aborted the load part-way and the click silently did nothing.
  // Let the input layer declare "this is an init-sized operation".
  globalThis.__resetOpsBudget = () => { _ops = 0; _startMs = Date.now(); };

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
  // Paint the binary's UI windows (top/bottom toolbars) in the browser. The
  // harness's synthetic paint pump skips every window with no viewport
  // attached and no JS paint proc, which is exactly the UI set — so the game
  // rendered its world with no chrome at all until this was turned on
  // (ADDENDUM 79). Left opt-in at the runtime level because it changes
  // pixels and the accuracy/replay gates byte-compare against a truth
  // surface captured without chrome; the browser is not gated, so it opts in.
  globalThis.__paintUiWindows = true;
  attachInput(canvas, { heap: runtime.heap });

  // Expose state for browser-console inspection.
  window._runtime = runtime;
  window._state = state;
  window._regs = regs;
  // Translator emits a soft early-return for unsupported gotos. Capture
  // hits here so we can see which functions are being short-circuited.
  const _gotoHits = new Map();
  globalThis._gotoWarn = (site) => { _gotoHits.set(site, (_gotoHits.get(site) || 0) + 1); };
  window._gotoHits = _gotoHits;

  // FREEZE DIAGNOSTIC (ADDENDUM 7): a wedged renderer can't answer CDP,
  // but the tab TITLE is browser-process state and stays readable. Write
  // a heartbeat before the tick and the phase string during it — when
  // the page freezes, the title names the exact frame + phase it died in.
  globalThis.__painterStepLimit = 3_000_000; // interpreter runaways throw in ~seconds, not minutes
  function tick(t) {
    try {
      const hwnd = state.firstHwnd || 0;
      if (hwnd && t - lastTimer >= 16) { postWindowMessage(hwnd, WM_TIMER, 1, 0); lastTimer = t; }
      if (hwnd && t - lastPaint >= 33) { postWindowMessage(hwnd, WM_PAINT, 0, 0); lastPaint = t; }
      _ops = 0;
      _startMs = Date.now();
      let _lastPhase = "(none)";
      document.title = `f${frameCount} pre-tick ${Date.now() % 100000}`;
      try {
        runtime.runTick((phase) => {
          document.title = `f${frameCount} ${phase} ${Date.now() % 100000}`;
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
