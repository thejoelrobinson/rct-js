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
