// @manual — do not regenerate.
// Source: decompiled/c/9b4911.c — sprite RLE-decoder with 4-way dispatch
// based on DAT_009a2000 flags (0x20000000 = "transparent / remap-colour",
// 0x40000000 = "horizontal mirror"). Ghidra recovered the no-flag branch
// (~50 lines starting at C line 144) but bailed on the three flagged
// branches because each ends in `(*(code *)(&PTR_DAT_009b5864)[uVar6])();`
// — a jumptable through a packed-pixel-copy variant table that Ghidra
// can't enumerate ("Could not recover jumptable at 0x009b585a: Too many
// branches").
//
// Reverse-engineering those three jumptables means recovering the
// per-cell-count pixel-copy variants from the binary at 0x9b5864 etc.
// That's Phase J+ work.
//
// **Throwing here kills the entire strip iterator** in FUN_004316f3
// because the wndProc-level try/catch in runtime/harness.js bubbles the
// exception out of the do-while loop, leaving the strip after the first
// painter call. To unblock the painter chain so terrain/sprites can
// render, this no-op stub returns 0 — matching the binary's behaviour
// when the source RLE has no qualifying spans for the current clip
// rect.
//
// Side effect: remap-coloured sprites (toolbar logo, paint-overlay
// rectangles) will draw as solid 0 (transparent) until the jumptable
// is recovered. Terrain, walls, and standard sprite blits go through
// the non-remap path in 9b438b (line 220+) and FUN_009b30f1, which
// don't touch 9b4911.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009b4911(heap) {
  // No-op until the 3 RLE-copy jumptables are recovered.
  return 0;
}
