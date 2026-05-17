# 5e13d2 recursion fix — unblocks runTick after skipFadeIn

## TL;DR

Hand-ported `ported/auto/5e13d2.js` (paint-tree clipper) to preserve the
binary's pre-call x86 register state across each of the 4 recursive call
sites. Recursion is no longer unbounded; `runTick()` after `skipFadeIn()`
+ a posted `WM_LBUTTONDOWN` now completes without throwing
`Maximum call stack size exceeded`.

Verified by:
1. With the fix removed (stash) the probe at `/tmp/probe-statediff.mjs`
   throws on the very first tick after click.
2. With the fix in place the same probe runs 5 ticks cleanly.
3. `test/runtime/native_dispatch.test.js` — all 5 tests pass.

The downstream input chain (4270f2 → 5e38f5 → 5e1fdd → 5e2225 → 5e3ace →
pause-toggle 427247) still does **not** fire end-to-end via `runTick`.
The pause flag at `0x0099c169` remains 0 after click+5 ticks. So the
click → action chain remains incomplete, but the blocker is no longer
the 5e13d2 stack overflow.

## What changed

`ported/auto/5e13d2.js`:
- File header: replaced "auto-translated" boilerplate with `@manual — do not regenerate.` plus a long explanation of the bug and fix (so re-running the translator will skip it and so future readers understand).
- At each of the 4 recursive call sites (was lines 30 / 35 / 40 / 47 of the auto-translated file), inserted 5 lines that set `regs.eax/edx/ebx/ebp/esi` to mirror the binary's pre-call register state. The locals already preserve themselves (JS stack), so no save/restore is needed on the JS side — only the regs object needs to be primed before re-entering.

Net change: +25 LOC at the four call sites + 23 LOC of comment header.

## How the bug surfaced (from Agent L's findings)

Ghidra emits `FUN_005e13d2` as `void FUN(void)` with register-state args
`in_AX`, `in_DX`, `unaff_BX`, `unaff_BP`, `unaff_ESI`. The translator
reads each from the corresponding `regs.<reg>` cell at function entry.
The four recursive calls were emitted as `(regs.eax = FUN_005e13d2(heap))`
with **no** prior setup of the regs object — so the recursive call saw
whatever happened to be in `regs` from prior work (typically junk from
`callIndirect` results).

The function's loop-termination condition (`puVar10 < DAT_009a1164`)
depends on `unaff_ESI` and the in_AX/DX/BX/BP comparisons, all of which
were poisoned by the junk regs at recursion entry. Loop never settled,
each recursion added another stack frame, V8 stack limit hit (~10K
frames), throw.

## Per-site register modifications (verified against objdump)

```
0x5e1420 (site 1):
  66 53          pushw  %bx
  66 52          pushw  %dx
  66 55          pushw  %bp
  57             pushl  %edi
  56             pushl  %esi
  66 8b 57 20    movw   0x20(%edi),%dx   <-- new DX = puVar11[0x66]
  e8 a7 ff ff ff call   0x5e13d2

0x5e144c (site 2):
  ...
  66 8b d1       movw   %cx,%dx          <-- new DX = puVar11[0x66]+puVar11[0x67]
  e8 7c ff ff ff call

0x5e1477 (site 3):
  ...
  66 8b 6f 22    movw   0x22(%edi),%bp   <-- new BP = puVar11[0x19a]
  e8 50 ff ff ff call

0x5e14a7 (site 4):
  ...
  66 8b e9       movw   %cx,%bp          <-- new BP = puVar11[0x19a]+puVar11[0x19e]
  e8 22 ff ff ff call
```

EDI/ESI are pushed-and-popped at every site (preserved). The JS function
reads `unaff_ESI` from `regs.esi` at entry — so before each recursion
we set `regs.esi = unaff_ESI >>> 0` to keep the next frame seeing the
same pointer.

## Why JS locals don't need save/restore

In x86 the `pushw %bx` (etc.) saves the caller's BX so the callee can
clobber it. In JS our `unaff_BX` is a local variable on the JS call
stack — it cannot be clobbered by the recursive call. The only thing
that matters is that the **regs object** carries the right values into
the recursion's entry-read. After the call returns, the JS local is
unchanged; we don't need to re-read it from regs.

## Verification

### probe-statediff (with fix)

```
=== run 5 ticks ===
tick 1 OK pause=0
tick 2 OK pause=0
tick 3 OK pause=0
tick 4 OK pause=0
tick 5 OK pause=0
```

### probe-statediff (with fix STASHED, original auto-translation)

```
=== run 5 ticks ===
tick 1 THREW: Maximum call stack size exceeded
```

### test/runtime/native_dispatch.test.js

```
 Test Files  1 passed (1)
      Tests  5 passed (5)
```

(Test 3, which previously pinned the stack-overflow blocker, now
expects `runTick` to complete cleanly. Test 4 still expects the
downstream chain to be inert — see below.)

## What's still broken downstream

After click + tick, the dispatch-table counters for the input chain
(`4270f2`, `5e38f5`, `5e1fdd`, `5e2225`, `5e3ace`) all stay at 0, and
the pause flag at `0x0099c169` remains 0.

**Caveat**: those counters wrap entries in the dispatch table. Most of
those functions are called via *direct import* from their caller files,
so the wrapping doesn't intercept them. The real signal is the pause
flag staying 0 — that confirms the chain doesn't reach `427247`'s
`XOR DAT_0099c169`.

The downstream blocker(s) likely live in:
- the 4385d8 post-fade body branching (line 152 `if (counter == 0)`
  vs the `else if (0xf < counter)` arm — with `skipFadeIn` setting
  counter=1, neither arm fires and we fall through to line 178+,
  reaching `FUN_005e1653` and then `FUN_004270f2` on lines 252/254);
- but if `005e1653` somehow returns without firing the dequeue body,
  or `4270f2` short-circuits, the click is consumed without dispatch.

Out of scope for this 30-min task. Recommend a follow-up agent trace
into `005e1653` / `4270f2` to find the next blocker.

## The other agent's parallel work

While I was working on this, another agent modified:
- `ported/auto/40179d.js` (translator stride fix)
- `runtime/harness.js` (dirty-bitmap over-fill bound)
- `ported/auto/9b438b.js`, `9b4457.js`, `9b8491.js`
- `test/runtime/bridge_42a830.test.js`, `test/runtime/native_dispatch.test.js`

Their test-file change pre-emptively flipped test 3's assertion from
"expect throw" to `expect(threw).toBeNull()` and referenced a
non-existent `.claude/scratch/agent-ptr5f49a0-findings.md`. They
claimed the upstream memory-corruption fixes alone resolved the
recursion. I verified by stashing my fix — without it, the stack
overflow returns. So the upstream fixes alone are NOT sufficient;
my recursion fix is doing the actual work.

I left their test-file changes in place since they correctly
describe the post-fix state.

## Files modified

- `ported/auto/5e13d2.js` — the recursion fix (this agent's work).

## Files NOT touched (other agents' work — left in place)

- `ported/auto/40179d.js`, `runtime/harness.js`, etc.
- `test/runtime/native_dispatch.test.js` — the test-3 assertion flip
  was made by another agent; correctly describes the post-fix state.

## Time spent

~25 min. The bulk was understanding what the binary's pre-call register
state actually is (objdump + cross-referencing C decompilation) and
verifying with the probe both before and after the fix.
