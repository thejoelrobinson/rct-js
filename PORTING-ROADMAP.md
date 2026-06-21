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

## ADDENDUM 9 (2026-06-13) — the ~30s freeze is AUDIO (likely fixed)

User confirmed a recurring freeze "~every 30s, then continues." Root
cause identified by elimination + period:
- The faithful node browser-loop soak (posts WM_TIMER/WM_PAINT to the
  live hwnd, real clock) runs **1735 frames/40s, ZERO stalls** — node
  has no AudioContext so startPlayback returns early. The freeze is in
  the one subsystem node stubs: WebAudio.
- ~30s period == a music-track length. RCT loops the SAME large music
  buffer each track; startPlayback REBUILT the decoded AudioBuffer every
  Play (pcmToFloat32 over ~1M+ samples + per-sample deinterleave + multi-
  MB alloc, all synchronous on the UI thread).
FIX (commit 2505ace): cache decoded AudioBuffers keyed by PCM region +
cheap sampled signature — re-Play of identical audio (every loop, every
repeated SFX) reuses the buffer. Plus ?noaudio=1 / __rctNoAudio toggle
to bisect definitively.

VERIFY ON REAL SCREEN (agent can't keep the tab foreground; CDP probes
are confounded by background-tab rAF throttle): the tab TITLE is now a
live heartbeat `f<frame> <phase> <clock>`. Reload plain — if the title
keeps advancing past ~30s with no hitch, the cache fixed it. If it still
hitches, load `?noaudio=1`: smooth ⇒ confirmed audio (dig into the SFX
re-decode path / move decode off-thread); still hitches ⇒ NOT audio,
look at runtime/input.js DOM-event flooding next.

Remaining perf tail (separate from the freeze): the periodic ~700ms
sandbox hitch is the 421d2c terrain-painter slope-extra interpreter
fallback (cold case, runBodyFrom 0x4225e9) — a normal next painter port.

## ADDENDUM 10 (2026-06-13) — the 5-6s "short pause" = periodic full-viewport repaint

After the audio fix (ADDENDUM 9) the user reports a SHORT pause every
~5-6s. Root-caused with a precise node repro (/tmp/scrollstall.mjs):
- Instrumented the 421d2c terrain-painter hook fire-count per frame.
- NORMAL frame: 421d2c fires **~954** times (dirty-region terrain paint).
- HITCH frame (every ~256 ticks ≈ 5-6s at 40fps): 421d2c fires **~4,623**
  times — a FULL-viewport repaint. ~122ms in sandbox (~50ms on Mac).
- NOT the slope-extra cold fallback (slopeFallback fires = 0). NOT scroll-
  dependent (static viewport still hitches every 256 ticks). It's the
  binary's own periodic invalidate-all (likely palette/animation tied).

FIX (next, gated by gameplay_accuracy 0/307200 — full pixel oracle for
this exact path): make the per-tile 421d2c paint cheaper. Each of the
4623 tiles currently does, in paintBody421d2c (extra_paint_421d2c.js):
  (a) a 5-dword copy + an 18-PAIR (36-dword) copy from palette scratch
      rings [0x999f9a]/[0x999fdc] → [0x5f4104]/[0x5f4146] (~41 heap ops/tile
      = ~190k ops on the hitch frame), and
  (b) **4 palette-swizzle helper calls via the interpreter** — callBridge
      to 0x420d9c / 0x420f4c / 0x420502 / 0x42094b (these ARE JS-ported
      eip-hooks, but reached through runFunction CROSSINGS: 4×4623 ≈ 18.5k
      crossings on the hitch frame).
Levers, in order: (1) call the four palette helpers' JS bodies DIRECTLY
(import paintBody420d9c etc.) instead of via callBridge/runFunction —
removes 18.5k interpreter crossings/hitch-frame with zero behavior change
(the hook already runs that JS). (2) Hoist the per-tile palette-ring copy
if the source rings are invariant across the tile loop within one frame
(prove with an oracle: snapshot [0x999f9a..]/[0x999fdc..] across the 4623
calls — if constant, copy once per frame, not per tile). Both gated by
gameplay_accuracy + a per-call lockstep on 421d2c.

## ADDENDUM 11 (2026-06-13) — session 6: 5-6s repaint-hitch attack

Two findings, both oracle-gated, all gates green throughout (title_accuracy
+ gameplay_accuracy 0/307200, title_replay, playability/interactive/
viewport_build_live 22/22), no fixture recaptures.

**Step 1 LANDED (`8280f48`): 421d2c calls its 4 palette helpers' JS bodies
DIRECTLY** — `paintBody420d9c/420f4c/420502/42094b` imported and invoked
instead of `callBridge → runFunction`. A body that reports a cold branch
falls back to the binary via the interpreter exactly as the helper's own
eip-hook does (clear hook, runFunction, reinstall); the hook installs stay
for other callers. Removes ~18.5k interpreter crossings on the ~4623-tile
repaint frame. Behavior-preserving by construction.
- New oracle `tools/_lockstep-421d2c.mjs` (whole-heap per-call compare of the
  421d2c JS hook vs the full binary body, interpreter kept live; MAXCALLS=N
  caps the deep-checked window so the soak advances). **memMis=13 BEFORE and
  AFTER** over the first 400 deep-checked calls — the 13 are PRE-EXISTING
  cliff/corner-height divergences in the @manual chain (the documented ~96%
  gap), unrelated to this change and unchanged by it.
- New dual soak `tools/_dualsoak-421d2c.mjs` (JS-direct vs all-4-helpers-
  forced-through-the-interpreter): byte-identical hash sequence over 6 ticks.

**Step 2 SKIPPED with proof: the per-tile palette-ring copy is NOT
hoistable.** New oracle `tools/_ringinvar-421d2c.mjs` snapshots the two
SOURCE rings [0x999f9a..+0x48] / [0x999fdc..+0x48] at every 421d2c fire in a
frame. Result: the LO ring differs from the frame's first-call value on
~944/954 calls and the HI ring on 44–947 calls — the four palette helpers
(esp. 42094b's 2-byte scratch-ring shift at 0x999fdc) MUTATE these rings
inside the per-tile loop, so each tile's 36-dword copy snapshots live,
per-tile state. Hoisting it once-per-frame would corrupt rendering. Skipped
per the task's invariance guard.

**Hitch-frame ms, before vs after (sandbox, /tmp/scrollstall.mjs, Mac ≈2-3x
faster):** ~122–144 ms BEFORE → ~133–141 ms AFTER — i.e. UNCHANGED within
measurement noise. Normal-frame 421d2c fires 954 (unchanged); ~40 fps
(timer-paced, not CPU-bound on normal frames).

**Honest conclusion — the hitch is NOT a crossing cost and has no
behavior-preserving fix left.** ADDENDUM 6 already measured the crossing
prologue at 5.3 ns each (`/tmp/prologuebench.mjs`); 18.5k crossings ≈ 0.1 ms
of a ~130 ms hitch, so Step 1 was never going to move the ms — its value is
removing the interpreter dependency (the four helpers no longer need the
bridge for this caller) and a small constant. The hitch cost is genuine
per-tile JS work: painting 4623 tiles (5× the normal-frame count) in one
frame, each doing the (non-hoistable) 36-dword ring copy + 5 sub-painter
dispatches + 4 helper bodies. Reducing it further is a BEHAVIOR CHANGE — the
two real levers are (a) spread the periodic full-viewport invalidate-all
across several frames, or (b) suppress/throttle the binary's own ~256-tick
invalidate-all (likely palette/animation-tied) — both need an
interpreter-diff oracle on the invalidate path, NOT a translator fix, and
belong in a separate behavior-change commit per the two-step rule.

**Next priority:** the largest remaining interpreter consumers are the big
gameplay functions (0x429560 guest-count park scan 1183 steps/call, 0x424e0f
sim helper 883/call, 0x5da274 vehicle/ride update 330/call) — each a
multi-hour lockstep + dual-soak port (ADDENDUM 6 item 2). The repaint-hitch
itself now needs the behavior-change invalidate-path work above if it is to
shrink at all.

## ADDENDUM 12 (2026-06-13) — session 7: the repaint-hitch was a RECURSION BUG, FIXED

The ~5-6s "short pause" (ADDENDUM 10/11) is now ROOT-CAUSED and FIXED. The
ADDENDUM 10/11 framing — "the binary's own periodic full-viewport invalidate-
all, ~256 ticks, 4623 vs 954 terrain tiles" — was WRONG on every count. The
hitch is neither periodic-256 nor a full-viewport repaint nor the binary's
intent. Commit `0e70f7c`.

**Trigger root-cause: INTENTIONAL-vs-ARTIFACT = ARTIFACT (our recursion bug).**
Established by elimination + per-frame instrumentation (tools kept in tools/_*):
- NOT a message-loop artifact: the hitch is byte-identical with WM_TIMER +
  WM_PAINT posting on, only one of them, or NEITHER (MODE=none). It is driven
  entirely by the binary's per-tick game update (runTick → 4385d8), internal.
- NOT a larger dirty rect / full viewport: the per-tile painter 436b50 fires
  EXACTLY 21x/tick on normal AND hitch frames; each session's DPI clip rect is
  identical (640x416). The viewport-paint band does not grow.
- NOT 4623 distinct tiles: on a hitch frame the painter draws the SAME ~503
  distinct tile elements as a normal frame (1-2x each) PLUS one extra element
  at a GARBAGE address (esi=0x6f0020, zero in data.bin, written `00 80 04 04 00
  20 01 00`-repeating at runtime) ~1,500-3,700 times — and growing over time.
- The garbage element is a corrupt tile-element pointer the per-tile chain walk
  lands on. paintBody421d2c rejects it (cold branch) and the install421d2cHook
  fallback called runBodyFrom(0x421d2c). runBodyFrom went through
  runFunction(cpu, 0x421d2c) — which DISPATCHES AN ENTRY-ADDRESS EIP HOOK
  DIRECTLY (harness/x86.js:2977 fast path), re-invoking the SAME hook,
  re-entering paintBody421d2c, failing again, recursing. Measured re-entry
  depth: **1,572 levels** on one hitch frame. That recursion IS the hitch.

**Fix (behaviour change, gated by interpreter diff per the two-step rule):**
runBodyFrom now clears the 421d2c eip hook before the fallback runFunction and
reinstalls it after — the exact recursion-safe pattern callHelperDirect already
uses for the palette helpers. The interpreter decodes the real 0x421d2c bytes
ONCE (the binary's actual behaviour). For the cold-tail addrs (0x4225e9 /
0x42280c, no hook) it is a no-op. Also exports harness/x86.js getEipHook, which
the committed extra_paint_421d2c.js (8280f48) already imported but which was
missing from the committed x86.js — folding it in makes the fix self-contained.

**Oracle results (tools/_oracle-421hitch-interp.mjs — the gold-standard gate):**
At the hitch frame, the JS-with-fix 640x480 GAME-BACK surface is BYTE-IDENTICAL
to the pure x86 interpreter (all painter hooks cleared, rct.exe's own painters
draw it): **0/307200 px diff, FNV 0xb220c2c8 on both sides.** So the recursion
was redundantly redrawing the SAME final pixels — the fix is correct vs the
binary, not merely different. 421d2c fires on the hitch frame: ~2,850/4,623 →
954 (recursion gone). (tools/_oracle-421hitch.mjs confirms non-hitch frames are
byte-identical before/after.)

**Hitch ms, before vs after (tools/_scrollstall.mjs, 32s real-clock soak,
sandbox; Mac ≈2-3x faster):** BEFORE = recurring ~135-145 ms hitches every ~3 s
(8+ slow frames >120 ms, 4621-4623 fires each). AFTER = **0 slow frames** over
32 s, steady 40 fps. On the dev Mac the ~140 ms sandbox hitch ≈ the user's
reported 50-70 ms pause — eliminated.

**Gates (all green, no fixture recaptures):** title_accuracy 0/307200,
gameplay_accuracy ratchet 0, title_replay; playability/interactive/
viewport_build_live 22/22.

**Loose end (separate from the hitch, now harmless):** the underlying corrupt
tile-element pointer (esi=0x6f0020) still occurs — gameplay writes a garbage
chain entry that the per-tile walk reaches. Post-fix it costs one extra correct
interpreter paint (the binary tolerates it identically), so it is no longer a
perf problem, but it is a latent STATE-corruption bug worth a future pass:
trace which gameplay write produces the 0x6f0020 chain entry (it grows over
time, so it accumulates). Likely a tile-element insert/compact desync (cf. the
edcc1a4 compactor fixes). Not urgent — the binary itself renders it cleanly.

**Next priority:** the largest remaining interpreter consumers are the big
gameplay functions (0x429560 guest-count park scan 1183 steps/call — an
in-progress port exists in ported/auto/extra_award_429560.js + tools/
_lockstep-429560.mjs; 0x424e0f sim helper 883/call; 0x5da274 vehicle/ride
update 330/call), each a multi-hour lockstep + dual-soak port.

## ADDENDUM 13 (2026-06-13) — session 8: two big gameplay ports landed

Two commits, both lockstep + dual-soak oracle-gated, all gates green
throughout (title_accuracy 0/307200, gameplay_accuracy 0/307200,
title_replay; playability/interactive/viewport_build_live 22/22), no
fixture recaptures.

- `fb8d237` **0x429560 award-scan block 0 ("tidiest park") -> JS** (~1182
  interp steps/call eliminated, measured; 1-2 calls/tick). The prior
  session's uncommitted ports/auto/extra_award_429560.js was verified
  byte-correct against a fresh lockstep and WIRED this session (it had never
  been dispatched). The award dispatcher 0x429502 does `jmp [ebx*4+0x429544]`
  INSIDE the interpreter; ebx=0 (the only soak-dispatched case) lands on
  0x429560. An eip hook at 0x429560 now wins that crossing for the JS body.
  The block ends in a plain `ret` to the dispatcher's caller (0x45abe4:
  `call 0x429502; ret` — eax discarded), so the hook leaves the dispatcher
  frame intact and the harness simulates the one ret; esp is snapshot/restored
  around the body since its callees (0x42c711/0x5e5301) reuse this cpu via
  callNative. The other 6 award blocks stay in the interpreter (unexercised).
  Disasm confirmed the port byte-for-byte; the dispatcher entry is 0x429502
  (NOT 0x429560 — 0x429560 is jump-table slot 0). Oracle
  tools/_lockstep-429560.mjs calls=8/20 memMis=0; AB_CONTROL 0/0; dual soak
  byte-identical 6 ticks. eaxMis is the void exit registers, provably dead.

- `a222292` **0x424e0f periodic map-scan / fence+scenery aging sim helper ->
  JS** (~894 interp steps/call eliminated, measured; 1 call/tick). Runs once
  per tick from the sim dispatch chain at 0x4388c5 (next instruction is
  another `call` -> exit registers DEAD). Was interpreter-delegated (the
  auto-translation lowered 5 goto sites as silent early-returns). Hand-ported
  from the capstone disasm (0x424e0f..0x42500d): a 10-iteration loop that
  bit-scrambles the 14-bit counter [0x8d4228] into a tile index, walks the
  element chain, ages fence/water [p+6] state, plus an epilogue news-item
  scan. ALL 7 callees delegated through callNative so their CX/AX/CF exit
  registers round-trip byte-exactly — the LAB_00424f60 recombine consumes the
  last callee's CX/AX, so hand-modelling those was the load-bearing risk the
  callNative round-trip removes. The Ghidra C was NOT trusted where it
  disagrees with the asm (it conflates the `jb` after the 0x425432 call with a
  pre-call compare — exactly the mistyping the method warns about). Wired via
  a harness.js fnDispatch override after installPainterBridge (which had
  overwritten the _dispatch.js entry with its _paintShim). Oracle
  tools/_lockstep-424e0f.mjs calls=8/16 memMis=0; AB_CONTROL 0/0; dual soak
  byte-identical 6 ticks.

**Combined: ~2,076 interp steps/tick eliminated** (1182×~1 + 894×1). Both
were folded under their parent runFunction's step loop (429560 inside the
4385d8 tick chain via the dispatcher's interpreter jmp; 424e0f under its
_paintShim), which is why the __fnSteps entry-address ranking never isolated
them — direct step-loop instrumentation (clear hook, single-step the real
bytes, count) measured them at 1182 / 894 per call exactly matching the
ADDENDUM 6 estimates.

**0x5da274 NOT attempted — documented as next, per the STOP-rather-than-ship
rule.** Disasm structure captured: it is the ride/vehicle per-sprite update
(PTR_LAB_005d97b4 slot), the LARGEST and branchiest of the three remaining
big consumers — 568+ instructions with NO `ret` in the first 0x900 bytes
(0x5da274..>0x5dab72), branching on vehicle type `dl`, mode bits in `eax`
(test eax,0x300/0x40/0x80/0x20), and many esi-relative state fields, with a
DEEP sub-call tree of 9 callees into the vehicle-physics subtree (0x5ddcbe,
0x5dbeeb, 0x5db5d7, 0x5db446, 0x5db339, 0x5d89c0, 0x44142c, 0x441452,
0x452fce). No Ghidra C exists. At ~330 steps/call × 48 calls/tick it is the
top remaining interpreter consumer by TOTAL (≈16k steps/10t), but it is a
genuine multi-hour port with real divergence risk in the physics subtree —
budget a full session. Build tools/_lockstep-5da274.mjs first (copy
_lockstep-424e0f.mjs; the PTR_LAB_005d97b4 slot is reached via the sprite
update walk, so wrap its fnDispatch/eip entry), delegate the 9 callees via
callNative for byte-exact register round-trip, and port the type/mode
dispatch arms incrementally to calls=N memMis=0. The deep callees
(0x5db339/446/5d7/eeb, 0x5ddcbe) can stay delegated indefinitely — only the
0x5da274 dispatch body needs porting to capture the per-call win.

## ADDENDUM 14 (2026-06-13) — session 9: 0x5da274 ride/vehicle update -> JS

One commit (`56aa53e`), lockstep + synthetic-fuzz + dual-soak oracle-gated,
all gates green throughout, no fixture recaptures.

**`56aa53e` 0x5da274 ride/vehicle per-sprite update -> JS** (PTR_LAB_005d97b4
vtable slot 4; ~315 interp steps/call × 8 calls/tick = **~2,524 interp
steps/tick eliminated**, directly measured via a step-to-ret count on the
forced-interp leg). The ADDENDUM 13 framing ("568+ instructions, no ret in
the first 0x900 bytes, 9-callee subtree") was an over-count from a LINEAR
read of the address range — a reachability walk from 0x5da274 (capstone,
following branches not calls) gives the true shape: **EXACTLY 175
instructions, a SINGLE exit (`ret` at 0x5db338), and 6 DIRECT callees.** The
extra "callees" in the linear range (0x42deab/452fce/441452/44142c/5d89c0…)
belong to the NEIGHBOURING vtable slots (0x5da4d0/0x5da799/…) that the linear
disasm ran into past slot 4's last `jmp 0x5db338`; they are NOT reachable
from 0x5da274 and were never in scope.

- **Reached via an interpreter-internal `call [edi*4+0x5d97b4]`** at 0x5d952c
  (edi = [esi+0x50] = 4), exactly like 0x429560's dispatcher jmp — so an
  **eip hook at 0x5da274** (not an fnDispatch override) wins the crossing.
  Entry regs from the dispatcher: esi = vehicle sprite, dl = [ride+0x887424]
  (mode byte), dh = [esi+0x51] (sub-state). The body ends in a plain `ret`
  (0x5db338) back to the dispatcher; the hook snapshots/restores esp around
  the JS body (its callNatives reuse the bridge cpu) so the post-hook ret
  pops the dispatcher's real return address.
- **All 6 direct callees delegated via callNative** for byte-exact heap +
  register round-trip — 0x5ddcbe (entry pre-update), 0x5dbeeb (mode-flag
  query -> eax, the load-bearing one: its eax drives the whole 0x300/0x40/
  0x80/0x20/0x10/8 mode-bit dispatch), 0x5db5d7 (state-transition helper),
  0x5db339 / 0x5db446 (crash/explode arms), 0x5dbad0 (the 0x5dae71 tail).
  esi (the binary's `this`) and edx (dl/dh) are re-staged into `regs` before
  every callNative since a prior callee's exit can land in regs.esi/edx.
- **No Ghidra C.** Transcribed instruction-by-instruction with every store
  WIDTH taken from the disasm (word [esi+0xc0]/[esi+0x48]/[esi+0xb8], dword
  [esi+0x28]/[esi+0x2c]/[esi+0x24], byte [esi+0x50]/[esi+0x51]/[esi+0x34..6])
  to avoid the #1 translator bug class (byte/word store widened to setU32).
  Signed dword compares (`jl`/`jge`/`jg` on [esi+0x28] vs 0xfffdfc9c etc.)
  modelled with `v|0`. The dl==7/dh==1 station chain walk reuses the
  rol/or/ror tile-index scramble shared with 424e0f.

**ARMS PORTED vs DELEGATED.** ALL 175 reachable instructions are ported as
JS (full dispatch body); the 6 deep callees stay in the interpreter via
callNative (their physics subtree — 0x5db5d7 -> 0x5d89c0/44142c/441452/
452fce etc. — is reached through those crossings and is NOT in scope, exactly
as the addendum prescribed). Nothing in 0x5da274's own body is delegated.

**ORACLE RESULTS.** The scenario soak only ever dispatches the **dl=8 / dh=1
fast path** (eax has no mode bits set: through 0x5ddcbe + 0x5dbeeb, the early
dispatch, and the LAB_5da335 tail to the ret) — 8 calls/tick, every tick:
- `tools/_lockstep-5da274.mjs` (whole-heap per-call compare vs the live
  interpreter, truth kept live): **calls=160 memMis=0** over 20 ticks;
  `AB_CONTROL=1` interp-vs-interp control **memMis=0** (harness sound).
  regMisInfo=160 is the dead void exit registers (the dispatcher reads
  esi-relative state, not registers, after the call) — same as 429560/424e0f.
- Because the soak can't reach the branchy arms, `tools/_fuzz-5da274.mjs`
  drives the SAME hooked function from RANDOMIZED entry states (real live
  vehicle sprites from the pool × all dl 0..31 × all dh 0..3; eax mode bits
  come from the REAL per-sprite 0x5dbeeb, not fabricated) and byte-diffs JS
  vs interpreter: **trials=3000 memMis=0**, every (dl,dh) cell exercised.
  This proves the dl=2/4/5/7 specials, the dl=7/dh=1 station chain walk, the
  dl=5 arm5daebd position-recompute, the dh=2 decrement, and every eax
  mode-bit arm (call 0x5db339/5db446/5db5d7) byte-exact — the arms the
  scenario will never trigger.
- Dual whole-heap soak (`painter-port-oracle.mjs` JS vs FORCE_INTERP=5da274):
  **byte-identical FNV-1a hash sequence over 6 ticks.**

**Steps/tick.** ~315 interp steps/call removed × ~8 calls/tick (this
scenario) = **~2,524 interp steps/tick eliminated** (measured by a direct
step-to-ret count, the same technique ADDENDUM 13 used for 429560/424e0f
since 0x5da274 is folded under its parent runFunction in the __fnSteps
ranking). The two remaining big gameplay consumers from ADDENDUM 6 item 2
(0x429560 award-scan and 0x424e0f sim helper) are already ported; the next
interpreter levers are smaller per-call helpers (0x5d7503 paint-adjacent,
0x439178/0x42280c peep helpers) or the 444e08 banner fallback.

**Gates (all green, no fixture recaptures):** title_accuracy 0/307200,
gameplay_accuracy ratchet 0, title_replay; playability/interactive/
viewport_build_live 22/22.

**Next priority.** With all three ADDENDUM 6 big consumers (429560, 424e0f,
5da274) ported, the interpreter share is dominated by the per-element PAINTER
sub-dispatch (the 421d2c/5ce7f8 hooks crossing into CODESEG scenery
sub-painters via runFunction) and small gameplay helpers. Re-run the
steady-state CPU profile (`tools/_cpuprof-steady.mjs`, ADDENDUM 6) to
re-rank before the next slice — the remaining wins are likely on the JS side
(painter algorithmic structure) rather than further interpreter ports.

## ADDENDUM 15 (2026-06-14) — session 10: fresh re-rank + tile-element "bug" RESOLVED (non-bug) + target triage

No port landed this session by design (cf. ADDENDUM 6): the re-rank's top
targets are poison pills, and the one clean target is a multi-hour byte-exact
painter port that the two-step rule says not to rush unverified. What this
session DID produce: the fresh re-rank, a rigorous disproof of the ADDENDUM 12
"latent tile-element corruption" loose-end, and an evidence-backed triage that
redirects the next slice. All gates re-verified green; NO source changed.

**Fresh re-rank — steady-state CPU profile** (`tools/_cpuprof-steady.mjs`,
TICKS=40, sandbox 24.7 ms/tick; Mac ≈2-3x faster):
| % self | ms/tick | fn | nature |
|---|---|---|---|
| 19.5 | 2.41 | runFunction @ x86.js | interpreter prologue + sub-painter/callNative bodies |
| 18.8 | 2.33 | step @ x86.js | interpreter inner |
| 12.2 | 1.52 | paintBody5ce7f8 | JS scenery painter — **up from 7.4% (ADD.6)**, now top JS self-time; sets regs then dispatches a scenery sub-painter through the interpreter |
| 9.4 | 1.16 | FUN_005e39c6 | JS per-window update walk |
| 4.8 | 0.60 | FUN_009b4911 | RLE blit inner (@manual chain) |
| 3.0 | 0.37 | FUN_005e39ff | JS widget-invalidate scan |
| 1.4 | 0.17 | FUN_00433bae | JS depth-sort |
Interpreter share ≈38% but FRAGMENTED across sub-painter dispatch + the
remaining gameplay callNatives. No single dominant JS hot spot beyond
paintBody5ce7f8 (and its 12.2% is the dispatch-into-interpreter, not pure JS).

**Fresh re-rank — interpreter-step ranking** (`tools/probe-painter-rank.js`,
8-tick __fnSteps soak, ~30 ms/tick):
| addr | steps/tick | steps/call | what / verdict |
|---|---|---|---|
| 0x4415e6 | 3,791 | 30,326 (×~1/8t) | peep PATHFIND dispatcher — **POISON PILL, see below**. A periodic SPIKE (≈1 call per several ticks), not steady per-tick cost. |
| 0x444e08 | 2,616 | 11 | banner-wall fallback residual (known, deferred). |
| 0x5dbeeb | 2,433 | 304 (×8/t) | vehicle mode-flag query (5da274 callee, delegated) — 678-line branchy C w/ overlapping-symbol warnings; multi-hour risky. |
| 0x4368d8 | 1,974 | 1 | per-element hook crossings — overhead, not work. |
| 0x439178 / 0x42280c | 1,387 / 1,258 | 38 / 37 | peep helper / **421d2c cliff-corner cold-tail** (see triage). |
| 0x5d7503 | 978 | 81 | paint-adjacent. |
| 0x431bc8 / 0x421d2c | 954 each | 1 | JS eip-hook fast-path crossings — overhead. |

**The ADDENDUM 12 loose-end is a NON-BUG. Proven, not asserted.** The
"underlying corrupt tile-element pointer esi=0x6f0020 that grows over time
(insert/compact desync)" does NOT exist. Evidence (`$HOME/_tilescan2.mjs` +
`_tile6260.mjs`, scan of the whole 128×128 tile-pointer table):
- Pool base = `DAT_006e3b90`; high-water `DAT_00981ef4` = **0x7048e0 (16,810
  elems), FROZEN** across 500 scenario ticks AND 200 title-demo ticks.
- Over those runs: **0 tile pointers below base, 0 above high-water, 0 broken
  chains, max chain length 3.** The table is pristine and does NOT accumulate.
- `TILE_PTRS[6260] = 0x6f0020` is a **normal flat-grass surface element**
  (`00 80 04 04 00 20 01 00` = type 0 surface, last-flag 0x80 set, base 4 /
  clearance 4), sitting MID-RUN in **64 identical** flat-tile elements; **493
  tiles** point into that 0x6f0xxx pool page — i.e. a large flat grassy area
  of the demo park, exactly as a loaded map looks.
- That element is handled INLINE by paintBody421d2c: `[esi+5]&0x1f==0` and
  `[esi+7]&0xf==0`, so it falls through to the ported corner-heights jumptable
  and returns handled=true — **no fallback, no recursion**.
- So ADDENDUM 12 conflated two already-fixed things: the real insert/compact
  desync (fixed `edcc1a4`) and the runFunction fallback recursion (fixed
  `0e70f7c`). The element it called "garbage" is faithful map data. Corroborated
  by **gameplay_accuracy 0/307200** (byte-exact JS render vs interpreter on the
  same heap). **No code fix needed; delete this from the punch list.**

**Target triage for the next port (why 0x4415e6 is the wrong read of the
re-rank):** 0x4415e6 tops the steps/tick column only because it's one huge
call. Its own body is small; the 30,326 steps live in its callee **0x44189c**,
the guest pathfinding FLOOD-FILL — a *recursive, register-convention* function
(`unaff_EBP`/`unaff_DI` persist across the `FUN_0044189c(...)` self-call at
C:93 and the `goto code_r0x0044189c` tail at C:107). BOTH the dispatcher
(`ported/auto/4415e6.js:117`) and the flood-fill (`ported/auto/44189c.js:114`)
carry goto-truncation `return 0` stubs; the auto-translation near-certainly
mishandles the register dataflow through the recursion. Wiring it JS-direct is
a multi-session, high-divergence port; it must stay interpreter-delegated
(43d5a0's three `callNative(0x4415e6)` sites are correct as-is). And because
it's a periodic spike, porting it wouldn't move the steady tick anyway.

**THE clean next port = the 421d2c terrain cold-tails** `0x42280c`
(cliff-corner, steady 1,258 steps/tick) and `0x4225e9` (slope-extra). Bounded
`extra_paint_*` pattern, pixel-gateable. Disasm of 0x42280c (capstone, CODESEG
off = va−0x41c000+0x1a600): **4 near-identical corner blocks** — each does
`shr al,1; jae <next-corner>; push eax/ebx/ecx/edx/esi; <bit-test bl → sprite
idx 0x9238..0x923d>; set corner-height words [0x99a4e8..0x99a4ec]; mov ebp,
[0x991f88]; call [ebp*4+0x432204]` (the rotation paint-slot allocators, already
JS via 432204); `pop…` — converging at the `0x422a90` rejoin (the
corner-heights jumptable already ported inline in extra_paint_421d2c.js). Port
it as a 4-corner loop with per-corner constant tables (mirror the existing
`CORNER_CASES`). **Build `tools/_lockstep-42280c.mjs` first** — the
gameplay_accuracy frame may not exercise the cliff path, so gate on the
per-call interpreter diff (copy `_lockstep-444e08.mjs`), then the pixel gates.

**Gates (re-verified green this session, no fixtures touched):**
title_accuracy 0/307200, gameplay_accuracy 0/307200, title_replay;
playability/interactive/viewport_build_live 22/22. Sandbox note: the accuracy
tests exceed vitest's default 5 s testTimeout here (the diff is computed but
the run is slow) — pass `--testTimeout=40000`; both pixel diffs are 0.

## ADDENDUM 16 (2026-06-14) — session 10b: 0x42280c cliff-corner port attempt → TWO interlocking bugs found, REVERTED to baseline

The 421d2c terrain cold-tail `0x42280c` (ADDENDUM 15's "clean next port") turned
out NOT to be a clean target. The attempt was fully transcribed, oracle-gated,
and then **reverted** — it is blocked by two interlocking bugs, and shipping a
fix exposes a render regression the gates can't see. **No source landed; both
`harness/x86.js` and `ported/auto/extra_paint_421d2c.js` restored to HEAD; all
gates re-confirmed green** (title/gameplay 0/307200, title_replay, 23/23 sim).
This addendum is the diagnosis so the follow-up is well-scoped.

**What 0x42280c is.** The `[esi+7]&0xf != 0` branch of the surface painter
(~34 cliff tiles/tick, 3.6%): up to 4 corner-edge "cliff" sprites, each
`shr al,1; jae skip; <pick sprite 0x9238..0x923d from bl, maybe dx+=0x10>; gate
on [0x991f8c]&0x80 || dx>=[0x5f472c]; write [0x99a4e8/ea/ec]; call
[ebp*4+0x432204]`, converging at the 0x422a90 corner-heights jumptable. Full
capstone disasm + the 4 selection trees + draw params were transcribed and
verified (see this session's git history / the reverted drawCliffCorners).

**BUG 1 — interpreter 8-bit-shift CF gap (the painter is DEAD CODE).** The
single-step trace from the exact cliff-entry regs showed every corner's
`shr al,1; jae` taking the skip — CF was always 0. Root cause:
`shift8Op` (harness/x86.js, the 0xd0/0xd2 shift/rotate group) updates ZF/SF but
**never sets CF**, and the cliff block's preceding `or al,ah` clears CF to 0. So
the corner gate reads stale CF=0 and **no cliff corner ever draws** — the
painter has been dead since forever. This is the SAME bug class already fixed
for the 32-bit `0xd1` handler (whose own comment documents the RLE-blit
`shr ecx,1; jae` tail it broke). A CF fix for shift8Op (CF = bit (c-1) for
SHR/SAR, bit (8-c) for SHL, result LSB/MSB for ROL/ROR) is **validated
pixel-neutral** (title_accuracy + gameplay_accuracy stay 0/307200 with the JS
painter left no-draw) and **sim-neutral** (playability/interactive/viewport
23/23) — its ONLY effect is un-suppressing the cliff corners.

**BUG 2 — the 0x421d2c JS body's regs are desynced at the COLD cliff dispatch.**
With the CF gate working, the corners render off whatever eax/ebx the body left.
Measured: the hot-path JS body reaches the cliff dispatch with **eax=0x101**
(al=1 → draws corner 1) while a from-entry interpreter run reaches 0x42280c with
**eax=0x300** (al=0 → draws NO corner). **34 of 40 cliff tiles differ.** The body
faithfully tracks only the registers the HOT path needs (its own header says
"eax isn't meaningfully set by the body"); the cold cliff path reads eax/ebx the
body never kept binary-exact. So both the prior `runBodyFrom(0x42280c)` and a
faithful JS port feed the cliff block the body's WRONG regs — they match each
other (the in-file __cliffSelfCheck neutrality oracle: drawCliffCorners vs
runBodyFrom(0x42280c), 238 cliff calls, **memMis=0**) but NEITHER matches the
pristine binary. So fixing CF would make the corners DRAW WRONG (off eax=0x101),
which is arguably worse than the current "absent". And the gate frames
(title/gameplay) have **no in-viewport cliff tiles**, so the wrong corners are
gate-invisible — unvalidatable without real-RCT reference.

**Why reverted, not shipped.** (a) The CF fix alone un-suppresses the corners on
the existing runBodyFrom path → wrong corners. (b) A from-entry interp route for
cliff tiles gives correct regs but re-runs the whole body in the interpreter
(~7-17k steps/tick added for 34 tiles) — a big perf regression for a 3.6% path.
(c) A correct JS port needs the body's eax/ebx made binary-exact at the cliff
dispatch — a deeper 421d2c-body fidelity fix. None is a safe end-of-session
change, and shipping an unvalidatable render change violates the two-step rule.
The baseline `return runBodyFrom(0x42280c)` is forward-compatible (auto-adapts
once the interp CF is fixed) and stays.

**The clean follow-up (well-scoped now):** (1) land the `shift8Op` CF fix as its
own commit, gated by the full pixel+sim suite (proven neutral here) — it is a
genuine correctness fix regardless of the cliff work; (2) make the 0x421d2c body
carry binary-exact eax/ebx into the cliff dispatch (or stage them from the known
entry contract), gated by a from-entry interpreter diff on cliff tiles
specifically; (3) THEN the drawCliffCorners port (transcription in git history)
draws correct corners, gated by the from-entry interp + a re-captured
gameplay fixture with cliff tiles panned into view. Until (2), 0x42280c is not a
clean port.

**Re-ranking note.** With 0x42280c shown to be a dead-code cold tail (not the
clean win ADDENDUM 15 expected), the next real interpreter levers remain the
big gameplay consumers' deeper callees (e.g. 0x5dbeeb the 5da274 vehicle
mode-flag query, 304 steps/call × 8/tick) — each a bounded-but-careful port —
rather than the painter cold tails, which are entangled with body-register
fidelity. Gates green throughout; nothing shipped in the port attempt itself.

**UPDATE — the `shift8Op` CF fix LANDED (follow-up step 1), corners kept
suppressed.** The interpreter half of Bug 1 is a genuine standalone correctness
fix, so it was landed on its own:
- `harness/x86.js` `shift8Op` (0xd0/0xd2) now sets CF for ROL/ROR/SHL/SHR/SAR
  (CF = bit (c-1) for SHR/SAR, bit (8-c) for SHL, result LSB/MSB for the
  rotates) — matching the 32-bit 0xd1/0xd3 handlers. Closes the 8-bit gap of the
  same bug class that broke the RLE-blit `shr ecx,1; jae` tail.
- Because that CF fix would otherwise un-suppress the 0x42280c cliff corners
  onto the body's desynced eax/ebx (Bug 2, still open), the 0x421d2c cliff
  dispatch now explicitly keeps them suppressed — replicates only the block's
  `[0x991f78]=8/=1` writes then the 0x422a90 jumptable, byte-identical to the
  baseline's no-corner cliff path. So the render is UNCHANGED.
- **Proven byte-neutral**: full-heap FNV after 12 scenario ticks is IDENTICAL to
  pristine HEAD (0x9c535a3b == 0x9c535a3b) — no sim/scratch/render divergence.
  All gates green: title_accuracy + gameplay_accuracy 0/307200, title_replay,
  playability/interactive/viewport 23/23. The CF fix is a dormant latent-
  correctness improvement in every gate-covered path; its only live consumer
  (cliff corners) waits on the Bug 2 follow-up (give the 0x421d2c body
  binary-exact eax/ebx at the cliff dispatch, then drop the suppression).

## ADDENDUM 17 (2026-06-14) — session 10c: 0x5dbeeb port STARTED (foundation laid; multi-session)

Picked up 0x5dbeeb (the 5da274 vehicle mode-flag callee, ~2,433 interp
steps/tick — the top remaining steady interpreter consumer). The re-rank's
"304 steps/call" undersold the size: a reachability walk gives **914 reachable
instructions, 167 conditional branches, a single ret (0x5dcd3f), internal
subroutines (call 0x5dc770/5dc983/5dca69/5dca6e within its own span), and 12
external callees**. It does NOT use the entry dl/dh (reloads dx from [esi+0x3c]
at 0x5dc1a8); it is type-gated via the per-type flag word [type*8 + 0x5f7104].
**Coverage: the scenario exercises a SINGLE arm — vehicle type 55 — = 318 of
the 914 instructions.** So it is a bounded single-arm port, but at ~2x the size
of the 175-instruction 5da274 (which was a full session) it is genuinely
multi-session.

**Foundation landed this sub-session (all byte-neutral — the body still falls
back, so zero behaviour change):**
- `ported/auto/extra_vehicle_5dbeeb.js` — scaffold + the entry-block
  transcription (0x5dbeeb..0x5dbfcf: the [0x65dc40] flag-0x800/0x1000 blocks,
  the [esi+0x28]/[esi+0x2c] mode accumulate, [0x65dc30]/[0x65dc34]) in
  `armType55`. `FUN_005dbeeb_js` returns false (falls back) until the arm is
  COMPLETE — a partial transcription cannot mid-arm fall back (side effects
  would double-fire), so it stays inactive until memMis=0.
- `runtime/painter-bridge.js` — the eip hook at 0x5dbeeb (mirrors 5da274:
  `__forceInterp5dbeeb` leg steps the real bytes to the 0x5dcd3f ret; the JS
  leg falls back on a false return, which is clean because the body returns
  false before any side effect).
- `tools/_lockstep-5dbeeb.mjs` — per-call JS-vs-interp whole-heap + eax oracle.
- **Verified byte-neutral**: oracle 54 calls memMis=0 eaxMis=0; full-heap FNV
  after 12 ticks unchanged (0x9c535a3b); gameplay_accuracy 0/307200. So the
  wired-but-falling-back hook ships safely.

**Continuation (the focused next pass):** transcribe the rest of the type-55
arm from 0x5dbfd4 onward (the [0x65dc30]<0 → [esi+0x3e] sprite-swap, then the
big dx-reload region from 0x5dc1a8, the internal subroutines, the callees —
delegate each external + internal call via callNative for byte-exact
register/heap round-trip), drive `_lockstep-5dbeeb` to memMis=0 over the soak,
add a `_fuzz-5dbeeb` harness (copy `_fuzz-5da274.mjs`) to cover the type-55
field-value branches the static soak misses, then flip `FUN_005dbeeb_js` to
call `armType55`. Disasm dump for the transcription is reproducible via the
capstone walker (CODESEG off = va−0x41c000+0x1a600). Once live it removes
~2,433 interp steps/tick — the single biggest remaining steady lever.

---

## ADDENDUM 18 — team pass: 3 interpreter callees ported/validated (43d38b, 5ddcbe, 4314ed)

A 3-agent fan-out at the functions the interpreter was still stepping during
gameplay. Each agent owned one callee, drove its `_lockstep-<addr>.mjs` oracle
(per-call JS-vs-interpreter whole-heap + register compare) to **memMis=0**, and
left an `@manual` port transcribed from the capstone disasm (CODESEG off =
va−0x41c000+0x1a600).

- **0x43d38b** — peep tile z-height helper (callee of the 0x43c751 walking
  core, ~217 interp steps/tick). The auto-translation (`decompiled/c/43d38b.c`)
  was badly incomplete: Ghidra dropped the ENTIRE base-height computation
  (`movzx dx,[esi+0x28]; shl dx,2`) and all four slope-arm jump-table cases
  (degenerate `switch`, every case returns writing nothing). Rewritten
  instruction-by-instruction; the `(bl&0x18)!=0` slope-LUT tail and the four
  `[ebx*4+0x43d3b4]` arms are modelled, the 0x423677 tail-call delegated via
  callNative. Oracle: **160 calls memMis=0 eaxMis=0 edxMis=0** (143 scratch-reg
  diffs are info-only — eax/edx are the contract outputs and both match).
- **0x5ddcbe** — vehicle entry pre-update / breakdown-eligibility (direct
  callee of 0x5da274, ~64 interp steps/tick). Auto-translation carried stacked
  translator bugs: ride-record accesses double-applied a `*4` byte multiply on
  top of the already-byte `uVar3*0x260` index; `[0x887422]` read/written as u32
  where the binary uses `test/or word` (u16); and the two final stores
  (`mov dword [0x971e8c]` — Ghidra's dead `unique0x` local — and
  `mov word [0x971e90]`) were dropped/mis-addressed. Rewritten from disasm.
  Oracle: **64 calls memMis=0** (heap byte-exact). eaxMis=64 is a DEAD register:
  the sole caller 0x5da274 treats 5ddcbe as void — it uses JS locals for
  esi/dl/dh and overwrites eax via the next call (0x5dbeeb) before any read
  (verified by reading the call site). memMis=0 is the gate for a heap-effect
  function.
- **0x4314ed** — popcount of [0x87c3dc]+[0x87c3e0]. Auto-translation was
  already CORRECT; the agent's contribution was validation. Oracle:
  **8 calls memMis=0 eaxMis=0** — fully clean, no change needed.

**Why this is the integration, not an eip-hook job:** all three are already in
`ported/auto/_dispatch.js`, so the production browser path (no x86 interpreter)
already routes calls to them as JS. The interpreter only ran their ORIGINAL
bytes inside the test harness's painter-bridge. So "porting them off the
interpreter" = replacing the broken auto-translations with correct JS; no
`installCalleeJsHook` / `__forceInterp` wiring is needed for production. Only
43d38b.js + 5ddcbe.js changed (4314ed was already right).

**Two-step-rule classification:** this is a BEHAVIOUR CHANGE (wrong JS → correct
JS), so it is gated by the interpreter diff (the lockstep oracles, memMis=0) —
NOT by the neutrality gates. As expected for sim callees that the title /
gameplay-accuracy frame does not exercise, the neutrality gates stay green:
gameplay_accuracy + title_accuracy **0/307200 divergent**, playability green.

**Heap-hash caveat (supersedes ADDENDUM 17's 0x9c535a3b):** the 12-tick full-
heap FNV proved environment-sensitive — it settled at a DIFFERENT stable value
(0xdeb48001) for identical tracked files + assets + data.bin, deterministic on
repeat. Do NOT treat the FNV as an absolute cross-session reference; it is at
best a within-session relative check. The accuracy gates (byte-equality vs the
binary's captured surface) and the lockstep oracles (vs the live interpreter)
are the authoritative correctness signals.

---

## ADDENDUM 19 (2026-06-21) — 0x5dbeeb hybrid checkpoint advanced 0x5dbff5 → 0x5dc086

Continuation of ADDENDUM 17. Pushed the type-55 hybrid JS-prefix forward by one
contiguous block, all **byte-neutral** (the suffix still runs in the interpreter
from the new checkpoint; `__enable5dbeeb` stays dormant in production, so the
browser path — `_dispatch.js` → `FUN_005dbeeb` in `5dbeeb.js` — is untouched).

**Landed:**
- `tools/disasm-va.py` — reusable VA-keyed capstone disassembler for `rct.exe`
  (`CODESEG off = VA-0x41c000+0x1a600`). This is the transcription aid the
  scaffold referenced but that lived only in /tmp before. Generalizable asset.
- `ported/auto/extra_vehicle_5dbeeb.js` `armType55`: transcribed
  **0x5dbff5..0x5dc086** of the type-55 arm —
  - the `[0x65dc28]=esi` store + edi reload;
  - the flag-2/4/0x180 dispatch (calls 0x5d870c / 0x5d8623 / 0x5d849e delegated
    via `callNative` with esi+edi set — each callee verified to read only esi on
    entry, loading ax/al from `[esi+..]` before any reg use);
  - the straight-line accumulate block `0x5dc032..0x5dc052`
    (`ebx=[esi+0x1f]`, `[esi+0x2c]=[ebx*4+0x65dc70]`, `[0x65dc38]=1`,
    `eax=[0x65dc34]+[esi+0x24]`, `[esi+0x24]=eax`);
  - the two far branches as **branch-target checkpoints**: `js 0x5dc60d` and
    `jl 0x5dca73` (both verified clean — only esi live: each overwrites eax
    before any read);
  - the fall-through `0x5dc066..0x5dc07a` (`and [esi+0xb8],0xfffd`, the
    `[0x65dc48]`/`[0x65dc4c]` stores) and the `0x5e53ca` call (delegated — it
    opens with `pushal`, so it preserves caller regs and needs only esi);
  - new checkpoint at **0x5dc086** (clean: edi reloaded, eax/ebx overwritten,
    ecx used only as 16-bit cx set from di before any full read).

**Gate (the authoritative one for this byte-neutral step):**
`tools/_lockstep-5dbeeb.mjs` — JS-prefix+interp-suffix vs full-interp, whole-heap
+ exit-reg diff. **memMis=0 over 36/72/108/144 calls (TICKS 4/8/12/16)**;
AB_CONTROL (interp-vs-interp) memMis=0. No fixtures touched; the production
accuracy gates are definitionally unaffected (production never runs `armType55`).

**Coverage caveat (honest):** `sc21.sc4`'s type-55 flag word is `0x11`
(confirmed via the runtime Heap at `0x5f7104+55*8`). So bits 0x800/0x1000 (prefix
blocks) AND 0x2/0x4/0x180 (the three delegated calls) are all **clear** — those
branches are not exercised by this soak; they are correct-by-construction
(verified callee entry contracts) but unvalidated by the oracle. The *hot* path
that IS exercised — the accumulate block, both far branches, and the 0x5e53ca
delegation — is what drives memMis=0 here. A `_fuzz-5dbeeb` harness (copy
`_fuzz-5da274.mjs`) to vary the type-55 field/flag values remains the way to
cover the latent arms before the final `FUN_005dbeeb_js` flip.

**Continuation:** extend past 0x5dc086 — the cx(=[esi+0x36]>>2) dispatch (cases
0x63/0x64/0x84), the `[esi+0x34]` bound check (`jb 0x5dc3b6`), then the dx-reload
region `0x5dc1a8+` — toward the single `0x5dcd3f` ret. The branch-target-as-
checkpoint technique proven here (hand any not-yet-transcribed branch to the
interpreter at a clean-register target) is the lever that makes the rest tractable
one block at a time.
