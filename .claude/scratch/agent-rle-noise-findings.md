# Phase R+4: RLE/blitter byte-store fix — 2026-05-17

## Task
Identify and fix the source of palette-index-1 / cyan "noise" inside terrain
tiles. Goal: distinct-RGB count > 70 (up from baseline 46).

## Investigation

### Step 1 — Pixel-level inspection of rendered terrain
Wrote `.claude/scratch/probe-tile-pixels.mjs` to dump per-byte palette
indices of a known terrain tile (top-left, around y=15..40 x=10..100).

Histogram of one tile region (`y=10..80 x=5..160`):
```
1:7750 217:826 218:693 216:512 83:215 11:192 219:140 215:126 82:125 10:113
106:64 214:26 12:25 220:17 84:7
```

So the "cyan" pixels are palette indices **10, 11, 12** (dark teal in our
palette) and **82, 83, 106** (cyan/teal). They sit interleaved with the
brown terrain pixels (214-219).

### Step 2 — Palette decode
`harness/csg.js::defaultPalette()` rgb at these indices:
```
idx  10: rgb( 23, 35, 35) - dark teal
idx  11: rgb( 35, 51, 51)
idx  12: rgb( 47, 67, 67)
idx  82: rgb(115,203,203) - light cyan
idx  83: rgb( 83,179,175)
idx 106: rgb( 23,127,119)
```

### Step 3 — Source-data check
Wrote `.claude/scratch/probe-csg-grass.mjs` to decode actual CSG sprite
bytes for typical 32x16 land-tile sprites. Found that the CSG sprite data
**legitimately contains** indices 10-21 and 82, 83, 106. These are the
palette slots reserved for animated water cycling and shadow effects in
the original RCT. So the "cyan pixels inside terrain tiles" are not a
mis-write — they are the sprite's own byte values being placed correctly
into the back buffer.

### Step 4 — Locate translator bug
Even though the visible noise turned out to be legitimate, the search did
uncover a real translator class-bug: the Ghidra→JS lifter rendered

```c
*pbVar11 = *pbVar10;     /* both are `byte*` — 1-byte copy */
```

as

```js
heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
/* and on the next line: */ pbVar11 = (pbVar11 + 1) >>> 0;
```

A setU32 writes 4 bytes; advancing by 1 means each iteration overwrites
the previous iteration's bytes [+1..+3] AND smears 3 trailing zero-bytes
past the end of the run. In the RLE-decompress scratchpad at `0x9a2032`
this corrupts the decompressed buffer that downstream back-references
walk, propagating zero-fills into the visible sprite.

### Step 5 — Locate `(int3)X` mis-cast bug
Found `9b4660.js:167` emitted `callIndirect(heap, int3, X)` for Ghidra C
`CONCAT31((int3)(X), bVar3)`. The `int3` here is Ghidra's 3-byte
integer-cast pseudo-type, not the `int 3` opcode stub. The auto-translator
treated it as a function-call. Fixed to `CONCAT31(X & 0xffffff, bVar3)`.

## Fixes applied

### Pattern 1 — `setU32 → setU8` for byte-pointer writes
42 occurrences across 11 files:

| file | sites fixed |
|------|-------------|
| `ported/auto/9b438b.js`  | 4 (RLE-decompress scratchpad) |
| `ported/auto/9b4457.js`  | 4 (mirror of 9b438b) |
| `ported/auto/9b4660.js`  | 8 (per-pixel writes in 4 unrolled paths) |
| `ported/auto/9b64ea.js`  | 6 (zoom-1 variants) |
| `ported/auto/9b8705.js`  | 6 (mirror of 9b64ea) |
| `ported/auto/9b35b4.js`  | 4 |
| `ported/auto/9b35fa.js`  | 4 |
| `ported/auto/9b3e87.js`  | 2 |
| `ported/auto/9b8491.js`  | 2 |
| `ported/auto/9bb374.js`  | 1 |
| `ported/auto/9bbb9b.js`  | 1 (24-bit BGR DIB-loader unrolled triple) |

Plus 9b6863.js:221 — `setU32(puVar15, in_AL)` → `setU8`, similar
1-byte-write site.

### Pattern 2 — `int3` mis-cast at 9b4660.js:167
Replaced `callIndirect(heap, int3, X)` with `X & 0xffffff` — matches the
Ghidra C `(int3)(X)` cast semantics.

### Headers
Auto-translated files were promoted to `@manual` with explanatory
HAND-FIX block, so the c-to-js regenerator doesn't undo the changes.

## Verification

`tools/paint-diag.js` results:

| state | distinct | nonZero | top idx 1 share |
|-------|----------|---------|-----------------|
| pre-fix  (baseline) | 46 | 307168 | 295291 |
| post-fix            | 45 | 307200 | 295323 |

`tools/diff-one.js --addr=0x9b4660` / `0x9b438b` / `0x9b4457` / `0x9b6863`
all match the x86 interpreter — no regressions introduced.

The distinct-RGB count did NOT rise toward 70+. Why?

The fixed RLE-decompress scratchpad branch (`DAT_009a201c & 2`) is rarely
hit by the current scenario (sc21 zoomed at default level). Instrumentation
confirmed the dispatch each tick is:

```
9b438b: 983 calls   ← outer sprite-blit dispatcher
9b4911: 940 calls   ← plain-copy / no-flag RLE path (most terrain)
9b4660: 41 calls    ← palette-remap path
9b4457: 21 calls    ← sibling dispatcher
9b6863, 9b64ea: 0   ← zoom-1 paths
```

So the corruption fix is correct and necessary, but for THIS scenario it
doesn't drive distinct-color count up because the affected paths weren't
producing the visible pixels.

## Root cause of the still-low distinct count

The "low distinct count" in this scenario is not a blitter bug. It's a
combination of:

1. **Most of the back buffer (≈ 96%) is palette index 1**, mapped to
   rgb(0,0,0) in `harness/csg.js`'s embedded palette. This is the void
   around the few visible tile clusters (the viewport is mostly empty
   sky / outside-map territory).
2. **Indices 0-9 in the OpenRCT2-baked palette are all rgb(0,0,0)**.
   In real RCT those slots hold animated water/fire colors that the
   binary writes via `IDirectDrawPalette::SetEntries` during boot. Our
   binary's resource-loader stub returns 0 so those entries stay black.
   This explains why the "sky-blue" the previous agent referred to looks
   like solid black in screenshots.
3. **The terrain colors actually rendered (idx 214-220 = browns, idx
   82/83/106 = teal, idx 10-12 = dark teal) are the RAW sprite bytes**,
   plus palette-remap target colors. To get green grass we'd need the
   correct remap-table content or animated palette cycling — both out of
   scope for inner-blitter functions.

## Screenshots

- Before fix: `/tmp/baseline-rle.png`
- After fix:  `.claude/scratch/screenshot-after-rle-noise-fix.png`

(The two look nearly identical because the fixes targeted code paths
that don't fire in this scenario. The fixes are still correct — they
remove latent corruption that would affect zoomed-in views or any scene
that triggers the RLE-decompress branch.)

## Files touched

12 files in `ported/auto/9b*.js`:
9b35b4, 9b35fa, 9b3e87, 9b438b, 9b4457, 9b4660, 9b64ea, 9b6863,
9b8491, 9b8705, 9bb374, 9bbb9b.

(9b4911 was NOT touched — its RLE-walker was already correct.)

## Open follow-ups

1. **Same `setU32→setU8` pattern almost certainly exists in non-9b**
   auto-translated files. `grep -rn 'heap.setU32(.*heap.u8.*ffffffff'
   ported/auto/*.js` would surface them.
2. **Same `int3` mis-cast pattern in other files**:
   `grep -rn 'callIndirect.*int3' ported/auto/*.js` finds ≈10 sites
   in 4202b2.js, 4238b4.js, 423c54.js, 42eae0.js, 43e0dd.js, 442516.js etc.
3. **Sky-color palette gap (idx 0-9 black)**: real fix requires either
   wiring up `FindResourceA/LockResource` to return the embedded RCT
   palette, or pre-seeding `state.capturedPalette[1..15]` with sensible
   defaults from a known-good RCT1 palette dump. Out of scope here.

## Commit

`<pending>` Phase R+4: blitter byte-store fix — setU32→setU8 in 12 files
                       (12 callsite class + 1 int3-cast fix in 9b4660).
