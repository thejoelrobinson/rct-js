// @manual — do not regenerate.
//
// Source: decompiled/c/426c8a.c — guest/event spawner that fires every 512
// ticks (gated by `heap.u32(0x0088741c) & 0x1ff == 0`). It calls
// FUN_004410df to allocate a peep slot, expecting ESI to come back pointing
// to the new struct. Without register-arg propagation, ESI stays 0 and
// FUN_004410df's writes to `unaff_ESI + 0x14`, `+0x6e`, etc. land at low-
// memory addresses, corrupting data.bin. Title screen does not need spawning;
// safe to no-op until the translator can propagate caller register state.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00426c8a(heap) {
  return;
}
