# β2 / decoder.js — interpreter-oracle adjudication (2026-06-05)

## TL;DR

The in-game sprite-blit chain (`9b438b → 9b4457 / 9b4660 / 9b4911`) was **badly
broken in JavaScript** at the start of this work (both the shipped chain and the
`decoder.js` rewrite). It has since been driven to **~96% colour byte-accuracy vs
the binary** via 10 oracle-gated fixes — see the "Session update" section at the
end for the catalogue. The original `rct.exe` blit code renders the title screen
correctly, and the interpreter's output is the ground-truth fixture
(`0x027d52ab`); A/B bisection now shows the OUTER (`9b438b`/`9b4457`) and the
BITMAP inner (`9b4660`) are byte-exact JS, with the entire residual gap isolated
to the RLE inner `9b4911`.

**β2 ("wire decoder.js as the more-correct rewrite") was invalid and stays
unwired.** Against the *fixed* @manual chain, decoder.js is ~5x MORE divergent;
it is a future behaviour-preserving refactor target (after `9b4911` is byte-exact),
not a correctness win. Do not ship it; do not re-capture the replay fixture to
bless its pixels.

## How this was established

The replay-hash gate proves pixel-*neutrality*, not correctness. `diff-subsystem`
could not adjudicate either: its scenario captures don't seed full global state, so
the OLD chain and decoder.js failed its 4 sprite scenarios **identically** (same
`eax` divergence `0x15f920` vs `0x0`, same `0x9a202e` mismatch) — brittle for
these functions. The working oracles that replaced it: (1) the whole-frame
**true-accuracy gate** (byte-diff vs the binary's surface, `test/runtime/title_accuracy.test.js`),
and (2) the **single-sprite isolation harness** (`tools/_beta2-isolate.js`) with
**A/B bisection** — both shown clean below (the A/B bisection is not confounded by
surface accumulation and isolated the residual to `9b4911`).

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

## Round 2 (2026-06-05 later) — 88.9% → 90.9%, remaining is COLOUR not position

5th fix: **COL_SKIP_B clobber.** The binary writes COL_SKIP_B (0x9a202e) as a
16-bit word; the translator used setU32, whose 2 trailing bytes overwrote the
adjacent ROW_STRIDE (0x9a2030) with 0 right after it was set — bitmap dst stride
came out 32 instead of 639, collapsing bitmap sprites into the background
streaks. Fix: setU16 on all 20 COL_SKIP_B writes. After this, **all clip params
(COL_SKIP/COL_COUNT/COL_SKIP_B/ROW_STRIDE) match across all 806 title blits.**

Pixel-match → **90.9%**. Crucially, a category breakdown of the remaining diff:
- 14 px MISSING (JS bg where binary draws content)
- 767 px EXTRA
- **27,086 px WRONG COLOUR** (both draw content, different index)

So the sprites are **positioned correctly** — the remaining error is almost
entirely wrong colour, concentrated on the **fence / path-edge sprites** (mapped
via `tools/_beta2-probe.js` raw-index dump: JS draws flat index 1 where the
binary draws shaded ramps 10-15 / 34-39 / 221-223).

**Localised, not yet fixed.** It's a palette-REMAP bug, not the dispatcher:
- 9b4457 is never called (routing it through the interpreter changes 0 pixels).
- DAT_REMAP_CLASS (0x9a2000) matches across all blits.
- **DAT_PAL_REMAP (0x9a200c, the remap TABLE pointer) diverges in 114 blits** —
  the interpreter writes a real table ptr (0x179a9f2 / 0x9aa144) per row, JS
  leaves it stale. The interpreter's per-row alternating writes (src ptr, const
  table) point at a remap loop in a *different* function than 9b438b's single
  setU32 — find which painter/helper writes 0x9a200c in a per-row loop and is
  mis-ported (candidates: the multi-write 0x9a200c functions — 9b8aa9, 9b6863,
  9bafe6, 9ba943). NOTE: the per-blit param segmentation is unreliable for this
  because 9b438b writes 0x9a2000 *before* 0x9a2010, so a sprite's REMAP_CLASS
  lands in the previous segment — account for that when diffing.

Diagnostic tools added this round: `tools/_beta2-edi.js` (dst pointer per blit),
`tools/_beta2-blitdiff.js` (method-agnostic per-blit snapshot footprint — note
9b4911 writes via heap.bytes[] directly, so the _heapWatch tools undercount RLE),
`tools/_beta2-allblits.js`, plus a raw-index dump in `tools/_beta2-probe.js`.

## Round 3 (2026-06-06) — single-sprite isolation harness; colour bug isolated

Built `tools/_beta2-isolate.js` — the clean per-sprite oracle the earlier
confounds demanded. It captures each blit's exact entry state (regs + the
scratch-global block + the per-strip DPI struct, which evolves in 0x5f96xx and
must be restored), then replays each blit through JS and through the x86
interpreter on the REAL accumulating surface, and diffs the two sprite outputs.
No overdraw, no segmentation, no convention mismatch. (Capture needs a thin
wrapper splitting 9b438b.js → 9b438b_impl.js; recreate it the same way.)

Findings on the remaining ~9% (wrong-COLOUR pixels), now definitive:
- It is **NOT** remap-table and **NOT** position (best (dx,dy) shift is 0,0).
- The divergent fence/path sprites are **REMAP_CLASS=0 (plain copy)** — both RLE
  and bitmap. JS reads the **wrong source data**: the spatial crop shows the
  interpreter drawing a clean 34/35 shading dither while JS draws garbage /
  transparent (it reads source 0 and skips, where the binary reads a real
  pixel). So the bug is a wrong source pointer/stride in 9b438b's outer
  source-offset math (common to both inners — swapping in decoder.js's inner did
  NOT help; 52335→59053 px).
- Confirmed-but-NOT-title bugs found along the way (fix when those paths run):
  the remap branch in 9b4660 reads pixel-0 source as `heap.u32(unaff_ESI)`
  instead of `heap.u8` (lines ~96/117); and `goto-as-return` in 9b4660:219 /
  9b64ea:84 / 9b6863 (×4). NOTE: naively "fixing" 9b4660:219 (goto→continue)
  REGRESSED the full render 90.9%→88.9%, so the binary's control flow there is
  subtler than a simple loop-back — do not reapply without the interpreter
  confirming the target.

Next: in `_beta2-isolate.js`, capture the regs.esi the JS outer passes to the
inner for a divergent plain-copy blit (e.g. #76) and compare to the true sprite
source base — the outer's bitmap/RLE source-offset (`_srcYOff`/`_srcXSkip` /
COL_SKIP) is the prime suspect for reading shifted/garbage source.

## Recommended next step

The interpreter oracle is now the tool to fix this properly: single-sprite
differential (one blit, JS vs interpreter, compare the dst write addresses per
row) will pinpoint the row-placement bug. Fix it once against the oracle and the
*whole* title renders correctly — a real correctness milestone, and the first
end-to-end validation of the rewrite-gated-by-oracle loop on a rendering
subsystem. (Whether to invest here depends on project goals: the stated TRUE
PURPOSE is the methodology, not a playable game — and the reusable methodology
deliverable here is the whole-frame interpreter oracle itself.)

---

## Session update — colour to 96.10%, remaining tail isolated to 9b4911

Built on the oracle above. Two more oracle-gated fixes landed (full catalogue in
git log b57e043..HEAD):

- **source-skip sign (9b438b bitmap left-clip).** `_srcOff = _srcYOff - _srcXSkip`
  retreated esi instead of advancing past the clipped source columns (the binary
  does `sub esi,ecx` with ecx=leftDelta<0 = advance). Fixed to `+`. 91.48→91.91%.
- **goto-as-return (9b4660 plain-copy slow path).** The `goto LAB_009b4732`
  lowered as `return 0`, so wide transparent sprites drew ≤4 px of their first
  row then bailed. Restructured the do-while as `while(true)` + `continue`. This
  REGRESSED earlier only because the source-skip bug was still feeding garbage;
  with that fixed it is a **−16.7k px win**: 91.91→**96.10%** colour
  (95.25% raw palette-index vs the binary).

### TRUE accuracy gate (test/runtime/title_accuracy.test.js)
Replaces faith in the self-referential replay hash: compares the JS tick-1 render
byte-for-byte against the BINARY's actual output (test/fixtures/
title-truth-surface-tick1.bin, regenerate with `node tools/capture-truth-surface.js`,
FNV 0x027d52ab). MAX_DIVERGENCE is a ratchet → 0; currently 14606/307200.

### Remaining tail is ENTIRELY in 9b4911 (RLE inner) — proven
Clean A/B bisection in `_beta2-isolate.js`: keep the fixed JS outer, route the
**inner** blitters through the interpreter.
- JS outer + JS bitmap (9b4660) + **interp** RLE (9b4911) → **0 / 806 divergent**.
- JS outer + **interp** bitmap + JS RLE → **451 / 22989 px** (the whole tail).
So the OUTER (9b438b) and the BITMAP inner (9b4660) are byte-exact JS; 100% of
the remaining gap is the JS RLE decoder 9b4911.

### Why 9b4911 wasn't cracked here — two compounding blockers for the next pass
1. **The Ghidra C (decompiled/c/9b4911.c) appears inconsistent with the binary.**
   The plain-branch clip (xOff − DAT_009a2024, len = runLen + iVar9, skip if
   len≤0) is byte-identical to the JS rewrite, yet the interpreter (running the
   real asm) draws runs the C/JS skip. The function carries Ghidra `_DAT` overlap
   warnings — a decompiler-artifact signal. **Disassemble the actual x86 of
   9b4911's clip; do not trust the C here.**
2. **_beta2-isolate.js is confounded for small overlapping sprites.** It replays
   each sprite on the JS-*accumulated* surface, so the per-pixel crop mixes prior
   (96%-correct) blits into the comparison — pixel traces of e.g. blit #158
   contradicted themselves for this reason. **Build a blank-surface variant for
   plain/remap sprites** (keep accumulated only for tint/translucent) to get a
   clean per-sprite JS-vs-binary diff before re-attempting the 9b4911 fix.

The controlled A/B bisection (above) is NOT confounded — it's a relative JS-vs-
interp comparison with identical before-state — so "the tail is 9b4911" is solid.
