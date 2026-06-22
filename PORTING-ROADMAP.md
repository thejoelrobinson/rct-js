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

---

## ADDENDUM 20 (2026-06-21) — 5dbeeb gate was DEAD (type 55 never appears); opened to type 37 → first GENUINE validation + cx-dispatch ported

**Big correction.** While extending the checkpoint past 0x5dc086 (the cx-dispatch),
a coverage probe revealed that **`armType55` had never executed at all** in the
current environment: in sc21.sc4 the ONLY vehicle type crossing 0x5dbeeb is
**type 37** (counted 72×/8 ticks, 360×/40 ticks — type 55 never appears). The
function is gated `type===55`, so it always returned false → the hook fell back
to the full interpreter → the lockstep oracle compared **full-interp vs
full-interp** and reported `memMis=0` **vacuously**. So ADDENDUM 17/19's "byte-
neutral, memMis=0" proved nothing about the JS body — it was never run. (Root
cause: game state is environment-sensitive, exactly as ADDENDUM 18 found for the
heap FNV; ADDENDUM 17's "type 55" coverage figure came from a different env.)

**The fix is not more transcription — it's the GATE.** The body is NOT type-
specific: it is one code path parameterised by the per-type flag word
(`f = u16[type*8 + 0x5f7104]`) and the sprite fields. Opening the gate to the
actually-present type 37 makes the transcription **execute and be validated**:

- `ported/auto/extra_vehicle_5dbeeb.js`: gate `type===55` → `type===55 || type===37`;
  corrected the header/COVERAGE comments (the "type-55 arm" framing was about
  instruction coverage, not type-specific code).
- Transcribed the **cx-dispatch 0x5dc086..0x5dc169** (self-contained: single
  entry, single exit 0x5dc16a, all branches internal, no calls): the cx=0x63 /
  cx=0 / cx=0x64 (+shared 0x5dc10e) / cx=0x84 arms. New checkpoint at 0x5dc16a
  (esi + edi live; edi = u16[esi+0x36] unchanged through the dispatch).

**Now-MEANINGFUL gate** (`tools/_lockstep-5dbeeb.mjs`, armType55 genuinely runs):
**memMis=0 over 72/108/144 calls (TICKS 8/12/16)**; AB_CONTROL memMis=0. Exit-path
census for type 37: `jl 0x5dca73` 33×, fall-through into the cx-dispatch 39×
(cx ∈ {0xa,0,0x3,0x1,0xf} — the cx=0 arm fires 10×). `regMisInfo` (33/50/65) is
the documented dead exit-register diff on the branch-checkpoint exits (the
function returns void to the dispatcher); memMis=0 is the gate.

**Production untouched:** still gated behind `__enable5dbeeb` (oracle-only); the
browser uses `FUN_005dbeeb` in `5dbeeb.js`. Accuracy gates definitionally
unaffected (they don't set `__enable5dbeeb`).

**Methodology lesson (general):** a differential oracle that delegates the
SUT-vs-reference comparison through a fallback can pass *vacuously* when the SUT
path is never taken. **Always instrument that the ported code actually executed
(call count > 0 on the intended arm) before trusting a green diff.** This is the
sibling of [[feedback_never_commit_unverified_green]]: "green" must mean "the new
code ran AND matched," not just "matched."

**Continuation:** same as ADDENDUM 19 — extend past 0x5dc16a (the
[esi+0xcd]→[0x67af10] table lookup + `jb 0x5dc3b6` branch-checkpoint, the
cx-rotate → [0x971ef4] lookup, the dx-reload region 0x5dc1a8+). Add `_fuzz-5dbeeb`
to vary the type-37 field values so the cx=0x63/0x64/0x84 arms (unseen in the
static soak) get covered before the eventual `__enable5dbeeb` flip.

---

## ADDENDUM 21 (2026-06-21) — 5dbeeb: image-table lookup + jb-arm checkpoint at 0x5dc3b6 (type 37's dominant exit)

Transcribed 0x5dc16a..0x5dc1a7 and re-routed the post-cx-dispatch checkpoint.
Branch-coverage instrumentation on type 37 showed where the calls actually go:
of the 39 calls that reach the cx-dispatch, **38 take `jb 0x5dc3b6`** (the image-
table bound-check miss) and only 1 falls through. (The other 33/72 took the
earlier `jl 0x5dca73`.) So 0x5dc3b6 + 0x5dca73 are the two real type-37 hot
exits.

- `ported/auto/extra_vehicle_5dbeeb.js`: transcribed the 0x5dc16a image-table
  lookup (`[esi+0xcd]→[0x67af10]` base, `[base + (u16[esi+0x36])*4]` entry), the
  `cmp ax,[entry-2]` bound check, and the fall-through cx-rotate
  (`rol/or/ror → [0x971ef4]`). Two new checkpoints:
  - **jb taken → 0x5dc3b6** with esi, eax(low16=ax), ecx=base, edi=entry set.
    This SKIPS the lookup instructions for the 38 hot calls (interp starts at
    0x5dc3b6, not 0x5dc16a). The eax high16 and edx/ebx/ebp are left at
    hook-entry values — **the oracle confirms they're dead in the type-37
    suffix** (memMis=0); this empirical dead-register check is the same
    instrument-then-trust discipline as ADDENDUM 20.
  - **fall-through → 0x5dc1a8** (rare, 1/39) with esi + edi=the rotated entry ptr.

- Avoided the partial-register hazard at 0x5dc3b6 (`mov [esi+0x34],ax` needs only
  ax low16, which we have) by handing off AT 0x5dc3b6 rather than transcribing
  into the arm.

**Gate:** `tools/_lockstep-5dbeeb.mjs` memMis=0 over 72/108/144 calls (TICKS
8/12/16); AB_CONTROL memMis=0. Production untouched (`__enable5dbeeb`-gated).

**Next (best win):** transcribe the 0x5dc3b6 arm BODY (38 calls) — for type 37:
store ax, skip the 0x2c/0x2d call-block (call 0x452fce) → 0x5dc408 → [esi+1] / bx
(=u16[esi+0x36]>>2) checks → 0x5dc450 — to a clean checkpoint past 0x5dc450,
removing the interp suffix for the dominant exit. Then the 0x5dca73 arm (33).

---

## ADDENDUM 22 (2026-06-21) — 5dbeeb: ported the 0x5dc3b6 jb-arm image-delta block; adversarial audit caught a latent live-in-register bug

Transcribed the type-37 dominant jb arm (0x5dc3b6..0x5dc51b, ~50 instructions):
the `mov [esi+0x34],ax` store, the two pushal/`call 0x452fce` gate-blocks (guarded
— neither fires for type 37), the 0x5dc450 **image-delta block** (the
`[esi+0xcd]→0x67af10` table lookup, `recPtr = ax*0xa + [base + u16[esi+0x36]*4]`,
three deltas `va/vc/vd` with the 0x5dc494 `movsx` sign-extend, the 3-bit
not-equal mask → `[esi+0x24] -= [0x65dc50 + mask*4]`), and the field stores
(`[0x65dc48/4a/4c]`, `[esi+0x1e/1f/20]`, the flag-0x200 conditional zeroing of
`[esi+0x4a/4c/4e]`). New checkpoint **0x5dc51c** (esi + ebx=`u8[recPtr+7]`).

**The headline is the verification, not the transcription.** Per ultracode, an
independent subagent adversarially audited the JS against the disasm instruction-
by-instruction. The lockstep oracle was GREEN (memMis=0 over 72/108/144 calls)
— but the audit found a **real latent bug it could not catch**: the 0x5dc51c
checkpoint omitted live-in registers eax/ecx/edx. On the `esi==[0x65dc28] &&
[0x65dc30]>=0` path, the interpreter resumes and calls 0x5dcd40, which reads
ax/cx/dx (= va/vc/vd) via `sub ax,[edi+0xe]` / `sub cx,[edi+0x10]` /
`sub dx,[edi+0x12]` (verified by disasm). Type 37 in sc21.sc4 *always* has
[0x65dc30]<0 here (takes `jl 0x5dc538`, skips the call), so the oracle exercised
the call path ZERO times — the same vacuous-path trap as ADDENDUM 20, this time
caught by static audit instead of after the fact.

**Fix (provably correct, no high-16 guesswork):** divert the call path
(`esi==[DC28] && [DC30]>=0`) to the clean **0x5dc450** checkpoint (only esi live)
and let the interpreter do the delta block + call exactly. Keep the JS delta
block only for the no-call path ([DC30]<0, the path type 37 takes), where ax/cx/dx
are provably dead on the 0x5dc538 fall-through + jmp-0x5dc086 loop-back. The audit
confirmed every other instruction in 0x5dc3b6..0x5dc51b matches (operand sizes,
16-bit add wraparound, the movsx, the not-equal mask, the gate conditions).

**Gate:** `tools/_lockstep-5dbeeb.mjs` memMis=0 over 72/108/144 calls (TICKS
8/12/16) post-fix; AB_CONTROL memMis=0. Production untouched (__enable5dbeeb-gated).

**Methodology note (reinforces ADDENDUM 20):** a green differential oracle proves
nothing about a sub-branch the scenario never executes. For hybrid checkpoints,
an independent static audit of live-in registers at the checkpoint EIP is a
necessary complement to the oracle — the oracle validates the *taken* path; only
the audit validates the *checkpoint hand-off correctness for untaken paths*.

**Continuation:** the 0x5dca73 jl arm (33/72 calls) is the next-best win.

---

## ADDENDUM 23 (2026-06-21) — 5dbeeb: ported the 0x5dca73 jl arm (both dominant type-37 exits now in JS)

Transcribed the jl arm (0x5dca73..0x5dcb0e, 33/72 type-37 calls): the signed
`idiv [esi+0x2c] / [0x65dc38]` (truncate-toward-zero; [DC38] is set to 1 at
0x5dc03d just upstream, so normally a no-op), the `[esi+0xcd]==2` early-out, the
subtype byte-test (`byte[(subtype<<4)+0x6559d8]&0x10`), the conditional
`[0x65dc40]|=8`, the `subtype==1 && esi==[0x65dc2c]` narrow path, and the
cx-threshold logic (0x11 / 6 / 0x14 / −2 by flags 0x1000/0x4000 and [esi+0xcd]==6).
The whole arm body resolves to two **esi-only** checkpoints — 0x5dcb60 (the common
join) and 0x5dcb16 (the search-loop) — so the search loop and the join/loop-back
tail stay in the interpreter; no register reconstruction needed.

With ADDENDUM 22's jb arm, **both dominant type-37 exits now execute in JS** to
their checkpoints; only the shared 0x5dcb60 join tail, the 0x5dc51c tail, and
rare paths remain interp-suffixed.

**Verification:** lockstep oracle memMis=0 over 72/108/144 calls (TICKS 8/12/16);
AB_CONTROL memMis=0. AND an independent adversarial audit (per ultracode) traced
the arm instruction-by-instruction AND both checkpoint targets forward to the
0x5dcd3f ret — confirming the idiv truncation, every branch polarity, the
[DC40]|=8 placement, and that BOTH checkpoints are genuinely esi-only live-in
(including the unexercised sub==1/esi==[DC2C] path and the 0x5dcb16 search loop;
the 0x5dcbad tail xor-zeros eax/ebp/dx/ebx before use, and the loop-backs re-enter
the esi-only flag-dispatch shell). No divergence found — unlike ADDENDUM 22, the
checkpoint hand-off was correct first time. Production untouched (__enable5dbeeb).

**Continuation:** the 0x5dcb60 join (shared by both arms) is the next-best win.

---

## ADDENDUM 24 (2026-06-21) — 5dbeeb: ported the 0x5dcb60 sprite-chain join

Transcribed the 0x5dcb60 join (0x5dcb60..0x5dcba8), reached by the jl arm: the
conditional `[0x65dc40]|=0x10` (if `[esi+0x48]&1`), then the sprite-chain walk —
if `[0x65dc30]>=0` walk via `[esi+0x3e]`, else via `[esi+0x40]` (compare
`esi==[0x65dc2c]`) — terminating in two checkpoints: **0x5dbffb** (loop-back to
the flag-dispatch shell with the next sprite) or **0x5dcbad** (chain-exhausted
final-accumulation pass; it reloads esi from `[0x65dc2c]` and xor-zeros the other
regs, so it needs NO live-in registers).

**Coverage / verification split (the now-standard pattern):** join exit census
for type 37 = **0x5dcbad exhausted 29, 0x5dbffb loop-back 0** — sc21.sc4's type-37
vehicle chains are single-sprite, so the loop-back is NOT oracle-exercised. So:
- 0x5dcbad path: oracle-validated (lockstep memMis=0 over 72/108/144 calls, TICKS
  8/12/16; AB_CONTROL memMis=0).
- 0x5dbffb loop-back path: validated by an independent adversarial audit that
  traced EVERY reachable path from 0x5dbffb and confirmed all of
  eax/ecx/edx/ebx/edi/ebp are written-before-read (edi at 0x5dbffb, ebx/eax in the
  0x5dc032 accumulate, ecx/edx/ebp likewise), so the esi-only hand-off is correct
  for multi-sprite chains. The next-sprite esi arithmetic and the 0xffff/`[DC2C]`
  sentinels were confirmed exact.

This is the discipline crystallised over ADDENDA 20/22: the differential oracle
validates the path the scenario TAKES; an independent static audit validates the
checkpoint hand-off for the paths it DOESN'T. Both are required.

Production untouched (__enable5dbeeb-gated).

**Continuation:** the 0x5dcbad final-accumulation pass (chain re-walk + idiv +
final math toward the 0x5dcd3f ret) is the biggest remaining block.

---

## ADDENDUM 25 (2026-06-21) — 5dbeeb: ported the 0x5dcbad avg-math; audit caught ANOTHER latent live-in bug (3rd save)

Transcribed the 0x5dcbad final-accumulation pass's first half (0x5dcbad..0x5dcc22):
the sprite-chain re-walk loop (count=ebx, sum[esi+0x2c]=eax, sum16[esi+0x46]=ebp;
the dx OR-accumulation is dead — cdq overwrites edx) and the averaging math —
**two signed idivs** (`idiv ebx` by count, `idiv ebp` by sum16), an `imul edx,edx`
square with a `jns/neg` abs-adjust by sign of [esi+0x28], and several `sar` —
producing ecx. Checkpoints at 0x5dcc28 (flag-8 set) or **0x5dcd0c** (flag-8 clear;
type-37's path, since type-37 flag = 0x1001).

**The audit earned its keep a 3rd time.** Oracle GREEN (memMis=0 over 72/108/144
calls) — but the independent adversarial audit found a CRITICAL latent bug: the
0x5dcc28 checkpoint (flag-8-set, UNEXERCISED by type 37) omitted live-in **ebp**,
which the middle reads at `0x5dcc65 imul ebx,ebp` and never rewrites. The bridge
would have supplied a stale caller ebp → wrong quotient / possible #DE. Fixed:
`regs.ebp = sumBp` at that checkpoint (and dropped the dead `regs.edx=type`,
overwritten at 0x5dcc78). The audit also flagged a LOW div-by-zero edge (`idiv ebp`
when sumBp==0 → x86 #DE vs JS 0; unreachable on the type-37 path, oracle-confirmed).
Everything else (the chain-walk, both idivs' sign handling, the square/abs, the
0x5dcd0c exercised-path live-ins esi+ecx) verified byte-faithful.

**Verification:** lockstep memMis=0 over 72/108/144 calls (TICKS 8/12/16) post-fix;
AB_CONTROL memMis=0. The jl arm now runs in JS to within ~10 instructions of the
0x5dcd3f ret. Production untouched (__enable5dbeeb-gated).

**Tally of the audit-vs-oracle split:** across ADD.22/24/25, the lockstep oracle
was GREEN every time, yet the static audit caught a real checkpoint-live-in bug in
2 of 3 (ADD.22 eax/ecx/edx, ADD.25 ebp) — both on flag/value paths the single
scenario never executes. The audit is not optional for hybrid checkpoints.

**Continuation:** the short 0x5dcd0c tail (0x75-subtype + [esi+0x2c]=ecx store +
ret loads) completes the jl path to the ret — the next, finishing win.

---

## ADDENDUM 26 (2026-06-21) — 5dbeeb: jl path COMPLETE to the ret (finished the 0x5dcd0c tail)

Transcribed the 0x5dcd0c tail (0x5dcd0c..0x5dcd31): the 0x75-subtype adjust
(`if subtype==0x75 && 0x30<=u16[esi+0x34]<=0x80: ecx -= [esi+0x28]>>6`) and the
final `[esi+0x2c]=ecx` store, checkpointing at **0x5dcd34** — the ret epilogue
(`mov eax,[0x65dc40]; mov ebx,[0x65dc44]; ret`), which needs no register live-in
(eax/ebx load from globals; eax — the mode-flag contract output — rides on the
heap correctness the oracle already gates).

**MILESTONE: the jl 0x5dca73 path (the dominant type-37 exit, ~33/72 calls) is now
FULLY computed in JS** — from the 0x5dbeeb entry, through the prefix, flag-dispatch,
accumulate, the jl arm, the 0x5dcb60 sprite-chain join, and the 0x5dcbad final-
accumulation pass (two idivs + the averaging math), to the ret. Only the
2-instruction epilogue stays in the interpreter.

**Verification:** lockstep memMis=0 over 72/108/144 calls (TICKS 8/12/16);
AB_CONTROL memMis=0. Independent adversarial audit found NO divergence — it verified
the tail instruction-by-instruction (logical vs arithmetic shifts, 16-bit vs 32-bit
widths, the unsigned jb/ja range, inclusive bounds, the 32-bit wrap) INCLUDING the
subtype-0x75 adjust branch that type 37 never exercises, and confirmed the 0x5dcd34
epilogue needs no live-in. Production untouched (__enable5dbeeb-gated).

**Remaining for full 5dbeeb (type 37):** the jb-arm tail past 0x5dc51c (the
0x5dcd40-call path, the [esi+0x24]<0x368a → 0x5dca55 branch, the jmp-0x5dc086
loop-back); the 0x5dc450 delta-block + 0x5dcd40 call path; the unexercised flag-8
middle (0x5dcc28..0x5dcd0a) and the rare 0x5dc1a8 fall-through. Then `_fuzz-5dbeeb`
+ flip live.

---

## ADDENDUM 27 (2026-06-21) — 5dbeeb: jb-arm no-call tail + the finding that type-37 jb ALWAYS diverts

Transcribed the jb-arm no-call tail (x86 0x5dc538..0x5dc555, replacing the old
0x5dc51c checkpoint): `cmp [esi+0x24],0x368a; jl 0x5dca55` → checkpoint 0x5dca55
(a 2-external-call block, esi-only live-in), else
`[esi+0x2c] += [0x65dc70 + b7*4]; [0x65dc38]++` → checkpoint 0x5dc086 (the
frame-advance loop-back, esi-only). Lockstep memMis=0 (72/108/144 calls); an
independent adversarial audit confirmed the precondition reasoning, the
instruction transcription, and BOTH checkpoints' esi-only hand-off (incl. that
0x444927's lone 32-bit read `and eax,0xfe0` is benign — mask within the low-16
loaded from globals). No divergence.

**KEY FINDING (measured, not assumed): the type-37 jb arm diverts to the
interpreter 38/38 of the time.** A coverage probe showed divert_0x5dc450=38,
delta_block=0, and both tail exits 0. [DC30] is always >=0 at the jb arm for type
37 (and esi==[DC28] always, since esi isn't re-pointed after 0x5dbff5), so the
0x5dc450 divert added in ADDENDUM 22 ALWAYS fires. Consequence: the jb-arm delta
block (ADD.22) AND this no-call tail are **audit-verified-correct but DORMANT for
type 37** — they don't accelerate the exercised path. ADDENDUM 22's comment
"[DC30]<0 is the only path type 37 takes" was BACKWARDS; corrected in the source.

So the session's real, exercised win is the **jl path** (fully in JS to the ret,
~33/72 calls, ADD.23-26). The jb path (~38/72) still runs in the interpreter from
0x5dc450. **To actually accelerate it (the next high-value step): replace the
0x5dc450 divert with an in-JS [DC30]>=0 path — run the delta block, then delegate
the 0x5dcd40 call (ax=va/cx=vc/dx=vd, bp=[esi+0x40], esi) and handle its
jb 0x5dc577.** This supersedes the divert.

**Methodology note:** this is the coverage-discipline lesson again (ADD.20) — a
green oracle says nothing about which BRANCH the scenario took. Here the oracle was
green for 5 commits while the jb delta block + tail were never executed; only a
direct branch-count probe revealed it. Always measure call-counts on the intended
arm, not just memMis. Production untouched (__enable5dbeeb-gated).

---

## ADDENDUM 28 (2026-06-21) — 5dbeeb: accelerated the type-37 jb arm (removed the divert; delta block now runs in JS for the exercised path); audit caught a 4th live-in bug

Acting on ADDENDUM 27's finding: REMOVED the 0x5dc450 divert and instead run the
image-delta block in JS for BOTH the call and no-call paths. At 0x5dc51c the call
path (esi==[DC28] && [DC30]>=0 — the path type 37 takes 38/38) now checkpoints at
**0x5dc52d**, where the interpreter does `mov bp,[esi+0x40]` + the 0x5dcd40
proximity call (reads bp + ax/cx/dx = va/vc/vd + esi, sets CF) + the CF-dependent
`jb 0x5dc577`. (CF isn't exposed by callNative, so we hand off rather than
delegate-then-branch.) Net: the ~40-instruction delta block now runs in JS for the
38 exercised jb calls instead of being redone in the interpreter via the old divert.

**Coverage now real:** the call path is exercised 38/38 (measured call52d=38), so the
delta block — DORMANT since ADD.22 per ADD.27 — is finally genuinely validated by
the oracle (memMis=0 over 72/108/144 calls; AB_CONTROL memMis=0).

**The audit earned its keep a 4th time.** Oracle GREEN, but the independent
adversarial audit found a CRITICAL latent bug: the 0x5dc52d checkpoint omitted
live-in **ebx** (= b7 = u8[recPtr+7], set natively at 0x5dc4f0). 0x5dcd40 preserves
ebx (pushes only eax/ecx/edx/edi), and ebx is read-before-write at 0x5dc545
(`mov ebx,[ebx*4+0x65dc70]`) on the 0x5dc538 fall-through ([esi+0x24]>=0x368a) and at
0x5dc994 on the jb-0x5dc577 path ([esi+0x24]<0). Type-37 field values route through
0x5dca55 (which reloads ax/cx/dx and never reads ebx), dodging both reads — so the
oracle stayed green while the code was latently wrong. Fixed: `regs.ebx = b7` at the
checkpoint. The audit confirmed eax/ecx/edx high16, ebp, and edi are all fine.

**Audit-vs-oracle tally is now 4 catches across ADD.22/24/25/28** (24 was clean):
the oracle was GREEN every single time, and the static audit caught a real
checkpoint-live-in bug in 4 of 5 checkpoint transcriptions — always a register
left stale on a value/flag sub-path the single scenario never triggers. For hybrid
checkpoints the audit is not optional.

**Remaining for type-37 5dbeeb:** the 0x5dcd40 call + 0x5dc577/0x5dc538 tails on the
jb path (interp-suffixed); the flag-8 middle (0x5dcc28..0x5dcd0a); the rare 0x5dc1a8
fall-through. Then `_fuzz-5dbeeb` + flip live. Production untouched (__enable5dbeeb).

---

## ADDENDUM 29 (2026-06-21) — MAJOR FINDING: the PRODUCTION auto-translation FUN_005dbeeb is BROKEN (72/72 divergent)

Stepped back from the hybrid (test-path) grind to ask the real-goal question: **is
the BROWSER/production path for 0x5dbeeb correct?** Production has no interpreter and
routes 0x5dbeeb → `FUN_005dbeeb` (ported/auto/5dbeeb.js, the Ghidra-C→JS auto-
translation) via `_dispatch.js`. The hybrid lockstep never tested this — it tests the
`__enable5dbeeb` armType55 hybrid, not the auto fn.

New tool `tools/_lockstep-5dbeeb-auto.mjs` (untracked scratch, like the other
_lockstep tools): per 0x5dbeeb crossing, run `FUN_005dbeeb(heap)` (pure JS, calls its
JS callees) vs the interpreter, whole-heap + eax diff. Result over an enterScenarioPlay
soak: **calls=72 memMis=72 eaxMis=72 jsThrew=0** (all type 37). The auto fn does NOT
crash — it silently computes the WRONG answer on EVERY call. Divergence starts at the
very first global store `[0x65dc2c]=esi` (0x5dbeef, before any callee): the interp
writes esi's bytes (…2d=48 …2e=74), the auto wrote 0 — a translator store bug — and
eax returns 0x12/0x1 vs the interpreter's 0x0.

**Implications:**
- The browser's in-game VEHICLE SIMULATION (0x5dbeeb is the per-sprite vehicle
  mode-flag/position update, ~the top sim function) is WRONG in production. This was
  invisible to every prior gate: the title/gameplay ACCURACY gates render a frame the
  broken sim doesn't visibly corrupt at tick-1 capture, and the hybrid lockstep only
  validated the (test-only) armType55, not the auto fn.
- It vindicates the manual/hybrid approach: the auto-translation of 0x5dbeeb is
  unusable; this function MUST be hand-ported for production.
- The hybrid armType55 transcriptions (prefix, flag-dispatch, accumulate, cx-dispatch,
  the FULL jl arm, the jb delta block) are byte-exact-validated CORRECT JS — they are
  the reference logic for a production replacement.

**Reframed next work (supersedes the incremental hybrid-checkpoint grind):** the
high-value goal is a COMPLETE, interp-free, correct JS 0x5dbeeb to REPLACE the broken
auto-translation in production. The hybrid has validated most of the type-37 logic; the
remaining interp-suffixed pieces (the 0x5dcd40 proximity call [~168 instr, 3 rets], the
0x5dc577 tail, the frame-advance loop-backs) must be transcribed too, then assembled
into a single straight-line/looping JS function (no checkpoints) and diff-tested with
`_lockstep-5dbeeb-auto`-style harness (auto-fn-vs-interp) driven to memMis=0 before
replacing 5dbeeb.js. This is the path that actually fixes the browser.

**Methodology lesson (the crown jewel, again):** test the PATH THAT SHIPS. The hybrid
lockstep was green for ~10 commits while the code that actually runs in the browser
(the auto fn) was 100% wrong. A differential test is only as good as the SUT it points
at — point it at the production artifact.

---

## ADDENDUM 30 (2026-06-21) — production-correctness sweep + first end-to-end FIX (0x5e53ca, byte-exact)

Acting on ADDENDUM 29, built the generalizable harness `tools/_lockstep-auto.mjs`
(untracked): `ADDR=0x... node tools/_lockstep-auto.mjs` runs ANY production auto fn
`FUN_00<addr>` vs the interpreter with REAL entry state during the soak (a re-entrancy
guard + a `run-until-esp>entry-esp` interp leg). NOTE: the first cut of that interp
leg was itself buggy (exited after ~1 step for non-pushing prologues) — caught when a
result's diff *flipped* direction; fixed to a single `while (esp <= entryEsp) step`.
Lesson: validate the harness too.

**Production-correctness map of the 0x5dbeeb callees (real entry state):**
- `0x5e53ca` — **BROKEN** (was wrong on every overlapping call) → **FIXED this commit**.
- `0x5e117d` OK, `0x5dcd40` OK, `0x5cfac7` OK (auto-translations correct).
- `0x5cfc50`, `0x5df40c`, `0x5d9220` NOT-REACHED by the type-37 soak.
- (the big 0x444927/0x4364c2/0x452fce/0x5d849e/0x5d8623/0x5d870c not yet swept.)

**The fix — 0x5e53ca (ported/auto/5e53ca.js, now @manual):** Ghidra's C was BADLY
incomplete — it collapsed the function to a trivial loop and DROPPED both the
per-entry bbox-clamp math and the ax/bx/dx/bp register setup before `call 0x5e117d`.
The real function (rewritten from the 0x5e53ca disasm) is a viewport dirty-rect
marker: for each window in the table at 0x9a121c overlapping the sprite bbox
([esi+0x16..0x1c]), clamp the bbox to the window, transform into the window's
dirty-grid coords (sub origin, `sar` by zoom [esi+0x10], add grid base), and call
0x5e117d to mark cells. `pushal/popal` ⇒ preserves all regs. The auto fn (faithful
to the wrong C) called 0x5e117d with un-set registers, so production marked NO dirty
cells for overlapping sprites — the browser's viewport invalidation was broken.

**Validation:** `tools/_lockstep-auto.mjs ADDR=0x5e53ca` **memMis=0 eaxMis=0 over 178
calls** (TICKS 16). title_accuracy + gameplay_accuracy gates both PASS (no render
regression). This is a COMPLETE, shippable production fix — unlike the 0x5dbeeb
hybrid (test-path-only until fully interp-free). It also re-applies the ADDENDUM 18
pattern (fix a broken auto-translation, gated by the real-entry lockstep) and proves
the auto-vs-interp harness as a reusable production-correctness tool.

**Translator-bug classes confirmed here:** (1) `& 0xffff` masking signed `short`
loads (the initial sVar1..sVar4 fix — real, though not this divergence's root);
(2) Ghidra dropping a whole clamp loop + call-site register setup (the root) — the
auto-translation is simply unusable when Ghidra's C is this lossy; hand-port from asm.

---

## ADDENDUM 31 (2026-06-21) — promote the production-correctness harness; candidate-finding gap

Promoted `tools/_lockstep-auto.mjs` from untracked scratch to a TRACKED tool — it's
the generalizable "test the path that ships" harness (run any production auto fn vs
the interpreter with real entry state) that found the ADDENDUM 29/30 results. With
`tools/disasm-va.py`, these are the reusable methodology assets the project's true
goal is about.

**Negative findings this pass (recorded so the next pass starts smarter):**
- The `i16(...) & 0xffff` translator-bug class (signed `short` read masked unsigned,
  the 5e53ca side-bug) is RARE: only 5 auto files (415c60, 437fdc, 5d6a1d, 5dbeeb,
  5e19eb), and 437fdc/5e19eb/5d6a1d are all NOT-REACHED by the sc21.sc4/type-37 soak,
  so they can't be soak-validated and aren't an active production problem. (`i8 & 0xff`
  appears 118× but is mostly legitimate unsigned use.) Not the systemic lever hoped.
- **The candidate-finding gap:** the harness tests ONE function/run and needs the
  function to be reached by the soak. But there's no good "small + gameplay-reached +
  auto" candidate list: the static callgraph (tools/dynamic-callgraph) misses the
  `extra_*` hand-ports' callNative edges (BFS from 0x5da274 found only itself), indirect
  edges are sparse (4 callees), and the big 0x5dbeeb callees (0x444927 ~10k instr, etc.)
  are too slow to soak-test (the earlier 12-callee sweep hung on them). The tractable
  reached functions in 0x5dbeeb's subtree are already done (5e53ca fixed; 5e117d/5dcd40/
  5cfac7 OK).

**Next-pass plan:** to fix production functions efficiently, first build a
reached-function MAP — instrument the interpreter's `call` dispatch during the soak to
record (callee addr, count), cross-ref C-size, and rank small+frequent+auto candidates.
That makes the harness's per-function test productive instead of guess-and-hang. Then
fix the broken small ones (ADDENDUM 30 pattern). The big interp consumers (0x5dbeeb
production fix; 0x444927 etc.) remain multi-session hand-ports.

---

## ADDENDUM 32 (2026-06-21) — reached-function map closes the candidate gap → fixed 0x45a95d (font rasterizer)

Built `tools/_reached-map.mjs` (the ADDENDUM 31 plan): it enables the interpreter's
own `cpu.callEdges` tracing on the painter-bridge cpu during the soak (every interp
execution shares that cpu), capturing the set of functions the CORRECT execution
reaches, then cross-refs C-size + @manual to rank candidates. This closes the
candidate-finding gap — it surfaces small/medium reached auto functions to point the
`_lockstep-auto` harness at.

**Sweep results (sc21.sc4 / type-37 soak):** 26 distinct interp-reached callees. The
6 small (<=60 C-line) reached auto functions are all CORRECT (memMis=0: 0x423677,
0x425432, 0x45389c, 0x458a7c, 0x439219, 0x5e3652 — some show eaxMis but are `void`,
eax dead). Of the medium ones: 0x423ffd OK; **0x45a95d BROKEN (memMis 3/12) — FIXED
this commit**; 0x44189c BROKEN (memMis 1/1, 110 C-lines — next target).

**Fix — 0x45a95d (ported/auto/45a95d.js, now @manual):** the font GLYPH RASTERIZER
(renders the in-game text glyph cache). One source line writing DAT_0064bb04 carried
TWO translator bugs: (1) `setU32` for an `undefined1` (byte) store — corrupts the 3
trailing bytes (the recurring setU32-as-setU8 class); (2) the LUT index
`(byte)(bVar4 + 0x72)` was emitted without the byte cast (`>>>0`), and since this path
runs for control bytes bVar4∈[0x8e,0x9b], `bVar4+0x72` overflowed 0xff → indexed the
colour LUT 256 entries too far (js colour 0xb0 vs binary 0x37). So in-game text
rendered with the wrong glyph colour. Fix: `heap.setU8(0x64bb04, heap.u8(... ((bVar4+0x72)&0xff)*4))`.

**Validation:** `_lockstep-auto ADDR=0x45a95d` memMis=0 over 32 calls (TICKS 16);
title_accuracy + gameplay_accuracy both PASS (no regression). Second shippable
production fix via the harness (after 0x5e53ca), now with the reached-map making target
discovery systematic.

**Next:** fix 0x44189c (110 C-lines, broken); then re-run the reached-map after wiring
more of the sim through the interp (the current map only covers the interp-delegated
subtree — extending coverage will surface more JS-dispatch-path candidates).

---

## ADDENDUM 33 (2026-06-21) — 0x44189c diagnosed (DEFERRED, complex recursive); reached-map tractable targets exhausted

Investigated the last broken reached-map candidate, 0x44189c (a recursive
pathfinding/connectivity search, ~110 C-lines). It is multiply-mistranslated, NOT a
one-line fix:
- **Recursive register-convention dropped:** the auto's recursive call (line ~99)
  is `FUN_0044189c(heap, pbVar9, in_DX, uVar6, in_AX)` but the function takes only
  `heap` and reads its inputs from REGISTERS (ax/cx/dx/ebp/di). So the recursion runs
  with stale regs — the auto never sets regs.eax/ecx/edx/ebp/edi before the call at
  0x4419f7. (Asm confirms the entry reads `[ebp*4+0x652478]`, ax, cx, dx, di.)
- **Wrong load width + stride (line 24/25):** `(&DAT_00652478)[unaff_EBP*2]` is a
  `short` read at byte offset ebp*4 (asm: `add ax, word[ebp*4+0x652478]`), but the
  auto emitted `heap.u32(0x652478 + (unaff_EBP*2)*4)` = u32 at ebp*8 — both the width
  (u32 vs u16) and the index unit are wrong.
- Plus packed-field globals (DAT_006293c4._0_1_/._2_2_) to verify.
It's also RARELY exercised (memMis 1/1 — a single call in the soak). So: complex +
recursive + low-frequency = a full asm hand-port best done in a dedicated focused
session, not a loop increment. DEFERRED with this diagnosis.

**Status of the reached-map fix campaign:** of the interp-reached auto functions, the
tractable ones are now resolved — **2 fixed** (0x5e53ca viewport dirty-marker ADD.30;
0x45a95d font rasterizer ADD.32), the small ones all verified correct, 0x44189c
deferred (above), and the rest are big (>150 C-lines, multi-session). The current
reached-map only covers the interp-DELEGATED subtree (0x5dbeeb + painters); the bulk
of the sim runs via JS dispatch and isn't interp-reached, so the harness can't see it.

**Next-pass plan:** broaden coverage — force the vehicle-update 0x5da274 (and ideally
a whole tick) to run in the interpreter during a reached-map soak so its full subtree
becomes interp-reached + callEdges-captured, surfacing the JS-dispatch-path functions
the harness currently can't test. Then resume the ADD.30/32 fix pattern on the new
tractable candidates. (Alternatively, begin the multi-session 0x5dbeeb production port.)

---

## ADDENDUM 34 (2026-06-21) — force-interp subtrees exhausted; pivot to bulk-diff (pure leaf fns) → fixed 0x444d07

Generalized `tools/_reached-map.mjs` (HOOK env + `globalThis["__forceInterp"+hex]`)
and ran it for all four force-interp flags (5da274 / 5dbeeb / 429560 / 4238b4). They
ALL cover the same ~23-26-function vehicle/sprite-update subtree, whose tractable
members are already resolved (2 fixed, small ones OK, 0x44189c deferred). So the
force-interp-reachable candidate pool is EXHAUSTED — broadening to other subsystems
(peeps, scenery, finance) would need new force-interp flags in painter-bridge.

**Pivot to a candidate source that needs NO interp-reachability:** the existing
`tools/bulk-diff-test.js` synthetic-entry diff over LEAF functions (no callees, only
`heap`) — exactly the pure-fn case where synthetic-entry diffing is reliable (cf. the
verify-fn-ceiling memory). Mined the cached `tools/bulk-diff-report.json` (75 leaf fns,
ok 35/75): the reliable signal is `mismatch` (both ran, different output) = 2 fns. One
(0x40e2e6) is an INTENTIONAL @manual shim divergence (DIB-validate returns 1 not 0).
The other is a real bug:

**Fixed 0x444d07 (now @manual):** `short sVar1 = DAT_0087c3a0-300+_DAT_0087c3a6;
if (sVar1<0) sVar1=0; return sVar1;`. The translator masked sVar1 `& 0xffff` →
UNSIGNED, so `if (sVar1<0)` never fired and the negative-clamp was DEAD (returned -300
/ 0xfed4 instead of 0). Fixed: keep sVar1 signed (`<<16>>16`). Same translator-bug
class as 0x5e53ca (signed `short` must not be `& 0xffff`-masked) — this is the THIRD
instance of that class (5e53ca side-bug, 5e19eb/437fdc/etc. latent, now 444d07 active).
Validated: `node tools/diff-one.js --addr=0x444d07` → ported=0x0 == interp=0x0 (was
0xfed4); title_accuracy + gameplay_accuracy gates both pass.

**Next:** run a FRESH `bulk-diff-test.js` (the cached report is small/stale — 75 fns)
to surface more pure-leaf mismatches across the whole ported set, fix them (this
sidesteps interp-reachability entirely); then tackle the `& 0xffff`-on-signed-short
class systematically (audit the ~5 flagged i16-mask fns + consider a translator fix).

---

## ADDENDUM 35 (2026-06-21) — bulk-diff exhausted; MAJOR FINDING: 6 UNTRANSLATED-STUB functions (incl. the peep core) throw in production

Fresh `bulk-diff-test.js`: ok 35→37 (0x444d07 fix confirmed; it left the mismatch
bucket). Remaining `mismatch`=1 is the INTENTIONAL 0x40e2e6 shim; `throwPortedOnly`=1
(0x43e304) is a harness artifact (needs the painter-bridge, which diff-one doesn't
install). So the leaf-fn mismatch pool is EXHAUSTED. Extended `_reached-map.mjs` with
a large bucket: the only reached auto fn in 151-400 C-lines is 0x5dcd40 (OK). All
tractable reached fns are resolved.

**MAJOR FINDING — untranslated stubs.** Testing the reached peep walking core
0x43c751 (707 C-lines) showed it THROWS: its ported/auto/43c751.js is a STUB
`throw new Error("…function not translated")` — the translator failed to translate it.
A grep finds **6 such stub functions, ALL in _dispatch (production-callable)**:
- **0x43c751 (707) — peep walking core, CONFIRMED reached in gameplay → peep movement
  THROWS in the browser.** (Big; multi-session hand-port.)
- 0x417420 (89), 0x4183a0 (78), 0x44c464 (88), 0x5d89c0 (103), 0x9b38bc (98) — small,
  untranslated, production-callable. If reached they hard-crash; either way they're a
  FRESH TRACTABLE candidate pool (78-103 C-lines each, ~0x5e53ca-sized hand-ports from C).
Only 6/1250 failed to translate, so the translator handled ~99.5% — but the 6 misses
include a core sim function.

**Production-correctness picture (this session).** Both core sim subsystems are broken
in the shipping browser path: VEHICLES (0x5dbeeb auto-translation 72/72 wrong, ADD.29)
and PEEPS (0x43c751 untranslated stub → throws). Plus 3 smaller fixes landed
(0x5e53ca, 0x45a95d, 0x444d07). The accuracy gates never caught any of these (tick-1
render frame; peeps/vehicles not visibly corrupting that frame).

**Next-pass plan (clear tractable targets now):** hand-port one SMALL untranslated stub
from C/asm (start with whichever is reached / simplest C — 0x4183a0/78 or 0x417420/89),
validate via diff-one (if pure) or _lockstep-auto (if reached). Then the two big cores
(0x43c751 peeps, 0x5dbeeb vehicles) are the remaining multi-session ports.

---

## ADDENDUM 36 — F6 signed-short fingerprint added to the static scanner; small candidates all NOT-REACHED (validation wall confirmed)

**Validation wall, confirmed precisely.** Before hand-porting a small stub I checked
reachability of all 5 small untranslated stubs (0x417420/4183a0/44c464/5d89c0/9b38bc) via
tools/_lockstep-auto.mjs: **all 5 NOT-REACHED** (calls=0) in the gameplay-tick soak (HOOK
0x5da274 vehicle subtree). They also take params (3 pointers for 0x4183a0; an int mode for
0x417420 whose indirect `(*pcVar4)()` calls need display-init globals) so diff-one's
synthetic entry is unreliable too. Net: a hand-port of these cannot be gated to memMis=0
with the current harnesses → per "NEVER commit unverified green," they are deferred until
a targeted-invocation harness exists (set eip + craft entry state + diff vs interp).

**Methodology deliverable — F6 fingerprint.** Added a 6th fingerprint to
tools/translator-bug-scan.js for the signed-`short`/`char` bug class that caused TWO of
this session's three production fixes (0x5e53ca, 0x444d07): a variable narrowed to UNSIGNED
(`& 0xffff` / `& 0xff` / `>>> 0`) and then tested `< 0` — a provably-dead sign branch
(the original compared a signed value; the translator masked it unsigned, deleting the
negative-clamp). Scans backward from each `< 0` to the var's most-recent assignment so
reassignment is handled. VERIFIED on a fixture: flags both known bug shapes
(`&0xffff`-then-`<0` and `>>>0`-return-then-`<0`), and does NOT flag the correct fix shape
(`<<16>>16` re-signed) — so fixing a site cleanly makes F6 stop flagging it (no FP churn).

**F6 worklist — 29 static hits across the port** (`node tools/translator-bug-scan.js`,
`/tmp/rct-translator-bugs.csv`). Clusters in already-known-broken code corroborate the
diagnosis: **0x5dbeeb x3 (the 72/72-broken vehicle core — lines 131/608/624)**, 0x5dcd40 x4,
0x5e16f7/5e19eb/5e613e (0x5e draw/viewport, near the 0x5e53ca fix), 0x9b30f1, 0x415c60 x3,
416a50, 4190f0, 419880, 428ec0, 43de68 x2, 450b4c, 53cfb8, 53e318.

**KEY CAVEAT (baked into the tool header):** F6 is a STATIC fingerprint — a hit is a
CANDIDATE, not a confirmed live bug. Proof: 0x5dcd40 has 4 F6 hits yet passes lockstep
(memMis=0) — its dead branches aren't exercised on the soak path. Every F6 hit still needs
runtime confirmation (_lockstep-auto / bulk-diff) before a fix is justified. And of the 13
small F6-flagged fns checked, **all NOT-REACHED** — same validation wall as the stubs.
So F6's immediate payoff is the 3 hits inside 0x5dbeeb: when that core is hand-ported,
F6 pre-flags exactly which sign branches the translator dropped.

---

## ADDENDUM 37 — exit-register oracle finds 0x458a7c = measureStringWidth, fully mistranslated (4th production fix)

**Diagnostics this pass.** (1) Confirmed the reached VEHICLE core 0x5dbeeb is structurally
unsalvageable as an auto-translation: `_lockstep-auto` shows memMis=54/54, jsEax=0x12
constant (it returns heap.u32(0x65dc40) instead of doing the work), and the file has **20
`_gotoWarn` early-return stubs** — the F4 goto-translation failure, not fixable by
sign-branch tweaks. So 5dbeeb needs the hybrid/asm-rewrite (as the prior session found),
not incremental patching. (2) Mapped a NEW reached subtree — the PEEP subsystem via
`HOOK=0x439b86 node tools/_reached-map.mjs` (23 callees) — surfacing 8 fresh untested
reached auto fns (0x423677/425432/45389c/458a7c/439219/5e3652/5cfac7/423ffd). All pass the
memMis gate.

**Tool upgrade — exit-register comparison in `_lockstep-auto.mjs`.** The memMis gate is
heap-only; it cannot see a dropped REGISTER write-back (the F2 unaff_REG bug class), where a
caller relies on an output register the JS port never sets. Added informational comparison
of the JS-leg vs interp-leg EXIT registers ecx/esi/edi/ebp/ebx (eax already covered by
eaxMis), printed as `regMis[ecx=.. esi=.. ..]` + per-call detail. ecx/esi are scratch for
most fns (benign nonzero) but ARE the return for cx-returning / cursor-advancing helpers.

**The find: 0x458a7c is measureStringWidth, and the auto-translation is FULLY BROKEN.**
It passed the memMis gate (writes no heap) but the new regMis lit up esi=12/12 + ebx=12/12,
and eaxMis=12/12. The asm (tools/disasm-va.py 0x458a7c) shows the Ghidra C
(decompiled/c/458a7c.c, `void(void)`) recovered ONLY the esi-walk skeleton and dropped: the
`cx` pixel-width accumulation (`add cl,[ebx+eax+0x99a508]; adc ch,0`), the `ebx` font setup
(`movzx ebx,word [0x971e84]`), the inline-sprite/escape-code handling, and the **cx (ecx)
RETURN VALUE**. So the shipping port measured nothing, never advanced esi, never returned a
width — corrupting all text width/centering through its 5 callers (4585a6/458622/458678/
42de29/5e3652). The tick-1 accuracy frame didn't exercise the affected layout, so the gates
stayed green over a real bug — exactly why a per-function exit-register oracle was needed.

**FIX (commit pending): hand-rewrote ported/auto/458a7c.js from the asm** (`@manual`), with
the font-select codes (7→0x1c0,8→0x2a0,9→0xe0,0xa→0), param-skip codes, and inline-sprite
width (word [imageId*16+0x8dc0b8]). Validated: `_lockstep-auto ADDR=0x458a7c` → calls=16
memMis=0 eaxMis=0 **regMis clean (esi/ecx/ebx all match)**. Gates: title_accuracy +
gameplay_accuracy 0/307200, title_replay, playability/interactive/viewport_build_live 23/23.

**Takeaway for the methodology.** The exit-register oracle is now a standing check —
re-running it over the reached set will surface the rest of the F2 dropped-writeback class
(0x439219 6/6 + 0x423677 1/1 eaxMis still to be triaged with it). And the Ghidra-C-is-wrong
class (a `void(void)` that actually returns a value) is detectable: any reached fn with
clean memMis but persistent regMis/eaxMis is a decompiler miss worth disassembling.

---

## ADDENDUM 38 — exit-register oracle SWEEP: the reached translatable set is CLEAN

Ran the enhanced `_lockstep-auto` (regMis check) over the full reached auto (non-@manual)
set, union of the vehicle (HOOK=0x5da274) and peep (HOOK=0x439b86) subtrees:

| fn | C-lines | result |
|---|---|---|
| 0x425432 | 27 | CLEAN (memMis=0, no regMis) |
| 0x45389c | 29 | clean heap; esi/edi regMis is BENIGN — it trashes esi/edi as loop scratch (no push/pop; ends at ret 0x4538ff) and the sole caller 0x4499cc doesn't consume them (its unaff_EDI is reassigned before use; never reads esi) |
| 0x439219 | 35 | clean heap; ebx/eax regMis benign (void side-effect fn) |
| 0x423677 | 25 | clean heap; eaxMis benign (return not consumed) |
| 0x5e3652 | 51 | CLEAN |
| 0x5cfac7 | 80 | eax (primary return) MATCHES; ecx/esi/ebx regMis but ecx is push/pop-restored (return is eax:dx, not ecx) → likely benign scratch. Complex multi-branch vehicle pos/rotation calc, only 1 soak call (low coverage). DEFER for a higher-coverage + dx-aware look. |
| 0x423ffd | 130 | CLEAN (104 calls) |
| 0x5dcd40 | 171 | CLEAN (12 calls) |
| 0x44189c | 110 | BROKEN (memMis=1) — already DEFERRED (ADD.33: complex recursive, multiple bugs, rare) |

**Conclusion.** After the 0x458a7c fix, every REACHED + TRANSLATABLE function is correct at
the heap gate, and the regMis cases are all benign scratch (calibration: esi/edi/ebx regMis
on a void/side-effect fn whose caller doesn't consume them is a false-positive; regMis only
matters when the register is a documented in/out consumed before reassignment — as with
0x458a7c's cursor+width). The remaining production-correctness gaps are now precisely:
(1) the GOTO-heavy reached cores 0x5dbeeb (vehicles, 20 _gotoWarn stubs) and 0x43c751 (peeps,
parse-fail stub) — multi-session hybrid/asm rewrites; (2) the deferred complex fns 0x44189c
(broken) and 0x5cfac7 (ambiguous); (3) the NOT-REACHED pool (5 stubs + F6 candidates) which
needs a targeted-invocation harness to validate. Candidate-hunting in the reached set is
exhausted; further gains require tackling (1) or building (3)'s harness.

---

## ADDENDUM 39 — targeted-invocation harness BUILT (`tools/_invoke-diff.mjs`); unlocks the not-reached pool

Built the group-(3) harness. `tools/_invoke-diff.mjs` invokes ANY function directly from
the live post-enterScenarioPlay heap — both legs from the same crafted entry registers,
same scratch stack (top of the 64K carve), same heap snapshot — and diffs heap [0,CMP_END)
+ exit regs. It captures the painter-bridge cpu by briefly hooking 0x5da274 for one tick,
then uses `runFunction(cpu, ADDR, {stackTop, limit})` for the interp leg and the imported
`FUN_00<addr>` for the JS leg. No soak reachability needed. Sound with arbitrary entry
because both legs read the SAME heap+regs, so any divergence is a JS-port bug (a garbage
pointer is walked identically by both). Entry regs default to live cpu.regs, override via
env EAX/ECX/.../EDI; STACK="a,b" writes cdecl u32 args.

**Validated:** MATCH (memMis=0, no regMis) on two known-good fns — 0x458a7c (ESI=0x99a888,
my ADD.37 fix) and 0x5dcd40 (passed _lockstep-auto) — so no false positives. Confirmed it
flags broken: the 5 stubs (0x417420/4183a0/44c464/5d89c0/9b38bc) show `JS THREW` (parse-fail
stub) while the interp runs the real code; **0x5d89c0** is the standout — even with default
entry the interp makes 67 concrete byte-writes (a peep/vehicle anim-update chain-walk,
complete readable C, calls FUN_005e53ca [@manual, fixed] + FUN_004518fc [auto]). **0x9b38bc**
(not a stub) shows a real DIFF: ecx/ebx regMis (js leaves them at entry, interp sets
ecx=1/ebx=0x743c0e) — triage later (may be benign scratch like 0x45389c, or a real output).

**Next:** hand-port the stubs against this harness, starting with 0x5d89c0 (clearest target:
complete C + 67-write interp reference + realistic live-sprite entry esi=0x700ac8). Then
0x9b38bc triage, then the param-taking stubs (0x4183a0 needs STACK= pointer args).

---

## ADDENDUM 40 — 0x5d89c0 stub PORTED (5th fix) + interpreter add/sub-byte CARRY-FLAG bug fixed

**0x5d89c0 hand-ported (was a parse-fail THROW stub).** Peep/vehicle animation-update chain
walk — transcribed from the complete C, with the two cross-branch gotos structured as a
`doA4F` flag (velocity branch re-enters LAB_005d8a4f) + a `skip` flag (the before>=0xec early
exit). One subtlety the C encodes that's easy to miss: the velocity branch reassigns
`bVar3 = (byte)uVar4` (abs velocity) BEFORE its `goto LAB_005d8a4f`, so A4F's `bVar3==0x22`
check uses the velocity value on that path. Validated with `tools/_invoke-diff.mjs`
(ADD.39): MATCH, memMis=0, exit regs match (was 67 mismatched bytes as a stub).

**Interpreter bug found via the new harness — `add/sub byte [mem],imm8` CARRY FLAG.** The
last divergence (1 byte: entity0+0xb5, js=0xff/in=0x13) was NOT a port bug — it was the
INTERPRETER. harness/x86.js's 0x80/0x82 ALU-byte handler hardcoded `CF=0` for ADD and SUB
("approximate; rarely used after"). So `add byte [esi+0xb5],0x14` on 0xff produced 0x13 with
CF=0; the following `jae` was wrongly taken, skipping the `mov 0xff`. Ghidra's C (`0xeb <
bVar3` → set 0xff) and the real CPU set 0xff — the JS port was RIGHT, the "truth" oracle was
WRONG (the ADD.4 "suspect lockstep mismatches in BOTH directions" lesson, 3rd time: cf the
66-MOVSX, 66-XCHG prefix bugs). FIXED: compute CF (and OF) correctly for ADD/ADC/SBB/SUB/CMP
and clear CF/OF for OR/AND/XOR. After the fix 0x5d89c0 is MATCH and the known-good 0x458a7c/
0x5dcd40 still MATCH. **Gates all green:** title_accuracy + gameplay_accuracy 0/307200,
title_replay, playability/interactive/viewport_build_live 25/25 — so no production code
depended on the buggy CF=0. This carry-flag fix improves the interp/oracle for ALL code that
does a byte add/sub then a carry branch (jc/jnc/jae/jb/adc/sbb).

**Production-fix tally this session: 5** — 0x5e53ca, 0x45a95d, 0x444d07, 0x458a7c, 0x5d89c0,
plus one interpreter correctness fix (0x80 byte-ALU carry). **Next:** triage 0x9b38bc, then
port the param-taking stubs (0x4183a0 — 3 pointer args via STACK=; 0x417420 — indirect-call
display dispatch; 0x44c464; 0x9b38bc).

---

## ADDENDUM 41 — 0x9b38bc benign; POKE harness feature; 0x44c464 BLOCKED on helper register-modeling

**0x9b38bc triage = benign (already ported).** It is NOT a stub — it's an existing `@manual`
hand-port (the RLE 1x1 pick-blit leaf). Its contract is the DAT_0099c164 hit-flag side-effect
(heap — matches, memMis=0) and its `eax` return (matches); the ecx/ebx regMis from _invoke-diff
is pure scratch the callers ignore. No action — consistent with the regMis calibration rule.

**POKE harness feature (`tools/_invoke-diff.mjs`).** Added `POKE="addr=val[/size],…"` which
writes heap bytes BEFORE the snapshot, so both legs see the crafted state identically — used to
force a branch a real entity doesn't reach (e.g. a mid-animation frame). Validated: a harmless
POKE leaves known-good 0x458a7c at MATCH.

**0x44c464 attempted then REVERTED (unverified) — BLOCKED on helper register-modeling.** The
sprite image-id selector. Real idle entities (esi=0x744994 etc., [0x15a]==0) all take the
`FUN_00423677` fallback path. My transcription hit memMis=624 because the fallback computes
`uVar6 = CONCAT22(extraout_CX, uVar3)` / `iVar7 = CONCAT22(extraout_DX, …)` from 0x423677's
EXIT cx/dx — but 423677.js (auto) only models `regs.eax` + heap, never sets regs.ecx/edx. So
the caller cannot recover the secondary register outputs it needs; same for FUN_005e6a83's
extraout_ECX/EDX. Reverted to the stub per "never commit unverified green."

**METHODOLOGY BOUNDARY (important).** A not-reached stub is cleanly hand-portable+validatable
ONLY if its callees are leaf/pure OR model the FULL register output the caller consumes. The
auto-translator models eax+heap but NOT secondary register outputs (cx/dx/ecx/edx as Ghidra's
`extraout_*`). 0x5d89c0 ported cleanly because it consumed only FUN_005e53ca's edx, and that's
@manual and DOES set regs.edx. The remaining stubs are blocked: 0x44c464 (423677/5e6a83
cx/dx/ecx/edx), and likely 0x4183a0 (5 FP-bignum helpers) and 0x417420 (indirect GDI calls).
**Unblocking path = a translator/helper upgrade to emit secondary-register writes** (model the
`extraout_*`/out-register effects), then these stubs become portable. That's the next real
lever for the not-reached pool — bigger than a single function, so a deliberate separate pass.

---

## ADDENDUM 42 — ARCHITECTURE CORRECTION: production RUNS the x86 interpreter; un-wired JS autos are DEAD CODE

This corrects the central premise of ADDENDA 29/35 ("the browser has NO interpreter; production
routes via _dispatch.js to the JS autos, so a buggy auto = a shipping bug"). That premise is
**false**, verified three ways this pass:
1. `runtime/harness.js:64` calls `installPainterBridge` UNCONDITIONALLY in createRuntime — it
   builds the x86 interpreter cpu (overlays ~1.98 MB of rct.exe code).
2. `web/main-native.js:80-110` (the BROWSER entry) fetches `binary/rct.exe`, passes `exeBytes`
   to createRuntime, and notes "init may exercise painter-bridge interpreter." The file's line-1
   comment "no x86 interpreter loaded" is STALE/wrong.
3. Liveness probe (instrument fn entry, run init + 40 scenario ticks, count JS calls): the
   peep hand-port FUN_extra_peepwalk_43c751 fires 767× (live, eip-hook/fnDispatch-wired), but
   the broken vehicle auto FUN_005dbeeb fires **0×** (vehicles run in the interp), and **all 5
   of this session's "fixed" autos (5e53ca/45a95d/444d07/458a7c/5d89c0) fire 0×** — even
   0x5e53ca, which sits in the peep movement chain, never runs as JS while peeps run 767×.

**Corrected model.** Production (browser AND node) runs a HYBRID: the perf-campaign functions
(ADDENDA 1-13) are WIRED LIVE as JS via setEipHook/fnDispatch (they replaced interp execution);
EVERY OTHER function runs in the x86 INTERPRETER, which executes the real binary bytes. The
1250 `ported/auto/*.js` are the translation DELIVERABLE, validated against the interp, but a
function's auto is DEAD until it is wired live. So:
- **"Both core sim subsystems broken in production" (ADD.29/35) was a MISDIAGNOSIS.** Peeps run
  via the validated hand-port; vehicles run via the interp (the 72/72-"broken" 5dbeeb auto is
  never called). Neither throws; the 80-tick soak is clean.
- **This session's 5 auto-fixes (5e53ca/45a95d/444d07/458a7c/5d89c0) had NO current production
  effect** — they corrected DEAD autos. They are still valuable as the translation deliverable
  (correct JS, ready to wire live) and were validated vs the interp, but calling them "shipping
  fixes" was wrong.
- **The interpreter carry-flag fix (ADD.40, 0x80 byte-ALU CF) WAS a real production fix** — the
  interp IS the live path, and that bug corrupted live interp execution (e.g. 0x5d89c0's
  `add byte [esi+0xb5],0x14`, which runs in the interp in production).

**Re-prioritised levers (highest production value first):**
1. **INTERPRETER AUDIT** — the interp is the live path, so each interp bug is a real shipping
   bug. The 0x80 handler literally said "approximate; rarely used after"; audit harness/x86.js
   for other approximate/missing flag computations and opcode gaps (the prefix bugs in
   ADD.3/4 and this carry bug are the precedent). Bounded + gate-verifiable.
2. **WIRE + fix autos together** — to make an auto-fix matter, wire it live (setEipHook/
   fnDispatch) AND validate vs interp (lockstep). Fixing an auto without wiring is deliverable
   prep, not a production change. (This is also the perf path: each wired auto removes interp
   steps.)
3. The _lockstep-auto / _invoke-diff oracles remain correct + useful — they measure auto-vs-interp
   divergence, which is exactly what to fix BEFORE wiring an auto live. Just don't conflate a
   green oracle with a shipped fix.

---

## ADDENDUM 43 — interpreter audit: byte r/m ALU flags fixed (lever 1, real production fix)

Started the lever-1 interpreter audit (ADD.42). Grepped harness/x86.js for "approximate"/
hardcoded flags and found the byte r/m ALU handler (opcodes 0x00/0x02 ADD, 0x08/0x0a OR,
0x20/0x22 AND, 0x28/0x2a/0x38 SUB/CMP, 0x30 XOR, 0x84 TEST) set `CF = isSub ? (dst<src) : 0`
and **`OF = 0` always** — the SAME bug class as the 0x80 carry fix (ADD.40):
- ADD byte (0x00/0x02): CF hardcoded 0 (should be carry) → `add byte`+jc/jae/adc wrong.
- ADD/SUB/CMP byte: OF hardcoded 0 → **signed byte branches jl/jg/jle/jge on overflow wrong**
  (jl = SF≠OF; with OF≡0 it degrades to SF, mispredicting whenever signed overflow occurs —
  e.g. `cmp al,bl` with al=0x7f,bl=0x80). Byte cmp+signed-branch is common, so this is a
  meaningful live-path bug.
FIX: compute CF/OF correctly for ADD (isAdd flag) and SUB/CMP (isSub); clear both for the
logical ops. Validated with a flag unit test (/tmp/test_byteflags.mjs) — 8/8 cases incl. the
overflow cases (add 0x7f+1→OF1, cmp 0x7f,0x80→CF1/OF1, sub 0x80-1→OF1). Gates: title +
gameplay accuracy 0/307200, title_replay, playability/interactive/viewport_build_live 25/25.

Audit residue (noted, not yet fixed): (a) the 16/32-bit ALU paths (setAddFlags/setSubFlags,
lines ~255/609) already compute CF/OF correctly. (b) ADC/SBB (adcSbb + the 0x18 handler) set
CF but NOT OF — stale OF after adc/sbb; low value (multi-word arith rarely followed by a
signed-overflow branch), deferred. (c) JP/JNP (cond 0xa) always returns not-taken — PF isn't
tracked; bigger change, low game-code impact, deferred. **2 real interp/production fixes this
session: the 0x80 byte-ALU carry (ADD.40) and this byte r/m ALU CF/OF (ADD.43).**

---

## ADDENDUM 44 — interp flag audit CONCLUDED: NEG/ADC/SBB OF completed; arithmetic flags now systematically correct

Completed the systematic missing-flag pattern the audit kept surfacing (the interp author left
OF/CF "approximate" in several handlers). Added the missing OF to: NEG (0xf6/0xf7 /3 — OF=1 at
sign-min), ADC/SBB (adcSbb, both byte+32-bit), and the standalone 0x18 SBB-byte handler. Also
captured the input CF (cf0) in 0x18 before overwriting it. Unit-tested 7/7 (NEG 0x80→OF1, ADC
0x7f+CF1→OF1, SBB 0x80-CF1→OF1, etc.); gates all green (title+gameplay 0/307200,
title_replay, playability/interactive/viewport_build_live 25/25).

**Interp arithmetic-flag audit is now CONCLUDED.** State of harness/x86.js flag correctness:
- ALU byte (0x00-0x38 r/m, 0x80/0x82 imm): CF+OF correct (ADD.40/43).
- ALU 16/32-bit (0x01-0x39, 0x81/0x83, eax-imm): CF+OF already correct.
- INC/DEC 32-bit: correct (preserves CF, sets OF); INC/DEC 16-bit: still misses OF (RARE in
  32-bit code — left as known-minor).
- NEG, ADC/SBB: CF+OF correct (ADD.44).
- Shifts: 8-bit CF correct (HEAD); 16/32-bit CF correct.
- Known-by-design gaps (no production impact observed): PF untracked (JP/JNP always not-taken;
  SAHF/no-PF) and AF untracked (BCD ops DAA/DAS/AAA/AAS 0x27/2f/37/3f unhandled — never executed
  in the soak, so RCT doesn't use BCD). 16-bit INC/DEC OF. These are deferred unless a concrete
  divergence surfaces.

**Net: 3 interpreter correctness fixes this session (ADD.40/43/44), all on the LIVE production
path.** Further interp-correctness gains now need a different method than static grep: a
divergence-driven hunt (run careful @manual ports through _lockstep/_invoke-diff; any MATCH
confirms the interp on that path, any DIFF where the JS is right is a NEW interp bug — how
ADD.40 was found). Next-pass: either that divergence hunt, or pivot to lever-2 (wire a validated
auto live to make it a real production change + perf win).

---

## ADDENDUM 45 — divergence hunt CLEAN; interp fixes VERIFIED live+correct (dual-soak)

Ran the divergence hunt (re-swept the 18 reached auto+@manual fns through _lockstep-auto against
the FIXED interp). All clean (memMis=0) except **0x43c49e** (memMis=15/15). Attributed it: it is
memMis=15 with the PRE-FIX interp too (checked at commit 0be1b4e), so it's a PRE-EXISTING dead
divergence — 43c49e.js is a stale standalone `@manual` with NO JS importers; the live peep path
inlines that logic into extra_peepwalk_43c751 (+ interp sub-calls), which passes the gates and an
80-tick clean soak. Not my doing, not production-relevant (dead standalone; a cleanup nicety).
No NEW interp bugs found — the static audit + this hunt have exhausted the reachable interp-bug
surface for now. (The eaxMis/regMis on the other @manual fns — 45a95d/4238b4/458bcf/5e117d/444927
— are benign scratch with memMis=0.)

**Dual-soak VERIFICATION of the 3 interp fixes (ADD.40/43/44).** 30-tick whole-heap FNV:
pre-fix interp (0be1b4e) = `d8fad16c`, post-fix (HEAD) = `df4593ea` — they DIFFER. So the
corrected byte-ALU/NEG/ADC-SBB flags ARE exercised in live gameplay and change sim state over
time (the bugs manifest in later-tick peep/vehicle state, which is exactly why the tick-1 gates
never caught them). Since the flag formulas are unit-verified against x86 semantics (15 cases,
incl. all overflow cases) and the gates stay byte-exact on the captured frame, the change is
toward correctness. **This confirms the interp fixes are REAL production fixes** (contrast the 5
dead JS-auto fixes), validating the ADD.42 re-prioritization onto interp correctness.

**Levers now:** interp-correctness is largely worked out (static audit done + divergence hunt
clean + fixes verified). Remaining high-value work is lever-2 (wire a validated auto live →
production change + perf) and the large interp-consumer ports (0x424e0f/0x5da274/0x429560 per
ADD.6) — both bigger efforts. Minor cleanup: the stale standalone 43c49e.js (dead).

---

## ADDENDUM 46 — fresh interp-step ranking: perf is 60fps-met; no bounded port left (inflection)

Ran `tools/probe-painter-rank.js` (8 ticks). perTickMs ≈ 16 (node sandbox) → ~6-8 ms/tick on
the dev Mac (2-3×) = **60 fps budget MET** (90 fps would want more trimming). Current top interp
consumers (steps/tick):
- 0x4415e6 = 3791 (30326 steps/CALL, ~1 call/8t — a periodic heavy fn). Has C (~140L) + auto,
  but the auto is **BROKEN** (`_lockstep-auto` memMis on globals 0x6293xx + sprite fields), so
  it can't be wired without a substantial fix (likely goto-heavy like 5dbeeb).
- 0x444e08 = 2616 (wall-painter banner fallback — ADD.6 deferred: pulls in scrolling-text).
- 0x4368d8 / 0x431bc8 / 0x421d2c = 1-step hook crossings (overhead, not work).
- 0x439178 (1387) / 0x422a90 (782) / 0x4254e0 (604) / 0x5d7503 (978) — moderate, but these are
  MID-BLOCK addresses (no standalone decompiled/c/<addr>.c or ported/auto/<addr>.js), so they
  can't be cleanly hand-ported as standalone functions.

**INFLECTION POINT.** No bounded quick-win port remains: the top consumer needs a multi-session
fix, the mid-tier are mid-block, and 60 fps is already met (so perf porting is marginal until a
specific 90fps push). Combined with interp-correctness being worked out and the not-reached pool
blocked, the remaining work is all MULTI-SESSION (fix+wire 0x4415e6 / full peep|vehicle JS port /
translator secondary-register upgrade) or low-yield. This is the point to get user direction
rather than sink-cost into an unbounded port (per the don't-sink-cost feedback).

---

## ADDENDUM 47 — 0x4415e6 port, SLICE 1: scan-loop goto fixed; root divergence is the FUN_0044189c callee

User chose "fix + wire 0x4415e6". Slice 1: the auto had ONE `_gotoWarn` — the `goto LAB_004416e1`
(the pbVar8 ride-table SCAN loop) was emitted as an early-return, so the scan ran ONCE instead
of looping to match-or-terminator. Restructured LAB_004416e1/LAB_004416f0 into a `while(true)`
loop with a `go417aa` flag for the two exits (LAB_004417aa local_8=-1 vs LAB_004417af). Correct
by construction (faithful transcription of the C goto graph); parses; dead/unwired so no
production risk.

**BUT memMis is still 1** — the remaining divergence is ROOTED IN THE CALLEE `FUN_0044189c`
(the deferred "complex recursive, multiple bugs" fn, ADD.33, itself BROKEN per ADD.38). The
diverging bytes are written around its call: `0x6293c1`/`0x6293c4` (set right before/after the
`FUN_0044189c()` call in the inner bit-scan loop) and the sprite cache `[esi+0xcc/0xce]` (which
depend on `local_8`, chosen by comparing `local_c`/`DAT_006293c1` AFTER each `FUN_0044189c`
call). So 0x4415e6 cannot reach memMis=0 until 0x44189c is fixed. SLICE 1 committed honestly as
a partial (scan loop correct, function still red pending the callee — NOT claimed green).

**Dependency tree:** 0x4415e6 → 0x44189c (complex recursive, broken) → (its own callees). NEXT
SLICE: fix 0x44189c to ITS OWN memMis=0 (independently validatable: `_lockstep-auto ADDR=0x44189c`,
reached, calls=1), then re-validate 0x4415e6 (should drop toward 0), then wire 0x4415e6.
