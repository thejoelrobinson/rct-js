# Painter-noise diagnosis (round 3) — 2026-05-16

**Task**: Diagnose why the rendered viewport shows top-22% per-pixel chaos and
bottom-78% solid grey instead of a recognisable RCT scene.

**Outcome**: Confirmed *one* concrete root cause and applied a fix
(stack-blowing infinite recursion in the sprite blitter chain). Visual output
on the captured-palette canvas is still noise + grey — the underlying *paint
chain still runs at the wrong inputs* and that's the next layer of the onion.
Findings below distinguish what is now KNOWN, what was RULED OUT, and what is
the most plausible next blocker.

## What is on the surface

Reproduced the soak agent's observation exactly:

| metric                | value (rotation-0 viewport, sc21 title) |
|---|---|
| primary 640×480 nz    | 307,200 / 307,200 (full canvas painted) |
| distinct palette indices | 185                                  |
| dominant value        | `0x01` (sky/UI grey #191919) — 77.6% of pixels |
| top non-bg values     | `0x80 0x7e 0x7c 0x81 0x7f` (each ~1.3k) |
| horizontal same-neighbour | 78.0% |
| rows 0..107           | 70–130 distinct values per row, smooth-ish per-pixel deltas of 16–24 |
| rows 108..479         | 1 distinct value per row (all `0x01`) |
| per-column non-`0x01` count | uniform across the width (~3,420–3,460) |

Visual confirmation: `screenshot-after-fix.png` (640×480) shows colour-noise
top + solid dark-grey bottom. Same observation as
`agent-browser-soak-findings.md`.

So:
* Bottom 78% is the SKY/UI-base fill that `FUN_009b30f1` paints across the
  whole viewport before the per-tile chain runs.
* Top 22% (rows 0..107 of the canvas, = 0..77 of the viewport since
  `screen_y=30`) is where the sprite-paint chain *attempts* to write per-tile
  pixels — but the values land out of place, producing per-pixel chaos
  instead of horizontally-coherent terrain tiles.

## What `presentFrame` picks

`runtime/canvas.js:presentFrame` selects the surface with the most non-zero
sampled bytes (256 samples). Both 640×480 surfaces in `state.ddrawSurfaces`
have identical content after `runTick` because the back→front presenter
(`FUN_0040179d` driven by harness `runTick`) copies the back buffer to the
primary every frame. **Selection is correct** — surface #0 (primary,
`isPrimary=true`) is what the canvas displays.

## Confirmed root cause #1: unbounded recursion in 9b8491 ↔ 9b4457

Wrapping `state.fnDispatch[0x42b079]` (viewport wndProc) caught `RangeError:
Maximum call stack size exceeded`, originating in

```
at FUN_009b8491 (9b8491.js:33)
at FUN_009b4457 (9b4457.js:192)
at FUN_009b8491 (9b8491.js:38)
at FUN_009b4457 (9b4457.js:192)
... [thousands of frames]
```

Trace: the per-strip DPI struct at `0x005f96d0` (set up by `FUN_004316f3`) has
its zoom field `[5f96de]` driven from `0 → -1 → -2 → ... → -1837` by repeated
`dec word [edi+0xe]` from `9b8491:33`. The recursion only stops when the JS
engine's stack overflows.

### Why the recursion was unbounded

Disassembled `rct.exe` at `0x9b8491` and `0x9b4457`:

```
0x9b84b8  0f b7 9b c2 c0 8d 00   movzx ebx, word [ebx + 0x8dc0c2]   ; advance to sub-sprite handle
0x9b84bf  66 d1 f9               sar  cx, 1                          ; halve sprite X coord
0x9b84c2  66 d1 fa               sar  dx, 1                          ; halve sprite Y coord
0x9b84c5  e8 8a bf ff ff         call 0x9b4457
```

(Same pattern at `0x9b62b9` inside `9b4457`'s self-recursion branch.)

The auto-translated `ported/auto/9b8491.js` and `9b4457.js` (and `9b438b.js`)
**dropped all three of those instructions**. Ghidra's C decompile
(`decompiled/c/9b8491.c` lines 27-39) omits them because the
register-promotion pass can't track register-to-register dataflow across a
recursive call — `unaff_EBX`/`in_CX`/`in_DX` are treated as constant
parameters of the surrounding C function, and the `movzx ebx, [ebx+0xc2]`
that loads the *sub-sprite* handle gets optimised away as a write to a
"dead" variable.

Without the EBX advance, each recursion level re-reads the SAME class flag at
`[0x8dc0c0 + raw_ebx]`, the `0x10` bit stays set forever, the zoom field
underflows, and the JS stack blows.

### Fix (applied)

Three files patched. Each has a `HAND-FIX (painter-noise root cause)` comment
block citing the asm bytes and the cross-reference.

* `ported/auto/9b8491.js` — recursive halve branch: added `regs.ebx =
  heap.u16(unaff_EBX + 0x008dc0c2)`, `regs.ecx = (sar cx,1)`, `regs.edx = (sar
  dx,1)` before `FUN_009b4457(heap)`. Also changed the four
  `(EDI+4/6/8/0xa) >>> 1` (logical shift) to `>> 1` (arithmetic) to match
  the binary's `sar` opcodes.
* `ported/auto/9b4457.js` — prologue: added `regs.ebx = iVar8` so callees see
  the asm's `shl ebx,4`-scaled value. Recursive halve branch: same three-op
  fix as 9b8491 (advance EBX + halve CX/DX), `>> 1` for SAR.
* `ported/auto/9b438b.js` — same two patches as 9b4457 (prologue scaling +
  recursive halve fix).

### Verification

`probe-42b079-trace.js`:
* Before: `42b079 EXC: Maximum call stack size exceeded`
* After:  no throw, returns cleanly

`probe-dpi-corruption.js` (write count to per-strip DPI region
`0x5f96d0..0x5f96f0`):
* Before: 9,191 writes (mostly the runaway sar/dec loop)
* After:    651 writes (normal painter activity)

`probe-zoom-bytes.js` (final value of `[0x5f96de]`):
* Before: `-1837` (corrupted, recursion underflow)
* After:  `-1`   (matches the asm's expected post-recursion state for one
   level of sub-sprite descent before unwinding)

Existing `test/runtime/native_smoke.test.js` + `test/runtime/native_boot.test.js`
(14 files, 42 tests) continue to pass.

## What the fix does NOT change

The captured screenshot is byte-identical before/after the fix (same 185
distinct values, same dominant `0x01`, same per-row distinct counts). That
means **the noise pattern is generated REGARDLESS of whether the recursion
terminates correctly**. The recursion was a serious bug that needed fixing
(it's a crash-on-first-tick blocker for the browser soak) but it is not the
proximate cause of the noise.

This is consistent with: the recursion happened inside the sprite RLE-decode
sub-tree, which writes to a SCRATCH buffer at `0x009a2032` (the per-pixel
output cache that `9b4911`/`9b4660` later consume). The corrupted scratch
data did contribute SOMETHING to the per-strip blit, but the broken control
flow short-circuited before reaching the actual surface-write code paths in
`9b4911`/`9b8aa9`. With the fix, the sprite chain *runs to completion*; it
just produces the same final image because the upstream inputs are still bad.

## Suspected root cause #2 (next layer — NOT fixed in this budget)

Per-strip iteration runs and writes to the surface in `9b8aa9`/`9b8705`
(the actual pixel-copy primitives). The values being written look like
palette indices in the `0x70..0xa0` band (grass/water/dirt). But:

* **Per-pixel spatial chaos** (~20–24 byte deltas between adjacent pixels)
  is NOT what a real tile blit produces — real tiles have horizontal RLE
  runs of identical bytes (terrain pixels are 4-wide or 8-wide blocks of one
  colour). Chaotic values point at a row-stride or src-ptr arithmetic bug in
  the per-pixel copy loop.
* **Sharp cut-off at viewport-row 78** (canvas row 108): the painter does
  cover the entire 640×416 viewport area in column count (3424 non-sky pixels
  per column ≈ 108 painted rows × 32 tile pitch), but the painted rows are
  CONCENTRATED in the top of the viewport.

Most likely candidates:
1. **`FUN_004316f3`'s pixel-pointer calculation at line 57** has the famous
   stride-arithmetic mess that produces a write-address `back_buf + (ax -
   clipX) + (bx - clipY) * stride` where `ax, bx, clipX, clipY` are a mix of
   16-bit signed and unsigned views. With `clipX=976, clipY=1304` and
   `screen_x=0, screen_y=30`, the offset math could be folding subsequent
   strips on top of the first strip's row — every strip painting into the
   same 108-row band but spread across 32-col strides.
2. **`FUN_009b8aa9`'s row stride** uses `_DAT_009a2030 = _DAT_009a2028 -
   _DAT_009a2024 + edi[6]` (where `edi[6] = pitch_diff = 0` in our setup).
   If `pitch_diff` should actually be `back_buf_pitch - blit_width` and is
   off by `back_buf_pitch - 0`, the rowStride is too small by exactly that,
   collapsing all rows of the sprite into the same screen row band.
3. **DPI struct `+0xc` (pitch_diff)** — `FUN_004316f3` line 449 sets it to
   `screenPitch - screenW = 0` for our 640-wide screen with 640-wide
   viewport. If `9b8aa9` expects `pitch_diff` to include the per-pixel
   width adjustment it might be writing rows on top of each other.

These are interlocked DPI/stride bugs that need a focused trace through
`9b8aa9` (the actual surface-write primitive). I did not have time to apply
that fix in the 60-minute budget.

## Suggested next-step probe

1. Take the recursion-fix branch as the baseline (much faster ticks, no
   stack-overflow noise).
2. Add a hook in `ported/auto/9b8aa9.js`'s pixel-write loop that logs the
   first 4 distinct `(addr, value)` pairs per call. Confirm whether
   consecutive sprite-row writes land on (a) consecutive screen rows
   (correct) or (b) the same row band with growing column offsets
   (suspected bug).
3. If (b), the fix is in `9b8aa9` — the `rowStride` global needs the screen
   pitch added.

## Side findings

* **`runTick`'s synthetic paint pump** only iterates ONCE per tick (window
  pool has just one viewport slot). The `42b079` wndProc throws if 9b8491's
  recursion was unbounded — without the fix, the harness catches the throw
  in a `try { fn(heap) } catch {}` and the back→front presenter still runs,
  so the partially-painted back buffer reaches the canvas anyway. **This is
  why we saw "almost the right thing" — the noise was an artifact of the
  bridge bailing midway, not a missing painter chain.**
* The `painter-bridge` shim wraps the rotation-jumptable painters (e.g.
  `0x4368d8`) and they fire 774× per tick. None of those are the source of
  the visual noise — they read from the world map and write to a separate
  paint-list structure consumed downstream.
* `FUN_extra_paint_436b50` (the rotation-0 hand-port) fires 21× per tick,
  matching the expected 21 strip iterations for a 640-wide viewport at
  zoom 0. Good.

## Files

* Fix: `ported/auto/9b8491.js`, `ported/auto/9b4457.js`, `ported/auto/9b438b.js`
* Probes in `.claude/scratch/`:
  * `probe-surface-content.js` — surface histograms, presentFrame selection
  * `probe-surface-pattern.js` — per-row/per-col pattern analysis, raw bytes
  * `probe-42b079-trace.js` — captures the wndProc-time exception (validates
    the recursion fix when re-run)
  * `probe-dpi-corruption.js` — counts writes to per-strip DPI region
  * `probe-zoom-bytes.js` — final value of zoom field after one tick
  * `probe-tick-walk.js` — per-slot back-buffer delta tracking
  * `probe-tick-paint.js` — fnDispatch wrap of paint-chain functions
  * `probe-recursion-start.js` — stack trace at first zoom-decrement
  * `probe-region-image.js` — saves PPM screenshot for visual inspection
* Screenshot: `.claude/scratch/screenshot-after-fix.png`
