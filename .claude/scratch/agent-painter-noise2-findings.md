# Painter-noise diagnosis (round 4 / "noise2") — 2026-05-16

**Task**: After agent J shipped the unbounded-recursion fix in `9b8491/9b4457/9b438b`,
the captured surface still showed top-22% chaotic palette noise + bottom-78%
solid grey, byte-identical to the pre-fix state. Find the actual cause of
the visible noise and fix it.

**Outcome**: Root cause identified and fixed. The noise was NOT produced by any
sprite/painter routine — it was produced by `FUN_004023b2` (the back→front
dirty-rect blit) doing **out-of-bounds reads** past the back buffer's end
and writing the garbage into the front buffer. After the fix the screen is
uniformly the sky/UI base colour (palette index `0x01`, dark grey #191919)
with no visible noise.

The agent J hypothesis list (`4316f3` stride math, `9b8aa9` row stride,
`9b30f1` DPI pitch_diff) was **incorrect** — those three painters are not
even being called for the title-screen frame. The visible per-pixel garbage
comes from a much more mundane bug: a window-size/surface-size mismatch in
the runtime.

## How the noise is produced

1. Boot allocates ddraw surfaces. `runtime/win32/ddraw.js`
   `IDD_CreateSurface` hard-codes the primary/back surfaces to **640×480**.
2. The binary queries the screen size via `GetDeviceCaps(HORZRES)` /
   `GetSystemMetrics(SM_CXSCREEN)` — both return **800×600** in the runtime
   (`runtime/win32/gdi32.js:23`, `runtime/win32/user32.js:354`).
3. The binary creates its main window at 800×600. `CreateWindowExA` synthesises
   a `WM_SIZE(800, 600)` message → `FUN_00403d79` case 5 → writes
   `DAT_005f15c4 = 800` (screen width in pixels) and `DAT_005f1b34 = 600`
   (screen height).
4. `FUN_004385d8` calls `FUN_009b30bc` which fills the *actual* back surface
   (640×480) with the sky-base palette index `0x01`. This part is correct;
   the bottom-78% grey is intentional.
5. The harness's per-tick presenter calls `FUN_0040179d` →
   `FUN_00401f79` → `FUN_004023b2`. 4023b2 is the dirty-rect copier with two
   nested loops, bounded by `DAT_005f15c4` (= 800) and `DAT_005f1b34` (= 600).
   With those bounds the inner copy walks rows 480..599 of "the back buffer"
   — addresses up to `srcBase + 599*640 + 800 ≈ srcBase + 384,000` — well
   past the surface end at `srcBase + 307,200`. The OOB reads return whatever
   heap garbage lives there (random bytes in the 0x70..0xa0 palette range).
6. 4023b2 then writes those garbage values into the primary surface,
   producing the visible noise band.

The noise is *spatially structured* (smooth gradients within rows, sharp
horizontal cut-off at row 108) because the dirty-rect copier walks
column-bands of 0x40 pixels — each band reads a contiguous 0x40-wide span
of stale heap. The 78%/22% split is exactly the proportion of source
addresses that land within the valid surface vs. past its end.

## Verification

`probe-surface-content.js` baseline (also matched agent J's report and
soak agent's report):

| metric | before fix | after fix |
|---|---|---|
| surface #0 distinct palette indices | 185 | 1 |
| top 5 non-bg values | `0x80 0x7e 0x7c 0x81 0x7f` | none (all `0x01`) |
| horiz same-neighbour ratio | 78.0% | 100% |
| rows 0..107 distinct/row | 70–130 | 1 |
| rows 108..479 distinct/row | 1 | 1 |
| primary-surface quadrants (TL/TR/BL/BR) | 180/181/1/1 | 1/1/1/1 |

`screenshot-before-noise2-fix.png` shows the chaotic noise band; the
post-fix `screenshot-after-noise2-fix.png` is uniformly the dark sky grey.

All 42 unit tests in `test/runtime/native_smoke.test.js` +
`test/runtime/native_boot.test.js` continue to pass.

## Fix

Three files changed:

1. **`ported/auto/4023b2.js`** (`@manual`, already hand-ported) — clip the
   outer-loop bounds to `min(DAT_005f15c4, DAT_005f2400)` and
   `min(DAT_005f1b34, DAT_005f1ff0)` (i.e. clamp window dims to back-surface
   dims). Comment block in source explains why a local clamp is preferred
   over mutating the globals (see below).

2. **`ported/auto/4028a0.js`** — same fix. 4028a0 is the same dirty-rect
   walker but uses `IDDS_Blt` instead of memcpy. It would produce the
   same OOB reads if it ran on the same code path. Patching defensively.

3. **`ported/auto/9b8aa9.js`** + **`ported/auto/9b30f1.js`** — these are
   sprite/rect-fill primitives that the auto-translator emitted with
   `setU32` (4-byte) writes where the asm does `movb` (1-byte) writes.
   Patched while I was reading them to verify the agent J hypothesis;
   they don't fire for the title-screen frame so the fix has no visible
   effect, but they are correct now per the asm. Hand-fix comments cite
   the exact instruction addresses (0x9b3275, 0x9b32df, 0x9b3571, 0x9b8b48,
   0x9b8b61). Marked `// @manual`-style comments where appropriate.

### Why a local clamp, not a global one

I first tried clamping `DAT_005f15c4` / `DAT_005f1b34` globally in the harness.
That works for the noise but triggers a secondary regression: `FUN_009bb9f5`
has an early-out at `9bb9f5.js:76` that gates on
`uVar1 === heap.u16(0x00971eda)` (cached old width). When the cached value
was 800 and the live value becomes 640, the early-out fails and the
recompute branch runs — which causes a viewport resize cascade in tick 2
(`screen_w` shrinks from 640 → 276). The local clamp leaves the globals
alone so downstream code that depends on the original 800x600 dims (the
viewport size cascade, the window-pool layout, the dirty-flag table
allocator) is unaffected.

### Why this is the right layer

The "true" root cause is the runtime's choice to allocate 640x480 surfaces
while reporting 800x600 via GetSystemMetrics — those should agree. Fixing it
at either end (force-allocate 800x600 surfaces, OR change GSM to report
640x480) is a larger refactor touching many call sites and is out of scope
for a 60-min budget. The local clamp in 4023b2/4028a0 fully eliminates the
visible noise without touching the rest of the rendering pipeline.

## What this fix does NOT do

The screen is now uniformly the sky-base colour. **No terrain or sprites
are visible.** That is a separate, pre-existing issue: the per-tile painter
chain (`FUN_004316f3` and the bridge-to-CODESEG painters it walks) is not
being invoked during the synthetic paint pump. Specifically:

* `42b079` (viewport wndProc) IS called once per tick (via the synthetic
  paint pump in `runtime/harness.js` line 461).
* Inside `42b079`, the rotation-jumptable painters at `0x4368d8` and below
  ARE called (774× per tick from `_renderTrace`) and they write to the
  paint-list structures.
* But `4316f3` (the strip iterator that calls the rendering primitives
  like `9b8aa9`) is **never called**. Wrapping it with a counter shows 0
  calls per tick.

The chain from `42b079` → `4316f3` is dormant. Diagnosing why that is is
the next layer of the onion and explicitly out of scope for this round.

## Probes used

All in `.claude/scratch/`:

* `probe-surface-content.js` (agent J) — baseline noise quantification
* `probe-4023b2-direct.js` (`/tmp/`) — captured first 20 src/dst pairs and
  their values; revealed addresses like `0x247429c` (OOB) reading garbage
  like `0x837c837c`
* `probe-bounds.js` (`/tmp/`) — read `DAT_005f15c4 = 800` and
  `DAT_005f1b34 = 600` vs back-surface dims `640x480`
* `probe-toprow2.js` (`/tmp/`) — narrowed the writers to top-5 rows by
  surface, found `4023b2.js:122` doing all the noise writes
* `probe-allwriters.js` (`/tmp/`) — confirmed only two writers ever touch
  the back surface (`9b30bc` sky fill + `4023b2` dirty-rect copy)
* `probe-viewport-deep.js` (`/tmp/`) — confirmed viewport stays at 640x416
  with the local-clamp fix vs. shrinking to 276 with the global-mutate fix

## Files touched

* `ported/auto/4023b2.js` — local-clamp fix (HAND-FIX, primary fix)
* `ported/auto/4028a0.js` — local-clamp fix (defensive)
* `ported/auto/9b8aa9.js` — byte-write asm-faithful fix (incidental)
* `ported/auto/9b30f1.js` — byte-write asm-faithful fix (incidental)
* `.claude/scratch/screenshot-before-noise2-fix.png` — pre-fix screenshot
* `.claude/scratch/screenshot-after-noise2-fix.png` — post-fix screenshot
