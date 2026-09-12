// @manual — do not regenerate.
//
// FUN_00424e0f — periodic map-scan / fence+scenery aging sim helper, called
// once per game tick from the per-tick sim dispatch chain at 0x4388c5
// (`call 0x424e0f; call 0x439135; ...` — the next instruction is another
// `call`, so this function's exit registers are DEAD). ~883 interp
// steps/call. Previously interpreter-delegated because the auto-translation
// lowered 5 `goto LAB_*` sites as silent early-returns; now hand-ported to
// JS in extra_sim_424e0f.js (transcribed from the capstone disasm, all
// callees delegated through callNative for byte-exact CX/AX/CF round-trip).
//
// This module is the dispatch indirection point: it routes through
// state.fnDispatch.get(0x424e0f), which harness.js overrides to the JS port
// (FUN_00424e0f_js) after installPainterBridge. The interpreter shim stays
// reachable behind __forceInterp424e0f so the oracle
// (tools/_lockstep-424e0f.mjs, whole-heap per-call compare: calls=N
// memMis=0) and dual soak can A/B the port vs the original bytes. Keeping
// the call routed through fnDispatch (rather than importing the port
// directly) lets the oracle intercept every call by wrapping that entry.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { state } from "../../runtime/win32/context.js";

export function FUN_00424e0f(heap) {
  const dispatched = state.fnDispatch.get(0x424e0f);
  if (!dispatched || dispatched === FUN_00424e0f) {
    throw new Error(
      "FUN_00424e0f requires a dispatch entry (harness override or " +
      "painter-bridge shim); none found",
    );
  }
  return dispatched(heap);
}
