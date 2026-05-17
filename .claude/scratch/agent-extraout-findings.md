# Agent Findings — `extraout_X` translator-bug sweep (Phase O)

Date: 2026-05-16
Time budget: ~45 min
Commits: `f77b373`, `6adf0f4`, `99110ad`, (+ final batch in this session)

## Scope

95 files in `ported/auto/*.js` contained `extraout_CX`, `extraout_ECX`,
`extraout_DX`, or `extraout_EDX` — all uninitialised `let extraout_X = 0`
sentinels emitted by the c-to-js translator. Prior fixes
(`9786caa`, `06e5018`) had addressed 5e38f5/5e1fdd (event-type code)
and 42f6a8 + 3 callers (LOOP count). This sweep covered an additional
15 sites.

## Files fixed (15 total)

### Batch 1 (commit f77b373) — input/window functions

| File | extraout_X represents | Fix |
|---|---|---|
| `5e3ace.js` | caller's incoming ECX (`push ecx`/`pop ecx` in FUN_005e3874) | `extraout_ECX = in_ECX` |
| `5e5b80.js` | masked input CX (callee is pushal/popal) | `extraout_CX = uVar1` |
| `5e5ca6.js` | live ECX in bit-scan loop (= Ghidra-renamed in_EAX) | `extraout_ECX = in_EAX` |
| `5e680e.js` | caller's incoming DX (callee pushal/popal) | `extraout_DX = in_DX` |
| `5e3f31.js` | caller's incoming ECX in window-create loop | `extraout_ECX = in_ECX` |
| `5e40c4.js` | widget-handler's reported (x,y) in CX,DX | read `regs.ecx`/`regs.edx` after callIndirect |
| `5e412c.js` | same widget-handler pattern as 5e40c4 | read `regs.ecx`/`regs.edx` after callIndirect |

### Batch 2 (commit 6adf0f4) — painter / tile-pick

| File | extraout_X represents | Fix |
|---|---|---|
| `5e6bcd.js` | window-slide CX (rightEdge), then post-adjust delta | compute inline before/after each pushal-bracketed call |
| `43657e.js` | x86 LOOP count (ECX = 0x3e8) | rewrite as bounded `for` |
| `4363f1.js` | 2D rect-scan inner CX cursor | rewrite as explicit 2D `for` with regs.ecx plumbed |
| `43670c.js` | caller's incoming CX (push/pop around whole function) | `extraout_CX = regs.ecx & 0xffff` at entry |
| `4359d5.js` | EDX = tile-element pointer from FUN_00431510 | initial fix: `heap.u32(0x628918)` |
| `43424f.js` | CX = world-y from FUN_00431510 | initial fix: `heap.u16(0x628916)` |

### Batch 3 (commit 99110ad) — 431510 upstream + 2 more

| File | extraout_X represents | Fix |
|---|---|---|
| `431510.js` | n/a (the *callee*) | Hand-port: epilogue now publishes CX (`regs.ecx`) and EDX (`regs.edx`) before return. Cascades to all callers. |
| `4359d5.js` | (re-fixed) | now reads `regs.edx` (cleaner) |
| `43424f.js` | (re-fixed) | now reads `regs.ecx` (cleaner) |
| `4415e6.js` | caller's incoming ECX (FUN_005df40c only push/pops EBX) | `extraout_ECX = in_ECX` |
| `448c64.js` | caller's incoming ECX (FUN_00448d15 doesn't touch ECX) | `extraout_ECX = regs.ecx >>> 0` |

### Batch 4 (this session, after the 3 commits above)

| File | extraout_X represents | Fix |
|---|---|---|
| `450124.js` | caller's incoming DL (FUN_00450b21 only push/pops EBX,ESI) | `extraout_EDX = in_EDX` |
| `455ade.js` | EDX (packed ride-id) and ECX (rotation byte) pre-call values | `extraout_ECX = iVar3; extraout_EDX = uVar4` |

## Pattern summary

Four distinct underlying causes were observed:

1. **Caller's incoming reg, preserved across a push/pop-bracketed call.**
   Most common case. Ghidra correctly modeled it as "extraout_X = call
   restored what was in X", but the translator dropped the assignment.
   Fix: source from `in_X` or `regs.X` captured at entry.

2. **LOOP/REP instruction count in ECX.**
   x86 emits `mov ecx, N; .. ; loop label` where Ghidra renders this as
   `do { } while (extraout_ECX != 1)`. Fix: bounded `for` loop with the
   literal count from the disassembly.

3. **Widget handler returns coords via CX/DX.**
   The binary's `call [esi+4]` widget proc reports its laid-out (x,y) in
   CX,DX. Since the JS dispatch goes through `callIndirect`, the callee
   can set `regs.ecx`/`regs.edx` and the caller can read them — both
   sides of the contract were already implemented; just needed to wire
   the read.

4. **Callee return-channel via memory globals.**
   FUN_00431510 (tile-pick) returns its multi-value result via globals
   at 0x628914..0x628918 and reloads AX/CX/EDX from them at the
   epilogue. Fixing once at the callee made every caller's
   extraout_CX/extraout_EDX usable via `regs`.

## Skipped (with reason)

| File | Why skipped |
|---|---|
| `5e6906.js` | Widget callback; extraout_DX/ECX flow into 0x9a0124/0x9a0118 with no clear caller convention. Needs runtime trace. |
| `5e3c3c.js` | 234-line function with 11 extraout_X variants — too risky for time budget. |
| `42de29.js`, `458622.js`, `45163c.js` (presumed similar), and **all** files reading from `FUN_00458a7c` (string-width) | Upstream `458a7c.js` lost the entire CX-accumulator in translation — Ghidra's C dropped the `add cl, [.99a508 + ebx + eax]` width fold. Needs a hand-port of 458a7c itself (out of scope here). |
| `4202b2.js`, `4340f5.js` (and any files reading `extraout_DX` after `FUN_00423677`) | 423677 returns through DX, but its callIndirect dispatch table targets at 0x4236e0 (~20 leaf handlers) each update DX — too many to validate that each leaf actually sets `regs.edx` in JS. Would need a per-leaf audit. |
| Most 5d* painter files | Many of them depend on FUN_005e3b2b or FUN_005cfac7 — both modify ECX in non-trivial ways. Skipped to avoid speculative fixes. |

## Remaining work (~80 files still affected)

Highest-impact remaining target:

- **`458a7c.js` hand-port** (string-width measurement). Ghidra dropped
  the CX accumulator. Fixing this unblocks `42de29`, `458622`,
  `5e3652`, and likely a dozen more text-rendering paths.
- **`423677.js` dispatch leaves**. Audit each of ~20 leaf handlers at
  `0x4236e0[].js` to ensure they write `regs.edx` for the X-coord
  output. Unblocks `4202b2`, `4340f5`, and other terrain probes.
- **`5e3b2b.js` ECX-bit-7 clear semantic**. Many `5d*` painter files
  depend on this.

## Testing

After every fix, the fast vitest suite was re-run:

```
npx vitest run test/runtime/c23_state_apis.test.js test/runtime/winmm.test.js \
               test/runtime/dsound.test.js test/runtime/native_smoke.test.js \
               test/runtime/cursor_overlay.test.js
```

All passes throughout (count varies 108-128 due to per-worktree
duplication).
