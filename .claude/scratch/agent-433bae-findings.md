# Phase R+1: 433bae hand-port + bug B localization — 2026-05-17

## Task

Per Phase R findings (`agent-terrain3-findings.md`), terrain didn't render despite the DPI re-set fix in `4316f3`. Two suspected blockers:

* **Bug A**: 3 `goto LAB_00433d04` sites in `433bae.c` lowered as `return 0` by the auto-translator → z-sort processes 1 of 33 chain buckets.
* **Bug B**: Paint-ring globals `[0x5f96e0]/[0x5f96e4]/[0x5f96e8]` clobbered to `0xffffffff` mid-tick.

Fix bug A, then localize bug B.

## Bug A — FIXED

### Diagnosis

`ported/auto/433bae.js` had 3 sites lowered as early-return:

* Line 46 JS (line 40 C): `if (iVar10 == 0) goto LAB_00433d04;` — inside first processing pass.
* Line 98 JS (line 103 C): `if (iVar9 == 0) goto LAB_00433d04;` — inside LAB body, chain-empty bail.
* Line 142 JS (line 160 C): unconditional `goto LAB_00433d04;` at end of LAB body.

`LAB_00433d04` (line 95 C) is the loop continuation point:

```
LAB_00433d04:
  uVar5 = uVar12;
  uVar12 = uVar5 + 1;
  iVar9 = DAT_005f96e4;
  if (uVar12 < DAT_006288f0) {
    ...body...
    goto LAB_00433d04;   // re-enter
  }
```

### Hand-port

Restructured `ported/auto/433bae.js` (now `@manual — do not regenerate`):

* `FIRST_PASS: { ... break FIRST_PASS; ... }` for the first processing pass.
  Inner goto becomes `break FIRST_PASS;` which drops into the OUTER loop below.
* `OUTER: while (true) { ...gate check (return on fail)... ...body... continue OUTER; }`
  for the LAB_00433d04 loop. Inner gotos become `continue OUTER`. Fall-through at end of body is also `continue OUTER`.

Note: the function is `void` in C. The auto-translator's `return 0;` had a bogus return value; we changed those to `continue` / `return;` per the C semantics. The outer `if (DAT_006288ec != 0xffffffff)` block falls through to the function-end `return;` either way.

### Verification (paint-diag final tick, full VFS sc21.sc4 + all css)

* `FUN_00433bae` fires 21×/tick (unchanged — same outer-call rate).
* Paint-ring `[0x5f96e8]` head bumps cleanly through 21 sequential slot addresses
  (0x5f971c, 0x5f974c, 0x5f977c, ... 0x5f9c8c) — 21 distinct values × 21 strips = 441 advance operations.
* No `_gotoWarn` fires (no remaining `return 0` paths).

### Impact

Hand-port works mechanically but does NOT unblock pixel writes — terrain back-buffer still uniform `0x01` (sky-grey). The downstream blitter chain (9b438b → 9b8491 etc., all hand-ported) silently no-ops for reasons covered in bug B below.

## Bug B — LOCALIZED (not fixed)

### Watchpoint instrumentation (committed)

Added gated watchpoints to both write paths:

* `harness/x86.js`: `globalThis._x86Watch = { lo, hi, cb }` — fires on `write8/16/32/F32/F64` and inline 1-byte stores at lines 161, 173.
* `runtime/heap.js`: `globalThis._heapWatch = { lo, hi, cb }` — fires on `setU8/I8/U16/I16/U32/I32`.

Both are zero-cost when the global is undefined.

### Diagnosis sequence

1. **Snapshot via `_renderTrace` hooks per strip**:

   ```
   strip 0:  FUN_00433bae sets [e4] = 0x5f9efc, FUN_00433e1c reads OK
   strip 1+: [e4] = 0xffffffff BEFORE FUN_00431b6f runs
   ```

2. **Watchpoint sweep of `[0x5f96e0..ec]`** (full tick): **0 writes of value 0xffffffff** from either x86 OR heap path. All 1067 writes were sane (e.g. 21× `setU32(0x5f96e4, 0x5f9fbc)` from 433bae).

3. **Pinpoint within 4316f3 strip loop** (inline tripwires on each step):

   ```
   strip 0 top:   [e4] = 0x0           ← start (before 431b6f)
   strip 0 after 433bae: [e4] = 0x5f9efc (sane)
   strip 0 after 433e1c: [e4] = 0xffffffff  ← 433e1c flips it!
   strip 0 after 431ad7: [e4] = 0xffffffff
   ```

   **`FUN_00433e1c` corrupts `[0x5f96e4]` every call** (21× per tick).

4. **Within 433e1c**, the only writes to memory come from `FUN_009b438b` (sprite blit dispatcher). 433e1c itself only reads from the chain — it doesn't write any global.

### Root cause (not fixed)

The hand-ported sprite blit chain (`9b438b → 9b4457/9b4911/9b8491/9b6863/...`) is writing 0xff bytes into `[0x5f96e4..ec]` somewhere in its 256+ lines of pixel-blit code. The bytes aren't a single 32-bit write — they're a memset-like fill (all 12 bytes become 0xff per tick).

This is consistent with a wild pointer write or RLE-decode loop running past the end of its destination buffer. Candidates: 9b8491's RLE inner loops; 9b4660's transparent-pixel path; 9b6863's translucent path.

### Why the watchpoint missed it

The watchpoint covers ALL paths into the heap: x86 write{8,16,32,F32,F64}, x86 inline byte stores (ALU R8), heap.set{U,I}{8,16,32}. Yet 0 writes of value 0xffffffff. This means the writes ARE being made one at a time as bytes with various values (probably destination pixels that just happen to land here when a blitter computes a bad destination pointer). To find the exact site, the next agent should:

1. Set watchpoint on `[0x5f96e0..ec]` with a print of EVERY byte write (size=1) — should reveal 12+ writes per tick that smear 0xff into this region.
2. The inline ALU-R8 byte-write path at `harness/x86.js:173` is the most likely culprit (`mov [edi], al` style instructions). Look at the stack trace of the first write.

### Constraint

The fix is in `9b438b/9b4457/9b8491/9b6863/9b30f1` — ALL listed as `DO NOT TOUCH` in this task. So localization is the most this round can do.

## Files touched

* `ported/auto/433bae.js` — hand-port marked `@manual`, replacing 3 `return 0` with proper labeled-block `continue` / `break`. ~50 lines of restructuring.
* `harness/x86.js` — added gated `globalThis._x86Watch` hooks to `write8/16/32/F32/F64` and inline byte stores. Zero overhead when watchpoint is unset.
* `runtime/heap.js` — added gated `globalThis._heapWatch` hooks to `setU8/I8/U16/I16/U32/I32`. Same zero-cost-idle design.

## Tests run

`paint-diag` smoke: 21× per painter-chain function per tick (correct), no `_gotoWarn` triggers, ring-head advances 0x30 per slot correctly.

## Next steps (for follow-up agent)

1. **Per-byte watchpoint on `[0x5f96e0..ec]`** with stack traces for ALL writes (not just value-0xffffffff) — should isolate the wild-pointer write inside the 9b* hand-ports.
2. **Verify the slot offsets** the 9b* hand-ports compute when EBP is a 48-byte chain slot vs. a 12-byte one (see Phase R notes about slot-size confusion).
3. Once 9b* stops corrupting `[0x5f96e4]`, the executor (433e1c) should walk valid chain entries and start producing per-pixel writes.

## Probes used

* `.claude/scratch/probe-bug-b.mjs` — watchpoint snapshot per tick.
* `.claude/scratch/probe-byte-write.mjs` — histogram of ALL writes to [0x5f96e0..ec].
* `.claude/scratch/probe-deep-corruptor.mjs` — per-painter `_renderTrace` snapshots.
* `.claude/scratch/probe-when-corrupted.mjs` / `-2.mjs` — fnDispatch wrap to find owner.
* `.claude/scratch/probe-tick-trace.mjs` — combined x86+heap watchpoint trace.
* Inline tripwires in 4316f3.js (reverted after localization).

## Commit

`<pending — added at commit step>` Phase R+1: 433bae hand-port + watchpoint instrumentation.
