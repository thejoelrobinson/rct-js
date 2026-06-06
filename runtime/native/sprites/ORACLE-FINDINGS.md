# β2 / decoder.js — interpreter-oracle adjudication (2026-06-05)

## TL;DR

The in-game sprite-blit chain (`9b438b → 9b4457 / 9b4660 / 9b4911`) is **badly
broken in JavaScript** — in BOTH the shipped translated chain AND the
`decoder.js` rewrite. The original `rct.exe` blit code renders the title screen
**correctly**; routing those four entrypoints through the x86 interpreter (same
JS callers, same inputs) **fixes the whole image**. So the bug lives inside the
JS blit implementation, and `decoder.js` inherited it.

**β2 ("wire decoder.js as the more-correct rewrite") is invalid.** decoder.js is
not more correct than the buggy chain — measured against the binary it is
*marginally worse*. Do not ship it as a correctness win, and do not re-capture
the replay fixture to bless its pixels.

## How this was established

The replay-hash gate proves pixel-*neutrality*, not correctness. `diff-subsystem`
cannot adjudicate either: its scenario captures don't seed full global state, so
the OLD chain and decoder.js fail its 4 sprite scenarios **identically** (same
`eax` divergence `0x15f920` vs `0x0`, same `0x9a202e` mismatch). It is a broken
oracle for these functions.

The working oracle: route the four blit entrypoints through the x86 interpreter
running the original `rct.exe` code (already overlaid on `heap.bytes` by
`installPainterBridge`), boot the deterministic replay harness, and hash + render
the title back-buffer. The interpreter executing the binary's own code IS ground
truth (METHODOLOGY.md stage 5).

Tooling (kept in-repo):
- `runtime/native/sprites/_interp_blit.js` — routes a blit entrypoint through the
  interpreter (regs sync mirrors `painter-bridge.js`). Diagnostic, not production.
- `tools/capture-interp-blit-hash.js` — boots the replay harness with the routers
  installed and prints the ground-truth title hash.
- `tools/_beta2-probe.js <label>` — boots the *currently wired* chain and writes
  `/tmp/beta2-<label>.ppm` + reports hash / non-zero px / palette size. Run it
  three times (old chain / decoder shims / interp routers) to reproduce.

To reproduce the three-way comparison, temporarily point
`ported/auto/9b{438b,4457,4660,4911}.js` at `_interp_blit.js`
(`export const FUN_00<addr> = (heap) => interpBlit(heap, 0x<addr>)`), run the
probe, then `git checkout HEAD --` those four files.

## The numbers (tick 1, same surface 0x2428da0, deterministic boot)

| chain | tick-1 hash | non-zero px | palette |
|---|---|---|---|
| **interpreter (binary = ground truth)** | `0x027d52ab` | 301522 | **197** |
| old translated chain (committed baseline) | `0x1c8c8fb3` | 301606 | 163 |
| decoder.js (β2 shims) | `0x205d7c22` | 287737 | 159 |

Pixel COUNT is a near-useless metric here: the old chain matches the binary's
count to within 84 pixels yet draws a completely wrong image. The binary uses
**197** distinct palette indices; both JS chains use ~160 — they are missing
~35 colours' worth of detail. The plan's "307200/307200 saturated = 100% pixel
coverage = success" framing conflates coverage with correctness; **it is wrong.**

## The visual verdict (the decisive check)

Rendered through the captured palette:
- **interpreter:** a clean, detailed, recognisable isometric RCT title scene
  (terrain, fenced paths, a building, peeps, red scenery).
- **old chain & decoder.js:** the same scene shattered into horizontal sawtooth
  bands — terrain rows collapsed vertically, most geometry wrong or missing.
  decoder.js is slightly worse (more streaks, fewer pixels).

The sawtooth/vertical-collapse signature points at the per-row **destination
pointer / row-stride / top-clip Y-offset** math (`DAT_ROW_STRIDE`, the
`topDelta * (clipW + pitchExtra)` dst-Y term, the `add edi, eax; add edi, ecx`
the Ghidra C dropped — see the existing `@manual` "paint-ring wild-write" notes
in `9b438b.js`). Both chains reproduce it, consistent with both deriving from the
same incomplete Ghidra dataflow. **Not yet pinpointed to a line.**

## Why both chains share the bug

decoder.js was written "fresh" but guided by `decompiled/c/9b438b.c` (Ghidra) and
the old chain. Ghidra drops the register dataflow that rewrites EDI (the dst row
pointer) mid-function — documented in the old chain's own `@manual` headers. Both
implementations therefore encode the same wrong/incomplete picture of where each
sprite row lands. The interpreter runs the real machine code and gets it right.

## Fix progress (2026-06-05, oracle-guided)

Using the interpreter oracle for per-blit differential, two bug CLASSES were
found and fixed in `ported/auto/9b438b.js` + `9b4457.js` (patch saved alongside
this file as `beta2-blit-fixes.patch`):

1. **SPR_X clobber.** The binary stores SRC_H (`0x9a2016`) as a 16-bit word; the
   translator emitted `setU32`, whose 2 trailing bytes overwrite `0x9a2018`
   (SPR_X, just loaded = −32) with 0. Every sprite then blitted at X-offset 0.
   Fix: `setU16`. (Both files, zoom-0 + zoom-1 = 4 sites.)
2. **Lost-sign clip.** The `short` top/left clip deltas were masked `& 0xffff`
   (always ≥0), so the `if (delta < 0)` clip branch was DEAD — sprites drew
   full-width into a 16-px clip strip, overrunning adjacent columns. Fix:
   `<< 16 >> 16` so the value is signed for both the test and the arithmetic.
   (RLE + bitmap left/top sites where the `if` wasn't already sign-extended.)

**Verified:** with both fixes, blit #0's destination writes are now
**byte-identical to the interpreter** (`tools/_beta2-dst.js`), the building and
upper terrain render correctly, palette 163 → 178 (target 197). Render hash
`0x3ce816c4` (was `0x1c8c8fb3`; target `0x027d52ab`).

3. **dst-Y truncation (the big one).** The dst row-offset bytes
   (`topDelta * (clipW+pitchExtra)`, up to ~185k) were truncated to 16 bits
   before forming the destination pointer — in the RLE path by a `CONCAT22` that
   repacked `uVar4`/`uVar3` into the return value, and in the bitmap path by an
   explicit `& 0xffff`. Any tile with `topDelta > 102` (offset > 0xffff)
   collapsed to screen-top, so the ENTIRE lower landscape was missing. Fix:
   preserve the full 32-bit y-offset (`_dstYBytes` / `_dstYOff = uVar >>> 0`) and
   use it for the dst pointer. Applied to both files, RLE + bitmap (zoom-0).
   Blit #0 went from 0 surface writes to landing at rows 321-336 = the binary.

4. **u16-as-u32 ROW_STRIDE.** The bitmap dst row-stride subtracted
   `heap.u32(0x9a2014)` (the full W|H<<16 dword) instead of the 16-bit width, so
   `ROW_STRIDE` underflowed (low16 ≈ 32 vs the binary's 639) and collapsed bitmap
   sprites vertically. Fix: mask SRC_W to 16 bits. (Correct vs the binary, though
   the title's affected sprites are heavily clipped so it's ~0 visible pixels.)

**Result:** the title screen renders as a correct, recognizable RCT scene —
terrain, paths, building, peeps, scenery all in place. **88.9% of pixels are
identical to the interpreter ground truth** (up from a shattered baseline);
render hash `0x76723468`, palette 173 (target 197). All fixes saved in
`beta2-blit-fixes.patch` (apply with `git apply`).

**Remaining ~11% (edge precision, lower value).** The pixel-diff (`/tmp/beta2-diff.png`)
shows the residual error traces the **fence / path-edge outlines** — thin edge
sprites off by ~1px — plus faint horizontal background streaks. Not a macro
failure. Suspects: the right/bottom overshoot (`sVar6`, still `& 0xffff`),
the x-offset rounding at the dst pointer, the zoom-1 dst-Y sites (9b438b
346/426, 9b4457 311/383 — same truncation, not yet fixed, only matters if the
title uses zoom-1 sub-sprites), and the inner-blitter remap/tint branches.
Use `BLIT=<n> tools/_beta2-blit0.js` to compare a specific edge sprite's writes.

## Recommended next step

The interpreter oracle is now the tool to fix this properly: single-sprite
differential (one blit, JS vs interpreter, compare the dst write addresses per
row) will pinpoint the row-placement bug. Fix it once against the oracle and the
*whole* title renders correctly — a real correctness milestone, and the first
end-to-end validation of the rewrite-gated-by-oracle loop on a rendering
subsystem. (Whether to invest here depends on project goals: the stated TRUE
PURPOSE is the methodology, not a playable game — and the reusable methodology
deliverable here is the whole-frame interpreter oracle itself.)
