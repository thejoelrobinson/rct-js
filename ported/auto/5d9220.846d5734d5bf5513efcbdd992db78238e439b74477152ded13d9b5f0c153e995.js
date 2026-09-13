// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d9220.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect, state } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

function FUN_005d9220_frozen(heap) {
  let unaff_ESI = regs.esi >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32((0x0065e3c4) + (heap.u16((unaff_ESI + 0x36)) >>> 2) * 4)));
}

export function FUN_005d9220(heap) {
  if ((globalThis.__realStartup || state.executionMode === "pure-js") &&
      state.promotedLiftedAddresses.has(0x5d9220)) {
    return callIndirect(heap, 0x5d9220);
  }
  return FUN_005d9220_frozen(heap);
}
