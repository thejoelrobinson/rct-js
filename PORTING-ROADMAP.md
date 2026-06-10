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
