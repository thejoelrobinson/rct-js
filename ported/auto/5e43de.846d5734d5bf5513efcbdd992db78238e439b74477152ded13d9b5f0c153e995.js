// @manual — do not regenerate.
// Source: decompiled/c/5e43de.c

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { invalidateWindowExact } from "./extra_window_lifecycle.js";
import { FUN_005e43de_frozen } from "./frozen_5e43de.js";
export function FUN_005e43de_exact(heap) {
  const window = regs.esi >>> 0;
  regs.cf = 0;
  regs.zf = window === 0 ? 1 : 0;
  regs.sf = window >>> 31;
  regs.of = 0;
  if (window) invalidateWindowExact(heap);
  return regs.eax >>> 0;
}

export function FUN_005e43de(heap) {
  if (globalThis.__forceFrozenToolbarBatch) return FUN_005e43de_frozen(heap);
  if (globalThis.__realStartup || state.executionMode === "pure-js") return FUN_005e43de_exact(heap);
  return FUN_005e43de_frozen(heap);
}
