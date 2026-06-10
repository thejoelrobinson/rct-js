// @manual — do not regenerate.
// INTERPRETER-DELEGATED. See decompiled/c/5d94b6.c for Ghidra's decompilation
// and git history for the previous auto-translation.
//
// The auto-translation of FUN_005d94b6 contained 4 `goto LAB_*` sites the
// translator lowered as silent early-returns (goto-warn counters showed it
// truncating mid-function on live gameplay ticks), so its behaviour
// diverged from the binary wherever those paths fired. The module now
// delegates to the painter-bridge interpreter shim registered for
// 0x5d94b6 (lifter/extra-entries.json) — byte-true by construction. The
// function is regs-based (no JS stack params), so the shim's register
// sync covers the full calling convention. Hand-port properly when it
// shows up hot in profiles.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { state } from "../../runtime/win32/context.js";

export function FUN_005d94b6(heap) {
  const bridged = state.fnDispatch.get(0x5d94b6);
  if (!bridged || bridged === FUN_005d94b6) {
    throw new Error(
      "FUN_005d94b6 requires the painter-bridge interpreter shim " +
      "(installPainterBridge via createRuntime); no bridged entry found",
    );
  }
  return bridged(heap);
}
