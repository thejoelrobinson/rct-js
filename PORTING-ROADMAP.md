# Porting roadmap — to pixel-perfect, full-function, 60-90 fps

Target: gameplay byte-exact vs the binary AND <11ms per tick+present on
modern hardware. Method discipline for every item: the two-step rule in
CLAUDE.md (behavior-preserving change gated by replay/accuracy; behavior
fix gated by an interpreter diff oracle — see `tools/_diff-*.mjs` for
the pattern). Never land both in one commit. Re-run
title_accuracy + title_replay + playability + interactive +
viewport_build(+_live) + scenario assertions on every commit.

## Measured baseline (2026-06-09, sandbox; Mac ≈ 2-3x faster)

Scenario-play tick: ~190 ms avg. Interpreter share: only ~60k
steps/tick (≈10 ms) — measured via `__painterSteps` over 8 ticks:

| addr | steps/8 ticks | calls | what |
|---|---|---|---|
| 0x439b86 | 195,932 | 621 | peep-state walk handler (bridged) |
| 0x5d94b6 | 122,831 | 352 | goto-delegated (sprite sort?) |
| 0x429560 | 37,856 | 32 | leaf gameplay helper |
| 0x439178 | 37,301 | 313 | (verify addr; in peep family) |
| 0x424e0f | 28,390 | 32 | goto-delegated sim fn |
| 0x5d7503 | 19,733 | 110 | paint-adjacent |
| 0x4368d8 | 17,766 | 17,766 | 1-step hook overhead — hook cost, not work |
| 0x43a74b / 43a5f8 / 4499cc / 43a3a8 / 43a73f | <10k each | | peep handlers |

**Implication: the JS side burns ~95% of the tick.** Hand-porting
bridged functions helps, but profiling the translated JS is step 1.

## Workstream A — performance (60-90 fps)

1. **Profile the JS tick** (`node --cpu-prof tools/probe-gameplay.js`
   with enterScenarioPlay, or the inspector technique in
   `tools/probe-cb9-slowpath.js`). Suspects, in order:
   - FUN_005e69bd tooltip body runs EVERY tick because its u32-vs-byte
     early-out never fires (documented load-bearing divergence in
     `ported/auto/5e69bd.js`) — it drags 5e6a55/5e698a/5e3b2b with it.
     Fixing it faithfully requires the input/hover chain pass (item 3).
   - Verbose translated style in the hot tick chain (4385d8 callees:
     4533d0, 4543bd, 453f76, 454351, 436508...) — candidates for
     idiomatic rewrites per the CLAUDE.md subsystem-rewrite workflow.
   - WM_PAINT present path (9b438b chain is byte-exact `@manual` JS —
     profile presentFrame + per-frame invalidation breadth).
2. **Hand-port the measured interpreter list** (order above):
   0x439b86 first (also unblocks removing the bridge for the whole
   PTR_0062d4ac family), then 0x5d94b6, 0x429560, 0x424e0f, 0x5d7503,
   0x4499cc. Oracle: lockstep/`_diff-*` per function; replay+accuracy
   must stay green.
3. **Input/hover chain oracle pass** (4270f2 → 5e38f5 → 5e1fdd →
   5e2225 → 5e6044/5e6078) so the faithful 5e69bd rewrite (in git
   history, commit 48d3a48's message documents it) can land and the
   tooltip body stops running per-tick.
4. **Window-scroll chain** (5e16f7 → 5e19eb → 5e1b3e → 9bb374):
   oracle-gate, fix 9bb374's 0-row underflow vs the binary, then
   enable the documented one-line `regs.esi` fix in
   `ported/auto/5e1653.js`. Restores proper per-window updates.
5. Reduce 0x4368d8 hook overhead (17k crossings/tick of 1 step each —
   batch or inline the JS hook).

## Workstream B — gameplay pixel-exactness

1. **Gameplay truth-surface gate**: extend
   `tools/capture-truth-surface.js` to capture an enterScenarioPlay
   frame from the interpreter; new ratchet test alongside
   title_accuracy (start at measured divergence, only goes down).
2. Drive to 0 with the title playbook: A/B bisection
   (`tools/_beta2-isolate.js`), per-blit oracles. Known uncovered
   paths: 9b4457 remap-dispatch blits, gameplay-only sprite types,
   the epilogue over-pop path at 0x4531ab (0x45305c / 0x43a74b — fires
   after real work; verify it's truly cosmetic with the gameplay gate).
3. Then the decoder.js refactor (behavior-preserving, replay-gated)
   per CLAUDE.md's pending-work section.

## Workstream C — functionality completeness

- sprite 72 not on ride-0 queue at scenario load (warn-once in
  43e792-hook): loader-side desync; compare interpreter-faithful load.
- One-shot boot miss 0x5e52a7 (mid-instruction vtable junk in
  FUN_005e4400's caller context — likely a benign guarded path; verify
  against interpreter boot).
- 43e304 (queue-join) hand-port to retire its bridge delegation.
- Sound-event callback records (0x9a013c window procs are fine; the
  audio event path through 5e5301 verified byte-equal in
  `tools/_diff-441452.mjs` — keep an ear on audio behavior).
- Full vitest suite caveat: `npm test` globs `.claude/worktrees/*`
  (CLAUDE.md) — gitignore + vitest exclude still pending.

## Done this campaign (all oracle-gated, title byte-exact throughout)

e478d99 bridge 22 unported gameplay indirect targets (peep-state family)
edcc1a4 tile-element compactor: 2 corrupting translator bugs
d92e8cb interpreter: 66-prefixed PUSH imm decode (mid-instruction EIP)
b52618e peep ride-queue subsystem: 4 corrupting ports + runaway unlink
454f938 delegate 3 goto-truncated translations to interpreter shims
f3acc80 4138d0 = CRT memmove (UI text was copying 0 bytes); DF support
48d3a48 window-find fidelity + tooltip stale-ESI derefs
2b8523b bridge 0x43e831 (live-browser dispatcher target)

## ADDENDUM — steady-state CPU profile (supersedes step-count read)

Sampling only the steady-state tick window (60 scenario ticks,
--cpu-prof, last-40% samples): runFunction 51.9% + step 32.3% +
decodeModrm 0.9% ≈ **85% of tick time IS the x86 interpreter** — the
earlier 60k-steps/tick figure undercounted because `__painterSteps`
only tallies _paintShim entries, not the runFunction sub-calls made by
the setEipHook painters (install4368d8Hooks dispatches per-ELEMENT
painters through runFunction; 17,766 crossings/tick). JS-ported
paintBody5ce7f8 at 5.0% shows the payoff per ported painter.

So Workstream A's true order: (1) hand-port the remaining per-element
PAINTERS in the render path (extend the step accounting to count
eip-hook runFunction calls to rank them; the extra_paint_* hand-port
pattern is established), (2) then the peep-state handlers (439b86
et al), (3) then the tooltip/input-chain and window-scroll passes.

## ADDENDUM 2 (2026-06-10) — painter-port campaign, session 1 results

Measured with the new per-funcAddr accounting (`globalThis.__fnSteps`
in harness/x86.js runFunction — counts EVERY runFunction call incl.
eip-hook sub-dispatches; ranking tool `tools/probe-painter-rank.js`,
8-tick enterScenarioPlay soak, sandbox timings ≈2-3x slower than Mac).

**Scenario tick: 144 ms → 72.5 ms avg. Interpreter steps: ~160k →
~77k per tick.** Five commits, all lockstep+heap-hash oracle-gated,
title gates green throughout (no fixture recaptures):

- `646ef9b` interpreter fix: 66-prefixed MOVSX/MOVZX wrote r32 (cleared
  the dest's high half) — now writes r16. Found by lockstep on 432204.
  Plus the __fnSteps accounting + probe/oracle/lockstep tooling.
- `1144883` PTR_LAB_00432204 (4 rotation paint-slot allocators) → JS,
  with full per-exit register/flag write-back (interpreter callers
  resume on cpu.regs). The high-leverage port: it sat inline in every
  hot painter body.
- `692d7ca` 0x5dff38 corner-fence painter (slot 5) → JS (was 24.8k
  steps/tick; now 0).
- `7335150` 0x42094b cold tail (water/cliff edge-strip loop + 2-byte
  scratch-ring shift at 0x999fdc) → JS (was 30k steps/tick; now 0).
- `1ad3cd9` 0x420502 cold tail (sibling; ring at 0x999f9a, no +5 on
  [0x5f4724], sprite +0/+1, strip regs al=0x1e/si=0x1e) → JS
  (was 7k steps/tick; now 0).

**Verification pattern that worked (use it for every next port):**
1. capstone disasm (objdump can't read the PE on arm64):
   CODESEG file off = va-0x41c000+0x1a600.
2. Write the JS body with FULL exit register+flag fidelity per path.
3. `tools/_lockstep-<addr>.mjs` — per-call JS-vs-interpreter compare of
   write-set + exit regs + flags from identical entry state, keeping
   the interpreter result live. Catches everything (5 real bugs found:
   slot+8 stored the mid-push/pop dx value; xchg leaves the old bucket
   head in ebx; full-32-bit `mov esi,[0x5f477c]` vs 16-bit `mov si`;
   per-block double-edge bit→sprite pairing; trailing shl dx,4 exit
   flags).
4. `tools/painter-port-oracle.mjs` — dual 6-tick whole-heap FNV-1a
   soak, JS mode vs FORCE_INTERP=<addr> mode; hashes must be identical.
5. Title gates + playability/interactive/viewport_build_live.

**Remaining ranking (8-tick soak, steps/tick):**

| addr | steps/tick | what / next move |
|---|---|---|
| 0x444e08 | 48,368 | wall painter (slot 1) — THE remaining painter. Stub falls back every call (3.7k calls/8t × 104 steps). ~3KB asm + the 0x44635d sub-dispatcher tail; a previous full-port attempt diverged subtly and was stubbed (extra_paint_444e08.js header). Redo it with the lockstep oracle — exactly the tool the first attempt lacked. Port 0x432e90 (the other slot allocator it calls) the way 432204 was done, first. |
| 0x439b86 | 9,170 | peep-state walk handler — Workstream A item 2 (gameplay, not painter). |
| 0x5d94b6 | 3,912 | sprite-sort goto-delegate — gameplay. |
| 0x4368d8 | 1,974 | 1-step hook crossings × 15.8k/8t — hook overhead, not work. |
| 0x439178, 0x42280c, 0x429560, 0x5d7503 | ~1.2-1.4k each | peep/paint helpers — low priority. |
| 0x431bc8/0x420d9c/0x420f4c/0x421d2c | 954 each | 1-step hook crossings (already JS). |

After 0x444e08, painters stop being the story (~29k steps/tick left,
mostly gameplay handlers): re-profile the JS side with --cpu-prof
before choosing the next slice.

## ADDENDUM 3 (2026-06-10) — painter-port campaign, session 2 results

**Scenario tick: 72.5 ms → 46 ms avg (sandbox; Mac ≈2-3x faster).
Interpreter steps: ~77k → ~36k per tick.** Two ports, both
lockstep + dual-soak oracle-gated, all gates green throughout,
no fixture recaptures:

- `ce8654f` **0x444e08 wall painter → JS** (was 48,368 steps/tick — the
  top consumer; now 2,676, which is fallback banners + 1-step hook
  crossings). Full main body + door-case-0 sub-dispatcher 0x44635d +
  common tail 0x447bcc. The four slope-case block tables were
  MACHINE-EXTRACTED from the binary with a python/capstone walker (no
  manual transcription of the ~80 stamped-out 432204 call blocks).
  Cold paths fall back to the interpreter, decided at entry before any
  side effect: door cases 1..13 ([esi+5]&0xf), banner walls
  ([esi+4]&8), shade-overlay mode ([0x991f8c]&0x40 @ zoom 0). Supports
  painter 0x4238b4 runs via runFunction (now separately visible in the
  ranking). Oracle: `tools/_lockstep-444e08.mjs` TICKS=10 → calls=2300
  memMis=0 regMis=0 flagMis=0; dual soak byte-identical.
- `214fe8b` **0x439b86 peep walk handler → JS** (was 9,170 steps/tick;
  the handler itself is now 0 — its cost was ~95% the untranslated
  walking core 0x43c751, which the port delegates via callNative and
  which now shows up honestly in the ranking). fnDispatch override in
  harness.js wins over the bridge shim; `__forceInterp439b86` keeps the
  interpreter reachable. Register dataflow into 0x43c751 is tracked
  binary-exactly (it consumes caller ebx/ebp). Oracle:
  `tools/_lockstep-439b86.mjs` (whole-heap per-call compare) TICKS=8 →
  calls=151 memMis=0; eaxMis=5 proven-benign dead tail register
  evolution (see the tool header — DIAG2 + AB_CONTROL evidence);
  dual soak byte-identical.

**Translator-bug finds (NOT yet fixed — shipping translations, need a
dedicated oracle pass before changing; their other callers are
affected):**
- `ported/auto/442816.js`: `dec byte [esi+0xc6]` lowered as
  `heap.setU32` → corrupts [esi+0xc7..0xc9] with sign-extension bytes
  (CLAUDE.md bug class #1); ALSO drops the `mov al,0x17; mov
  ah,[esi+0xc5]` staging before FUN_00440fe3 and the `mov bx,[esi+0xa];
  mov ax,0xc97` staging before FUN_005e5301 (sound event gets garbage
  ids).
- `ported/auto/442867.js`: drops the al=0x1b/ah=0xff staging before
  440fe3 and the full 42c711 staging block.
- `ported/auto/4428d6.js`: reads the word-sized guest-count gate
  [0x87d7a0] as u32 (`cmp word [0x87d7a0],2` in the binary); drops the
  440fe3 staging.
- `ported/auto/43c751.js` is a parse-fail throw stub (707-line Ghidra
  C never translated) — currently fine because every caller path goes
  through interpreter delegation, but it MUST NOT be called as JS.

**Remaining ranking (8-tick soak, steps/tick, avg 46 ms/tick):**

| addr | steps/tick | what / next move |
|---|---|---|
| 0x43c751 | 8,674 | peep walking-movement core (434 steps/call) — THE gameplay target now. 707 lines of Ghidra C exist (decompiled/c/43c751.c) but the translation parse-fails; hand-port with a lockstep oracle (the 439b86 port already stages binary-exact entry registers for it). Its inner indirect table PTR 0x62d3fc (per-peep-type motion handlers) needs the same treatment. |
| 0x4238b4 | 6,924 | supports painter, 30 steps/call × 230/tick — called from the JS 444e08 port via runFunction. Auto-translation exists but has goto-truncation early-returns; port with a lockstep oracle (its 432204 sub-calls are already JS). |
| 0x5d94b6 | 3,912 | sprite-sort goto-delegate — gameplay. |
| 0x444e08 | 2,676 | residual: banner-wall fallbacks + hook crossings — shrink by porting the scrolling-text banner path (calls 458bcf/458a7c/45a95d, all JS-dispatched). |
| 0x4368d8 | 1,974 | 1-step hook crossings — overhead, not work. |
| 0x439178 / 0x42280c / 0x429560 / 0x5d7503 | 1.0-1.4k each | peep/paint helpers. |

After 0x43c751 + 0x4238b4 (~16k steps/tick), the interpreter share is
mostly 1-step hook-crossing overhead; the next wins move to the JS
side (--cpu-prof per ADDENDUM 1).

## ADDENDUM 4 (2026-06-11) — gameplay-port campaign, session 3 results

**Scenario tick: 46 ms → 37 ms avg (sandbox; Mac ≈2-3x faster).
Interpreter steps: ~36k → ~26k per tick.** Four commits, all
lockstep + dual-soak oracle-gated, all gates green throughout
(title_accuracy 0/307200, title_replay, playability/interactive/
viewport_build_live 22/22), no fixture recaptures:

- `b2d3b4a` **interpreter fix: 66-prefixed XCHG ran as 32-bit.** The
  0x87 handler (and 0x91-0x97) dropped the operand-size prefix; the
  queue-join `66 87` xchg at 0x43d0ad therefore swapped a DWORD —
  zeroing the adjacent station's queue-head word and hauling it into
  eax's high half. Found by the 43c751 lockstep's one-byte heap diff at
  0x887474; attributed by the tool's single-step memory watch
  (CALLN=n WATCHA=addr prints the exact EIP whose write flips a byte —
  reusable microscope). Same prefix-drop class as 646ef9b / d92e8cb.
  NOTE: the JS port was the CORRECT leg here — the "truth" interpreter
  was wrong vs the real CPU. Lockstep mismatches deserve suspicion in
  both directions.
- `7365f98` **0x43c751 peep walking-movement core → JS** (was 8,674
  steps/tick, the top gameplay consumer; now 0 — its remaining cost is
  the delegated motion handlers, see ranking). Transcribed from the
  capstone disasm (the Ghidra C is a 707-line parse-fail). 43c49e
  (movement/anim step), 425432/42547b (walkability) inlined; motion
  handlers PTR [0x62d3fc] (43d5a0 guest / 4565f8 staff), 43e304,
  43d38b/423677, 42e062/452fce/42c711/4405f3 delegated via callNative
  with CF read off state.__painterCpu. Oracle: _lockstep-43c751
  TICKS=6 calls=115 memMis=0; dual soak byte-identical.
- `80552f4` **0x4238b4 vertical-supports painter → JS** (was 6,924
  steps/tick; now 230 = pure 1-step hook crossings). Slope pieces +
  segment loop + top-piece table rows; all PTR 0x432204/0x431bb8
  allocator calls go to the existing JS bodies; the cold attach
  variant (PTR [0x4328e0+rot*4]) stays delegated. Wired via
  setEipHook(0x4238b4). Oracle: _lockstep-4238b4 TICKS=8 calls=2064
  memMis=0 regMis=0 flagMis=0; dual soak byte-identical.
- `283a209` **stat trio 442816/442867/4428d6 fixed + delegations
  retired** — the ADDENDUM 3 catalogue (dec-byte-as-setU32, dropped
  AL/AH/BX staging, u32-for-u16 gate, a heap write lost to a
  `unique0x...` Ghidra artifact), plus the CALLEE closure the seeded
  oracle exposed: **440fe3** (action table read at quadruple scale;
  thought id clobbered; exit eax = the dword displaced off the thought
  queue), **43c60b** (all three anim tables mistyped int[] — garbage
  anim group + extent triple on every action change), **5e5301**
  (widget-invalidate path called 5e117d with unstaged rect regs;
  class paths called 5e43de without esi=window), and a shared faithful
  5e53ca/5e117d in **extra_invalidate.js**. Oracle:
  _lockstep-statrio.mjs SEED=1 (branch-forcing coverage; an unseeded
  soak leaves the fixed branches cold — fired=0) → 3× memMis=0.

**Translator-bug pattern confirmed twice more: Ghidra typing byte
tables as int[] (u32 read at quadruple-scaled offset). Grep candidates
before trusting any translation that indexes a 0x62xxxx table.**

**Known-but-unfixed (deliberate):** ported/auto/5e53ca.js still calls
FUN_005e117d without staging the rect registers it reads — every
TRANSLATED caller of 5e53ca therefore marks a stale dirty-grid rect.
The hand-ports now route around it via extra_invalidate.js; fixing the
translation itself needs an oracle pass over its remaining callers
(same shape as this session's statrio pass).

**Remaining ranking (8-tick soak, steps/tick, avg 37 ms/tick):**

| addr | steps/tick | what / next move |
|---|---|---|
| 0x43d5a0 | 3,977 | guest motion handler (4,545 steps/call × ~1/tick) — picks the next walk target incl. pathfinding; now THE gameplay target. Delegated from the 43c751 port via callNative; same lockstep-first pattern (entry regs are the 43c49e CF=0 exit, already binary-exact). Staff sibling 0x4565f8 next to it. |
| 0x5d94b6 | 3,912 | sprite-sort goto-delegate — gameplay. |
| 0x444e08 | 2,616 | residual: banner-wall fallbacks + hook crossings. |
| 0x4368d8 | 1,974 | 1-step hook crossings — overhead, not work. |
| 0x439178 / 0x42280c / 0x429560 / 0x5d7503 | 1.0-1.4k | peep/paint helpers. |
| 0x431bc8 ×6 group | 954 each | 1-step hook crossings (already JS). |
| 0x424e0f | 890 | goto-delegated sim fn. |
| 0x4254e0 | 604 | leaf helper (60 steps/call). |
| 0x4238b4 / 0x43d38b | 230 / 217 | hook crossings + the 43c751 port's z-height delegation (43d38b/423677 — small, port to finish the file). |

After 0x43d5a0 + 0x5d94b6 (~8k steps/tick), hook-crossing overhead
(~6k steps/tick of 1-step entries) dominates the interpreter column —
batch or inline those hooks, then re-profile the JS side with
--cpu-prof (ADDENDUM 1) before choosing the next slice.

## ADDENDUM 5 (2026-06-10) — session 4: gameplay render BYTE-EXACT

Four commits (f22d064, c6c6c91, 6526a99, 2aa9491), all gates green,
independently re-validated:

- 0x43d5a0 guest motion handler → JS (lockstep-gated; was top consumer).
- 0x5d94b6 = vehicle sound-params updater → JS (was the goto-delegated
  module; #2 consumer).
- runFunction now dispatches entry-address eip hooks directly — the
  ~6k steps/tick of 1-step hook crossings are gone.
- **Workstream B item 1 LANDED AND STARTS AT ZERO:
  test/runtime/gameplay_accuracy.test.js — the enterScenarioPlay frame
  is BYTE-EXACT vs the interpreter ground truth (0/307200, ratchet 0).**
  Gameplay rendering is pixel-perfect, not just the title.

Tick: 37 ms → 32 ms avg (sandbox; ≈12-16 ms on the dev Mac).
Cumulative campaign: 190 → 32 ms (5.9x).

Next: re-profile with --cpu-prof (interpreter share is now small —
find the new JS-side hot spots); remaining roadmap items: input/hover
chain pass (unblocks faithful 5e69bd + kills its per-tick body),
window-scroll chain (9bb374 0-row underflow + 5e1653 esi enable),
444e08 banner-fallback residual, Workstream C punch list (sprite-72
load desync, 0x5e52a7, 43e304 hand-port, vitest worktrees exclude).
Untracked ported/auto/*.truthbak files are session-4 scratch backups —
delete when the mount allows unlink.

## ADDENDUM 6 (2026-06-13) — session 5: BROWSER PERFORMANCE

Two browser-targeted commits landed (both gates green, no fixture
recaptures), plus a full steady-state CPU profile that re-orients the
roadmap. The game ran live in the user's browser at 21 fps / 48 ms/frame
BEFORE this session — that 48 ms was measured with the heap watchdog
still wrapping every accessor and the old per-channel present blit.

**Landed this session:**

- `d70374b` **browser: unwrap the heap-accessor watchdog before the rAF
  loop.** `web/main-native.js` wrapped all 12 heap accessors (u8..setI32)
  in budget+wallclock closures at boot and `unwrapHeap()` was a no-op —
  so EVERY heap op in EVERY steady-state frame paid a closure call + arg
  spread + two compares. Now the originals (prototype methods) are
  captured before wrapping and assigned back by `unwrapHeap()` right
  before the rAF loop. Init + first tick + the gameplay warm-up tick
  still run fully guarded (that is where the real hang risk lives); the
  steady loop runs on raw accessors. This is the single biggest
  browser-only tax and directly attacks the 48 ms figure. Behavior-
  preserving (no sim change); full vitest 25 files / 119 tests green.

- `95bff71` **presentFrame: palette LUT + dword blit.** Was 4
  Uint8ClampedArray byte stores + 3 palette reads per pixel × 307,200
  px/frame. Now a 256-entry Uint32Array LUT (rebuilt per frame — trivial,
  and the game animates the palette) and ONE packed-RGBA dword store per
  pixel via a Uint32Array view over the ImageData buffer. Endianness-
  exact (LE fast path + BE fallback). Synthetic byte-equivalence check vs
  the old per-channel loop; both pixel gates 0/307200. Also ships
  `harness/x86.js getEipHook()` + `tools/_cpuprof-steady.mjs` (the
  post-boot-only V8 sampling profiler used below).

**Steady-state CPU profile (`tools/_cpuprof-steady.mjs`, 60 gameplay
ticks after 10 warm-up, 100µs sampling, sandbox; Mac ≈2-3x faster).
Sandbox tick = 26.8 ms/tick avg in the profiled run.**

| % self | ms/tick | function | nature |
|---|---|---|---|
| 31.3 | 6.17 | 421d2c hook closure @ extra_paint_421d2c.js:480 | JS terrain per-element painter — 954 calls/tick, hot path, ALREADY JS, never falls back (1.0 steps/call). Inline heap work + 5 sub-painter dispatches. |
| 17.9 | 3.52 | runFunction @ x86.js:2957 | interpreter prologue — split: _paintShim 5.9%, runBodyFrom(421d2c) 4.3% (= the 5 callBridge sub-painters), _callNativeImpl 3.8% (gameplay delegates), runBodyFrom(444e08) 2.6%. |
| 12.8 | 2.52 | step @ x86.js:429 | interpreter inner — 8.1% under runFunction, 4.7% under paintBody5ce7f8's sub-painter dispatch. |
| 7.4 | 1.46 | paintBody5ce7f8 @ extra_paint_5ce7f8.js:130 | JS scenery painter — sets up regs then dispatches a scenery sub-painter via the interpreter. |
| 5.5 | 1.09 | FUN_00433bae @ 433bae.js:55 | JS paint-slot DEPTH-SORT (the hand-port that fixed the 3 goto-as-return-0 bugs). Pure JS, correct, load-bearing. |
| 4.0 | 0.79 | FUN_005e39c6 @ 5e39c6.js:11 | JS per-window UPDATE WALK — loops all windows calling each proc. callIndirect targets are mostly JS (only 0x5e2b52 interp, 30 steps/tick). |
| 3.9 | 0.77 | FUN_009b4911 @ 9b4911.js:33 | RLE sprite blit inner (the @manual chain; ~96% byte-accurate). |
| 3.2 | 0.63 | FUN_005e39ff @ 5e39ff.js:9 | JS widget-invalidate SCAN — walks every widget of every window per tick. Correct, load-bearing. |
| 1.4 | 0.28 | setU32 @ heap.js:53 | heap write accessor. |
| ~0.7 each | | 9b438b / u32 / paintBody421d2c / setU16 / 9b4660 | blit + heap + painters |

**Interpreter-step ranking (8-tick __fnSteps soak, steps/10t, for
porting priority):** 0x5da274 26.4k (330/call — vehicle/ride update, big
fn), 0x444e08 26.0k (11/call — mostly 1-step crossings + ~20-30
banner/door/shade fallbacks/tick of ~120 steps each), 0x4368d8 19.7k
(1-step per-element dispatch — overhead), 0x439178 13.3k, 0x42280c 12.6k,
0x429560 11.8k (1183/call — guest-count scan, big fn), 0x5d7503 9.9k,
431bc8/420d9c/420f4c/420502/42094b/421d2c 9.5k each (all 1.0 steps/call =
JS fast-path hook crossings, NOT work), 0x424e0f 8.8k (883/call, big fn),
0x5d9f8b 3.9k, 0x43a74b 2.9k.

**Analysis — why no further hand-port landed this session.** The
interpreter share is now ~30% but FRAGMENTED: the heaviest per-call
interpreter consumers (0x5da274 330/call, 0x429560 1183/call, 0x424e0f
883/call) are large gameplay functions (vehicle/ride update, guest-count
park scan, sim helper) with deep sub-call trees — each is a multi-hour
lockstep-oracle port with real divergence risk, not a single-session win.
The frequently-CROSSED addresses (431bc8/420d9c/.../421d2c, ~9.5k
steps/10t each) are already JS eip hooks taking the 1-step fast path —
their cost is `runFunction`'s prologue (esp/eip/callDepth setup + sentinel
write + map lookup) × ~5k crossings/tick, not real work. The 444e08
banner fallback (Workstream A residual) is a bounded port but the banner
path (0x446c5f) pulls in the scrolling-text rendering subsystem and the
fallback fires only ~20-30×/tick — poor risk/reward for <2% of the tick.
The remaining top JS self-time (433bae sort, 5e39c6/5e39ff window+widget
walk, 421d2c/5ce7f8 painters) is CORRECT, load-bearing per-tick work, not
translator bloat — there is no bug to fix or goto to unfold there.

Micro-bench confirmed the heap-accessor `globalThis._heapWatch` check is
only ~7% of a write and writes are ~2.3% of the tick — not worth the
back-compat risk (15+ tools set the global mid-run expecting immediate
effect). The blit/LUT/present path is already optimal.

**Budget status.** Node tick 32 → 26.8 ms (this session's profiled run;
the delta is run-to-run variance, not a regression — the two commits are
browser-only and don't touch the node tick). On the dev Mac (≈2-3x
faster) that is **≈9-13 ms/tick = within the 60 fps budget (16 ms)**.
The browser's measured 48 ms predates BOTH commits; the watchdog-unwrap
alone removes a closure+spread+2-compare from every heap op in every
frame. **Re-measure live in the browser** — that is the missing data
point; the node profile says the steady tick is already fast.

**MEASURED: the crossing prologue is NOT a cost.** A direct micro-bench
(`/tmp/prologuebench.mjs`) of `runFunction`'s 1-step fast-path prologue
(esp/eip/callDepth setup + sentinel write32 + map lookup + hook call +
ret pop) clocked **5.3 ns each → 0.026 ms/tick** for all ~5000
crossings/tick. So the 17.9% the profiler attributes to `runFunction`
self-time is the HOOK BODIES and `_callNativeImpl`'s interpreter work for
the large gameplay delegates — NOT the prologue. Inlining the crossing
(the obvious "broad win") would save 0.026 ms of a 26.8 ms tick:
worthless. Do NOT chase it.

**Next steps, re-prioritized:**
1. **Re-measure browser fps live** after d70374b + 95bff71 (the 48 ms
   number is stale — both commits are browser-only and never ran live).
   If <16 ms/frame on the Mac, the 60 fps target is met and perf work can
   stop. This is the missing data point; the node profile already says
   the steady tick is fast.
2. **Large gameplay ports are the ONLY real remaining interpreter
   lever** (each its own lockstep + dual-soak commit, in per-call-cost
   order): 0x429560 (1183 steps/call — guest-count park scan),
   0x424e0f (883/call — sim helper), 0x5da274 (330/call — vehicle/ride
   update). Each is multi-hour with deep sub-call trees; budget one per
   session. These are what the interpreter share actually is.
3. **444e08 banner/door/shade fallback** — bounded (the 0x446c5f banner
   path pulls in scrolling-text rendering) but fires only ~20-30×/tick
   (<2% of tick); defer behind 2 unless the browser misses budget.
4. The top JS self-time items (421d2c/5ce7f8 painters, 433bae sort,
   5e39c6/5e39ff window+widget walk) are CORRECT load-bearing per-tick
   work — no bug to fix, no goto to unfold. Reducing them needs
   algorithmic change (e.g. dirty-window tracking so 5e39ff doesn't
   re-scan every widget every tick), which is a behavior change requiring
   an interpreter-diff oracle, not a translator fix.
5. Workstream C punch list (sprite-72 load desync, 0x5e52a7, 43e304
   hand-port, vitest .claude/worktrees exclude).

## ADDENDUM 7 (2026-06-13) — LIVE-BROWSER FREEZE: open, top priority

Reproducible: page boots fine, runs, then the renderer wedges solid
~15-40s after load (CDP Runtime.evaluate + screenshots time out 45s).
Established by elimination, live in the user's Chrome:
- NOT the session-5 commits (reproduces with d70374b+95bff71 fully
  reverted on disk) — all earlier "stable" measurements simply finished
  before the 15s mark.
- IMMUNE to the per-op heap watchdog (restored, still froze) — so the
  blocking loop makes NO heap-accessor calls (pure JS/regs loop, or
  interpreter-context spin on a Win32 shim).
- NOT reproducible in node REAL-CLOCK scenario soak (481 ticks/34s,
  tools kept in /tmp/realclock-soak.mjs pattern: real Date.now, deadman
  in heap accessors). Node DID expose: (a) periodic ~1.6s ticks every
  ~145 ticks — GetTickCount 11% of profile; (b) FUN_00410d3d's 300ms
  DSound-start busy-wait (FIXED this session — spin made no heap calls,
  exactly the watchdog-immune class); (c) FUN_004385d8's tail pacing
  loop (timeGetTime until [0x999f90]+0x19 — the binary's own 25ms/40fps
  limiter; bounded, but caps fps at 40 and burns CPU: relevant to the
  60-90fps goal — consider rAF-aligned virtual clock).
Browser-only differences to investigate, in order:
1. Interpreter-context Win32 timing shims: if a bridged/callNative path
   calls IAT GetTickCount/timeGetTime and the shim result does not
   reach the interpreter's eax, the binary's wait loops spin FOREVER
   with zero heap-accessor calls — matches every observed symptom.
   Audit harness/shims.js + the shim-invoker eax write-back.
2. WM_TIMER/WM_PAINT flood + real input events (browser posts both
   every frame; node soak posts neither).
3. WebAudio-backed DSound state divergence retriggering sound starts.
DIAGNOSTIC TRICK for next session: a frozen renderer still shows its
tab TITLE — make tick() write a heartbeat (frame#, last phase string,
Date.now) into document.title every frame; when it freezes, the title
names the exact phase. Also set globalThis.__painterStepLimit low
(2-5M) in main-native.js so interpreter runaways throw in seconds.

## ADDENDUM 8 (2026-06-13) — frame-limiter busy-wait removed; freeze still browser-only

**Landed (gated, both pixel gates byte-exact 0/307200):**
- `ported/auto/4385d8.js`: removed the binary's 40fps frame-limiter
  busy-wait (`do { timeGetTime } while now-[0x999f90] < 0x19` = 25ms).
  --cpu-prof of the browser-mirrored loop showed GetTickCount = **25% of
  ALL CPU** — pure spin. The loop has ZERO heap writes, so removal is
  provably sim/pixel-neutral (gates confirm). Removes the 40fps cap AND
  reclaims a quarter of the CPU; rAF now paces. Node browser-loop frames
  529→785 /30s.

**Diagnosis tools added this session (in /tmp, promote to tools/ if kept):**
- browserloop-soak.mjs: REAL-clock soak that posts WM_TIMER(16ms)+
  WM_PAINT(33ms) to the live hwnd each frame — mirrors main-native.js
  exactly. This is the faithful repro the plain scenario soak wasn't.
- web/main-native.js: document.title heartbeat (`f<n> <phase> <clock>`)
  + __painterStepLimit=3_000_000 so interpreter runaways throw in
  seconds. A frozen renderer still shows its tab title → the title names
  the phase it died in. (Diagnostic; keep until the freeze is fixed.)

**OPEN #1 — periodic ~700ms hitch (every ~5-6s):** time-sliced cpu-prof
isolated it to the `421d2c` terrain-painter eip-hook FALLING BACK to the
interpreter (`runFunction(..., limit 5_000_000)` at
extra_paint_421d2c.js:467) for a cold scene case not yet ported to JS.
Next: instrument callBridge's fnAddr on the slow frame (needs the full
warm scene — fires every ~150 frames), port that sub-case to JS like the
other painter cold-tails. Pure perf, pixel-gated.

**OPEN #2 — hard renderer freeze (the actual user symptom):** NOT
reproducible in node even with the faithful browser-loop soak (785
frames/30s, no freeze, no msg-queue growth). Therefore tied to a
BROWSER-ONLY subsystem the node harness stubs: (a) the WebAudio backend
in runtime/win32/dsound.js actually instantiating AudioContext nodes
(node path is inert), or (b) real DOM mouse/key events through
attachInput (runtime/input.js) flooding the binary's input dispatch.
Next session: use the on-page title heartbeat on a FOREGROUND tab (the
agent's CDP probes are confounded by background-tab rAF throttling —
hidden=true throttles to ~0, looks like a freeze). Have a human watch
the foreground tab and report the last heartbeat phase, OR disable the
WebAudio backend (stub IDS play to no-op) and the input attach
independently to bisect which subsystem wedges the thread.
