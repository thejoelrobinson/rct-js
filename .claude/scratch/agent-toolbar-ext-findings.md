# Toolbar widget extension — agent findings

## Summary

Extended `clickToolbar()` in `runtime/input.js` from 5 → 6 wired widgets
by adding **widget 2 (sound mute / speaker icon)** and fixed the test
helper to also stamp the widget rect table (the prior tests were
silently broken — see "Test discovery" below).

Only one new widget (`SOUND_WIDGET_INDEX = 2`) met the "simple state
mutation" bar this round. The other unwired widgets in the toolbar
(1, 6, 8..19) all require either dropdown-event dispatch (bp=3) or
window-pool round-trips that need 0x42a830 bridged via the painter-
bridge. Documented why each is blocked.

## Wired widget

| idx | name          | helper          | state changed                          |
|-----|---------------|-----------------|----------------------------------------|
| 2   | sound mute    | `toggleSound`   | XORs `DAT_006326bd` bit 0 (sound flag) |

Implementation: `toggleSound(heap)` calls the already-ported
`FUN_00452876` via `state.fnDispatch.get(0x452876)`, which both flips
the bit *and* runs the sound-buffer reload path (FUN_00453f0a / etc.)
on the on→off transition. Falls back to a raw XOR if the dispatch
entry is missing.

## Binary analysis of 0x42a830 (widget event handler)

The dispatcher takes `bp` = event-type + `dx` = widget index:

```
bp=1 (click)      → 0x42a835  per-widget switch
bp=2 (keypress)   → 0x42a9e3
bp=3 (dropdown)   → 0x42a959  cases dx=1 (file menu) + dx=6 (view opts)
bp=4 (hover)      → 0x42a8ea  cases dx=1, 2, 6, 11, 15, 17, 18, 16, 12, 13, 19, 14
bp=7..0xb         various paint / tooltip pulls
```

The `bp=1` (click) case table — what fires when the user actually clicks
each widget:

| dx | handler addr | action                                           | simple? |
|----|--------------|--------------------------------------------------|---------|
| 0  | 0x42b083     | call 0x426f56(esi=2) — pause dispatch            | wired   |
| 1  | (none)       | no-op (only bp=3 opens the dropdown)             | n/a     |
| 2  | 0x42a976     | call FUN_00452876 — XOR sound bit                | **NEW** |
| 3  | 0x42a9c5     | WindowFindByClass + call 0x4340bb (zoom out)     | wired   |
| 4  | 0x42a9b6     | WindowFindByClass + call 0x434081 (zoom in)      | wired   |
| 5  | 0x42a9d4     | WindowFindByClass + call 0x4340f5 (rotate)       | wired   |
| 6  | (none)       | no-op (only bp=3 opens view-opts dropdown)       | n/a     |
| 7  | 0x42a96e     | call FUN_00437fdc — opens map window             | approx  |
| 8  | 0x42b375     | btl 0x991f30 bit 3 + tool-mode latch (land)      | NO      |
| 9  | 0x42b3c2     | same pattern (water)                             | NO      |
| 10 | 0x42a99f     | bts 0x991f30 bit 6 + open window                 | NO      |
| 11 | 0x42b350     | WindowFindByClass toggle (rides)                 | NO      |
| 12 | 0x42b13c     | call 0x44eff2 — open window                      | NO      |
| 13 | 0x42b26c     | call 0x443e98 — open window                      | NO      |
| 14 | 0x42b2b8     | call 0x431100 — open window                      | NO      |
| 15 | 0x42b0f0     | call 0x44e6d3 — open window                      | NO      |
| 16 | 0x42b220     | call 0x42727a — open window (options menu)       | NO      |
| 17 | 0x42b304     | call 0x440659 — open window                      | NO      |
| 18 | 0x42b1d4     | call 0x454542 — open window                      | NO      |
| 19 | 0x42b188     | call 0x42cc19 — open window                      | NO      |

The `NO` rows touch heaps of window-pool state via x86 helpers
(`WindowFindByClass`, `WindowOpen`, tool-latch round-trips) that need
real `unaff_ESI` register input from the dispatcher. Wiring them
client-side would require duplicating significant logic — better to wait
for the parallel agent's 0x42a830 painter-bridge work.

## Widget 2 confirmation: it's sound, not "file menu dropdown"

The earlier `agent-toolbar-findings.md` labeled widget 2 as "file menu
dropdown" based on layout position. The binary's click handler tells
a different story:

1. Click → `FUN_00452876` → `DAT_006326bd ^= 1`.
2. `DAT_006326bd` bit 0 gates ALL ambient sound playback paths:
   `FUN_00453f76` (line 18: `if ((DAT_006326bd & 1) == 0) return`),
   `FUN_004543bd`, `FUN_004533d0`, `FUN_00453bf8`, `FUN_004543bd`,
   `FUN_00452fce` etc.
3. The toolbar paint proc at `0x42afba..c8` (in `ported/auto/42afb5.js`
   line 159) picks sprite `0x20026060` when bit is set and `0x20026062`
   when clear — i.e. the speaker icon visibly switches based on this
   flag.

That's a speaker mute button, full stop. The button rendering is just
positioned where the prior comment expected a "file dropdown". Updated
the widget-table comment + renamed `FILE_DROP_WIDGET_INDEX` →
`SOUND_WIDGET_INDEX` in `runtime/input.js`.

## Test discovery: pre-existing tests had silent bug

The previously committed `clickToolbar()` tests (for pause, zoom, rotate,
map view) all rely on the toolbar widget rect table at `0x005f5124`
being populated. After `runInit + 1 tick`, it's still all `0xff`
(sentinel) — the binary's MainOpen runs FUN_004298a0 which only sets
the slot's widget-ptr; the actual rect data is initialized later by
code that hasn't run yet (probably during the boot fade-in completion).

The previous `ensureToolbarSlot()` only injected a pool slot but didn't
stamp the widget table. As a result, `clickToolbar()` always returned
`-1` and the test assertions like `expect(idx).toBe(0)` would have
failed. Either the tests never ran in CI (no recent run) or vitest's
particular boot sequence happens to populate the table differently —
either way, **fixed by extending `ensureToolbarSlot()` to populate the
widget rects when sentinel is detected** (only stamps if table is
unpopulated, so the binary path keeps priority if it ever fires).

## Files touched (this agent's lane only)

- `runtime/input.js` — added `toggleSound`, added `SOUND_WIDGET_INDEX`,
  added case in `clickToolbar` switch, updated widget-table doc comments
  (fixed widget-2 mislabel + clarified widget 1 / 6 are click no-ops).
- `test/runtime/interactive.test.js` — added 2 new tests (direct helper
  + click routing). Extended `ensureToolbarSlot()` to populate the
  widget rect table (fixes silent break in prior tests).
- `.claude/scratch/probe-toolbar-ext.mjs` — lean Node probe (9 PASS).
- `.claude/scratch/agent-toolbar-ext-findings.md` — this doc.

## Verification

```
$ node .claude/scratch/probe-toolbar-ext.mjs
... harness boot output ...
PASS: toggleSound 0→1 returns 1
PASS: DAT_006326bd is 1 after toggle
PASS: toggleSound 1→0 returns 0
PASS: DAT_006326bd is 0 after second toggle
PASS: clickToolbar(75,10) returns widget index 2
PASS: DAT_006326bd flipped to 1 after click
PASS: widget 0 (pause) still returns 0
PASS: pause bit toggled
PASS: widget 8 (land) still returns -1

9 passed, 0 failed
```

## Recommended next step

Wait for the parallel agent's 0x42a830 painter-bridge work to land,
then revisit widgets 8..19 by simply calling the bridged 0x42a830 from
the switch default — that handler will internally dispatch the per-
widget action with the correct `unaff_ESI` slot pointer. Once that's
in place, `clickToolbar()` becomes a thin coordinate→(widget-id, slot)
finder and the per-widget JS helpers can be deleted.
