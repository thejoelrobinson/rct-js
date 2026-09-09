// @manual — do not regenerate.
// INTERPRETER-DELEGATED. See decompiled/c/43e304.c for Ghidra's (mistyped)
// decompilation.
//
// FUN_0043e304 is the peep queue-join / ride-entry decision function
// (~0x480 bytes, binary 0x43e304..0x43e78f). The auto-translation was
// unusable for two independent reasons:
// 1. Ghidra typed the ride-record byte/word fields at 0x887420+ as int
//    arrays, so nearly every access was emitted as u32 at a
//    quadruple-scaled offset (e.g. `u32(0x887422 + (dl*0x130)*4)` for
//    what the binary reads as a byte at 0x887422 + dl*0x260... etc) —
//    the same corruption class fixed by hand in 43e792/44142c/441452.
// 2. A `goto LAB_0043e3f1` was lowered as early-return, silently
//    skipping the queue-append path.
//
// Rather than hand-porting ~250 mistyped lines blind, the module
// delegates to the x86 interpreter via the painter-bridge shim
// registered for 0x43e304 (lifter/extra-entries.json) — byte-true by
// construction. Direct ESM importers (43de68.js, 43e0dd.js) route
// through this module, so they get the bridged version too. Hand-port
// properly when this shows up hot in profiles (it runs a handful of
// times per tick at most).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { state } from "../../runtime/win32/context.js";

export function FUN_0043e304(heap) {
  const bridged = state.fnDispatch.get(0x43e304);
  if (!bridged || bridged === FUN_0043e304) {
    // No painter bridge installed (bare unit-test context) — refuse
    // loudly instead of recursing or running the broken translation.
    throw new Error(
      "FUN_0043e304 requires the painter-bridge interpreter shim " +
      "(installPainterBridge via createRuntime); no bridged entry found",
    );
  }
  return bridged(heap);
}
