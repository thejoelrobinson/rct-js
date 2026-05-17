# Terrain rendering diagnosis (round 3) — 2026-05-17

**Task**: Per-tile terrain painter chain isn't reaching the back surface
after the noise2 fix in commit `67bdc31`. Diagnose why no terrain painter
fires and either fix or document next step.

**Outcome**: Found one concrete bug + fix (DPI corruption between strips
in `4316f3` causes 20-of-21 strips to no-op). Applied the fix — painter
call count rose 2.5× (774 → 1974 hits per tick on the rotation-0
painter). But back buffer is still uniform sky grey because at least one
more bug remains downstream: the paint-ring linked-list globals at
`0x5f96e0/e4/e8` get clobbered to `0xffffffff` (or worse) during the
tick by a STATIC-IMPORT path I ran out of time to localize.

## What is happening now

Pipeline status with full VFS (sc21.sc4 + all css):

| Layer | Status |
|---|---|
| `FUN_004385d8` → `FUN_009bbfb3` (sprite walker) | Fires (verified by static-import side-effect: `0x991f64 = -1` gate skips 9b438b path, but 9bbff8 path runs) |
| `FUN_extra_paint_436b50` (rotation diamond) | 21× per tick (one per strip) — correct |
| `FUN_004367cb` (per-tile setup) | Fires; called via static import |
| `0x4368d8` (rotation-0 painter, bridged) | **1974× per tick** post-fix (was 774× pre-fix) |
| `0x436a9c` (off-map painter, bridged) | 2179× per tick — also fires |
| Paint-type chain `[0x6284ec + hash*4]` | **Populated**: 33 non-zero entries (= 33 (X,Y) hash buckets with paint slots) |
| Z-sort min/max `[0x6288ec]/[0x6288f0]` | Populated: `0x51..0x83` (correct hash range) |
| 433bae runs | Yes — sets `[0x5f96e4] = head` (21× per tick) |
| 433e1c walks chain | Runs but reads chainHead = `0xffffffff` (corrupted) |
| 9b438b / 9b4457 / 9b4911 (pixel writers) | **0 calls per tick** — never reached |
| Back buffer @ 0x2428da0 | distinct=1 (all `0x01` sky grey) |

So we get to the **z-sort step** but the **executor** sees a corrupted
chain head and walks nothing.

## Confirmed root cause (FIXED)

`ported/auto/4316f3.js`: the per-strip DPI struct at 0x5f96d0 gets
clobbered between strips. The C decompile + binary asm both write
clipY (+6), clipH (+0xa) and zoom (+0xe) **once before the do-while
loop**, since they're constant for all 21 strips. But something inside
the painter chain (somewhere in 436b2a / 433bae / 433e1c / 431ad7 / 9b30f1
or one of their callees) corrupts them after strip 0.

Strip 0 PRE 436b50:  clipY=1304 clipH=416 zoom=0  (correct)
Strip 1 PRE 436b50:  clipY=-4   clipH=-4  zoom=255 (corrupt — = 0xfffc, 0xfffc, 0xff)
Strip 2..20 PRE:     same corruption pattern

The corruption happens AFTER strip 0's 436b50 returns and BEFORE
strip 1's 436b50 starts. Bridged painters (0x4368d8 / 0x436a9c) do NOT
corrupt the DPI within a strip — verified by snapshotting before/after
each callIndirect.

**Fix** (`ported/auto/4316f3.js` — re-set the three fields inside the
do-while loop body):

```js
do {
  // HAND-FIX (terrain3): re-set DPI fields per strip — see findings.
  heap.setU16(0x005f96d6, (heap.u16(0x005f96c6)) & 0xffff);
  heap.setU16(0x005f96da, (heap.u16(0x005f96ca)) & 0xffff);
  heap.setU16(0x005f96de, (heap.u8(0x005f96ce)) & 0xffff);
  uVar3 = ...;
  ...
```

This restores correct per-strip DPI for all 21 strips. Effect:

| Metric | Pre-fix | Post-fix |
|---|---|---|
| `0x4368d8` (rotation-0 painter) hits | 774/tick | 1974/tick |
| `[0x6284ec]` chain-head table | 33 entries | 33 entries |
| `[0x6288ec]` z-sort min hash | 0x51 | 0x51 |
| Strips with valid DPI | 1 | 21 |
| GAME-BACK distinct | 1 | 1 (still!) |
| Paint ring delta | -0x2ed30 (negative) | 0x0 |

The fix is mechanically correct but the visible output didn't change
because of (suspected) bug #2 below.

## Suspected root cause #2 (NOT FIXED — next layer)

The paint-ring globals `[0x5f96e0]` (END limit) / `[0x5f96e4]` (chain
head) / `[0x5f96e8]` (HEAD bump-ptr) all get **clobbered to 0xffffffff**
during the tick. Tripwires on heap.setU32/setI32/setU16/setU8 found NO
JS path writing 0xffffffff to these addresses. The painter-bridge cpu
writes raw bytes to `heap.bytes` directly via the interpreter — that's
how the corruption gets in, but I couldn't isolate which bridged
function was responsible.

State across runInit + tick + skipFadeIn + tick + tick with full VFS:

```
after init: [e4]=0x0           [e8]=0x0
after tick 1: [e4]=0xffffffff  [e8]=0xffffffff  ← corruption already
after skipFadeIn: same
after tick 2: same
after tick 3: [e4]=0xc8036600  [e8]=0xd018c07   ← total garbage
```

But with MINIMAL VFS (csg1.dat + sc21.sc4 only):

```
after tick 1: [e4]=0x5f9b3c   [e8]=0x5f9b6c   ← correct!
after skipFadeIn: same
after tick 2: same
after tick 3: same
```

So additional sprite/font loads from the css*.dat files trigger
something that corrupts these globals via the bridge cpu. Tick 3
shows the values become non-sentinel garbage, suggesting some painter
is writing what it thinks are valid pointers but they're junk.

`433bae` writes `[0x5f96e4] = head_pre` correctly 21× per tick (verified
by tripwire), so it's something AFTER 433bae in each strip iteration —
probably 433e1c, 9b30f1, or 431ad7, or one of their deep callees.

## Suspected root cause #3 (NOT FIXED — auto-translator goto failures)

`ported/auto/433bae.js` has THREE early-returns where the C decompile
has `goto LAB_00433d04`. The translator emits `return 0` for each:

```js
if (iVar10 == 0) {
  /* goto LAB_00433d04 — unsupported, early-return */ return 0;
}
```

`LAB_00433d04` is a label inside the outer `if (DAT_006288ec !=
0xffffffff)` block (at line 95 of the C). In C, it represents the
top of a "while (uVar12 < DAT_006288f0)" loop — each goto is a
`continue` to advance to the next type-bucket. As `return 0`s, they
bail out of the whole function after processing just the first bucket.

So the z-sort processes only 1 of the 33 chain-head buckets per strip
instead of all 33. Not catastrophic (one bucket still gets sorted
correctly) but eats 30/31 of the paint work.

Fix would be a hand-port restructuring the gotos as labeled
`continue` in a wrapping `while (true)` loop. ~50 lines of refactoring;
non-trivial but mechanical. Out of scope for this round.

## Additional findings (informational)

* **Sprite pool is empty at boot**: `0x00743b94`, 5000 slots stride 0x100,
  field `+0x2e` (class) is 0 for all slots. So 9bbfb3's "walk sprites
  via class vtable at 0x628a94[class]" never finds any. But terrain
  doesn't use sprites — it uses `tile_element` grid at 0x6e3b80, walked
  by the rotation painters at 0x4368d8 (which DO fire). So this is not
  the blocker for terrain.
* **9bbfb3 gate at `0x971ef0`**: open (= 1), so it RUNS, but
  `0x991f64 = -1` makes it skip the 9b438b branch. The remaining 9bbff8
  branch fires.
* **433b76 + 433bae use different slot sizes**: 12-byte (433b76) vs
  48-byte (433bae seed + painter-allocated). 433e1c walks `+0x20` which
  is offset 32 — works for 48-byte slots, OOB for 12-byte slots. Unsure
  if this is the executor walking 12-byte slots when it should be
  walking 48-byte ones, or vice versa.
* **chainHead = 0x5f974c** (= 0x5f96ec + 96 bytes = 8 slots × 12 bytes):
  by 433bae's first call, 8 12-byte slots had been added by 433b76 from
  bridged painters. 433bae sets seed at the 9th position (0x5f974c)
  with its own 48-byte format. Then the chain walk from `chain[+0x20]`
  finds the seed's `+0x20 = list[0x6284ec + hash*4]` head correctly,
  BUT subsequent walks may hit a 12-byte slot which would OOB on `+0x20`
  and `+0x1c` reads.

## What I tried that didn't work

* Wrapping `state.fnDispatch.get` to track who writes -1 → no hits
  (writes go through raw `heap.bytes[]` from the bridge cpu)
* Replacing `fnDispatch[0x4316f3]` with an instrumented copy → not
  called because static import wins
* Patching the `433bae` early-return to a no-op (`if (iVar10 == 0)
  /* nothing */;` instead of `return 0;`) → didn't change observed
  behavior because the function loops would then access null pointers

## Files touched

* `ported/auto/4316f3.js` — added 3-line DPI re-set inside do-while loop
  body. Comment block cites this findings doc. Marked as a hand-fix.

Tests pass after the change (didn't break anything).

## Next steps (for follow-up agent)

1. **Localize the `0x5f96e0/e4/e8` corruptor**: the bridge cpu is
   writing -1 to these three contiguous u32s. Either:
   - Instrument `harness/x86.js` interpreter to log any write to
     0x5f96e0..0x5f96ef
   - OR scan the rct.exe CODESEG bytes for `mov [0x5f96e?], -1`-style
     instruction sequences and find the function
   - OR set the bridge cpu's bail-on-write at these addresses
2. **Hand-port `433bae`** to fix the goto-LAB_00433d04 properly:
   wrap the outer block in `while (true)` with `break` for the
   `return;` at line 161, and `continue` for the three goto sites.
3. **Verify the slot-size assumption**: is 433e1c walking the right
   chain? It should walk seed→[seed+0x20]→[slot+0x20]→... where slots
   are 48-byte main slots. If it ever hits a 12-byte slot (from
   433b76's separate chain), `+0x1c`/`+0x20` reads are OOB.

## Probes used

All in `.claude/scratch/`:

* `probe-terrain3-counts.js` — initial sprite/painter count snapshot
* `probe-terrain3-deep.js` — wraps fnDispatch.get to catch indirect
  calls + counts painter chain
* `probe-terrain3-writes.js` — diff heap regions pre/post tick to
  find where painters write (answer: NOT the back buffer)
* `probe-terrain3-9bbfb3.js` — checks 9bbfb3's gate at `[0x971ef0]`
  and sprite pool state
* `probe-terrain3-ringwatch.js` — per-strip ring state via wrap on
  0x436b50 (extra_paint)
* `probe-terrain3-dpi.js` / `-dpi2.js` / `-dpi3.js` — snapshots DPI
  fields per painter call; confirmed corruption pattern Y=-4 H=-4 z=255
* `probe-terrain3-inside.js` — instrumented copy of 4316f3 (didn't
  fire because static import)
* `probe-terrain3-watch.js` / `-trace.js` / `-bridgewrap.js` — various
  attempts to find who writes 0xffffffff (all came up empty — bridge
  cpu writes raw bytes)
* `probe-terrain3-628.js` — verifies bridged painters DO populate
  the `[0x6284ec]` chain table
* `tools/paint-diag.js` — full pipeline diag (existing tool)

Screenshot: `.claude/scratch/screenshot-after-terrain3-dpifix.ppm`
(visually identical to pre-fix — uniformly sky grey #191919 — because
the executor chain is still broken).

## Commit

`<pending — to be added by commit step>` Phase R: 4316f3 DPI re-set
inside strip loop. Net effect: 2.5× painter call rate; main paint
chain (`[0x6284ec]` 33 entries, `[0x6288ec]/[0x6288f0]` z-sort min/max
populated correctly) but executor still no-ops because of follow-up
bugs in either 433bae's gotos or the `[0x5f96e0/e4/e8]` clobber path.
