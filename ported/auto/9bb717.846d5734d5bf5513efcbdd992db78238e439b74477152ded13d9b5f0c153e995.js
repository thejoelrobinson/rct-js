// @manual — do not regenerate.
//
// Source: decompiled/c/9bb717.c — palette-channel copy fragment with
// `do { ... } while (uVar1 != 0)`. uVar1 = (uint)DAT_008dff18; when DAT
// is 0 (uninitialised in our boot path), uVar1 underflows and the loop
// spins ~4 billion times. Caller (FUN_00438aac, default case of a switch)
// runs this without first guarding the count, so we no-op it here.
// Cosmetic palette work — safe to skip during boot.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009bb717(heap) {
  return;
}
